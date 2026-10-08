import { normalizeSlug } from '@/helpers/slug-helpers';
import { getStoryblokClient, handleStoryblokRequest } from '@/helpers/storyblok-client';
import { generateTagsFromStoryblokParams } from '@/helpers/storyblok-fetch';
import type { BreadcrumbItem } from '@npm-refactored/pr-breadcrumbs';

/**
 * Retrieves breadcrumb data for a given page path.
 *
 * @param {string} pagePath - The page path for which to retrieve breadcrumb data.
 */
export async function getBreadcrumbData(pagePath: string, isDraftMode: boolean) {
  try {
    if (!pagePath) return [];

    let currentPath = '';
    const pathSegments = pagePath.replace(/^\/+|\/+$/g, '').split('/');
    const normalizedPaths: string[] = [];

    // Build normalized paths
    for (let i = 0; i < pathSegments.length; i++) {
      if (i === 0) {
        currentPath += pathSegments[i];
      } else {
        currentPath += '/' + pathSegments[i];
      }

      normalizedPaths.push(normalizeSlug(currentPath, false, i < pathSegments.length - 1));
    }

    // We need to add a version of the last path with a trailing slash in case the last path segment is a folder
    normalizedPaths.push(normalizedPaths[normalizedPaths.length - 1] + '/');

    // Retrieve stories from the API
    const apiResults = await handleStoryblokRequest(
      async () =>
        await getStoryblokClient({
          nextOptions: {
            tags: generateTagsFromStoryblokParams({
              params: {
                by_slugs: normalizedPaths.join(','),
              },
            }),
          },
        }).getStories({
          by_slugs: normalizedPaths.join(','),
          version: isDraftMode ? 'draft' : process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
        }),
    );

    const breadcrumbItems: Array<BreadcrumbItem> = [];
    const storiesMap = Object.fromEntries(apiResults.data.stories.map((story) => [story.full_slug, story]));

    normalizedPaths.forEach((path) => {
      const matchedStory = storiesMap[path];

      if (matchedStory) {
        const baseURL = process.env.BASE_URL;
        const link = `${baseURL}/${matchedStory.full_slug}`;

        breadcrumbItems.push({
          key: matchedStory.uuid,
          label: matchedStory.content.breadcrumb_label || matchedStory.name,
          link: matchedStory.full_slug,
          json_link: link,
        });
      }
    });

    return breadcrumbItems;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
