import { createHmac } from 'crypto';
import { SiteSearchHandler } from '@/helpers/algolia/site-search-handler';
import {
  fetchAllPages,
  getStoryblokClient,
  handleStoryblokRequest,
  STORYBLOK_CACHE_TAG,
} from '@/helpers/storyblok-client';
import { EventSchema, StoryblokErrorSchema } from '@/helpers/storyblok-schema';
import chalk from 'chalk';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { ArticleStoryblok, PageStoryblok } from '@/component-types';
import type { SBStoryData } from '@/types';
import type { z } from 'zod';

interface GetStoryParams {
  storyId: number;
  fullSlug: string;
  action: string;
}

export async function POST(req: Request) {
  const delay = Math.floor(Math.random() * 5) + 1;
  await new Promise((resolve) => setTimeout(resolve, delay * 1000));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any;
  let signature: string | null;

  try {
    body = await req.json();
  } catch (error) {
    return Response.json(
      {
        message: 'Invalid JSON body.',
      },
      {
        status: 400,
      },
    );
  }

  // === Get the webhook signature === //
  try {
    signature = req.headers.get('webhook-signature');
  } catch (error) {
    return Response.json(
      {
        message: 'Invalid webhook signature.',
      },
      {
        status: 400,
      },
    );
  }

  // === Verify the webhook signature === //
  try {
    verifySignature(body, signature);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          message: error.message,
        },
        {
          status: 401,
        },
      );
    } else {
      return Response.json(
        {
          message: 'An error occurred while verifying the webhook signature.',
        },
        {
          status: 401,
        },
      );
    }
  }

  // === Process the webhook event === //
  try {
    // generate a guid for the request
    const guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const webhookEvent = EventSchema.parse(body);
    await processWebhookEvent(webhookEvent, guid);

    return Response.json(`Success. Check Server Logs for More Details. ID: ${guid}`, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.error(chalk.red(err.message));
      return Response.json(
        {
          message: err.message,
        },
        {
          status: 500,
        },
      );
    }

    console.log(chalk.red(err));
    return Response.json(
      {
        message: 'An unknown error occurred.',
      },
      {
        status: 500,
      },
    );
  }
}

// === Helpers === //
async function processWebhookEvent(webhookEvent: z.infer<typeof EventSchema>, guid: string) {
  try {
    const tasksCompleted: string[] = [];

    if (
      'story_id' in webhookEvent &&
      (webhookEvent.action === 'published' ||
        webhookEvent.action === 'moved' ||
        webhookEvent.action === 'unpublished' ||
        webhookEvent.action === 'deleted')
    ) {
      // === SITE-WIDE REVALIDATION === //
      // Runs before the story lookup: a deleted story can't be fetched, so the per-story revalidation finds nothing.
      revalidateTag(STORYBLOK_CACHE_TAG);
      revalidatePath('/', 'layout');
      console.log(chalk.green(`Revalidated all Storyblok content (tag: ${STORYBLOK_CACHE_TAG}) for ${guid}`));

      const data = await getStoryblokData({
        storyId: webhookEvent.story_id,
        fullSlug: webhookEvent.full_slug,
        action: webhookEvent.action,
      });
      const siteSearchHandler = new SiteSearchHandler();
      const indexablePages = ['page', 'article', 'conference_home'];

      // === REVALIDATION === //
      const revalidatedTasks = handleRevalidation(data);
      tasksCompleted.push(...revalidatedTasks);

      // === DELETION === //
      if (webhookEvent.action === 'deleted') {
        console.log('Handling Deletion of Full Slug:', webhookEvent.full_slug);
        const sbClient = getStoryblokClient();
        const startsWith = webhookEvent.full_slug.endsWith('/') ? webhookEvent.full_slug : `${webhookEvent.full_slug}/`;

        // we need to find out whether or not it is a single story or a folder
        // to do this we need to check if we get any stories back when we do a query filter for "starts_with":
        // - if we get stories back we know it was a root page. we should NOT delete the children and only delete the root story
        // - if we don't get any stories back we know it was either a single root story or a folder that was deleted

        // wait for about 5 seconds to make sure the story is deleted.
        // this ensures no false positives for single story deletions
        // sometimes the story / stories would still be there and sometimes they wouldn't
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const response = await fetchAllPages(() => {
          return sbClient.getStories({
            version: 'published',
            starts_with: startsWith,
            per_page: 100,
          });
        }, 100);

        const shouldDeleteChildren = response.length === 0;
        await siteSearchHandler.deleteSiteSearchRecordByFullSlug(webhookEvent.full_slug, shouldDeleteChildren);
      } else {
        // === PUBLISHED, MOVED, UNPUBLISHED === //
        for (const story of data) {
          // === RESOURCES === //
          if (story.content.component && indexablePages.includes(story.content.component)) {
            if ((story.content as PageStoryblok).exclude_from_internal_search) {
              await siteSearchHandler.deleteSiteSearchRecord(story.id.toString());
              tasksCompleted.push(
                `Deleted ${
                  story.full_slug
                } - ${story.id.toString()} from Algolia indexes if it existed because it was excluded from internal search
                .\n`,
              );
            } else {
              switch (webhookEvent.action) {
                case 'published':
                case 'moved':
                  await siteSearchHandler.saveSiteSearchRecord(story as SBStoryData<PageStoryblok>);
                  tasksCompleted.push(
                    `Saved ${story.full_slug} - ${story.id.toString()} to Algolia index: ${
                      siteSearchHandler.indexName
                    }\n`,
                  );
                  break;
                case 'unpublished':
                  await siteSearchHandler.deleteSiteSearchRecord(story.id.toString());
                  tasksCompleted.push(
                    `Deleted ${story.full_slug} - ${story.id.toString()} from Algolia index: ${
                      siteSearchHandler.indexName
                    }\n`,
                  );
                  break;
              }
            }
          }
        }
      }

      if (tasksCompleted.length > 0) {
        console.log(chalk.bold.green(`Tasks Completed for ${guid}:\n`) + chalk.green(tasksCompleted.join('')));
      }
    }
  } catch (err) {
    const parsedError = StoryblokErrorSchema.safeParse(err);

    if (parsedError.success) {
      console.error(chalk.red(JSON.stringify(parsedError.data, null, 2)));
    }

    if (err instanceof Error) {
      console.error(chalk.red(err.message));
    }

    console.log(chalk.red(err));
  }
}

