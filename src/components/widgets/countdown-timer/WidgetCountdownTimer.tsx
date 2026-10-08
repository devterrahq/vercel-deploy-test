'use client';

import './WidgetCountdownTimer.scss';
import { storyblokEditable } from '@storyblok/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SiteTextColorKeyToClassName } from '@/helpers/datasources';
import { BorderColorKeyToClassName } from '@/helpers/datasources/border-colors';
import cn from 'classnames';
import type { WidgetCountdownTimerStoryblok } from '@/component-types';

type Timer = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
} | null;

interface WidgetCountdownTimerProps {
  blok: WidgetCountdownTimerStoryblok;
}

export default function WidgetCountdownTimer({ blok }: WidgetCountdownTimerProps) {
  const eventDate = useMemo(() => new Date(formatSbDateStringToISO(blok.event_date)).getTime(), [blok.event_date]);
  const calculateTimeLeft = useCallback(() => {
    const now = Date.now();
    const milliseconds = eventDate - now;
    return milliseconds > 0
      ? {
          days: Math.floor(milliseconds / (24 * 60 * 60 * 1000))
            .toString()
            .padStart(2, '0'),
          hours: Math.floor((milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
            .toString()
            .padStart(2, '0'),
          minutes: Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000))
            .toString()
            .padStart(2, '0'),
          seconds: Math.floor((milliseconds % (60 * 1000)) / 1000)
            .toString()
            .padStart(2, '0'),
        }
      : null;
  }, [eventDate]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<Timer>({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [shouldEndEarly, setShouldEndEarly] = useState<boolean>(false);

  useEffect(() => {
    if (!showTimer) return;

    const timerInterval = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);

      if (!loaded) {
        setLoaded(true);
      }

      if (!updatedTimeLeft) {
        setShowTimer(false);
        clearInterval(timerInterval);
      }

      if (
        !blok.seconds &&
        !shouldEndEarly &&
        updatedTimeLeft?.days === '00' &&
        updatedTimeLeft.hours === '00' &&
        updatedTimeLeft.minutes === '00'
      ) {
        setShouldEndEarly(true);
      }

      if (blok.seconds && shouldEndEarly) {
        setShouldEndEarly(false);
      }
    }, 1000); // Update every second

    return () => clearInterval(timerInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculateTimeLeft, showTimer, eventDate, blok.seconds]);

  useEffect(() => {
    if (!showTimer) {
      const updatedTimeLeft = calculateTimeLeft();
      if (updatedTimeLeft) {
        setShowTimer(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventDate]);
  const rootClasses = cn(
    'widget-countdown-timer__root',
    blok.show_border ? 'border' : '',
    blok.use_panel_background ? 'transparent-background' : '',
    SiteTextColorKeyToClassName(blok.widget_text_color ?? 'dark-navy'),
    blok.border_color ? BorderColorKeyToClassName(blok.border_color) : '',
  );

  const fadeClass = cn(loaded ? 'timer-loaded' : 'timer-not-loaded');

  const timerSections = cn('timer-section');
  const colonClass = cn('timer-colon');
  let timerAlignment = 'flex-start';
  switch (blok.content_alignment) {
    case 'right':
      timerAlignment = 'flex-end';
      break;
    case 'center':
      timerAlignment = 'center';
      break;
    case 'justify':
      timerAlignment = 'space-evenly';
      break;
    default:
      timerAlignment = 'flex-start';
  }

  return (
    <div {...storyblokEditable(blok)} className={rootClasses}>
      {showTimer && timeLeft && !shouldEndEarly ? (
        <>
          <div
            className='widget-countdown-timer__header'
            style={
              {
                '--countdown-align': blok.content_alignment,
              } as React.CSSProperties
            }
          >
            {blok?.timer_text ? <p>{blok.timer_text}</p> : null}
          </div>
          <div
            className='widget-countdown-timer__body'
            style={
              {
                '--countdown-align': timerAlignment,
              } as React.CSSProperties
            }
          >
            <div className={timerSections}>
              <span id='days' className={fadeClass}>
                {timeLeft.days.padStart(2, '0')}
              </span>
              <span>Days</span>
            </div>

            <span className={colonClass}>:</span>
            <div className={timerSections}>
              <span id='hours' className={fadeClass}>
                {timeLeft.hours.padStart(2, '0')}
              </span>
              <span>Hours</span>
            </div>

            <span className={colonClass}>:</span>
            <div className={timerSections}>
              <span id='minutes' className={fadeClass}>
                {timeLeft.minutes.padStart(2, '0')}
              </span>
              <span>Minutes</span>
            </div>

            {blok?.seconds ? (
              <>
                <span className={colonClass}>:</span>
                <div className={timerSections}>
                  <span id='seconds' className={fadeClass}>
                    {timeLeft.seconds.padStart(2, '0')}
                  </span>
                  <span>seconds</span>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        // show on timer expire
        <div className='widget-countdown-timer__header'>
          {blok?.timer_expire_text ? <p>{blok.timer_expire_text}</p> : null}
        </div>
      )}
    </div>
  );
}

export function formatSbDateStringToISO(sbDateString: string | undefined) {
  if (!sbDateString) return '';
  if (sbDateString.includes('T') && sbDateString.includes('Z')) return sbDateString;

  return sbDateString.replace(' ', 'T') + ':00.000Z';
}
