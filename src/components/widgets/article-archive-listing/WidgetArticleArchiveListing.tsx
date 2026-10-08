'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { WidgetArticleArchiveListingData } from './widget-article-archive-listing-data';
import type { WidgetArticleArchiveListingStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import './WidgetArticleArchiveListing.scss';

interface Archive {
  label: string;
  year: number;
  subArchives: Array<SubArchive>;
}
interface SubArchive {
  label: string;
  month: number;
  href: string;
  count: number;
}

interface WidgetArticleArchiveListingClientProps {
  blok: WithResolvedData<
    'widget_article_archive_listing',
    WidgetArticleArchiveListingStoryblok,
    WidgetArticleArchiveListingData
  >;
}
export default function WidgetArticleArchiveListingClient({ blok }: WidgetArticleArchiveListingClientProps) {
  const archives = blok.resolver_data?.archives || [];
  const year = blok.resolver_data?.year;
  const month = blok.resolver_data?.month;
  const slug = blok.resolver_data?.slug;

  return <WidgetArticleArchiveListing archives={archives} year={year} month={month} slug={slug} />;
}

interface WidgetArticleArchiveListingProps {
  archives: Array<Archive>;
  year?: number;
  month?: number;
  slug?: string;
}
function WidgetArticleArchiveListing({ archives, year, month, slug }: WidgetArticleArchiveListingProps) {
  const [expandedArchives, setExpandedArchives] = useState<Array<number>>(year ? [year] : []);

  function handleExpandArchive(archiveYear: number) {
    if (expandedArchives.indexOf(archiveYear) === -1) {
      setExpandedArchives([archiveYear].concat(expandedArchives));
    } else {
      setExpandedArchives(
        expandedArchives.filter((yr) => {
          return yr !== archiveYear;
        }),
      );
    }
  }
  return (
    <div className='widget-article-archive-listing'>
      <h3 className='widget-article-archive-listing--heading'>Archives</h3>
      <ul className='widget-article-archive-listing--archive-list'>
        {archives.map((archive) => {
          const isExpanded = expandedArchives.indexOf(archive.year) !== -1;

          return (
            <li key={archive.year} className='widget-article-archive-listing--archive-item'>
              <button
                onClick={(_e) => {
                  handleExpandArchive(archive.year);
                }}
                className='widget-article-archive-listing--archive-btn'
                aria-label={isExpanded ? `Expand ${archive.year}` : `Collapse ${archive.year}`}
              >
                <span className='widget-article-archive-listing--archive-btn-decorator'>{isExpanded ? '-' : '+'}</span>
                {archive.label}
              </button>
              <ul
                className={`widget-article-archive-listing--subarchive-list ${
                  isExpanded ? 'widget-article-archive-listing--subarchive-list-expanded' : ''
                }`}
              >
                {archive.subArchives.map((subArchive) => (
                  <li
                    key={subArchive.month}
                    className={`widget-article-archive-listing--subarchive-item ${
                      year && month && archive.year === year && subArchive.month === month
                        ? 'widget-article-archive-listing--subarchive-item-active'
                        : ''
                    }`}
                  >
                    <Link href={subArchive.href}>
                      {`${subArchive.label} ${subArchive.count > 0 ? `(${subArchive.count})` : ''}
                      `}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
        {year && month ? (
          <li className='widget-article-archive-listing--archive-item'>
            <br />
            <Link className='widget-article-archive-listing--archive-btn clear' href={`/${slug}`.replace(/\/$/, '')}>
              <strong>Clear filter</strong>
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
