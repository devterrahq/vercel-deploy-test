import dayjs from 'dayjs';
import tzPlugin from 'dayjs/plugin/timezone';
import utcPlugin from 'dayjs/plugin/utc';
import type { ArticleStoryblok } from '@/component-types';

dayjs.extend(utcPlugin);
dayjs.extend(tzPlugin);

/** Returns a date string in the format required by sitemap.xml */
export function getSitemapDateString(d: Date) {
  let datestr = '';
  if (d) {
    datestr = `${d.getFullYear()}-${getDigits(d.getMonth() + 1)}-${getDigits(d.getDate())}`;
    datestr += 'T' + getDigits(d.getHours()) + ':' + getDigits(d.getMinutes()) + 'Z';
  }
  return datestr;
}

/** Returns a string with two digits, padding with a leading zero if necessary */
export function getDigits(num: number): string {
  return `${num}`.padStart(2, '0');
}
export function fixStoryblokUtcDate(date?: string) {
  return date ? date.replace(/-/g, '/') : undefined;
}

export function getDayjsDate(d?: string) {
  if (!d) return;
  dayjs.tz.guess();
  return dayjs.utc(fixStoryblokUtcDate(d)).tz();
}

export function currentDayjsDate() {
  dayjs.tz.guess();
  return dayjs.utc().tz();
}

export function getIso8601FromStoryblokDate(d?: string) {
  if (!d) return;
  return dayjs.utc(fixStoryblokUtcDate(d)).format('YYYY-MM-DDTHH:mm:ssZ');
}

export function getArticleDateString(d?: string) {
  dayjs.tz.guess();
  if (!d) return '';
  return dayjs.utc(fixStoryblokUtcDate(d)).tz().format('MMM D, YYYY h:mm:ss A');
}

export function getArticleCondensedDateString(d?: string) {
  dayjs.tz.guess();
  if (!d) return '';
  return dayjs.utc(fixStoryblokUtcDate(d)).tz().format('dddd, MMMM DD, YYYY');
}

export function getDayRangeYrMo(year: number, month: number | undefined) {
  const start = dayjs(`${year}`, 'YYYY')
    .month(month ? month - 1 : 0)
    .startOf('month');
  let end;
  if (month) {
    end = start.endOf('month');
  } else {
    end = start.endOf('year');
  }

  return { start, end };
}

export function isArticlePublished(article: ArticleStoryblok) {
  if (!article.publish_at) {
    return true;
  }

  const nowTime = currentDayjsDate();
  const articlePublishAt = getDayjsDate(article.publish_at);

  if (articlePublishAt?.isAfter(nowTime)) {
    return false;
  }

  return true;
}
