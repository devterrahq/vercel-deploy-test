import { currentDayjsDate, getDayRangeYrMo } from './date-helpers';
import {
  FetchAllStoriesFromStoryblok,
  FetchPaginatedStoriesFromStoryblok,
  FetchStoriesFromStoryblok,
  FetchStoryFromStoryblok,
} from './storyblok-fetch';
import type {
  ArticleStoryblok,
  ArticleTopicStoryblok,
  ConferenceTrackStoryblok,
  HeaderStoryblok,
  ListingPageStoryblok,
  ListingPageV2Storyblok,
  PartnerStoryblok,
  PersonStoryblok,
  TestimonialStoryblok,
} from '@/component-types';
import type { ExtendedStory, Filter, SBStoryData } from '@/types';
import type { ISbStoryData } from '@storyblok/react/rsc';

const FORMAT_SB_DATE_FILTER = 'YYYY-MM-DD H:mm';

export async function getStoryByUuid(storyUuid: string): Promise<ISbStoryData | undefined> {
  try {
    if (storyUuid) {
      const story = await FetchStoryFromStoryblok({
        slug: storyUuid,
        params: {
          find_by: 'uuid',
        },
      });

      if (story) {
        return story;
      }
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}

export async function getPartnersByUuids(
  partnerUuids: string,
  isDraftModeEnabled: boolean = false,
): Promise<SBStoryData<PartnerStoryblok>[] | undefined> {
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'partner',
      by_uuids: partnerUuids,
    },
    isDraftModeEnabled,
    tagOptions: {
      excludeContentType: true,
    },
  });

  return stories as SBStoryData<PartnerStoryblok>[];
}

export async function getTestimonialByStoryUUID(
  testimonialUuid: string,
  isDraftModeEnabled: boolean,
): Promise<TestimonialStoryblok | undefined> {
  if (!testimonialUuid) {
    return undefined;
  }

  const res = await FetchStoryFromStoryblok({
    slug: testimonialUuid,
    params: {
      find_by: 'uuid',
    },
    isDraftModeEnabled,
  });

  if (res?.content && res.content.component === 'testimonial') {
    return res?.content as TestimonialStoryblok;
  }

  return undefined;
}

export async function getTestimonialsByStoryUUID(
  testimonialsUuidsArray: Array<string>,
  isDraftModeEnabled: boolean,
): Promise<TestimonialStoryblok[] | undefined> {
  if (!testimonialsUuidsArray || testimonialsUuidsArray.length === 0) {
    return undefined;
  }

  const testimonials = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'testimonial',
      by_uuids_ordered: testimonialsUuidsArray.join(','),
    },
    isDraftModeEnabled,
    tagOptions: {
      excludeContentType: true,
    },
  });

  const testimonialStories = [];

  for (const testimonial of testimonials) {
    if (testimonial && testimonial.content.component === 'testimonial') {
      testimonialStories.push(testimonial.content as TestimonialStoryblok);
    }
  }

  return testimonialStories;
}

export async function GetAllTrackDataInFolder(pathToFolder: string, isDraftModeEnabled = false) {
  const stories = (await FetchAllStoriesFromStoryblok({
    params: {
      by_slugs: pathToFolder,
      content_type: 'conference_track',
    },
    isDraftModeEnabled,
  })) as Array<ISbStoryData<ConferenceTrackStoryblok>>;
  return stories;
}

export async function getPersonData(personUuid: string) {
  const res = await FetchStoryFromStoryblok({
    slug: personUuid,
    params: {
      find_by: 'uuid',
    },
  });

  if (res && res.content && res.content.component === 'person') {
    return res.content as PersonStoryblok;
  }

  return undefined;
}

export async function getArticlesByType(
  articleType: string,
  yearFilter?: number | undefined,
  monthFilter?: number | undefined,
  isDraftModeEnabled: boolean = false,
) {
  const nowTime = currentDayjsDate();
  const filter: Filter<ArticleStoryblok> = {
    type: {
      in: articleType,
    },
    __or: [
      {
        publish_at: {
          is: 'empty',
        },
      },
      {
        publish_at: {
          lt_date: nowTime.utc().format(FORMAT_SB_DATE_FILTER),
        },
      },
    ],
  };

  // if (yearFilter) {
  //   const range = getDayRangeYrMo(yearFilter, monthFilter);

  //   filter.date = {
  //     gt_date: range.start.utc().format(FORMAT_SB_DATE_FILTER),
  //     lt_date: range.end.utc().format(FORMAT_SB_DATE_FILTER),
  //   };
  // }

  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'article',
      sort_by: 'content.date:desc',
      filter_query: filter,
    },
    isDraftModeEnabled,
    tagOptions: {
      excludeContentType: true,
      customTags: [`custom:article-${articleType}`],
    },
  });

  if (stories.length > 0) {
    return StoriesToType<ArticleStoryblok>(stories);
  }
}

