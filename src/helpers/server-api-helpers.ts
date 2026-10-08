import 'server-only';
import { getConferenceHomePath, normalizeSlug } from '@/helpers/slug-helpers';
import { FetchAllStoriesFromStoryblok, FetchStoryFromStoryblok } from '@/helpers/storyblok-fetch';
import { permanentRedirect, RedirectType } from 'next/navigation';
import { resolveStoryData } from './data-resolver';
import { isArticlePublished } from './date-helpers';
import type {
  ArticleStoryblok,
  ConferenceFooterStoryblok,
  ConferenceHeaderStoryblok,
  FooterStoryblok,
  HeaderStoryblok,
} from '@/component-types';
import type { NextError, SBStoryData, SearchParams } from '@/types';
import type { BreadcrumbItem } from '@npm-refactored/pr-breadcrumbs';
import type { ISbStoryData } from 'storyblok-js-client';

const NOT_REAL_PAGES = [
  'internal_documentation_page',
  'not_found_page',
  'article_topic',
  'conference_footer',
  'conference_header',
  'Footer',
  'Header',
  'partner',
  'conference_schedule_item',
  'conference_track',
  'person',
];

/**
 * Returns a Storyblok story by slug.
 * @param slug The slug of the story to fetch
 */
export async function getStory(slug: string, isDraftMode = false, searchParams?: SearchParams) {
  console.log('[getStory] Fetching story: ', slug);

  const apiVersion = isDraftMode ? 'draft' : process.env.NEXT_PUBLIC_STORYBLOK_VERSION;

  console.log('[getStory] Draft mode status: ', isDraftMode);
  let redirectUrl: string | undefined;

  try {
    const result = await FetchStoryFromStoryblok({
      slug,
      params: {
        version: apiVersion,
      },
      isDraftModeEnabled: isDraftMode,
    });

    if (apiVersion === 'published' && result?.content.component === 'article') {
      // check published_at
      if (!isArticlePublished(result.content as ArticleStoryblok)) {
        return null;
      }
    }

    if (result) {
      if (isDraftMode || NOT_REAL_PAGES.includes(result.content.component as string) === false) {
        return await resolveStoryData(result, undefined, {
          isDraftMode: isDraftMode,
          searchParams,
          slug,
        });
      }
    } else {
      // Try to find an alias if result is undefined
      try {
        console.log('[getStory] Story not found. No Error. Checking for alias...');
        const aliasResults = await FetchAllStoriesFromStoryblok({
          params: {
            version: apiVersion,
            filter_query: {
              alternate_urls: {
                any_in_array: `/${slug}`,
              },
            },
          },
          isDraftModeEnabled: isDraftMode,
        });
        if (aliasResults.length > 0 && aliasResults[0]) {
          const aliasStory = aliasResults[0];
          if (aliasStory) {
            if (apiVersion === 'published' && aliasStory?.content.component === 'article') {
              // check published_at
              if (!isArticlePublished(aliasStory.content as ArticleStoryblok)) {
                return null;
              }
            }
            console.log('[getStory] Alias found. Redirecting to:', aliasResults[0].full_slug);
            redirectUrl = aliasStory.full_slug;
          }
        }
      } catch (err) {
        if (err && typeof err === 'object' && 'digest' in err) {
          const err2 = err as NextError;
          if (err2.digest?.startsWith('NEXT_REDIRECT')) {
            throw err2;
          }
        } else {
          console.error('[getStory] Failed to fetch alias story');
          console.error(err);
        }
      }
    }
  } catch (err) {
    console.error('[getStory] Failed to fetch story: ', slug);
    console.error(err);
    throw err;
  }
  if (redirectUrl) {
    permanentRedirect(normalizeSlug(redirectUrl), RedirectType.replace);
  }
}

