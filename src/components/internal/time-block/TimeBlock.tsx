'use client';

import { StoryblokComponent } from '@storyblok/react';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import './TimeBlock.scss';
import { replaceTimeInDate } from '@/helpers/dates';
import type { ConferenceTrackStoryblok, TimeBlockStoryblok } from '@/component-types';
import type { StoryblokStory } from '@npm-refactored/storyblok-generate-ts';
import type { ReactNode } from 'react';

interface TimeBlockProps {
  blok: TimeBlockStoryblok;
  conferenceTracks?: StoryblokStory<ConferenceTrackStoryblok>[] | [];
  activeTrackState: string[] | [];
  activeDay: number;
}

export default function TimeBlock({
  blok,
  activeTrackState,
  conferenceTracks = undefined,
  activeDay = 0,
}: TimeBlockProps) {
  const trackMap: { [key: string]: StoryblokStory<ConferenceTrackStoryblok> } = {};
  if (conferenceTracks) {
    conferenceTracks.map((track) => (trackMap[track.uuid] = track));
  }
  const render = useRichTextResolver();
  const tracks = [...activeTrackState];
  const scheduleItemsData =
    tracks && tracks.length > 0
      ? blok?.sessions?.filter((item) => {
          if (typeof item === 'string') return false;
          if (typeof item.content.track_name === 'string') return false;
          return tracks.includes(item.content.track_name.uuid);
        })
      : blok?.sessions;
  const showTitle = tracks.length < 1 || (scheduleItemsData && scheduleItemsData.length > 0);
  const subtitle = render(blok?.subtitle);

  return (
    <div className='widget-time-block__root'>
      {blok?.time_range_label && showTitle ? <p className='widget-time-block-title'>{blok?.time_range_label}</p> : null}
      {subtitle && showTitle ? <div className='widget-time-block-subtitle'>{subtitle}</div> : null}
      {scheduleItemsData && scheduleItemsData.length > 0
        ? scheduleItemsData
            .sort(function (a, b) {
              if (typeof a === 'string' || typeof b === 'string') return 0;

              const first = replaceTimeInDate(a.content.date, a.content.start_time);
              const second = replaceTimeInDate(b.content.date, b.content.start_time);
              return first.valueOf() - second.valueOf();
            })
            .map((item): ReactNode => {
              if (typeof item === 'string') return null;
              if (typeof item.content.track_name === 'string') {
                const trackName: string = item.content.track_name;
                item.content.track_name = trackMap[trackName];
              }

              return (
                <div key={item.uuid}>
                  <StoryblokComponent blok={item.content} activeDay={activeDay} />
                </div>
              );
            })
        : null}
    </div>
  );
}