export async function getPaginatedArticlesByType(
  articleType: string,
  perPage: number,
  page: number,
  isDraftModeEnabled: boolean,
  yearFilter?: number | undefined,
  monthFilter?: number | undefined,
  topicFilter?: string | undefined,
  fullSlug?: string | undefined,
) {
  const nowTime = currentDayjsDate();
  const range = yearFilter ? getDayRangeYrMo(yearFilter, monthFilter) : null;
  const filter: Filter<ArticleStoryblok> = {
    type: {
      in: articleType,
    },
    ...(yearFilter && {
      date: {
        gt_date: range?.start.utc().format(FORMAT_SB_DATE_FILTER),
        lt_date: range?.end.utc().format(FORMAT_SB_DATE_FILTER),
      },
    }),
    ...(topicFilter && {
      topics: {
        any_in_array: topicFilter,
      },
    }),
    __or: [
      {
        publish_at: {
          is: 'empty',
        },
      },
      {
        publish_at: {
          lt_date: nowTime.utc().format(FORMAT_SB_DATE_FILTER),
        },
      },
    ],
  };

  const response = await FetchPaginatedStoriesFromStoryblok({
    perPage,
    page,
    params: {
      content_type: 'article',
      sort_by: 'content.date:desc',
      filter_query: filter,
      ...(fullSlug && { starts_with: fullSlug }),
    },
    isDraftModeEnabled,
  });

  if (response.stories.length > 0) {
    return {
      stories: StoriesToType<ArticleStoryblok>(response.stories),
      pageCount: response.pageCount,
    };
  }
}

export async function getArticleTopicsByUuids(uuids: Array<string>) {
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'article_topic',
      by_uuids: uuids.join(','),
    },
  });

  if (stories.length > 0) {
    return StoriesToType<ArticleTopicStoryblok>(stories);
  }

  return undefined;
}

export async function getAllArticleTopics(isDraftModeEnabled: boolean = false) {
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'article_topic',
    },
    isDraftModeEnabled,
  });

  if (stories.length > 0) {
    return StoriesToType<ArticleTopicStoryblok>(stories);
  }

  return undefined;
}

export async function getNearestV2ListingPage(slug: string, isDraftModeEnabled: boolean = false) {
  const paths = SlugToParentPaths(slug);
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'listing_page_v2',
      by_slugs: paths.join(','),
    },
    isDraftModeEnabled,
  });
  if (stories.length > 0) {
    return StoryToType<ListingPageV2Storyblok>(stories[0]);
  }
  return undefined;
}

export async function getArticleTopicByDisplayName(name: string, isDraftModeEnabled: boolean) {
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'article_topic',
      filter_query: {
        display_name: {
          in: name,
        },
      },
    },
    isDraftModeEnabled,
  });
  if (stories.length > 0) {
    return StoryToType<ArticleTopicStoryblok>(stories[0]);
  }
  return undefined;
}

export async function getListingPageOfArticleType(articleType: string) {
  const stories = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'listing_page',
      filter_query: {
        article_type: {
          in: articleType,
        },
      },
    },
    tagOptions: {
      excludeContentType: true,
      customTags: [`custom:article-${articleType}`],
    },
  });

  if (stories.length > 0) {
    return StoryToType<ListingPageStoryblok>(stories[0]);
  }
  return undefined;
}

export async function getRecentArticlesOfType(articleType: string, limit: number = 5) {
  const nowTime = currentDayjsDate();
  const response = await FetchStoriesFromStoryblok({
    params: {
      content_type: 'article',
      per_page: limit,
      page: 1,
      sort_by: 'content.date:desc',
      filter_query: {
        type: {
          in: articleType,
        },
        __or: [
          { publish_at: { is: 'empty' } },
          { publish_at: { lt_date: nowTime.utc().format(FORMAT_SB_DATE_FILTER) } },
        ],
      },
    },
  });
  if (response && response.stories) {
    return StoriesToType<ArticleStoryblok>(response.stories);
  }
  return undefined;
}

export async function getConferenceSchedule(personUuid: string, slug: string) {
  const response = await FetchAllStoriesFromStoryblok({
    params: {
      content_type: 'conference_schedule_item',
      by_slugs: slug,
      filter_query: {
        presenters: {
          any_in_array: personUuid,
        },
      },
      resolve_relations: [
        'conference_track',
        'conference_schedule_item.presenters',
        'conference_schedule_item.track_name',
        'widget_profile_card.person',
      ],
    },
    tagOptions: {
      excludeContentType: true,
      customTags: ['content_type:conference_schedule_item', 'content_type:conference_track', `uuid:${personUuid}`],
    },
  });

  if (response) {
    return response as ISbStoryData[];
  }

  return [];
}

export async function getGlobalHeaderStory() {
  const response = await FetchStoriesFromStoryblok({
    params: {
      content_type: 'Header',
    },
  });

  if (response && response.stories) {
    return StoryToType<HeaderStoryblok>(response.stories[0]);
  }

  return undefined;
}

// === Helpers === //
function StoryToType<T>(data: ISbStoryData): ExtendedStory<T> {
  return {
    name: data.name,
    full_slug: data.full_slug,
    uuid: data.uuid,
    ...data.content,
  } as ExtendedStory<T>;
}

function StoriesToType<T>(data: Array<ISbStoryData>): Array<ExtendedStory<T>> | undefined {
  if (data && data.length > 0) {
    return data.map((story) => StoryToType<T>(story));
  }
}

function SlugToParentPaths(slug: string) {
  slug = TrimString(slug, '/');
  const segments = slug.split('/');
  const paths: Array<string> = [];
  let current = '';
  for (let i = 0; i < segments.length; i++) {
    current += '/' + segments[i];
    const trimmed = TrimString(current, '/');
    paths.push(trimmed); // Catches direct page slugs
    paths.push(trimmed + '/'); // Catches stories that are the root of a folder slugs
  }
  return paths;
}

function TrimString(str: string, char: string) {
  if (str.startsWith(char)) {
    str = str.substring(1);
  }
  if (str.endsWith(char)) {
    str = str.substring(0, str.length - 1);
  }
  return str;
}
