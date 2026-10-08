import { usePagination } from 'react-instantsearch-core';
// import ArrowIcon from '@/components/svgs/ArrowIcon';
import cn from 'classnames';
import type { UsePaginationProps } from 'react-instantsearch-core';
import './AlgoliaPagination.scss';
import { ChevronLeftSvg, ChevronRightSvg } from '@/components/svg';

type AlgoliaPaginationProps = UsePaginationProps & {
  controlsRef: React.MutableRefObject<HTMLDivElement | null>;
};

export default function AlgoliaPagination(props: AlgoliaPaginationProps) {
  const { controlsRef } = props;
  const { pages, currentRefinement, isFirstPage, isLastPage, refine } = usePagination(props);

  return (
    <div className='ais-pagination ais-pagination--wrapper'>
      {/* Previous Page */}
      <button
        className='ais-pagination--prev-page'
        type='button'
        aria-label='Previous Page'
        disabled={isFirstPage}
        onClick={(event) => {
          event.preventDefault();
          refine(currentRefinement - 1);
          controlsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronLeftSvg />
      </button>
      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          type='button'
          {...(currentRefinement === page && { 'aria-current': 'page' })}
          aria-label={`Page ${page + 1}`}
          value={page + 1}
          onClick={(event) => {
            event.preventDefault();
            refine(page);
            controlsRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          disabled={page === currentRefinement}
          className={cn('ais-pagination_item', currentRefinement === page && 'ais-pagination--selected')}
        >
          {page + 1}
        </button>
      ))}
      {/* Next page */}
      <button
        className='ais-pagination--next-page'
        type='button'
        aria-label='Next Page'
        disabled={isLastPage}
        onClick={(event) => {
          event.preventDefault();
          refine(currentRefinement + 1);
          controlsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <ChevronRightSvg />
      </button>
    </div>
  );
}
