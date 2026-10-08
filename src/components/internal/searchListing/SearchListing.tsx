'use client';

import React, { Suspense, useMemo, useRef } from 'react';
import { Configure, Hits, SearchBox, useInstantSearch, useStats } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { SearchSvg, TimesSvg } from '@/components/svg';
import { ResolveRichText } from '@npm-refactored/storyblok-rich-text';
import algoliasearch from 'algoliasearch/lite';
import AlgoliaPagination from '../pagination/AlgoliaPagination';
import SearchListingItem from './SearchListingItem';
import type { RichtextStoryblok } from '@/component-types';
import type { SearchClient } from 'algoliasearch/lite';
import './SearchListing.scss';

// https://www.algolia.com/doc/api-reference/widgets/search-box/react/#widget-param-classnames
interface ReactInstantSearchClassNames {
  [key: string]: string;
}

interface SearchListingProps {
  noResultsMessage: RichtextStoryblok | undefined;
  placeholderText: string | undefined;
}
function SearchListing({ placeholderText, noResultsMessage }: SearchListingProps) {
  const INDEX_NAME = 'iwi_site_search';
  const HITS_PER_PAGE = 8;

  const searchClientRef = useRef<SearchClient>(),
    controlsRef = useRef<HTMLDivElement>(null);

  if (!searchClientRef.current) {
    searchClientRef.current = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY || '',
    );
  }

  return (
    <InstantSearchNext
      insights
      searchClient={searchClientRef.current}
      indexName={INDEX_NAME}
      future={{
        preserveSharedStateOnUnmount: false,
      }}
      routing={{
        router: {
          push(url) {
            // Using window.history.pushState here instead of the built in next router push because even when
            // I set it to not scroll to the top of the page, it still does. This is a workaround
            window.history.pushState({}, '', url);
          },
        },
        stateMapping: {
          stateToRoute(uiState) {
            const indexUiState = uiState[INDEX_NAME];
            return {
              query: indexUiState?.query,
              page: indexUiState?.page,
            };
          },
          routeToState(routeState) {
            return {
              [INDEX_NAME]: {
                page: routeState.page,
                query: routeState.query,
              },
            };
          },
        },
      }}
    >
      <Configure hitsPerPage={HITS_PER_PAGE} attributesToSnippet={['content:100']} clickAnalytics />
      <div className='search-listing--controls' ref={controlsRef}>
        <SearchBox
          submitIconComponent={({ classNames }: { classNames: ReactInstantSearchClassNames }) => (
            <div className={classNames.submitIcon}>
              <SearchSvg />
            </div>
          )}
          resetIconComponent={({ classNames }: { classNames: ReactInstantSearchClassNames }) => (
            <div className={classNames.resetIcon}>
              <TimesSvg width={15} height={15} color={'#000000'} />
            </div>
          )}
          searchAsYouType={false}
          placeholder={placeholderText}
        />

        <div className='search-listing--details'>
          <CustomStats perPage={HITS_PER_PAGE} />
        </div>
      </div>
      <NoResultsBoundary noResultsMessage={noResultsMessage}>
        <>
          <Hits
            classNames={{
              list: 'search-list--wrapper',
              item: 'search-list--item',
            }}
            hitComponent={SearchListingItem}
          />
          <AlgoliaPagination controlsRef={controlsRef} padding={2} />
        </>
      </NoResultsBoundary>
    </InstantSearchNext>
  );
}

interface NoResultsBoundaryProps {
  noResultsMessage: SearchListingProps['noResultsMessage'];
  children: JSX.Element;
}
function NoResultsBoundary({ children, noResultsMessage }: NoResultsBoundaryProps) {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        <div className='listing_empty-state'>{ResolveRichText(noResultsMessage)}</div>
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

interface CustomStatsProps {
  perPage: number;
}
function CustomStats({ perPage }: CustomStatsProps) {
  const { nbHits, nbSortedHits, areHitsSorted, page } = useStats();

  const text = useMemo(() => {
    const resultsNum = areHitsSorted && nbHits !== nbSortedHits ? nbSortedHits : nbHits;
    const totalText =
      areHitsSorted && nbHits !== nbSortedHits ? nbSortedHits?.toLocaleString() : nbHits?.toLocaleString();

    const start = page ? perPage * page : 1;
    const end = Math.min(page ? start + perPage : perPage, resultsNum || 0);

    return `${start} - ${end} of ${totalText} result${resultsNum != 1 ? 's' : ''}`;
  }, [nbHits, nbSortedHits, areHitsSorted, page, perPage]);

  return (
    <div className='ais-Stats'>
      <span className='ais-Stats-text'>{text}</span>
    </div>
  );
}

export default function SearchWithSuspense({ placeholderText, noResultsMessage }: SearchListingProps) {
  return (
    <Suspense>
      <SearchListing placeholderText={placeholderText} noResultsMessage={noResultsMessage} />
    </Suspense>
  );
}
