import { getStoryblokApi } from '@storyblok/react/rsc';
import { redirect } from 'next/navigation';
import type { MegaParam, Permissions } from '@/types';
import type { URLSearchParams } from 'url';

const MEGAPARAM_SEPARATOR = '~' as const;

export const handleAuth = async (slug: string[], pagePermissions: Permissions | undefined, user: MegaParam) => {
  if (!pagePermissions) {
    return null;
  }

  const pageAssignedRoles = pagePermissions.assignedRoles;
  const pageAuth =
    pagePermissions.requiresAuth === 'inherits' && slug.length !== 0 && slug[0] !== '/'
      ? await getPageAuthFromClosestParent(slug)
      : pagePermissions.requiresAuth;

  if (pageAuth === 'no') {
    return null;
  }

  if (pageAuth === 'yes' && user.authenticated === false) {
    redirect('/signin');
  }

  for (const role of pageAssignedRoles) {
    if (user.roles.includes(role.value) && role.access === 'deny') {
      redirect('/not-authorized');
    }
  }
};

const getPageAuthFromClosestParent = async (slug: string[]): Promise<Permissions['requiresAuth']> => {
  const slugs = ['home', ...slug.map((_, i) => slug.slice(0, i + 1).join('/') + '/')];
  slugs.shift();

  try {
    const { data } = await getStoryblokApi().getStories({
      version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
      by_slugs: slugs.join(','),
      filter_query: {
        permissions: {
          requiresauth: 'yes',
        },
      },
    });

    if (!data.stories) {
      return 'no';
    }

    if (data.stories.length === 1) {
      return data.stories[0].content.permissions.requiresauth;
    }

    if (data.stories.length > 1) {
      const longestSlug = data.stories.reduce((acc, curr) => {
        return curr.full_slug.length > acc.length && curr.full_slug !== 'home' ? curr.full_slug : acc;
      }, '');
      const permissionsNode = data.stories.find((story) => story.full_slug === longestSlug);

      return permissionsNode ? permissionsNode.content.permissions.requiresauth : 'no';
    }

    return 'no';
  } catch (error) {
    console.error(error);
    return 'no';
  }
};

/**
 * @example
 * Format:
 * ~isDraftMode~authenticated~searchParams~role1|role2|role3
 */
export const encodeMegaparam = (
  roles: string[] | undefined,
  searchParams: URLSearchParams,
  isDraftMode: boolean = false,
) => {
  const megaParam: string[] = [];

  megaParam.push(isDraftMode ? '1' : '0');
  megaParam.push(roles ? '1' : '0');

  if (searchParams.toString()) {
    megaParam.push(searchParams.toString());
  }

  if (roles) {
    megaParam.push(roles.join('|'));
  }

  // add ~ to the beginning of the string
  return megaParam.join(MEGAPARAM_SEPARATOR).replace(/^/, MEGAPARAM_SEPARATOR);
};
export const decodeMegaparam = (megaparam: string): MegaParam => {
  const [_, isDraftMode, authenticated, searchParams, roles] = megaparam.split(MEGAPARAM_SEPARATOR);

  const searchParamsObject = searchParams
    ? decodeURIComponent(searchParams)
        .split('&')
        .reduce((acc, curr) => {
          const [key, value] = curr.split('=');
          return { ...acc, [key]: value.replace(/\+/g, ' ') };
        }, {})
    : {};

  return {
    isDraftMode: isDraftMode === '1',
    searchParams: searchParamsObject,
    authenticated: authenticated === '1',
    roles: roles ? roles.split('|') : [],
  };
};
