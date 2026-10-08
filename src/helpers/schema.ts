import { getIso8601FromStoryblokDate } from './date-helpers';
import type { ISbStoryData } from 'storyblok-js-client';

export function getPageSchema(data: ISbStoryData) {
  if (!data) {
    return '';
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let schemaList: Array<any> = [];

  if (data && data.content && data.content.schema) {
    schemaList = joinSchema(getCustomSchemaFromStory(data), schemaList);
  }
  if (data.content && data.content.component === 'article') {
    schemaList = joinSchema(getArticleSchemaFromStory(data), schemaList);
  }

  if (schemaList.length > 1) {
    return JSON.stringify(schemaList);
  } else if (schemaList.length === 1) {
    return JSON.stringify(schemaList[0]);
  }
  // console.log('RETURNING');
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function joinSchema(s: any, list: Array<any>) {
  if (Array.isArray(s)) {
    list = list.concat(s);
  } else if (s) {
    list.push(s);
  }
  return list;
}

function getCustomSchemaFromStory(data: ISbStoryData) {
  if (data && data.content && data.content.schema) {
    try {
      const jsonMatch = data.content.schema.match(
        /<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>/,
      );
      // console.log('PASSED THE MATCH', JSON.parse(jsonMatch));
      if (jsonMatch) {
        const jsonData = JSON.parse(jsonMatch[1]);
        return jsonData;
      } else {
        console.error('No JSON found in the script tag.');
      }
    } catch (err) {
      console.error('Failed to parse schema json.', err);
    }
  }
}

// https://developers.google.com/search/docs/appearance/structured-data/article
function getArticleSchemaFromStory(data: ISbStoryData) {
  const articleSchema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
  };

  if (data && data.content) {
    if (data.content.headline) {
      articleSchema.headline = data.content.headline;
    }
    if (data.content.date) {
      articleSchema.datePublished = getIso8601FromStoryblokDate(data.content.date);
    }
    if (data.content.authors && data.content.authors.length > 0) {
      data.content.authors.forEach((author: ISbStoryData) => {
        const authorSchema: PersonSchema = {
          '@type': 'Person',
          'name': author.content.name,
        };
        if (articleSchema.author) {
          articleSchema.author.push(authorSchema);
        } else {
          articleSchema.author = [authorSchema];
        }
      });
    }
    if (data.content.seo && data.content.seo.og_image) {
      articleSchema.image = [data.content.seo.og_image];
    }
  }

  return articleSchema;
}

/// TYPES
interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'NewsArticle' | 'BlogPosting';
  'headline'?: string;
  'image'?: Array<string>;
  'datePublished'?: string;
  'dateModified'?: string;
  'author'?: Array<AuthorSchema>;
}

type AuthorSchema = PersonSchema | OrganizationSchema;

interface PersonSchema {
  '@type': 'Person';
  'name': string;
}
interface OrganizationSchema {
  '@type': 'Organization';
  'name': string;
}
