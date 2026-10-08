'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import { useEffect, useState } from 'react';
import { resolveStoryData } from '@/helpers/data-resolver';
import { RESOLVE_RELATIONS } from '@/helpers/storyblok-fetch';
import { notFound } from 'next/navigation';
import type { SBComponent } from '@/types';
import type { ISbStoryData } from '@storyblok/js';

interface RefStoryblokBridgeProps {
  blok?: ISbStoryData;
}

const RefStoryblokBridge = ({ blok }: RefStoryblokBridgeProps) => {
  console.log('SB Bridge');

  const [pendingStory, setPendingStory] = useState<ISbStoryData | null>(null);
  const [blokState, setBlokState] = useState<SBComponent<string> | undefined>(blok?.content);

  useEffect(() => {
    loadStoryblokBridgeScript(() => {
      const { StoryblokBridge, location } = window;
      const storyblokInstance = new StoryblokBridge({
        resolveRelations: RESOLVE_RELATIONS,
      });

      storyblokInstance.on(['published', 'change'], () => {
        location.reload();
      });

      storyblokInstance.on(['input'], (e) => {
        if (e && e.story) {
          setPendingStory(e.story);
        }
      });
    });
  }, []);

  useEffect(() => {
    const updateStoryState = async () => {
      try {
        if (!pendingStory) {
          return;
        }

        const story = await resolveStoryData(pendingStory, blokState, {
          isDraftMode: true,
        });
        setBlokState(story.content);
      } catch (error) {
        console.error(error);
      }
    };

    void updateStoryState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingStory]);

  if (!blokState) {
    notFound();
  }

  return <StoryblokComponent blok={blokState} />;
};

/**
 * @see https://github.com/storyblok/storyblok-js/blob/main/lib/modules/bridge.ts
 */
const loadStoryblokBridgeScript = (callback: () => void) => {
  const existingScript = document.getElementById('storyblokBridge');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = '//app.storyblok.com/f/storyblok-v2-latest.js';
    script.async = true;
    script.id = 'storyblok-javascript-bridge';
    script.onload = () => {
      callback();
    };
    script.onerror = (error) => {
      console.error(error);
    };
    document.getElementsByTagName('head')[0]?.appendChild(script);
  } else {
    callback();
  }
};

export default RefStoryblokBridge;
