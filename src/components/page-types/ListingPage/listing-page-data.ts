import { getArticleTopicByDisplayName, getPaginatedArticlesByType } from '@/helpers/api-client-helpers';
import { normalizeSearchParams } from '@/helpers/slug-helpers';
import type { ArticleStoryblok, ListingPageStoryblok, ListingPageV2Storyblok } from '@/component-types';
import type { StoryResolverData } from '@/helpers/data-resolver';

export type ListingPageData = {
  articles: Array<ArticleStoryblok>;
  topic: string;
  pageCount: number;
};

export async function getListingPageData({
  story,
  options,
  slug,
}: StoryResolverData<ListingPageStoryblok | ListingPageV2Storyblok>): Promise<ListingPageData> {
  const RESULTS_PER_PAGE = 10;
  const { isDraftMode, searchParams } = options;
  const { page = '1', topic = '', year = '0', month = '0' } = normalizeSearchParams(searchParams) || {};
  let topicFilter = '';
  const articleType = story.article_type;

  try {
    // If topicName is available, fetch topic filter
    if (topic) {
      const data = await getArticleTopicByDisplayName(topic, isDraftMode);
      topicFilter = data?.uuid || '';
    }

    // Check if conditions are met for fetching articles
    if (articleType) {
      const articlesData = await getPaginatedArticlesByType(
        articleType,
        RESULTS_PER_PAGE,
        parseInt(page, 10),
        isDraftMode,
        parseInt(year, 10),
        parseInt(month, 10),
        topicFilter,
        story.only_from_current_folder ? slug : undefined,
      );

      if (articlesData) {
        return {
          articles: articlesData.stories || [],
          topic: topicFilter,
          pageCount: articlesData.pageCount,
        };
      }
    }

    return {
      articles: [],
      topic: topicFilter,
      pageCount: 0,
    };
  } catch (err) {
    console.error(err);
    return {
      articles: [],
      topic: topicFilter,
      pageCount: 0,
    };
  }
}
