import { StoryblokComponent } from '@storyblok/react/rsc';
import type { PageStoryblok } from '@/component-types';
import type { SbBlokData } from '@storyblok/react/rsc';
import type { ISbComponentType } from 'storyblok-js-client';

interface PageProps {
  blok: ISbComponentType<'page'> & PageStoryblok;
}

export default function Page({ blok }: PageProps) {
  return (
    <>
      {blok.body?.map((nestedBlok: SbBlokData) => {
        if (!nestedBlok._uid) {
          return null;
        }

        return <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />;
      })}
    </>
  );
}
