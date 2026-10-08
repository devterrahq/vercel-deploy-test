import { StoryblokComponent } from '@storyblok/react/rsc';
import StoryblokBridge from '@/components/internal/StoryblokBridge';
import DefaultPageTemplate from '@/components/page-templates/DefaultPage';
import GlobalPageTemplate from '@/components/page-templates/GlobalPage';
import { decodeMegaparam } from '@/helpers/auth';
import { getPageSchema } from '@/helpers/schema';
import {
  checkRedirect,
  getBreadcrumbData,
  getFooterStory,
  getHeaderStory,
  getStory,
} from '@/helpers/server-api-helpers';
import DraftModeProvider from '@/providers/DraftModeProvider';
import SearchParamsProvider from '@/providers/SearchParamsProvider';
import { NextSeo } from '@npm-refactored/storyblok-next-seo';
import { notFound } from 'next/navigation';
import type { CatchAllPageProps } from '@/types';
import type { NextSeoProps } from '@npm-refactored/storyblok-next-seo';
import type { Metadata } from 'next';

export default async function Page({ params }: CatchAllPageProps) {
  if (!params) {
    console.warn('[DynamicStaticPage] No params provided.');
    return null;
  }

  const { isDraftMode, searchParams } = decodeMegaparam(params.M);
  const storySlug = params.slug ? params.slug.join('/') : 'home';
  const data = await getStory(storySlug, isDraftMode, searchParams);
  const header = await getHeaderStory(storySlug, isDraftMode);
  const footer = await getFooterStory(storySlug, isDraftMode);
  const breadcrumbs = !data?.content?.hide_breadcrumbs ? await getBreadcrumbData(storySlug, isDraftMode) : undefined;

  // TODO: Uncomment this when auth is ready
  // await handleAuth(params.slug, data?.content.permissions as Permissions | undefined, decodeMegaparam(params.M));

  // Handle 404
  if (!data) {
    notFound();
  }

  // Handle redirect
  checkRedirect(isDraftMode, data);

  const pageContent = isDraftMode ? <StoryblokBridge blok={data} /> : <StoryblokComponent blok={data?.content} />;
  const noPreviewPage =
    storySlug.startsWith('globals') ||
    (data.content.component &&
      ['article_topic', 'conference_header', 'conference_footer'].indexOf(data.content.component) !== -1);

  if (noPreviewPage) {
    return (
      <DraftModeProvider isDraftMode={isDraftMode}>
        <SearchParamsProvider searchParams={searchParams}>
          <GlobalPageTemplate blok={data} pagePath={storySlug}>
            {pageContent}
          </GlobalPageTemplate>
        </SearchParamsProvider>
      </DraftModeProvider>
    );
  } else {
    const schema: string = getPageSchema(data);
    return (
      <DraftModeProvider isDraftMode={isDraftMode}>
        <SearchParamsProvider searchParams={searchParams}>
          {schema ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: schema }} /> : null}
          <DefaultPageTemplate header={header} footer={footer} breadcrumbs={breadcrumbs}>
            {pageContent}
          </DefaultPageTemplate>
        </SearchParamsProvider>
      </DraftModeProvider>
    );
  }
}

export function generateStaticParams(): CatchAllPageProps[] {
  return [
    {
      params: {
        M: '~false~false~',
        slug: ['/'],
      },
    },
  ];
}

export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata | undefined> {
  const storySlug = params.slug ? params.slug.join('/') : 'home';
  const data = await getStory(storySlug);

  if (data) {
    if (!data?.content.seo) {
      data.content.seo = {
        title: data.name,
        description: '',
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_title: '',
        twitter_description: '',
        twitter_image: '',
        plugin: 'seo_metatags',
      };
    } else {
      data.content.seo.title = data.content.seo.title || data.name;
      data.content.seo.og_title = data.content.seo.og_title || data.content.seo.title || data.name;
      data.content.seo.og_description = data.content.seo.og_description || data.content.seo.description || '';
      data.content.seo.twitter_title = data.content.seo.twitter_title || data.content.seo.title || data.name;
      data.content.seo.twitter_description = data.content.seo.twitter_description || data.content.seo.description || '';
    }

    const seo: NextSeoProps = {
      metadataBase: new URL(process.env.BASE_URL),
      seoData: data.content.seo,
      defaultTitle: data.name,
      storyUrl: data.path != '/' ? data.full_slug.replace(/\/$/, '') : '/',
      noIndex: data.content.robots_no_index,
      noFollow: data.content.robots_no_follow,
    };

    return NextSeo(seo);
  }
}
