import { StoryblokComponent } from '@storyblok/react/rsc';
import SearchListing from '../internal/searchListing/SearchListing';
import type { SearchPageStoryblok } from '@/component-types';
import type { SbBlokData } from '@storyblok/react/rsc';
import type { ISbComponentType } from 'storyblok-js-client';

interface SearchProps {
  blok: ISbComponentType<'search_page'> & SearchPageStoryblok;
}

export default function Search({ blok }: SearchProps) {
  return (
    <>
      {RenderBloks(blok.before_results)}
      <div className='container'>
        <SearchListing noResultsMessage={blok.no_results_message} placeholderText={blok.search_placeholder_text} />
      </div>
      {RenderBloks(blok.after_results)}
    </>
  );
}

function RenderBloks(bloks?: Array<SbBlokData>) {
  return bloks?.map((blok) => {
    if (!blok._uid) {
      return null;
    }

    return <StoryblokComponent blok={blok} key={blok._uid} />;
  });
}
