import StoryblokClient from 'storyblok-js-client';
import { StoryblokErrorSchema } from './storyblok-schema';
import type { SBStoryData } from '@/types';
import type { ISbStories } from 'storyblok-js-client';

interface StoryblokClientOptions {
  fetchOptions?: RequestInit;
  nextOptions?: NextFetchRequestConfig;
  isDraftModeEnabled?: boolean;
}

export function getStoryblokClient(options: StoryblokClientOptions = {}): StoryblokClient {
  const { fetchOptions, nextOptions, isDraftModeEnabled } = options;
  const accessToken = isDraftModeEnabled
    ? process.env.STORYBLOK_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;

  return new StoryblokClient({
    accessToken,
    region: 'eu',
    cache: {
      type: 'none',
    },
    fetch(input, init) {
      let updatedInput: RequestInfo | URL = input;

      if (typeof input === 'string') {
        try {
          const url = new URL(input);
          url.searchParams.delete('cv');
          updatedInput = url.toString();
        } catch (error) {
          console.error('Invalid URL:', input);
        }
      } else if (input instanceof Request) {
        const url = new URL(input.url);
        url.searchParams.delete('cv');
        updatedInput = new Request(url.toString(), input);
      } else {
        console.error('Input is not a valid RequestInfo:', input);
      }

      return fetch(updatedInput, {
        ...init,
        ...(fetchOptions ? fetchOptions : {}),
        ...(nextOptions ? { next: nextOptions } : {}),
      });
    },
  });
}

interface FetchStoryblokDataOptions<Data> {
  /** The number of retries to attempt when their is a 429 error. Defaults to 5. */
  retries?: number;
  /** The delay between retries in milliseconds. Defaults to 1000. */
  delay?: number;
  /** A callback to run if the error is a 404. If this is provided, the fetch helper will retry the request with this callback. */
  notFoundCallback?: () => Promise<Data>;
  /**
   * @internal
   */
  _hasTriedNotFoundCallback?: boolean;
}

class StoryblokUtils {
  static _handleStoryblokRequestDefaultOptions = { retries: 5, delay: 1000, _hasTriedNotFoundCallback: false };

  /**
   * Storyblok fetch helper that handles errors
   * @param request The function to fetch data from Storyblok
   * @param options Options for the fetch helper
   */
  static async handleStoryblokRequest<Data>(
    request: () => Promise<Data>,
    options: FetchStoryblokDataOptions<Data> = StoryblokUtils._handleStoryblokRequestDefaultOptions,
  ): Promise<Data> {
    const { retries = 5, delay = 1000, _hasTriedNotFoundCallback } = options;

    try {
      return await request();
    } catch (error) {
      const parsedError = StoryblokErrorSchema.safeParse(error);
      if (!parsedError.success) {
        throw error;
      }
      const { data: sbError } = parsedError;

      switch (sbError.status) {
        case 400:
        case 401:
        case 404:
          if (options.notFoundCallback && !_hasTriedNotFoundCallback) {
            return await StoryblokUtils.handleStoryblokRequest(options.notFoundCallback, {
              ...options,
              _hasTriedNotFoundCallback: true,
            });
          } else {
            throw sbError;
          }
        case 422:
        case 500:
        case 502:
        case 503:
        case 504:
          throw sbError;
        case 429:
          if (retries <= 0) {
            throw sbError;
          }

          console.log(`[StoryblokUtils] Retry attempt due to 429 error. Retries left: ${retries}`);

          await new Promise((resolve) => setTimeout(resolve, delay));
          return StoryblokUtils.handleStoryblokRequest(request, {
            ...options,
            retries: retries - 1,
            delay: delay * StoryblokUtils.randomRange(1.4, 1.5),
          });
        default:
          throw sbError;
      }
    }
  }

  /**
   * return a random range from the min and max provided
   * @param min Smallest number in the range
   * @param max Largest number in the range
   */
  static randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Fetches all pages of data from a Storyblok request.
   * @param singlePageRequest The function to fetch a single page of data from Storyblok
   * @param storiesPerRequest The number of stories to fetch per request
   */
  static async fetchAllPages(
    singlePageRequest: (page: number) => Promise<ISbStories>,
    storiesPerRequest: number,
  ): Promise<SBStoryData[]> {
    const stories: SBStoryData[] = [];
    let page = 1;
    let totalPages = 1;

    const firstPage = await StoryblokUtils.handleStoryblokRequest(() => singlePageRequest(page));
    if (!firstPage) return stories;

    const totalItems = firstPage.total;
    totalPages = Math.ceil(totalItems / storiesPerRequest);
    stories.push(...firstPage.data.stories);

    for (page = 2; page <= totalPages; page++) {
      const pageData = await singlePageRequest(page);
      if (!pageData) continue;

      stories.push(...pageData.data.stories);
    }

    return stories;
  }
}

export const handleStoryblokRequest = <Data>(...args: Parameters<typeof StoryblokUtils.handleStoryblokRequest<Data>>) =>
  StoryblokUtils.handleStoryblokRequest(...args);
export const fetchAllPages = (...args: Parameters<typeof StoryblokUtils.fetchAllPages>) =>
  StoryblokUtils.fetchAllPages(...args);
