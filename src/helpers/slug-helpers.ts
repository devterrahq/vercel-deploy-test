import { FetchAllStoriesFromStoryblok } from './storyblok-fetch';
import type { SearchParams } from '@/types';

/**
 * Returns all sub slugs of a given path.
 * @param path
 * @param intitialSlugs
 * @param suffix
 */
export function GetAllSubSlugs(path: string, intitialSlugs?: string[], suffix?: string) {
  const slugs = intitialSlugs ? intitialSlugs : [];
  const conferenceSuffix = suffix ? suffix : '';
  const pathArray = path.split('/');
  for (let i = 0; i < pathArray.length; i++) {
    let slug = '';
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        slug += `${pathArray[j]}`;
      } else {
        slug += `/${pathArray[j]}`;
      }
    }
    if (slug !== '') slugs.push(slug + conferenceSuffix);
  }
  return slugs;
}

export async function getConferenceHomePath(pathName: string): Promise<string | undefined> {
  const slugs = GetAllSubSlugs(pathName.charAt(0) === '/' ? pathName.substring(1) : pathName, [], '/'); // Removes leading '/'
  const response = await FetchAllStoriesFromStoryblok({
    params: {
      by_slugs: slugs.join(','),
      content_type: 'conference_home',
      is_startpage: true,
    },
    tagOptions: {
      excludeContentType: true,
    },
  });

  return response && response.length > 0 ? response[0].full_slug : undefined;
}

/**
 * Returns a normalized slug.
 * @param path The path to normalize
 * @param slugStart If true, the slug will start with a slash
 * @param slugEnd If true, the slug will end with a slash
 * */
export function normalizeSlug(path: string, slugStart = true, slugEnd = false): string {
  if (path.startsWith('http')) {
    return path;
  }

  let newPath = path;
  if (slugStart && !newPath.startsWith('/')) {
    newPath = '/' + newPath;
  }

  if (slugEnd && !newPath.endsWith('/')) {
    newPath = newPath + '/';
  }
  return newPath;
}

/** Returns a normalized search param. */
export function normalizeSearchParams(searchParams: SearchParams | undefined) {
  const normalizedParams: Record<string, string | undefined> = {};

  if (!searchParams) {
    return normalizedParams;
  }

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      normalizedParams[key] = value.length > 0 ? value[0] : undefined;
    } else {
      normalizedParams[key] = value;
    }
  });

  return normalizedParams;
}
