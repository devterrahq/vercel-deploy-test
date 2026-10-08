'server only';

import StoryblokComponentJson from '@/components.storyblok.json';
import { getPersonData, getTestimonialByStoryUUID } from '@/helpers/api-client-helpers';
import {
  getAllSiteSearchStories,
  getAllSiteSearchStoriesToRemove,
  GetSiteSearchStoryById,
} from '@/helpers/server-api-helpers';
import algoliasearch from 'algoliasearch';
import type { PageStoryblok, PanelTestimonialStoryblok, WidgetProfileCardStoryblok } from '@/component-types';
import type { SBComponent, SBStoryData } from '@/types';
import type { SearchClient } from 'algoliasearch';
import type { StoryblokRichtext, StoryblokRichtextContent } from 'storyblok-rich-text-react-renderer';

export interface SiteSearchAlgoliaRecord {
  objectID: string;
  url?: string;
  title?: string;
  meta_description?: string;
  content?: string;
  image?: string;
  storyFullSlug: string;
  [key: string]: unknown;
}

export interface ParseStoryblokComponentJsonOptions {
  include?: Record<
    string,
    (
      | string
      | {
          fieldName: string;
          callback: (component: SBComponent) => Promise<string>;
        }
    )[]
  >;
  exclude?: Record<string, string[] | boolean>;
}

export type IndexableContentFields = Record<
  string,
  Record<string, string | ((component: SBComponent) => Promise<string>)>
>;

export class SiteSearchHandler {
  private algoliaClient: SearchClient;
  public indexName: string;
  private componentFieldMap: IndexableContentFields;

