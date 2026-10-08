'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import { useEffect, useMemo, useState } from 'react';
import { TimesSvg } from '@/components/svg';
import { fixStoryblokUtcDate } from '@/helpers/date-helpers';
import { GetDatesWithFullWeekNames } from '@/helpers/dates';
import { useSearchParams } from '@/providers/SearchParamsProvider';
import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import cn from 'classnames';
import type { PanelScheduleData } from './panel-schedule-data';
import type { PanelScheduleStoryblok, TimeBlockStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import './PanelSchedule.scss';

interface PanelScheduleProps {
  blok: WithResolvedData<'panel_schedule', PanelScheduleStoryblok, PanelScheduleData>;
}

export default function PanelSchedule({ blok }: PanelScheduleProps) {
  const { start_date, end_date, display_date_filter, display_track_filter, time_blocks } = blok;
  const conferenceTrackData = blok.resolver_data?.tracks || [];

  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});
  const searchParams = useSearchParams();

  const dayMap = useMemo(() => {
    return start_date && end_date ? resolveNumberOfDays(start_date, end_date) : [];
  }, [start_date, end_date]);

  const initialActiveTimeblocks = useMemo(() => {
    return time_blocks ? resolveTimeBlocksByDay(time_blocks as TimeBlockStoryblok[], dayMap, 0) : [];
  }, [time_blocks, dayMap]);

  // Initial Day From Query Params
  let initialDayIndex = 0;
  if (searchParams && searchParams.hasOwnProperty('day')) {
    try {
      const d = parseInt(searchParams.day || '0');
      if (d > 0) {
        initialDayIndex = d - 1;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Initial Track From Query Params
  const initialTracks: Array<string> = [];
  if (searchParams && searchParams.hasOwnProperty('tracks')) {
    try {
      const initialTracksRaw = searchParams.tracks || '';
      const initialTrackNames = decodeURIComponent(initialTracksRaw).split(',');
      initialTrackNames.forEach((trackName) => {
        const found = conferenceTrackData.find((ct) => {
          return ct.name === trackName;
        });
        if (found) {
          initialTracks.push(found.uuid);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  // State
  const [activeDayState, setActiveDayState] = useState<number>(initialDayIndex);
  const [activeTracksState, setActiveTracksState] = useState<string[]>(initialTracks);
  const [activeTimeblocks, setActiveTimeblocks] = useState<TimeBlockStoryblok[] | []>(initialActiveTimeblocks);
  const [hasMatchingTimeblocks, setHasMatchingTimeblocks] = useState<boolean>(true);

  const handleTracks = (trackUuid: string) => {
    let tracks = [...activeTracksState];
    if (tracks.includes(trackUuid)) {
      tracks.splice(tracks.indexOf(trackUuid), 1);
    } else {
      tracks = [...activeTracksState, trackUuid];
    }
    setActiveTracksState(tracks);
    const tracksUsed = getTracksUsedInTimeblocks(tracks, activeTimeblocks);
    setHasMatchingTimeblocks(tracksUsed);
    const names: Array<string> = [];
    tracks.forEach((trackUuid) => {
      const found = conferenceTrackData.find((td) => {
        return td.uuid === trackUuid;
      });
      if (found) {
        names.push(encodeURIComponent(found.name));
      }
    });
    updateUrlQuery('tracks', names.join(','));
  };

  const handleDayFilter = (index: number) => {
    setActiveDayState(index);
    setActiveTimeblocks(resolveTimeBlocksByDay(time_blocks as TimeBlockStoryblok[], dayMap, index));
    updateUrlQuery('day', `${index + 1}`);
  };

  const updateUrlQuery = (prop: string, value: string) => {
    if (typeof window !== 'undefined') {
      const newUrl = new URL(window.location.href);
      if (value) {
        newUrl.searchParams.set(prop, value);
      } else {
        newUrl.searchParams.delete(prop);
      }
      window.history.pushState({ path: newUrl.pathname + newUrl.search }, '', newUrl);
    }
  };

  useEffect(() => {
    const newActiveTimeblocks = resolveTimeBlocksByDay(time_blocks as TimeBlockStoryblok[], dayMap, activeDayState);
    setActiveTimeblocks(newActiveTimeblocks);
  }, [time_blocks, dayMap, activeDayState]);

  const panelClasses = cn('panel-schedule__top', parallaxClass, inViewClass);

  return (
    <PanelGeneric blok={blok} panelName='schedule'>
      <div className={panelClasses} ref={parallaxRef}>
        {/* MAP DAYS */}
        {display_date_filter ? (
          <div className='schedule_days'>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-4 gy-4'>
              {dayMap.map((day, i) => {
                const formatedDate = GetDatesWithFullWeekNames(day);
                return (
                  <div key={i} className='col'>
                    <button className={i === activeDayState ? 'active' : ''} onClick={() => handleDayFilter(i)}>
                      <h4>Day {i + 1}</h4>
                      <p>{formatedDate}</p>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        {/* MAP TRACKS */}
        {display_track_filter ? (
          <div className='schedule_tracks'>
            {conferenceTrackData.length > 0 ? (
              <>
                <h4>Filter by Track(s)</h4>
                <div className='schedule_tracks__row'>
                  {conferenceTrackData.map((trackData) => {
                    const track = trackData.content;
                    const isActive = activeTracksState.includes(trackData.uuid);
                    return (
                      <div key={track._uid}>
                        <button
                          style={{ '--track-color': track.color } as React.CSSProperties}
                          onClick={() => handleTracks(trackData.uuid)}
                          className={isActive ? 'active' : ''}
                        >
                          <p className={track.use_light_text ? 'light-text' : ''}>
                            {track.name} {isActive ? <TimesSvg /> : null}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      <hr className='schedule-divider' />
      {activeTimeblocks && activeTimeblocks.length > 0 ? (
        hasMatchingTimeblocks ? (
          activeTimeblocks.map((blok) => {
            return (
              <StoryblokComponent
                blok={blok}
                key={blok._uid}
                conferenceTracks={conferenceTrackData}
                activeTrackState={activeTracksState}
                activeDay={activeDayState}
              />
            );
          })
        ) : (
          <span className='schedule-empty-filter'>* There are no sessions for the selected track(s)</span>
        )
      ) : (
        <span className='schedule-empty-filter'>* There are no sessions scheduled for this day</span>
      )}
    </PanelGeneric>
  );
}

const resolveNumberOfDays = (start: string, end: string) => {
  const startString = fixStoryblokUtcDate(start);
  const endString = fixStoryblokUtcDate(end);
  const startDate = new Date(startString ? startString : '');
  const startDayInMiliseconds = startDate.getTime();
  const endDate = new Date(endString ? endString : '');
  const totalDays = 1 + Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalDayArray = [];
  for (let i = 0; i < totalDays; i++) {
    const myTime = startDayInMiliseconds + 1000 * 60 * 60 * 24 * i;
    totalDayArray.push(new Date(myTime));
  }
  return totalDayArray;
};

const resolveTimeBlocksByDay = (timeblocks: TimeBlockStoryblok[], dayMap: Date[], activeDayValue: number) => {
  const activeDay = dayMap[activeDayValue];
  const activeBlocks = timeblocks.filter((timeblock) => {
    return new Date(fixStoryblokUtcDate(timeblock?.date) as string).toDateString() === activeDay.toDateString();
  });
  return activeBlocks;
};

const getTracksUsedInTimeblocks = (tracks: string[] | [], timeblocks: TimeBlockStoryblok[] | []) => {
  if (tracks && tracks.length === 0) {
    return true;
  }
  const trackClone = [...tracks];
  for (const timeblok of timeblocks) {
    if (timeblok.sessions && timeblok.sessions.length > 0) {
      for (const session of timeblok.sessions) {
        if (typeof session === 'string') return false;

        if (typeof session?.content.track_name !== 'string' && trackClone.includes(session?.content.track_name.uuid)) {
          return true;
        }
      }
    }
  }
  return false;
};
