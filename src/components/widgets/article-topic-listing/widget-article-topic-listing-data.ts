import { getAllArticleTopics } from '@/helpers/api-client-helpers';
import { normalizeSearchParams } from '@/helpers/slug-helpers';
import type { ArticleTopicStoryblok, WidgetArticleTopicListingStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';
import type { ExtendedStory } from '@/types';

export type WidgetArticleTopicListingData = {
  topics: Array<ExtendedStory<ArticleTopicStoryblok>>;
  topic: string;
  topicUrl: string;
};

export async function getWidgetArticleTopicListingData({
  storyData,
  options: { searchParams, isDraftMode },
}: ComponentResolverData<WidgetArticleTopicListingStoryblok>): Promise<WidgetArticleTopicListingData> {
  const { topic = '' } = normalizeSearchParams(searchParams) || {};

  try {
    const topics = await getAllArticleTopics(isDraftMode);
    return {
      topics: topics || [],
      topic,
      topicUrl: storyData.full_slug,
    };
  } catch (error) {
    return {
      topics: [],
      topic,
      topicUrl: storyData.full_slug || '',
    };
  }
}
