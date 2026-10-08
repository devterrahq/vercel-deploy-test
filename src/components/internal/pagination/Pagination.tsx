'use client';

import { ChevronRightSvg } from '@/components/svg';
import './Pagination.scss';
import { useEffect, useState } from 'react';

interface PaginationRecord {
  label: string;
  ariaLabel: string;
  isCurrent: boolean;
  number: number;
  href: string;
}
interface PaginationProps {
  pageCount: number;
  currentPage: number;
  baseSlug: string;
}
export function Pagination({ pageCount, currentPage }: PaginationProps) {
  const [pages, setPages] = useState<Array<PaginationRecord>>([]);
  const [nextHref, setNextHref] = useState('');

  useEffect(() => {
    if (pageCount <= 1) {
      return;
    }
    if (typeof window !== 'undefined') {
      const currentUrl = new URL(window.location.href);

      if (currentPage < pageCount) {
        const nextUrl = new URL(currentUrl);
        nextUrl.searchParams.set('page', `${pageCount + 1}`);
        setNextHref(nextUrl.href);
      }
      const newPages: Array<PaginationRecord> = [];
      for (let i = 1; i <= pageCount; i++) {
        const pageUrl = new URL(currentUrl);
        if (i > 1) {
          pageUrl.searchParams.set('page', `${i}`);
        } else {
          pageUrl.searchParams.delete('page');
        }
        const isCurrent = currentPage === i;
        newPages.push({
          label: `${i}`,
          ariaLabel: isCurrent ? `Page, ${i}, Current Page` : `Goto Page ${i}`,
          isCurrent,
          number: i,
          href: pageUrl.href,
        });
      }
      setPages(newPages);
    }
  }, [pageCount, currentPage]);

  if (pages.length < 1) {
    return;
  }

  return (
    <nav className='pagination' role='navigation' aria-label='Pagination Navigation'>
      <ul>
        {pages.map((page) => (
          <li key={page.number}>
            <a
              className={`pagination--link ${page.isCurrent ? 'pagination--current' : ''}`}
              href={page.href}
              aria-label={page.ariaLabel}
              aria-current={page.isCurrent ? 'true' : 'false'}
            >
              {page.label}
            </a>
          </li>
        ))}
        {nextHref ? (
          <li>
            <a className='pagination--link pagination--next' href={nextHref} aria-label='Goto next page'>
              <ChevronRightSvg />
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
