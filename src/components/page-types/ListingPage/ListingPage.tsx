import { StoryblokComponent } from '@storyblok/react/rsc';
import ArticleListingClient from '@/components/internal/articleListing/ArticleListing';
import cn from 'classnames';
import type { ListingPageData } from './listing-page-data';
import type { ListingPageStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import type { SbBlokData } from '@storyblok/react/rsc';

interface ListingPageProps {
  blok: WithResolvedData<'listing_page', ListingPageStoryblok, ListingPageData>;
}

export default function ListingPage({ blok }: ListingPageProps) {
  const layout = blok.article_layout;
  const listStyles = cn('col-12', layout === 'condensed' ? 'col-md-8' : 'col-md-9', 'article-listing--wrapper');
  const asideStyles = cn('col-12', 'col-md-3', layout === 'condensed' ? 'offset-md-1' : null);
  return (
    <>
      {RenderBlocks(blok.above_listing_blocks)}
      <div className='container'>
        <div className='row'>
          <div className={listStyles}>
            {RenderBlocks(blok.listing_header)}
            <ArticleListingClient
              articleType={blok.article_type}
              articles={blok.resolver_data?.articles || []}
              pageCount={blok.resolver_data?.pageCount || 1}
              topicFilter={blok.resolver_data?.topic || ''}
              articleLayout={blok.article_layout}
              noResultsMessage={blok.no_results_content}
              useCurrentPath={blok.only_from_current_folder}
            />
          </div>
          <div className={asideStyles}>{RenderBlocks(blok.aside_blocks)}</div>
        </div>
      </div>
      {RenderBlocks(blok.below_listing_blocks)}
    </>
  );
}

function RenderBlocks(blocks?: Array<SbBlokData>) {
  return blocks?.map((nestedBlok: SbBlokData) => {
    if (!nestedBlok._uid) {
      return null;
    }

    return (
      <div key={nestedBlok._uid}>
        <StoryblokComponent blok={nestedBlok} />
      </div>
    );
  });
}
