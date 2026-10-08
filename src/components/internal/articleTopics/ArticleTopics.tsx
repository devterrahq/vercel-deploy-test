'use client';

import Link from 'next/link';
import type { ArticleTopicStoryblok } from '@/component-types';
import type { StoryblokStory } from '@npm-refactored/storyblok-generate-ts';
import './ArticleTopics.scss';

interface ArticleTopicsProps {
  topics: Array<StoryblokStory<ArticleTopicStoryblok>>;
  listingSlug: string;
}
export default function ArticleTopics({ topics, listingSlug }: ArticleTopicsProps) {
  if (topics && topics.length > 0) {
    return (
      <div className='component-article-topics'>
        <h3>Topics</h3>
        <ul>
          {topics.map((topic) => {
            const href = '/' + listingSlug + '?topic=' + encodeURIComponent(topic.name);
            return (
              <li key={topic.uuid} className='component-article-topics--item'>
                <Link href={href}>{topic.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
