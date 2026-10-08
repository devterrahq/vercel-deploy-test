import StoryblokComponentJson from '@/components.storyblok.json';
import { getConferenceScheduleItem } from '@/components/internal/conference-schedule-item/conference-schedule-item-data';
import { getLogoGridData } from '@/components/internal/logo-grid/logo-grid-data';
import { getArticleData } from '@/components/page-types/article/article-data';
import { getListingPageData } from '@/components/page-types/ListingPage/listing-page-data';
import { getPanelScheduleData } from '@/components/panels/schedule/panel-schedule-data';
import { getTestimonialCarouselData } from '@/components/panels/testimonial-carousel/getTestimonialCarouselData';
import { getTestimonialData } from '@/components/panels/testimonial/getTestimonialData';
import { getWidgetArticleArchiveListingData } from '@/components/widgets/article-archive-listing/widget-article-archive-listing-data';
import { getWidgetArticleTopicListingData } from '@/components/widgets/article-topic-listing/widget-article-topic-listing-data';
import { getWidgetProfileCard } from '@/components/widgets/profile-card/widget-profile-card-data';
import equal from 'fast-deep-equal';
import type {
  ArticleStoryblok,
  ConferenceScheduleItemStoryblok,
  ListingPageStoryblok,
  ListingPageV2Storyblok,
  PanelLogoGridStoryblok,
  PanelScheduleStoryblok,
  PanelTestimonialCarouselStoryblok,
  PanelTestimonialStoryblok,
  WidgetArticleArchiveListingStoryblok,
  WidgetArticleTopicListingStoryblok,
  WidgetLogoGridStoryblok,
  WidgetProfileCardStoryblok,
} from '@/component-types';
import type { ConferenceScheduleItemData } from '@/components/internal/conference-schedule-item/conference-schedule-item-data';
import type { LogoGridData } from '@/components/internal/logo-grid/logo-grid-data';
import type { ArticleData } from '@/components/page-types/article/article-data';
import type { ListingPageData } from '@/components/page-types/ListingPage/listing-page-data';
import type { PanelScheduleData } from '@/components/panels/schedule/panel-schedule-data';
import type { TestimonialCarouselData } from '@/components/panels/testimonial-carousel/getTestimonialCarouselData';
import type { TestimonialData } from '@/components/panels/testimonial/getTestimonialData';
import type { WidgetArticleArchiveListingData } from '@/components/widgets/article-archive-listing/widget-article-archive-listing-data';
import type { WidgetArticleTopicListingData } from '@/components/widgets/article-topic-listing/widget-article-topic-listing-data';
import type { WidgetProfileCardData } from '@/components/widgets/profile-card/widget-profile-card-data';
import type { MegaParam, SBComponent, SearchParams } from '@/types';
import type { ISbStoryData } from 'storyblok-js-client';
import type { StoryblokRichtext } from 'storyblok-rich-text-react-renderer';

// === Resolver Data Helper Types === //
export type WithResolvedData<
  ComponentName extends string,
  Component extends SBComponent<ComponentName>,
  ResolverData,
> = Component & {
  resolver_data?: Partial<ResolverData>;
};
export interface ResolveDataOptions {
  isDraftMode: boolean;
  megaParam?: MegaParam;
  searchParams?: SearchParams;
  slug?: string;
}
export interface ComponentResolverData<Component extends SBComponent<string>> {
  component: Component;
  storyData: Omit<ISbStoryData, 'content'>;
  options: ResolveDataOptions;
}
export interface StoryResolverData<Story extends SBComponent<string>> {
  story: Story;
  storyData: ISbStoryData;
  slug: string;
  options: ResolveDataOptions;
}

// === Resolver Data Helper Functions === //
type ComponentDataResolver<Component extends SBComponent<string> = SBComponent<string>, ReturnData = unknown> = (
  data: ComponentResolverData<Component>,
) => Promise<ReturnData>;
type StoryDataResolver<Story extends SBComponent<string> = SBComponent<string>, ReturnData = unknown> = (
  data: StoryResolverData<Story>,
) => Promise<ReturnData>;

