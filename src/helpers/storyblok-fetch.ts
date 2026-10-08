import { fetchAllPages, getStoryblokClient, handleStoryblokRequest } from './storyblok-client';
import type { ISbStoriesParams, ISbStoryData, ISbStoryParams } from 'storyblok-js-client';

type PaginatedResponse = {
  pageCount: number;
  stories: Array<ISbStoryData>;
};

type TagOptions = {
  /** Exclude by_slugs from being tagged */
  excludeBySlugs?: boolean;
  /** Exclude by_uuids from being tagged */
  excludeByUuids?: boolean;
  /** Exclude by_uuids_ordered from being tagged */
  excludeByUuidsOrdered?: boolean;
  /** Exclude content_type from being tagged */
  excludeContentType?: boolean;
  /** Exclude slug from being tagged */
  excludeBySlug?: boolean;
  /** Custom tags to be added */
  customTags?: string[];
};

type FetchMultipleStoriesParams = {
  params?: ISbStoriesParams;
  isDraftModeEnabled?: boolean;
  tagOptions?: TagOptions;
};

type FetchPaginatedStoriesFromStoryblokParams = {
  perPage?: number;
  page?: number;
  params?: ISbStoriesParams;
  isDraftModeEnabled?: boolean;
  tagOptions?: TagOptions;
};

type FetchStoryFromStoryblokParams = {
  slug: string;
  params?: ISbStoryParams;
  isDraftModeEnabled?: boolean;
  tagOptions?: TagOptions;
};

type GenerateTagsFromStoryblokParamsArgs = {
  slug?: string;
  params?: ISbStoryParams | ISbStoriesParams;
  tagOptions?: TagOptions;
};

const STORIES_PER_REQUEST = 25;
const PUBLISHED_REVALIDATE_SECONDS = 900;
export const RESOLVE_RELATIONS = [
  'time_block.sessions',
  'widget_profile_card.person',
  'widget_testimonial_slider.quoter',
  'conference_schedule_item.track_name',
  'article.authors',
  'article.topics',
].join(',');

