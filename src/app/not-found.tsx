import { StoryblokComponent } from '@storyblok/react/rsc';
import StoryblokBridge from '@/components/internal/StoryblokBridge';
import DefaultPageTemplate from '@/components/page-templates/DefaultPage';
import { getFooterStory, getHeaderStory, getNotFoundPage } from '@/helpers/server-api-helpers';
import { NextSeo } from '@npm-refactored/storyblok-next-seo';
import { draftMode } from 'next/headers';
import type { NextSeoProps } from '@npm-refactored/storyblok-next-seo';
import type { Metadata } from 'next';

export default async function NotFound() {
  const { isEnabled } = draftMode();
  const data = await getNotFoundPage(isEnabled);
  const header = await getHeaderStory('not-found', isEnabled);
  const footer = await getFooterStory('not-found', isEnabled);

  if (!data) {
    return 'Page not found. Not even the 404 page.';
  }

  const pageContent = isEnabled ? <StoryblokBridge blok={data} /> : <StoryblokComponent blok={data?.content} />;
  return (
    <>
      <div>
        <title>{data?.content?.seo?.title ? data.content.seo.title : data.name}</title>
      </div>
      <DefaultPageTemplate header={header} footer={footer} pagePath={'/not-found'}>
        {pageContent}
      </DefaultPageTemplate>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const story = await getNotFoundPage(isEnabled);

  const seo: NextSeoProps = {
    metadataBase: new URL(process.env.BASE_URL),
    seoData: story?.content.seo,
    defaultTitle: story?.name,
    storyUrl: story?.full_slug,
    noIndex: story?.content.robots_no_index,
    noFollow: story?.content.robots_no_follow,
  };

  return NextSeo(seo);
}
