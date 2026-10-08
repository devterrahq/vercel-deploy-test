'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';
import { ResolveRichText } from '@npm-refactored/storyblok-rich-text';
// Types
import type { InternalDocumentationPageStoryblok } from '@/component-types';
import type { SbBlokData } from '@storyblok/react/rsc';
import type { ISbComponentType } from 'storyblok-js-client';

interface PageProps {
  blok: ISbComponentType<'internal_documentation_page'> & InternalDocumentationPageStoryblok;
}

export default function InternalDocumentationPage({ blok }: PageProps) {
  return (
    <main>
      <section {...storyblokEditable(blok)} className='container'>
        {ResolveRichText(blok.description)}
      </section>
      {blok.body?.map((nestedBlok: SbBlokData) => {
        if (!nestedBlok._uid) {
          return null;
        }

        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />;
      })}
    </main>
  );
}
