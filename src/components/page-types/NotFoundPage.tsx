import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';
import type { NotFoundPageStoryblok } from '@/component-types';
import type { SbBlokData } from '@storyblok/react/rsc';
import type { ISbComponentType } from 'storyblok-js-client';

interface PageProps {
  blok: ISbComponentType<'not_found_page'> & NotFoundPageStoryblok;
}

export default function NotFoundPage({ blok }: PageProps) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok: SbBlokData) => {
        if (!nestedBlok._uid) {
          return null;
        }

        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />;
      })}
    </main>
  );
}
