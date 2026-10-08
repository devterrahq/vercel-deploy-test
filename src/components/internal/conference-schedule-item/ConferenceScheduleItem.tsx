'use client';

import { useEffect, useRef, useState } from 'react';
import { fixStoryblokUtcDate } from '@/helpers/date-helpers';
import { GetDatesWithFullWeekNames } from '@/helpers/dates';
import { IWIText } from '@/helpers/richtext';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import { CaretUpSvg } from '../../svg';
import type { ConferenceScheduleItemStoryblok, PersonStoryblok } from '@/component-types';
import type { ConferenceScheduleItemData } from '@/components/internal/conference-schedule-item/conference-schedule-item-data';
import type { WithResolvedData } from '@/helpers/data-resolver';

interface ConferenceScheduleItemProps {
  blok: WithResolvedData<'conference_schedule_item', ConferenceScheduleItemStoryblok, ConferenceScheduleItemData>;
  activeDay?: number;
}

export default function ConferenceScheduleItem({ blok, activeDay }: ConferenceScheduleItemProps) {
  const render = useRichTextResolver();
  const [openState, setOpenState] = useState<boolean>(false);
  const [itemHref, setItemHref] = useState<string>('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const returnRef = useRef<HTMLDivElement>(null);
  const wrapperData = bodyRef.current?.getBoundingClientRect();
  const wrapperHeight = wrapperData?.height ? wrapperData.height + 384 : 384;
  const presenters = blok?.presenters;
  const presentersMap = blok.resolver_data?.presenters;
  const formattedDateString = fixStoryblokUtcDate(blok?.date ? blok.date : '');
  const formatedDate = GetDatesWithFullWeekNames(new Date(formattedDateString as string));
  const [animate, setAnimate] = useState(false);

  // Open if hash is correct
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageUrl = new URL(window.location.href);
      if (blok.anchor) {
        if (pageUrl.hash) {
          setOpenState(pageUrl.hash === `#${blok.anchor}`);
          returnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      const { searchParams } = pageUrl;
      const tkSpace = searchParams.get('_storyblok_tk[space_id]'),
        tkTkn = searchParams.get('_storyblok_tk[token]'),
        tkTime = searchParams.get('_storyblok_tk[timestamp]');

      if (tkSpace && tkTkn && tkTime) {
        const itemURL = new URL(pageUrl.origin + pageUrl.pathname);
        if (blok.anchor) {
          itemURL.hash = `#${blok.anchor}`;
        }
        if (activeDay !== undefined) {
          itemURL.searchParams.set('day', `${activeDay + 1}`);
        }
        setItemHref(itemURL.href);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const presenterData: Array<PersonStoryblok> = [];
  if (presenters) {
    presenters.forEach((personMeta) => {
      if (typeof personMeta === 'string') {
        if (presentersMap?.[personMeta]) {
          presenterData.push(presentersMap[personMeta]);
        }
      } else {
        presenterData.push(personMeta.content as PersonStoryblok);
      }
    });
  }

  const handleOpenClose = () => {
    if (openState === true) {
      returnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpenState(!openState);
    setAnimate(true);
  };

  return (
    <div
      ref={returnRef}
      className={`time-block-wrapper ${animate ? 'animate' : ''}`}
      data-state={openState ? 'open' : 'closed'}
      style={{ '--timeblock-body-height-open': `${wrapperHeight}px` } as React.CSSProperties}
      id={blok.anchor || ''}
    >
      {itemHref && blok.anchor ? (
        <div style={{ padding: 5, margin: 0 }}>
          <p>Session Link: {itemHref}</p>
        </div>
      ) : null}
      <div className='time-tabs'>
        <div
          className='left-tab'
          style={
            blok?.track_name && typeof blok?.track_name !== 'string' && blok?.track_name?.content?.color
              ? ({ '--track-color': blok?.track_name?.content?.color } as React.CSSProperties)
              : ({ '--track-color': 'black' } as React.CSSProperties)
          }
        >
          {blok?.track_name && typeof blok?.track_name !== 'string' && blok?.track_name?.content?.name ? (
            <IWIText as='p' text={blok?.track_name?.content?.name} />
          ) : (
            <IWIText as='p' text={blok.name} />
          )}
        </div>
        <div className='right-tab'>{blok?.ce_credits ? <IWIText as='p' text={blok.ce_credits} /> : null}</div>
      </div>
      <div className='time-block-content'>
        {isRichtextDefined(blok.session_title) ? (
          <div className='session-title'>{render(blok.session_title)}</div>
        ) : null}
        <div className='session-body' ref={bodyRef}>
          <p>
            {blok?.start_time ? blok.start_time : null} - {blok?.end_time ? blok.end_time : null},{' '}
            {formatedDate ? formatedDate : null}
          </p>
          {blok?.room ? (
            <p>
              <b>Room</b>: {blok?.room}
            </p>
          ) : null}
          <PresenterBlock presenters={presenterData} />
          {blok.session_description && isRichtextDefined(blok.session_description) ? (
            <div className='session-body-description richtext-margin-helper'>{render(blok.session_description)}</div>
          ) : null}
        </div>
      </div>
      <div className='time-block-toggle-wrap'>
        <div className='time-block-fade'></div>
        <div className='time-block-toggle'>
          <button className='btn' onClick={() => handleOpenClose()}>
            {openState ? <CaretUpSvg /> : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  );
}

interface PresenterBlockProps {
  presenters: Array<PersonStoryblok>;
}
function PresenterBlock(props: PresenterBlockProps) {
  if (props.presenters && props.presenters.length > 0) {
    return (
      <div>
        <p>
          <b>Presenters:</b>
        </p>
        {props.presenters.map((person) => {
          const text: Array<string> = [];
          if (person.name) {
            text.push(`<b>${person.name}</b>`);
          }
          if (person.certifications) {
            text.push(person.certifications);
          }
          if (person.title) {
            text.push(person.title);
          }
          return <IWIText as='p' text={text.join(', ')} />;
        })}
      </div>
    );
  }
}
