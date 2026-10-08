import { Highlight, Snippet } from 'react-instantsearch';
import Link from 'next/link';
import type { SiteSearchAlgoliaRecord } from '@/helpers/algolia/site-search-handler';

interface SiteSearchHit extends SiteSearchAlgoliaRecord {
  __position: number;
}
interface SearchListingItemProps {
  hit: SiteSearchHit;
}
export default function SearchListingItem({ hit }: SearchListingItemProps) {
  return (
    <article>
      {hit.title ? (
        <h3 className='article-detailed--headline'>
          <Link href={`${hit.url}`}>
            <Highlight attribute='title' hit={hit} />
          </Link>
        </h3>
      ) : null}
      {hit.meta_description ? (
        <p>
          <Highlight attribute='meta_description' hit={hit} />
        </p>
      ) : null}
      {hit.content ? (
        <p>
          <Snippet attribute='content' hit={hit} />
        </p>
      ) : null}
    </article>
  );
}