// === Resolver Data Functions === //
type ComponentDataResolvers = {
  panel_logo_grid: ComponentDataResolver<PanelLogoGridStoryblok, LogoGridData>;
  widget_logo_grid: ComponentDataResolver<WidgetLogoGridStoryblok, LogoGridData>;
  panel_testimonial_carousel: ComponentDataResolver<PanelTestimonialCarouselStoryblok, TestimonialCarouselData>;
  panel_testimonial: ComponentDataResolver<PanelTestimonialStoryblok, TestimonialData>;
  panel_schedule: ComponentDataResolver<PanelScheduleStoryblok, PanelScheduleData>;
  widget_article_archive_listing: ComponentDataResolver<
    WidgetArticleArchiveListingStoryblok,
    WidgetArticleArchiveListingData
  >;
  widget_article_topic_listing: ComponentDataResolver<
    WidgetArticleTopicListingStoryblok,
    WidgetArticleTopicListingData
  >;
  widget_profile_card: ComponentDataResolver<WidgetProfileCardStoryblok, WidgetProfileCardData>;
  conference_schedule_item: ComponentDataResolver<ConferenceScheduleItemStoryblok, ConferenceScheduleItemData>;
};
export type PageDataResolvers = {
  listing_page: StoryDataResolver<ListingPageStoryblok, ListingPageData>;
  listing_page_v2: StoryDataResolver<ListingPageV2Storyblok, ListingPageData>;
  article: StoryDataResolver<ArticleStoryblok, ArticleData>;
};

// === Component Resolver Data Maps === //
type ComponentResolverMap =
  /**
   * Data Dependent Components
   */
  | {
      [K in keyof ComponentDataResolvers]: {
        /**
         * The resolver function for this component type.
         */
        resolver: ComponentDataResolvers[K];
        /**
         * If the component has changed, but the fields in this array have not, the resolver will not be called.
         * If this field is not set, the resolver will only be called when component tree is initially loaded.
         */
        watchFields?: string[];
        /**
         * If true, the entire component will be replaced with the resolved data.
         */
        replaceComponent?: boolean;
        /**
         * If the component has fields which contain bloks that are data dependent, this tells the resolver to watch those fields, and to resolve the data for those bloks when the fields change.
         */
        componentFields?: string[];
        /**

* Component fields used to fetch data

*/

        cacheTags?: { field: string; tagType: string }[];
      };
    }
  /**
   * Components that contain data dependent components
   */
  | {
      [key: string]: {
        /**
         * If the component has fields which contain bloks that are data dependent, this tells the resolver to watch those fields, and to resolve the data for those bloks when the fields change.
         */
        componentFields?: string[];
      };
    };

export const componentDataResolvers: ComponentResolverMap = {
  panel_logo_grid: {
    resolver: (resolverData) => getLogoGridData(resolverData),
    componentFields: ['items.*.items.*.partner'],
    cacheTags: [
      { field: 'items', tagType: 'uuids' },
      { field: 'items.partner', tagType: 'uuids' },
      // { field: 'items.items.partner', tagType: 'uuids' },
    ],
  },
  widget_logo_grid: {
    resolver: (resolverData) => getLogoGridData(resolverData),
    cacheTags: [
      { field: 'items', tagType: 'uuids' },
      { field: 'items.partner', tagType: 'uuids' },
      { field: 'items.items.partner', tagType: 'uuids' },
    ],
  },
  panel_testimonial_carousel: {
    resolver: (resolverData) => getTestimonialCarouselData(resolverData),
    watchFields: ['testimonial_data'],
    cacheTags: [{ field: 'testimonial_data', tagType: 'uuid' }],
  },
  panel_testimonial: {
    resolver: (resolverData) => getTestimonialData(resolverData),
    watchFields: ['testimonial_data'],
    cacheTags: [{ field: 'testimonial_data', tagType: 'uuid' }],
  },
  panel_schedule: {
    resolver: (resolverData) => getPanelScheduleData(resolverData),
    watchFields: ['time_blocks.*.sessions'],
    componentFields: ['time_blocks.*.sessions'],
    cacheTags: [
      { field: 'conference_home', tagType: 'contentType' },
      { field: 'time_blocks', tagType: 'uuids' },
      { field: 'time_blocks.sessions', tagType: 'uuids' },
    ],
  },
  panel_grid: {
    componentFields: ['items'],
  },
  widget_grid: {
    componentFields: ['items'],
  },
  widget_article_archive_listing: {
    resolver: (resolverData) => getWidgetArticleArchiveListingData(resolverData),
  },
  widget_article_topic_listing: {
    resolver: (resolverData) => getWidgetArticleTopicListingData(resolverData),
  },
  widget_profile_card: {
    resolver: (resolverData) => getWidgetProfileCard(resolverData),
  },
  conference_schedule_item: {
    resolver: (resolverData) => getConferenceScheduleItem(resolverData),
  },
};

