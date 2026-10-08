import { getSitemapDateString } from '@/helpers/date-helpers';
import { getAllSitemapStories } from '@/helpers/server-api-helpers';
import { NextResponse } from 'next/server';
import type { PageStoryblok } from '@/component-types';
import type { ISbStoryData } from '@storyblok/react';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  let stories: Array<ISbStoryData> = [];
  try {
    stories = await getAllSitemapStories();
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500, statusText: 'Internal Server Error' });
  }

  let records = '';

  stories.forEach((story) => {
    const content = story.content as PageStoryblok;
    if (content && content.exclude_from_sitemap) {
      return;
    }
    const d = story.published_at ? new Date(story.published_at) : new Date();
    const storySlug = story.full_slug === 'home' ? '/' : story.full_slug;
    const slug = new URL(storySlug, requestUrl);
    slug.protocol = 'https:';
    records += `<url><loc>${slug.toString()}</loc><lastmod>${getSitemapDateString(d)}</lastmod></url>\n`;
  });

  const xml = `<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${records}</urlset>`;

  return new NextResponse(xml, { status: 200, headers: { 'Content-Type': 'text/xml' } });
}
