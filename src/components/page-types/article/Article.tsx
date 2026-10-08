'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import ArticleShareIcons from '@/components/internal/articleShareIcons/ArticleShareIcons';
import ArticleTopics from '@/components/internal/articleTopics/ArticleTopics';
import RecentArticlesListing from '@/components/internal/recentArticlesListing/RecentArticlesListing';
import WidgetArticleTopicListingClient from '@/components/widgets/article-topic-listing/WidgetArticleTopicListing';
import { getArticleDateString } from '@/helpers/date-helpers';
import { IWIText } from '@/helpers/richtext';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import type { ArticleData } from './article-data';
import type { ArticleStoryblok, ArticleTopicStoryblok, PersonStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import type { StoryblokStory } from '@npm-refactored/storyblok-generate-ts';
import type { SbBlokData } from '@storyblok/react/rsc';
import './Article.scss';

export function Byline(authors: Array<StoryblokStory<PersonStoryblok>>) {
  let nameText = 'Posted by ';

  authors.forEach((author, idx) => {
    let name = author.name;
    if (author.content.title) {
      name += `, ${author.content.title}`;
    }

    if (idx === 0) {
      nameText += name;
    } else if (idx === authors.length - 1) {
      nameText += authors.length > 2 ? `, and ${name}` : ` and ${name}`;
    } else {
      nameText += `, ${name}`;
    }
  });

  return <IWIText as='p' text={nameText} />;
}

interface ArticleClientProps {
  blok: WithResolvedData<'article', ArticleStoryblok, ArticleData>;
}
export default function ArticleClient({ blok }: ArticleClientProps) {
  const {
    authors,
    headline,
    date,
    topics,
    type,
    article_body: articleBody,
    below_article_content: belowArticleContent,
  } = blok;
  const authorData = authors as Array<StoryblokStory<PersonStoryblok>>;
  const topicData = topics as Array<StoryblokStory<ArticleTopicStoryblok>>;
  const render = useRichTextResolver();
  const hasAuthors = authorData && authorData.length > 0;

  let pageUrl: URL | undefined;
  let listingSlug = '';

  if (typeof window !== 'undefined') {
    pageUrl = new URL(window.location.href);
  }

  if (blok.resolver_data?.topicUrl) {
    listingSlug = blok.resolver_data.topicUrl;
  }

  return (
    <>
      <div className='container article'>
        <div className='row'>
          <div className='col-12 col-lg-8 article--content-wrapper'>
            {headline ? <IWIText as='h1' className='article--headline' text={headline} /> : null}
            <div className='article--credits'>
              {hasAuthors ? Byline(authorData) : null}
              {date ? <p>{getArticleDateString(date)}</p> : null}
            </div>
            <div className='article--details'>
              <div className='article--author-images'>
                {authorData &&
                  authorData.map((author) => (
                    <Image key={author.content._uid} src={author.content.image} width={97} height={97} />
                  ))}
              </div>
              <div className='article--share-links'>
                <ArticleShareIcons articleHeadline={headline || ''} pageUrl={pageUrl} />
              </div>
            </div>
            {isRichtextDefined(articleBody) ? render(articleBody) : null}
            <ArticleTopics topics={topicData} listingSlug={listingSlug} />
          </div>
          <div className='col-12 col-lg-4'>
            <RecentArticlesListing articleType={type} />
            {type === 'blog' ? (
              <>
                <hr />
                <WidgetArticleTopicListingClient
                  blok={{
                    _uid: 'article-topic-listing',
                    component: 'widget_article_topic_listing',
                    heading: 'Posts by Topic',
                    resolver_data: {
                      ...blok.resolver_data,
                    },
                  }}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className='below-article-content'>
        {belowArticleContent?.map((nestedBlok: SbBlokData) => {
          if (!nestedBlok._uid) {
            return null;
          }
          return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />;
        })}
      </div>
    </>
  );
}