// === Page Resolver Data Maps === //
type PageResolverMap = {
  [K in keyof PageDataResolvers]: {
    resolver: PageDataResolvers[K];
    watchFields?: string[];
    componentFields?: string[];
  };
};
export const pageDataResolvers: PageResolverMap = {
  listing_page: {
    resolver: (resolverData) => getListingPageData(resolverData),
    componentFields: ['aside_blocks'],
  },
  listing_page_v2: {
    resolver: (resolverData) => getListingPageData(resolverData),
    componentFields: ['aside_blocks'],
  },
  article: {
    resolver: (resolverData) => getArticleData(resolverData),
    watchFields: ['topics', 'authors'],
  },
};

// === Main Resolver Functions === //
async function resolveComponentData(
  newComponent: SBComponent<string>,
  oldComponentsMap: Record<string, SBComponent<string>> | undefined,
  clonedStoryData: ISbStoryData,
  options: ResolveDataOptions,
) {
  if (!isSbComponentType(newComponent)) return;

  const richTextFields =
    componentRichTextMap(StoryblokComponentJson)[newComponent?.component || newComponent?.content?.component || ''];

  const traverseContent = async (content: StoryblokRichtext['content']) => {
    if (!content) return;

    for (const item of content) {
      if (item.type === 'blok' && item.attrs?.body) {
        for (const component of item.attrs.body) {
          await resolveComponentData(component as SBComponent<string>, oldComponentsMap, clonedStoryData, options);
        }
      }
    }
  };

  if (richTextFields) {
    for (const field of richTextFields) {
      await traverseContent(newComponent?.[field]?.content || newComponent?.content?.[field]?.content);
    }
  }

  const dataResolver = getValueFromComponentResolverMap(
    componentDataResolvers,
    newComponent.component || newComponent.content.component,
  );
  if (!dataResolver) return;

  if ('resolver' in dataResolver) {
    const { resolver, watchFields, replaceComponent } = dataResolver;
    const oldComponent = oldComponentsMap ? oldComponentsMap[newComponent._uid as string] : undefined;

    const shouldFetchData = !watchFields
      ? !oldComponent
      : watchFields.some((field) => !equal(getValuesByPath(newComponent, field), getValuesByPath(oldComponent, field)));

    if (resolver) {
      if (shouldFetchData) {
        const resolvedData = await resolver({
          // @ts-expect-error - the newComponent is fine here
          component: newComponent,
          storyData: clonedStoryData,
          options: {
            ...options,
            slug: clonedStoryData.full_slug,
          },
        });

        if (replaceComponent) {
          // Replace the entire component
          Object.assign(newComponent, resolvedData);
        } else {
          // Append resolver_data
          newComponent.resolver_data = resolvedData;
        }
      } else {
        newComponent.resolver_data = oldComponent?.resolver_data;
      }
    }
  }

  if ('componentFields' in dataResolver) {
    const componentFields = dataResolver.componentFields || [];

    for (const field of componentFields) {
      const nestedComponents = getValuesByPath(newComponent, field);

      if (Array.isArray(nestedComponents)) {
        // If nestedComponents is an array, iterate over its elements
        for (const nestedComponent of nestedComponents) {
          if (Array.isArray(nestedComponent)) {
            await Promise.all(
              nestedComponent.map((nestedNewComponent) => {
                if (!isSbComponentType(nestedNewComponent)) return;

                if ('component' in nestedNewComponent) {
                  return resolveComponentData(nestedNewComponent, oldComponentsMap, clonedStoryData, {
                    ...options,
                    slug: clonedStoryData.full_slug,
                  });
                } else {
                  return resolveComponentData(nestedNewComponent.content, oldComponentsMap, clonedStoryData, {
                    ...options,
                    slug: clonedStoryData.full_slug,
                  });
                }
              }),
            );
          }
        }
      }
    }
  }
}

