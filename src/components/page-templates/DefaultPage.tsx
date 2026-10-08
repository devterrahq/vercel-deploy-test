import { StoryblokComponent } from '@storyblok/react/rsc';
import { Breadcrumbs } from '../internal/breadcrumbs/Breadcrumbs';
import type {
  ConferenceFooterStoryblok,
  ConferenceHeaderStoryblok,
  FooterStoryblok,
  HeaderStoryblok,
} from '@/component-types';
import type { BreadcrumbItem } from '@npm-refactored/pr-breadcrumbs';
import type { ReactNode } from 'react';

interface PageProps {
  header?: HeaderStoryblok | ConferenceHeaderStoryblok;
  footer?: FooterStoryblok | ConferenceFooterStoryblok;
  breadcrumbs?: BreadcrumbItem[];
  pagePath?: string;
  children?: ReactNode;
}

export default function DefaultPageTemplate({ header, footer, breadcrumbs, children }: PageProps) {
  return (
    <>
      {header && <StoryblokComponent blok={header} />}
      <main>
        {breadcrumbs && <Breadcrumbs breadcrumbItems={breadcrumbs} />}
        {children}
      </main>
      {footer && <StoryblokComponent blok={footer} />}
    </>
  );
}
