'use client';

import { useState } from 'react';
import ArticleCondensed from '@/components/internal/articleListing/ArticleCondensed';
import ArticleDetailed from '@/components/internal/articleListing/ArticleDetailed';
import { Pagination } from '@/components/internal/pagination/Pagination';
import { getArticleTopicByDisplayName, getPaginatedArticlesByType } from '@/helpers/api-client-helpers';
import { useSearchParams } from '@/providers/SearchParamsProvider';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import { usePathname } from 'next/navigation';
import { useUpdateEffect } from 'usehooks-ts';
import type { ArticleStoryblok, ListingPageStoryblok } from '@/component-types';
import type { StoryblokRichtext } from '@npm-refactored/storyblok-rich-text';
import './ArticleListing.scss';

interface ArticleListingClientProps {
  articleType: string | undefined;
  articles: Array<ArticleStoryblok>;
  pageCount: number;
  topicFilter: string;
  articleLayout: ListingPageStoryblok['article_layout'];
  noResultsMessage: StoryblokRichtext | undefined;
  useCurrentPath?: boolean | undefined;
}
const RESULTS_PER_PAGE = 10;
const LEAD_LENGTH = 200;
export default function ArticleListingClient({
  articleType,
  articles,
  pageCount,
  topicFilter,
  articleLayout,
  noResultsMessage,
  useCurrentPath = false,
}: ArticleListingClientProps) {
  const [articlesState, setArticlesState] = useState<Array<ArticleStoryblok>>(articles);
  const [topicFilterState, setTopicFilterState] = useState(topicFilter);
  const [pageCountState, setPageCountState] = useState(pageCount);
  const searchParams = useSearchParams();
  const fullSlug = usePathname().slice(1);
  // Topic
  const topicName = searchParams?.topic || '';
  // Month & Year
  const yearFilter = parseInt(searchParams?.year || '0');
  const monthFilter = parseInt(searchParams?.month || '0');
  // Page
  const pageToSearch = parseInt(searchParams?.page || '1');

  useUpdateEffect(() => {
    if (topicName) {
      getArticleTopicByDisplayName(topicName, false)
        .then((data) => {
          if (data) {
            setTopicFilterState(data.uuid);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setTopicFilterState('');
    }
  }, [topicName]);

  useUpdateEffect(() => {
    if (topicName) {
      getArticleTopicByDisplayName(topicName, false)
        .then((data) => {
          if (data) {
            setTopicFilterState(data.uuid);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (articleType) {
      getPaginatedArticlesByType(
        articleType,
        RESULTS_PER_PAGE,
        pageToSearch,
        false,
        yearFilter,
        monthFilter,
        topicFilterState,
        fullSlug && useCurrentPath ? fullSlug : undefined,
      )
        .then((data) => {
          if (data) {
            setArticlesState(data.stories || []);
            setPageCountState(data.pageCount);
          } else {
            setArticlesState([]);
            setPageCountState(1);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [articleType, topicName, pageToSearch, yearFilter, monthFilter, topicFilterState, useCurrentPath]);

  return (
    <ArticleListing
      articleLayout={articleLayout}
      articles={articlesState}
      afterListing={<Pagination pageCount={pageCountState} currentPage={pageToSearch} baseSlug='' />}
      noResultsMessage={noResultsMessage}
    />
  );
}

interface ArticleListingProps {
  articles: Array<ArticleStoryblok>;
  afterListing?: JSX.Element;
  articleLayout: ListingPageStoryblok['article_layout'];
  noResultsMessage: StoryblokRichtext | undefined;
}
function ArticleListing({ articles, articleLayout, afterListing, noResultsMessage }: ArticleListingProps) {
  const render = useRichTextResolver();

  return (
    <div className='article-listing--wrapper'>
      {articles && articles.length > 0 ? (
        articles.map((article) => {
          if (articleLayout === 'detailed') {
            return <ArticleDetailed article={article} key={article.uuid} />;
          } else {
            return <ArticleCondensed article={article} leadLength={LEAD_LENGTH} key={article.uuid} />;
          }
        })
      ) : (
        <div className=''>
          <p className='article-no-listings'>* No results for this category</p>
        </div>
      )}
      {articles && articles.length === 0 && isRichtextDefined(noResultsMessage) ? (
        <div className='richtext-margin-helper text-center text-gray'>{render(noResultsMessage)}</div>
      ) : null}
      {afterListing}
    </div>
  );
}