export async function FetchAllStoriesFromStoryblok({
  params = {},
  isDraftModeEnabled = false,
  tagOptions = {},
}: FetchMultipleStoriesParams): Promise<ISbStoryData[]> {
  // console.log('FetchAllStoriesFromStoryblok tags: ', generateTagsFromStoryblokParams({ params, tagOptions }));

  const sbClient = getStoryblokClient({
    isDraftModeEnabled,
    ...(isDraftModeEnabled && {
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    nextOptions: {
      tags: generateTagsFromStoryblokParams({ params, tagOptions }),
      revalidate: PUBLISHED_REVALIDATE_SECONDS,
    },
  });
  const stories: Array<ISbStoryData> = [];
  const requestVersionValue = isDraftModeEnabled ? 'draft' : process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'published';

  try {
    const fetchData = async (pageNum: number) => {
      const assembledParams = {
        version: requestVersionValue,
        resolve_relations: RESOLVE_RELATIONS,
        resolve_links: 'url',
        ...params,
        page: pageNum,
        per_page: STORIES_PER_REQUEST,
      } satisfies ISbStoriesParams;

      return await sbClient.get('cdn/stories', assembledParams);
    };

    stories.push(...(await fetchAllPages((page: number) => fetchData(page), STORIES_PER_REQUEST)));
  } catch (err) {
    console.error('[storyblok-fetch.js] FetchAllStoriesFromStoryblok - Unable to fetch stories from Storyblok.');
    console.error('Fetch error', err);

    const errorParams = {
      version: requestVersionValue,
      resolve_relations: RESOLVE_RELATIONS,
      resolve_links: 'url',
      ...params,
      per_page: STORIES_PER_REQUEST,
    };
    console.error('Request Params', errorParams);

    throw 'Unable to fetch story data from Storyblok.';
  }
  return stories;
}

export async function FetchStoriesFromStoryblok({
  params = {},
  isDraftModeEnabled = false,
  tagOptions = {},
}: FetchMultipleStoriesParams): Promise<PaginatedResponse> {
  // console.log('FetchStoriesFromStoryblok tags: ', generateTagsFromStoryblokParams({ params, tagOptions }));

  const sbClient = getStoryblokClient({
    isDraftModeEnabled,
    ...(isDraftModeEnabled && {
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    nextOptions: {
      tags: generateTagsFromStoryblokParams({ params, tagOptions }),
      revalidate: PUBLISHED_REVALIDATE_SECONDS,
    },
  });

  const assembledParams = {
    version: isDraftModeEnabled ? 'draft' : process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'published',
    resolve_relations: RESOLVE_RELATIONS,
    page: 1,
    per_page: STORIES_PER_REQUEST,
    resolve_links: 'url',
    ...params,
  } satisfies ISbStoriesParams;

  const response = await handleStoryblokRequest(async () => {
    return await sbClient.get('cdn/stories', assembledParams);
  });

  return {
    stories: response.data.stories,
    pageCount: Math.ceil(response.total / assembledParams.per_page),
  };
}

export async function FetchPaginatedStoriesFromStoryblok({
  perPage = STORIES_PER_REQUEST,
  page = 1,
  params = {},
  isDraftModeEnabled = false,
  tagOptions = {},
}: FetchPaginatedStoriesFromStoryblokParams): Promise<PaginatedResponse> {
  // console.log('FetchPaginatedStoriesFromStoryblok tags: ', generateTagsFromStoryblokParams({ params, tagOptions }));

  const sbClient = getStoryblokClient({
    isDraftModeEnabled,
    ...(isDraftModeEnabled && {
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    nextOptions: {
      tags: generateTagsFromStoryblokParams({ params, tagOptions }),
      revalidate: PUBLISHED_REVALIDATE_SECONDS,
    },
  });

  const requestVersionValue = isDraftModeEnabled ? 'draft' : process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'published';

  const assembledParams = {
    version: requestVersionValue,
    resolve_relations: RESOLVE_RELATIONS,
    resolve_links: 'url',
    ...params,
    page,
    per_page: perPage,
  } satisfies ISbStoriesParams;

  const response = await handleStoryblokRequest(async () => {
    return await sbClient.get('cdn/stories', assembledParams);
  });

  return {
    pageCount: Math.ceil(response.total / perPage),
    stories: response.data.stories,
  };
}

export async function FetchStoryFromStoryblok({
  slug,
  params = {},
  isDraftModeEnabled = false,
  tagOptions = {},
}: FetchStoryFromStoryblokParams): Promise<ISbStoryData | undefined> {
  // console.log('FetchStoryFromStoryblok tags: ', generateTagsFromStoryblokParams({ slug, params, tagOptions }));

  const sbClient = getStoryblokClient({
    isDraftModeEnabled,
    ...(isDraftModeEnabled && {
      fetchOptions: {
        cache: 'no-store',
      },
    }),
    nextOptions: {
      tags: generateTagsFromStoryblokParams({ slug, params, tagOptions }),
      revalidate: PUBLISHED_REVALIDATE_SECONDS,
    },
  });

  try {
    const assembledParams = {
      version: isDraftModeEnabled ? 'draft' : process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'published',
      resolve_relations: RESOLVE_RELATIONS,
      resolve_links: 'url',
      ...params,
    } satisfies ISbStoryParams;

    const result = await handleStoryblokRequest(async () => {
      return await sbClient.getStory(slug, assembledParams);
    });
    if (result && result.data && result.data.story) {
      return result.data.story;
    }
  } catch (err) {
    console.error('[storyblok-fetch.js] FetchStoryFromStoryblok - Unable to fetch slug (or uuid):', slug);
    console.error('Fetch error', err);
    console.error('Request Params', {
      resolve_relations: RESOLVE_RELATIONS,
      ...params,
    });
  }

  return undefined;
}

export function generateTagsFromStoryblokParams({
  slug,
  params,
  tagOptions,
}: GenerateTagsFromStoryblokParamsArgs): string[] {
  const tags =
    slug && (!params || 'find_by' in params === false || params.find_by !== 'uuid') && !tagOptions?.excludeBySlug
      ? [`slug:${slug}`]
      : [];

  if (!params) return tags;

  if ('find_by' in params && params.find_by === 'uuid') {
    tags.push(`uuid:${slug}`);
  }

  if ('content_type' in params && params.content_type && !tagOptions?.excludeContentType) {
    tags.push(`content_type:${params.content_type}`);
  }

  if ('by_slugs' in params && params?.by_slugs && !tagOptions?.excludeBySlugs) {
    tags.push(...params.by_slugs.split(',').map((slug) => `slug:${slug}`));
  }

  if ('by_uuids' in params && params.by_uuids && !tagOptions?.excludeByUuids) {
    tags.push(...params.by_uuids.split(',').map((uuid) => `uuid:${uuid}`));
  }

  if ('by_uuids_ordered' in params && params.by_uuids_ordered && !tagOptions?.excludeByUuidsOrdered) {
    tags.push(...params.by_uuids_ordered.split(',').map((uuid) => `uuid:${uuid}`));
  }

  if (tagOptions?.customTags) {
    tags.push(...tagOptions.customTags);
  }

  // removes duplicates
  return [...new Set(tags)];
}