export async function resolveStoryData(
  newStoryData: ISbStoryData,
  oldStoryData: SBComponent<string> | undefined,
  options: ResolveDataOptions,
): Promise<ISbStoryData> {
  try {
    const clonedStoryData: ISbStoryData = JSON.parse(JSON.stringify(newStoryData));
    const mapComponents = (component: SBComponent<string>, acc: Record<string, SBComponent<string>>) => {
      if (component && component._uid) {
        acc[component._uid] = component;

        // Get the component fields (if any) for the component
        const dataResolver = getValueFromComponentResolverMap(componentDataResolvers, component.component);

        if (dataResolver && 'componentFields' in dataResolver) {
          const componentFields = dataResolver.componentFields || [];

          // Process component fields and rich text fields
          componentFields.forEach((field) => {
            const nestedComponents = getValuesByPath(component, field);
            if (Array.isArray(nestedComponents[0])) {
              nestedComponents[0].forEach((nestedComponent: unknown) => {
                if (!isSbComponentType(nestedComponent)) return;
                if (nestedComponent && typeof nestedComponent === 'object' && nestedComponent._uid) {
                  if ('component' in nestedComponent) {
                    mapComponents(nestedComponent, acc);
                  } else {
                    mapComponents(nestedComponent.content, acc);
                  }
                }
              });
            }
          });
        }

        const richTextFields = componentRichTextMap(StoryblokComponentJson)[component.component || ''];
        if (richTextFields) {
          richTextFields.forEach((field) => {
            const nestedContent = component[field]?.content as StoryblokRichtext['content'] | undefined;
            nestedContent?.forEach((nestedItem) => {
              if (nestedItem.type === 'blok' && nestedItem.attrs?.body && Array.isArray(nestedItem.attrs.body)) {
                nestedItem.attrs.body.forEach((nestedComponent: SBComponent<string>) => {
                  mapComponents(nestedComponent, acc);
                });
              }
            });
          });
        }
      }
    };
    const oldComponentsMap: Record<string, SBComponent<string>> = {};
    oldStoryData?.body?.forEach((component: SBComponent<string>) => mapComponents(component, oldComponentsMap));

    const pageDataResolver = pageDataResolvers[newStoryData?.content?.component as keyof PageDataResolvers];

    if (pageDataResolver) {
      const { resolver, watchFields } = pageDataResolver;
      const shouldFetchData = !watchFields
        ? !oldStoryData
        : watchFields.some(
            (field) => !equal(getValuesByPath(newStoryData.content, field), getValuesByPath(oldStoryData, field)),
          );

      if (resolver) {
        if (shouldFetchData) {
          clonedStoryData.content.resolver_data = await resolver({
            // @ts-expect-error - the newStoryData is fine here
            story: clonedStoryData.content,
            slug: clonedStoryData.full_slug,
            options,
          });
        } else {
          clonedStoryData.content.resolver_data = oldStoryData?.resolver_data;
        }
      }
    }

    // Hack to get this to work with listing_page since it doesn't use body
    if ('aside_blocks' in clonedStoryData.content && Array.isArray(clonedStoryData.content.aside_blocks)) {
      await Promise.all(
        clonedStoryData.content.aside_blocks.map((newComponent) => {
          return resolveComponentData(newComponent, oldComponentsMap, clonedStoryData, {
            ...options,
            slug: clonedStoryData.full_slug,
          });
        }),
      );
    }

    if ('body' in clonedStoryData.content && Array.isArray(clonedStoryData.content.body)) {
      await Promise.all(
        clonedStoryData.content.body.map((newComponent) => {
          return resolveComponentData(newComponent, oldComponentsMap, clonedStoryData, {
            ...options,
            slug: clonedStoryData.full_slug,
          });
        }),
      );
    }
    return clonedStoryData;
  } catch (error) {
    console.error('[resolveStoryData] Error resolving story data:', error);
    return newStoryData;
  }
}

