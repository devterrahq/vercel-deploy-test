import { getAllArticleTopics, getNearestV2ListingPage } from '@/helpers/api-client-helpers';
import { normalizeSearchParams } from '@/helpers/slug-helpers';
import type { ArticleStoryblok, ArticleTopicStoryblok } from '@/component-types';
import type { StoryResolverData } from '@/helpers/data-resolver';
import type { ExtendedStory } from '@/types';

export type ArticleData = {
  topics: Array<ExtendedStory<ArticleTopicStoryblok>>;
  topic: string;
  topicUrl: string;
};

export async function getArticleData({
  options: { searchParams, isDraftMode, slug },
}: StoryResolverData<ArticleStoryblok>): Promise<ArticleData> {
  const { topic = '' } = normalizeSearchParams(searchParams) || {};

  try {
    const topics = await getAllArticleTopics(isDraftMode);
    const listing = await getNearestV2ListingPage(slug || '', isDraftMode);

    return {
      topics: topics || [],
      topic,
      topicUrl: listing ? listing.full_slug : slug || '',
    };
  } catch (error) {
    return {
      topics: [],
      topic,
      topicUrl: slug || '',
    };
  }
}