  constructor() {
    this.indexName = 'iwi_site_search';

    this.algoliaClient = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
      process.env.ALGOLIA_ADMIN_KEY || '',
    );
    this.componentFieldMap = this.parseStoryblokComponentJson(StoryblokComponentJson, {
      exclude: {
        article: true,
        article_topic: true,
        conference_footer: true,
        conference_header: true,
        conference_schedule_item: true,
        conference_track: true,
        Footer: true,
        footer_button: true,
        footer_column: true,
        footer_image_link: true,
        footer_link: true,
        footer_link_group: true,
        footer_social_row: true,
        Header: true,
        internal_documentation_page: true,
        listing_page: true,
        logo_grid_item: true,
        logo_grid_tier: true,
        nav_group: true,
        nav_link: true,
        nav_menu: true,
        nav_root_item: true,
        nav_root_item_button: true,
        nav_root_item_slideout: true,
        nav_slide_item: true,
        nav_text: true,
        not_found_page: true,
        page: true,
        panel: true,
        panel_divider: true,
        panel_table: true,
        partner: true,
        partner_logo_grid_item: true,
        person: ['certifications'],
        search_page: true,
        utility_nav_group: true,
        utility_nav_item: true,
        utility_nav_login_item: true,
        widget_article_archive_listing: true,
        widget_article_topic_listing: true,
        widget_button: true,
        widget_button_modal: true,
        widget_conference_price: true,
        widget_countdown_timer: true,
        widget_cta_card: ['link_text'],
        widget_html5_video_embed: true,
        widget_hubspot_embed: true,
        widget_icon_text: true,
        widget_iframe_embed: true,
        widget_image: true,
        widget_profile_card: ['link_text'],
        widget_script_embed: true,
        widget_statistic: true,
        widget_table: true,
        widget_vimeo_embed: true,
        widget_youtube_embed: true,
      },
      include: {
        panel_testimonial: [
          {
            fieldName: 'testimonial_data',
            callback: async (component) => {
              try {
                const panel = component as PanelTestimonialStoryblok;

                if (!panel.testimonial_data) {
                  return '';
                }

                const testData = await getTestimonialByStoryUUID(panel.testimonial_data as string, false);
                if (testData) {
                  return await this.parseComponentToPlaintext(testData, this.componentFieldMap);
                } else {
                  console.error('testimonial not found');
                  throw 'Testimonial not found';
                }
              } catch (err) {
                console.error('Error fetching testimonial data: ', err);
                return '';
              }
            },
          },
        ],
        widget_profile_card: [
          {
            fieldName: 'person',
            callback: async (component) => {
              try {
                const widget = component as WidgetProfileCardStoryblok;
                const personData = await getPersonData(widget.person as string);
                if (personData) {
                  return await this.parseComponentToPlaintext(personData, this.componentFieldMap);
                } else {
                  console.error('Person not found');
                  throw 'Person not found';
                }
              } catch (err) {
                console.error('Error fetching Person data: ', err);
                return '';
              }
            },
          },
        ],
      },
    });
  }

  public async indexAllPages() {
    try {
      const algoliaClient = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID || '',
        process.env.ALGOLIA_ADMIN_KEY || '',
      );
      const index = algoliaClient.initIndex(this.indexName);
      const stories = (await getAllSiteSearchStories()) as SBStoryData<PageStoryblok>[];

      const dataObjects: SiteSearchAlgoliaRecord[] = [];
      const indexedStories = [];
      for (const story of stories) {
        const storyIndexData = await this.toAlgoliaSiteSearchRecord(story);
        if (!storyIndexData) continue;
        indexedStories.push(story.id);
        dataObjects.push(storyIndexData);
      }

      try {
        // get list of stories not to be indexed
        console.log('Stories to index: ', indexedStories);
        const indexedStoriesString = indexedStories.join(',');
        const unwantedStories = await getAllSiteSearchStoriesToRemove(indexedStoriesString);

        // create list of unwantedIds
        const unwantedIds = [];
        for (const story of unwantedStories) {
          if (story.id) {
            unwantedIds.push(story.id.toString());
          }
        }
        console.log('Stories to remove: ', unwantedIds);
        // remove stories from Algolia index
        const deleted = await index.deleteObjects(unwantedIds);
        console.log('Removed from Algolia index: ', deleted);
      } catch (err) {
        console.log('Error occurred during deleting');
        console.error(err);
      }

      return await index.saveObjects(dataObjects);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error indexing data:', error);
        return {
          success: false,
          message: 'Error occurred during indexing.',
          error: error.message,
        };
      } else {
        console.error(error);
        return {
          success: false,
          message: 'Error occurred during indexing.',
          error: error,
        };
      }
    }
  }

  public async toAlgoliaSiteSearchRecord(story: SBStoryData<PageStoryblok>): Promise<SiteSearchAlgoliaRecord> {
    const storyIndexData: SiteSearchAlgoliaRecord = {
      objectID: story.id.toString(),
      title: story.content.seo?.title || story.name,
      url: story.full_slug,
      image: story.content.seo?.og_image || story.content.seo?.twitter_image,
      meta_description:
        story.content.seo?.description ||
        story.content.seo?.og_description ||
        story.content.seo?.twitter_description ||
        '',
      content: '',
      storyFullSlug: story.full_slug,
      // gated: story.content.permissions ? story.content.permissions.requiresAuth === 'yes' : false,
    };

    if (storyIndexData.content) storyIndexData.content += '\n';

    for (const component of story.content.body || []) {
      storyIndexData.content += await this.parseComponentToPlaintext(component, this.componentFieldMap);
    }

    // Serialize storyIndexData to JSON and check size
    let jsonData = JSON.stringify(storyIndexData);
    while (new TextEncoder().encode(jsonData).length > 10000) {
      // If the content is empty and it's still too large, break the loop to avoid an infinite loop.
      if (!storyIndexData.content || storyIndexData.content.length === 0) break;

      // Reduce the content length by one character
      storyIndexData.content = storyIndexData.content.slice(0, -1);

      // Re-serialize after modification
      jsonData = JSON.stringify(storyIndexData);
    }

    return storyIndexData;
  }

  public async saveSiteSearchRecord(story: SBStoryData<PageStoryblok>, type: 'page' = 'page') {
    const index = this.algoliaClient.initIndex(this.indexName);
    let formatedResource: SiteSearchAlgoliaRecord | undefined;

    if (type === 'page') {
      formatedResource = await this.toAlgoliaSiteSearchRecord(story as SBStoryData<PageStoryblok>);
    }

    if (!formatedResource) return;
    return await index.saveObject(formatedResource);
  }

  public async updateSiteSearchRecord(storyId: string) {
    const story = await GetSiteSearchStoryById(storyId);
    if (story) {
      const index = this.algoliaClient.initIndex(this.indexName);
      if (story.content.exclude_from_internal_search === true) {
        try {
          // returns task id if attempting to delete indexes not
          // present in algolia
          await index.deleteObject(storyId);
        } catch (err) {
          console.error(err);
        }
      } else {
        const resource = await this.toAlgoliaSiteSearchRecord(story as SBStoryData<PageStoryblok>);
        await index.saveObject(resource);
      }
    }
  }

  public async deleteSiteSearchRecord(storyId: string) {
    const index = this.algoliaClient.initIndex(this.indexName);
    const data = await index.deleteObject(storyId);

    return data;
  }

  public async deleteSiteSearchRecordByFullSlug(fullSlug: string, shouldDeleteChildren = false) {
    try {
      const index = this.algoliaClient.initIndex(this.indexName);

      // Search for records with the specific fullSlug
      const searchResponse = await index.search<SiteSearchAlgoliaRecord>(fullSlug);

      // parse the records to get the objectIDs as long as the storyFullSlug field matches the fullSlug
      // or if the shouldDeleteChildren flag is true, then delete all records that have the fullSlug as a prefix
      const objectIDs = searchResponse.hits
        .filter((record) => {
          if (shouldDeleteChildren) {
            return (
              record.storyFullSlug.startsWith(`${fullSlug}/`) || // nested pages
              record.storyFullSlug === fullSlug || // normal page
              record.storyFullSlug === `${fullSlug}/` // root page
            );
          } else {
            return record.storyFullSlug === fullSlug || record.storyFullSlug === `${fullSlug}/`;
          }
        })
        .map((record) => record.objectID);

      // Check if there are records to delete
      if (objectIDs.length === 0) {
        console.log('No records found with the specified full slug');
        return;
      }

      // Delete records
      const deleteResponse = await index.deleteObjects(objectIDs);
      console.log('Deleted records:', deleteResponse);
      return deleteResponse;
    } catch (error) {
      console.error('Error in deleting records by full slug:', error);
      throw error;
    }
  }

  // === Helpers === //
  private parseStoryblokComponentJson(
    data: unknown,
    options: ParseStoryblokComponentJsonOptions = {
      include: {},
      exclude: {},
    },
  ): IndexableContentFields {
    const { include = {}, exclude = {} } = options;
    const fieldTypes = ['text', 'textarea', 'richtext', 'bloks'];
    const result: IndexableContentFields = {};

    // Validate data structure
    if (!(data && typeof data === 'object' && 'components' in data && Array.isArray(data.components))) {
      throw new Error('Invalid Storyblok component JSON');
    }

    // Process each component
    data.components.forEach((component) => {
      const componentExcludeOptions = exclude[component.name];
      if (componentExcludeOptions === true) return;

      const schemaFields = Object.keys(component.schema);
      const excludeFields = new Set(Array.isArray(componentExcludeOptions) ? componentExcludeOptions : []);

      // Filter and process component fields
      const componentFields = schemaFields.filter((field) => {
        const isFieldIncluded = include[component.name]?.some((includeField) =>
          typeof includeField === 'string' ? includeField === field : includeField.fieldName === field,
        );

        return (!excludeFields.has(field) && fieldTypes.includes(component.schema[field].type)) || isFieldIncluded;
      });

      // Build result for the component
      result[component.name] = componentFields.reduce(
        (acc, field) => {
          const includeField = include[component.name]?.find(
            (includeField) => typeof includeField === 'object' && includeField.fieldName === field,
          );

          acc[field] =
            includeField && typeof includeField !== 'string'
              ? async (component: SBComponent) => includeField.callback(component)
              : component.schema[field].type;

          return acc;
        },
        {} as Record<string, string | ((component: SBComponent) => Promise<string>)>,
      );
    });

    return result;
  }

  private async parseComponentToPlaintext(component: SBComponent, componentFieldMap: IndexableContentFields) {
    if (!component.component) return '';

    const componentFields = componentFieldMap[component.component];
    if (!componentFields) return '';

    let content = '';
    for (const [field, fieldType] of Object.entries(componentFields)) {
      if (fieldType === 'text' || fieldType === 'textarea') {
        content += component[field] || '';
      } else if (fieldType === 'richtext') {
        if (!component[field]) continue;
        content += this.storyblokRichtextToPlaintext(component[field] as StoryblokRichtext);
      } else if (fieldType === 'bloks') {
        const bloks = component[field] as SBComponent[];
        if (!bloks || bloks.length === 0) continue;

        for (const blok of bloks) {
          content += await this.parseComponentToPlaintext(blok, componentFieldMap);
        }
      } else if (typeof fieldType === 'function') {
        const test = await fieldType(component);

        content += test;
      }
      if (content && content.trim()) {
        content += '\n';
      }
    }

    return content;
  }

  private storyblokRichtextToPlaintext(richtext: StoryblokRichtext): string {
    let result = '';

    function traverseContent(content: StoryblokRichtextContent[]) {
      for (const item of content) {
        if (item.type === 'text') {
          result += item.text;
        } else if (item.content) {
          const preContent = result.endsWith(' ') ? '' : ' ';
          traverseContent(item.content);
          const postContent = ['heading', 'paragraph', 'blockquote'].includes(item.type) ? '\n' : '';
          result += preContent + postContent;
        }
      }
    }

    traverseContent(richtext.content);
    return result.trim();
  }
}
