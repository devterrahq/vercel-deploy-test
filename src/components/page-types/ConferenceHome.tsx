import { StoryblokComponent } from '@storyblok/react/rsc';
import type { ConferenceHomeStoryblok } from '@/component-types';
import type { SbBlokData } from '@storyblok/react/rsc';
import type { ISbComponentType } from 'storyblok-js-client';

interface ConferenceHomePageProps {
  blok: ISbComponentType<'conference_home'> & ConferenceHomeStoryblok;
}

export default function ConferenceHome({ blok }: ConferenceHomePageProps) {
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