/** Returns the footer story from Storyblok. */
export async function getFooterStory(
  slug: string,
  isDraftModeEnabled: boolean,
): Promise<FooterStoryblok | ConferenceFooterStoryblok | undefined> {
  try {
    const confHomePath = await getConferenceHomePath(slug);
    const slugs = [];

    slugs.push('globals/site-footer');
    if (confHomePath) {
      slugs.push(confHomePath + '*');
    }

    const response = await FetchAllStoriesFromStoryblok({
      params: {
        by_slugs: slugs.join(','),
        filter_query: {
          component: {
            in: 'Footer,conference_footer',
          },
        },
      },
      isDraftModeEnabled,
    });

    if (response && response.length > 0 && response[0]) {
      const responseFooter = response.filter((item) => item?.content?.component === 'conference_footer');
      if (responseFooter && responseFooter.length > 0 && responseFooter[0]) {
        return responseFooter[0].content as ConferenceFooterStoryblok;
      }
      return response[0].content as FooterStoryblok;
    }

    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/** Returns the header story from Storyblok. */
export async function getHeaderStory(
  slug: string,
  isDraftModeEnabled: boolean,
): Promise<HeaderStoryblok | ConferenceHeaderStoryblok | undefined> {
  try {
    const confHomePath = await getConferenceHomePath(slug ?? '');
    const slugs = [];

    slugs.push('globals/site-header');
    if (confHomePath) {
      slugs.push(confHomePath + '*');
    }

    const response = await FetchAllStoriesFromStoryblok({
      params: {
        by_slugs: slugs.join(','),
        filter_query: {
          component: {
            in: 'Header,conference_header',
          },
        },
      },
      isDraftModeEnabled,
    });

    if (response && response.length > 0 && response[0]) {
      const responseHeader = response.filter((item) => item?.content?.component === 'conference_header');
      if (responseHeader && responseHeader.length > 0 && responseHeader[0]) {
        return responseHeader[0].content as ConferenceHeaderStoryblok;
      }
      return response[0].content as HeaderStoryblok;
    }

    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/**
 * Retrieves breadcrumb data for a given page path.
 *
 * @param {string} pagePath - The page path for which to retrieve breadcrumb data.
 */
export async function getBreadcrumbData(pagePath: string, isDraftModeEnabled: boolean): Promise<Array<BreadcrumbItem>> {
  try {
    if (!pagePath) return [];

    let currentPath = '';
    const pathSegments = pagePath.replace(/^\/+|\/+$/g, '').split('/');
    const normalizedPaths = [];

    // Build normalized paths
    for (let i = 0; i < pathSegments.length; i++) {
      if (i === 0) {
        currentPath += pathSegments[i];
      } else {
        currentPath += '/' + pathSegments[i];
      }

      normalizedPaths.push(normalizeSlug(currentPath, false, i < pathSegments.length - 1));
    }

    // We need to add a version of the last path with a trailing slash in case the last path segment is a folder
    normalizedPaths.push(normalizedPaths[normalizedPaths.length - 1] + '/');

    // Retrieve stories from the API
    const apiResults = await FetchAllStoriesFromStoryblok({
      params: {
        by_slugs: normalizedPaths.join(','),
      },
      isDraftModeEnabled,
    });
    const breadcrumbItems: Array<BreadcrumbItem> = [];
    const storiesMap = Object.fromEntries(apiResults.map((story) => [story.full_slug, story]));

    normalizedPaths.forEach((path) => {
      const matchedStory = storiesMap[path];

      if (matchedStory) {
        const baseURL = process.env.BASE_URL;
        const link = `${baseURL}/${matchedStory.full_slug}`;

        breadcrumbItems.push({
          key: matchedStory.uuid,
          label: matchedStory.content.breadcrumb_label || matchedStory.name,
          link: matchedStory.full_slug,
          json_link: link,
        });
      }
    });

    return breadcrumbItems;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/** Returns all sitemap stories from Storyblok. */
export async function getAllSitemapStories() {
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      filter_query: {
        component: {
          not_in: NOT_REAL_PAGES.join(','),
        },
        __or: [
          {
            exclude_from_sitemap: {
              in: false,
            },
          },
          {
            exclude_from_sitemap: {
              is: 'empty',
            },
          },
        ],
      },
      excluding_slugs: 'globals/*',
    },
  });

  return stories.filter(filterUnpublishedArticles);
}

/** Returns all site search stories from Storyblok. */
export async function getAllSiteSearchStories() {
  const notToSearch = NOT_REAL_PAGES.concat('search_page');
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      filter_query: {
        component: {
          not_in: notToSearch.join(','),
        },
        exclude_from_internal_search: {
          in: false,
        },
      },
      excluding_slugs: 'globals/*',
      version: 'published',
    },
  });
  return stories.filter(filterUnpublishedArticles);
}

/** Returns array of all stories which should NOT be in algolia */
export async function getAllSiteSearchStoriesToRemove(ids: string) {
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      excluding_ids: ids,
      version: 'draft',
    },
  });
  return stories;
}

/** Returns a site search story by story id. */
export async function GetSiteSearchStoryById(storyId: string): Promise<ISbStoryData | undefined> {
  if (storyId) {
    const story = await FetchStoryFromStoryblok({ slug: storyId, params: { version: 'published' } });
    if (story) {
      return story;
    }
  }
  return undefined;
}

/**
 * Checks if a redirect is necessary. If so, it redirects the user.
 * @param isDraftMode Whether the site is in draft mode. If true, no redirect will be performed.
 * @param data The story data to check for a redirect
 */
export function checkRedirect(isDraftMode: boolean, data: ISbStoryData | undefined): void | never {
  if (isDraftMode) {
    return;
  }

  if (!data) {
    return;
  }

  if (
    typeof data.content.redirect_url === 'string' &&
    data.content.redirect_url !== '' // Make sure the redirect URL is not empty
  ) {
    const redirectUrl = data.content.redirect_url;

    if (redirectUrl.startsWith('http')) {
      console.log('[checkRedirect] Redirecting to:', data.content.redirect_url);
      permanentRedirect(redirectUrl, RedirectType.replace);
    } else {
      console.log('[checkRedirect] Redirecting to:', normalizeSlug(redirectUrl));
      permanentRedirect(normalizeSlug(redirectUrl), RedirectType.replace);
    }
  }
}

/** Returns the not found page story from Storyblok. */
export async function getNotFoundPage(isDraftMode: boolean): Promise<ISbStoryData | null> {
  console.log('[getNotFoundPage] Fetching story:', 'not-found-page');

  try {
    const stories = await FetchAllStoriesFromStoryblok({
      params: {
        version: isDraftMode ? 'draft' : process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
        content_type: 'not_found_page',
      },
      isDraftModeEnabled: isDraftMode,
    });

    if (stories.length > 0 && stories[0]) {
      return stories[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

// === Helpers === //
function filterUnpublishedArticles(s: SBStoryData) {
  if (s.content.component === 'article') {
    return isArticlePublished(s.content as ArticleStoryblok);
  }

  return true;
}