async function getStoryblokData({ storyId, fullSlug }: GetStoryParams): Promise<SBStoryData[]> {
  try {
    const sbClient = getStoryblokClient();
    const handleFetchError = async (error: unknown, fullSlug: string, version: 'draft' | 'published') => {
      const parsedError = StoryblokErrorSchema.safeParse(error);
      if (!parsedError.success) throw error;

      if (parsedError.data.status === 404) {
        const stories = await fetchAllPages(
          (page: number) =>
            sbClient.getStories({
              version,
              starts_with: fullSlug,
              per_page: 100,
              page,
            }),
          100,
        );

        if (Array.isArray(stories) && stories.length > 0) {
          return stories;
        } else {
          throw error;
        }
      }
    };

    console.log('Looking for published story...');
    const response = await handleStoryblokRequest(
      async () =>
        // === Check if the story is published === //
        await sbClient.getStory(storyId.toString(), {
          version: 'published',
        }),
      {
        notFoundCallback: async () => {
          try {
            // === Check if the story is a draft === //
            console.log('Looking for draft story...');
            return await sbClient.getStory(storyId.toString(), { version: 'draft' });
          } catch (error) {
            // === Check if it was a folder === //
            try {
              console.log('Looking for published folder stories...');
              // === Check if the folder stories are published === //
              return await handleFetchError(error, fullSlug, 'published');
            } catch (error) {
              // === Check if the folder stories are drafts === //
              try {
                console.log('Looking for draft folder stories...');
                return await handleFetchError(error, fullSlug, 'draft');
              } catch (error) {
                return [];
              }
            }
          }
        },
      },
    );

    if (Array.isArray(response)) {
      return response;
    } else if (response && response.data.story) {
      return [response.data.story];
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

function verifySignature(webhookEvent: z.infer<typeof EventSchema>, signature: string | null): void | never {
  if (!signature)
    throw new Error('No Storyblok signature. Please make sure you are getting the signature from the header.');

  const webhookSecret = process.env.STORYBLOK_WEBHOOK_SECRET;
  if (!webhookSecret)
    throw new Error('No Storyblok webhook secret. Please set STORYBLOK_WEBHOOK_SECRET in your .env file.');

  const webHookEventParsed = JSON.stringify(webhookEvent).replace(/[&<>]/g, (char) => {
    return `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`;
  });
  const webhookEventHmac = createHmac('sha1', webhookSecret).update(webHookEventParsed).digest('hex');

  if (webhookEventHmac !== signature) {
    throw new Error(
      'Invalid Storyblok signature. The webhook event signature we generated does not match the expected signature from Storyblok.',
    );
  }

  console.log(chalk.green('Storyblok signature verified!'));
}

function handleRevalidation(storyData: SBStoryData[]): string[] {
  const tasks: string[] = [];

  for (const story of storyData) {
    const alternateUrls = Array.isArray(story.content.alternate_urls) ? story.content.alternate_urls : [];
    const slugs = [...alternateUrls, story.full_slug];
    const contentType = story.content.component;
    const uuid = story.uuid;

    // === Slug === //
    slugs.forEach((slug) => {
      const noleadingSlashSlug = !slug.startsWith('/') ? slug : (slug as string).substring(1);
      const normalPath = `slug:${noleadingSlashSlug}`;
      const noTrailingSlashPath = `slug:${noleadingSlashSlug}`.replace(/\/$/, '');
      revalidateTag(normalPath);

      if (normalPath === noTrailingSlashPath) {
        tasks.push(`Revalidated Requests w/ Slug: ${normalPath}\n`);
      } else {
        revalidateTag(noTrailingSlashPath);
        tasks.push(`Revalidated Requests w/ Slug: ${noTrailingSlashPath.replace(/\/$/, '')}\n`);
      }
    });

    // === Content Type === //
    if (contentType && contentType !== 'page' && contentType !== 'listing_page') {
      revalidateTag(`content_type:${contentType}`);
      tasks.push(`Revalidated Requests w/ Content Type: ${contentType}\n`);
    }

    // === UUID === //
    revalidateTag(`uuid:${uuid}`);
    tasks.push(`Revalidated Requests w/ UUID: ${uuid}\n`);

    // === Custom Tags === //
    if (contentType === 'article') {
      revalidateTag(`custom:article-${(story.content as ArticleStoryblok).type}`);
      tasks.push(`Revalidated Requests w/ Articles of Type: ${(story.content as ArticleStoryblok).type}\n`);
    }

    // === Revalidate Full Route Cache === //
    slugs.forEach((slug) => {
      const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`;
      revalidatePath(normalizedSlug);
      tasks.push(`Revalidated Path: ${normalizedSlug}\n`);
    });
  }

  return tasks;
}