// === Helper Functions === //
export function isSbComponentType(obj: unknown): obj is SBComponent<string> {
  if (typeof obj !== 'object' || obj === null) {
    console.error('[isSbComponentType] Input must be a non-null object.');
    return false;
  }

  if (
    !(
      'component' in obj ||
      ('content' in obj && obj.content && typeof obj.content === 'object' && 'component' in obj.content)
    )
  ) {
    console.error('[isSbComponentType] Object must have a "component" property.');
    return false;
  }

  // @ts-expect-error - the obj is fine here
  const maybeComponent = obj.component || obj.content.component;

  if (typeof maybeComponent !== 'string' || maybeComponent === undefined) {
    console.error('[isSbComponentType] The "component" property must be a non-empty string.');
    return false;
  }

  return true;
}

function getValuesByPath(obj: SBComponent<string> | undefined, path: string): unknown[] {
  if (!obj) return [];

  const keys = path.split('.');
  // Initialize an array 'values' with the passed object. This array will hold the values we collect.
  let values: unknown[] = [obj];

  for (const key of keys) {
    // If the key is '*', it means we want to dig into each item of an array.
    if (key === '*') {
      values = values.flatMap((val: unknown) => (Array.isArray(val) ? val : []));
    } else {
      // If the key is not '*', it means we are accessing an object property.
      // Map over each value and try to access its property specified by 'key'.
      // If the value is null or undefined, store undefined in the array.
      values = values.map((val: unknown) => {
        return val !== null && typeof val === 'object' && key in val
          ? (val as Record<string, unknown>)[key]
          : undefined;
      });
    }
  }

  return values;
}

export function getValueFromComponentResolverMap(
  map: ComponentResolverMap,
  key: string | undefined,
):
  | {
      resolver: ComponentDataResolvers[keyof ComponentDataResolvers];
      watchFields?: string[];
      componentFields?: string[];
      replaceComponent?: boolean;
      cacheTags?: { field: string; tagType: string }[];
    }
  | { componentFields?: string[] }
  | undefined {
  if (!key) {
    return undefined;
  }

  const entry = map[key as keyof typeof map];

  if (!entry) {
    return undefined;
  }

  if ('resolver' in entry) {
    return {
      resolver: entry.resolver,
      watchFields: entry.watchFields,
      componentFields: entry.componentFields,
      replaceComponent: entry.replaceComponent,
      cacheTags: entry.cacheTags,
    };
  }

  if ('componentFields' in entry) {
    return { componentFields: entry.componentFields };
  }

  return undefined;
}

function componentRichTextMap(data: unknown) {
  const result: Record<string, string[]> = {};

  if (!(data && typeof data === 'object' && 'components' in data && Array.isArray(data.components))) {
    throw new Error('Invalid Storyblok component JSON');
  }

  data.components.forEach((component) => {
    const schemaFields = Object.keys(component.schema);
    const componentFields = schemaFields.filter((field) => {
      return component.schema[field].type === 'richtext';
    });

    if (componentFields.length > 0) {
      result[component.name] = componentFields;
    }
  });

  return result;
}
