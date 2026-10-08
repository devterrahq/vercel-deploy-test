import { getArticlesByType } from '@/helpers/api-client-helpers';
import { getDayjsDate } from '@/helpers/date-helpers';
import { normalizeSearchParams } from '@/helpers/slug-helpers';
import type { WidgetArticleArchiveListingStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';

type SubArchive = {
  label: string;
  month: number;
  href: string;
  count: number;
};

type Archive = {
  label: string;
  year: number;
  subArchives: Array<SubArchive>;
};

export type WidgetArticleArchiveListingData = {
  archives: Array<Archive>;
  year: number;
  month: number;
  slug: string;
};

export async function getWidgetArticleArchiveListingData({
  options: { slug, searchParams, isDraftMode },
}: ComponentResolverData<WidgetArticleArchiveListingStoryblok>): Promise<WidgetArticleArchiveListingData> {
  try {
    if (!slug) {
      console.error('WidgetArticleArchiveListingData: slug is required');
      return {
        archives: [],
        year: 0,
        month: 0,
        slug: '',
      };
    }

    const { year: queryYear = '0', month: queryMonth = '0' } = normalizeSearchParams(searchParams) || {};
    const data = await getArticlesByType('news', parseInt(queryYear), parseInt(queryMonth), isDraftMode);
    const newArchives: Array<Archive> = [];

    data?.forEach((newsArticle) => {
      if (newsArticle.date) {
        const d = getDayjsDate(newsArticle.date);
        if (d) {
          const yr = d.year();
          const mo = d.month() + 1;
          const existingArchive = newArchives.find((a) => a.year === yr);

          // Helper function to form the URL
          const formSubArchiveUrl = (year: string | number, month: string | number) => {
            let url = `/${slug}?month=${month}&year=${year}`;

            if (
              year.toString() &&
              month.toString() &&
              queryYear.toString() === year.toString() &&
              queryMonth.toString() === month.toString()
            ) {
              url = `/${slug.replace(/\/$/, '')}`; // Reset to base slug if year and month match
            }
            return url;
          };

          if (existingArchive) {
            const existingSubArchive = existingArchive.subArchives.find((subArch) => subArch.month === mo);
            if (existingSubArchive) {
              existingSubArchive.count++;
            } else {
              const newSubArch: SubArchive = {
                label: d.format('MMMM'),
                count: 1,
                month: mo,
                href: formSubArchiveUrl(yr, mo),
              };
              existingArchive.subArchives.push(newSubArch);
            }
          } else {
            // Add new archive record
            const newSubArch: SubArchive = {
              label: d.format('MMMM'),
              count: 1,
              month: mo,
              href: formSubArchiveUrl(yr, mo),
            };
            const newArch: Archive = {
              year: yr,
              label: `${yr}`,
              subArchives: [newSubArch],
            };
            newArchives.push(newArch);
          }
        }
      }
    });

    // Sort
    newArchives.forEach((arch) => {
      arch.subArchives.sort((a, b) => a.month - b.month);
    });
    newArchives.sort((a, b) => b.year - a.year);

    return {
      archives: newArchives,
      year: parseInt(queryYear, 10),
      month: parseInt(queryMonth, 10),
      slug,
    };
  } catch (err) {
    console.error(err);
    return {
      archives: [],
      year: 0,
      month: 0,
      slug: '',
    };
  }
}
