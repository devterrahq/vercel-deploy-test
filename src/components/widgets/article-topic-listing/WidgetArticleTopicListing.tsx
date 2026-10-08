'use client';

import { useEffect, useState } from 'react';
import { IWIText } from '@/helpers/richtext';
import type { WidgetArticleTopicListingData } from './widget-article-topic-listing-data';
import type { ArticleTopicStoryblok, WidgetArticleTopicListingStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import type { MouseEvent } from 'react';
import './WidgetArticleTopicListing.scss';
import Link from 'next/link';

interface WidgetArticleTopicListingClientProps {
  blok: WithResolvedData<
    'widget_article_topic_listing',
    WidgetArticleTopicListingStoryblok,
    WidgetArticleTopicListingData
  >;
}
export default function WidgetArticleTopicListingClient({ blok }: WidgetArticleTopicListingClientProps) {
  const [topicURL, setTopicURL] = useState<URL>(new URL('https://investmentsandwealth.org/'));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (blok.resolver_data?.topicUrl) {
      const pageUrl = new URL(window.location.href);
      pageUrl.pathname = blok.resolver_data?.topicUrl;
      setTopicURL(pageUrl);
    } else {
      const pageUrl = new URL(window.location.href);
      setTopicURL(pageUrl);
    }
  }, [blok.resolver_data?.topicUrl]);

  return (
    <WidgetArticleTopicListing
      heading={blok.heading}
      topics={blok.resolver_data?.topics || []}
      listingURL={topicURL}
      activeTopicName={blok.resolver_data?.topic || ''}
      topPadding={blok.padding_top}
    />
  );
}

interface WidgetArticleTopicListingProps {
  topics: Array<ArticleTopicStoryblok>;
  heading: string | undefined;
  listingURL: string | URL;
  activeTopicName?: string;
  topPadding?: string;
}
const TOPIC_AMOUNT = 5;
function WidgetArticleTopicListing({
  topics,
  heading,
  listingURL,
  activeTopicName,
  topPadding,
}: WidgetArticleTopicListingProps) {
  const [showAll, setShowAll] = useState(false);
  // Sort to show current topic first
  let topicList: Array<ArticleTopicStoryblok> = [];
  if (topics) {
    const sortedTopics = topics.sort((a, b) => {
      if (a.display_name === undefined || b.display_name === undefined) {
        if (a.name === activeTopicName) {
          return -1;
        }

        if (b.name === activeTopicName) {
          return 1;
        }

        return a.name > b.name ? 1 : -1;
      }

      if (a.display_name === activeTopicName) {
        return -1;
      }

      if (b.display_name === activeTopicName) {
        return 1;
      }

      return a.display_name > b.display_name ? 1 : -1;
    });

    if (showAll) {
      topicList = sortedTopics;
    } else {
      topicList = sortedTopics.slice(0, TOPIC_AMOUNT);
    }
  }

  function handleShowAll(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setShowAll(!showAll);
  }
  return (
    <div className={`widget-article-topic-listing ${topPadding ? 'panel-pt-' + topPadding : ''}`}>
      {heading ? <IWIText as='h3' className='widget-article-topic-listing--heading' text={heading} /> : null}
      {topicList.length > 0 ? (
        <>
          <ul className='widget-article-topic-listing--list' id='articleTopicListing'>
            {topicList.map((topic) => {
              const isActive = topic.name === activeTopicName;
              const topicUrl = new URL(listingURL);
              if (isActive) {
                topicUrl.searchParams.delete('topic');
              } else {
                topicUrl.searchParams.set('topic', topic.name);
              }
              return (
                <li
                  key={topic._uid}
                  className={`widget-article-topic-listing--item${
                    isActive ? ' widget-article-topic-listing--item-active' : ''
                  }`}
                >
                  <Link href={topicUrl.href}>{topic.display_name}</Link>
                </li>
              );
            })}
            {topics.length > TOPIC_AMOUNT ? (
              <li className='widget-article-topic-listing--item widget-article-topic-listing--more-btn'>
                <button onClick={handleShowAll} aria-expanded={showAll} aria-controls='articleTopicListing'>
                  <strong>{showAll ? 'Collapse' : 'See all'}</strong>
                </button>
              </li>
            ) : null}
            {activeTopicName ? (
              <li className='widget-article-topic-listing--item widget-article-topic-listing--more-btn'>
                <br />
                <Link href={listingURL instanceof URL ? listingURL.pathname : listingURL}>
                  <strong>Clear filter</strong>
                </Link>
              </li>
            ) : null}
          </ul>
        </>
      ) : (
        <p>No topics found</p>
      )}
    </div>
  );
}
