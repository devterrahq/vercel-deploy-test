'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import { useEffect, useState } from 'react';
import Modal from '@/components/internal/modal/Modal';
import { TimesSvg } from '@/components/svg';
import { getConferenceSchedule } from '@/helpers/api-client-helpers';
import { replaceTimeInDate } from '@/helpers/dates';
import { getConferenceHomePath } from '@/helpers/slug-helpers';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { usePathname } from 'next/navigation';
import type { WidgetProfileCardData } from './widget-profile-card-data';
import type { PersonStoryblok, WidgetProfileCardStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import type { ISbStoryData } from '@storyblok/react/rsc';
import './WidgetProfileCard.scss';

interface WidgetProfileCardProps {
  blok: WithResolvedData<'widget_profile_card', WidgetProfileCardStoryblok, WidgetProfileCardData>;
}

export default function WidgetProfileCard({ blok }: WidgetProfileCardProps) {
  const person = blok.resolver_data?.person;

  return blok?.person && typeof blok.person !== 'string' ? (
    <PersonProfile blok={blok.person.content} link_text={blok?.link_text} uuid={blok.person.uuid} />
  ) : (
    <PersonProfile blok={person} link_text={blok?.link_text} uuid={blok.person as string} />
  );
}

interface PersonProps {
  blok: WidgetProfileCardStoryblok | PersonStoryblok | undefined;
  link_text?: string;
  uuid?: string;
}

function PersonProfile({ blok, link_text, uuid }: PersonProps) {
  const pathName = usePathname();

  if (!blok) {
    return null;
  }

  //const showSchedule = pathName.includes('/events/conferences');
  return (
    <div className='widget-profile-card'>
      <div className='widget-profile-card__text'>
        {blok?.name ? <h3>{blok.name}</h3> : null}
        {blok?.title ? <p className='person-title'>{blok.title}</p> : null}
        {blok?.summary ? <p className='summary'>{blok.summary}</p> : null}
      </div>
      <div className='widget-profile-card__button'>
        {link_text ? (
          <Modal
            openTrigger={
              <button className='btn text-link-navy button-sm'>
                <>
                  {link_text}
                  <span> →</span>
                </>
              </button>
            }
            closeTrigger={
              <div className='widget-profile-card-modal-close'>
                <div>
                  <button className='btn' aria-label='Close'>
                    <TimesSvg />
                  </button>
                </div>
              </div>
            }
          >
            <ModalDetailView blok={blok} uuid={uuid} pathName={pathName} />
          </Modal>
        ) : null}
      </div>
      <div className='widget-profile-card__img'>
        {blok?.image?.filename ? (
          <Image src={blok.image} alt={blok.name + ' ' + blok.title} width={270} height={208} />
        ) : null}
      </div>
    </div>
  );
}

interface PersonModalProps {
  blok: WidgetProfileCardStoryblok | PersonStoryblok;
  pathName: string;
  uuid?: string;
  showSchedule?: boolean;
}

function ModalDetailView({ blok, uuid, pathName }: PersonModalProps) {
  const render = useRichTextResolver();
  const biography = blok?.biography ? blok.biography : null;
  const certifications = blok?.certifications ? blok.certifications : null;
  const image = blok?.image ? blok.image : null;
  const name = blok?.name ? blok.name : null;
  const title = blok?.title ? blok.title : null;
  // const { biography, certifications, image, name, title } = blok;
  const [conferenceData, setConferenceData] = useState<ISbStoryData[] | []>([]);
  // const personBio = render(biography);
  const personBio = biography ? render(biography) : null;
  //const pathToSearchIn: string | null = GetProfileModalSchedule(pathName);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const getSpeakerConferenceSchedule = async (path: string) => {
      const items = await getConferenceSchedule(uuid as string, path);
      items.sort(function (a, b) {
        const first = replaceTimeInDate(a.content.date, a.content.start_time);
        const second = replaceTimeInDate(b.content.date, b.content.start_time);
        return first.valueOf() - second.valueOf();
      });
      setMessage(items.length > 0 ? '' : '* There are no sessions scheduled for this day');
      setConferenceData(items);
    };
    void getConferenceHomePath(pathName).then((path) => {
      if (path) {
        setShowSchedule(true);
        void getSpeakerConferenceSchedule(path + '*');
      }
    });
  }, [pathName, uuid]);

  return (
    <div className='widget-profile-card-modal'>
      <div className='widget-profile-card-modal__outer-container'>
        <div className='widget-profile-card-modal__profile-container'>
          <div className='widget-profile-card-modal__text'>
            {name ? <h3>{name}</h3> : null}
            {certifications ? <p className='person-cert'>{certifications}</p> : null}
            {title ? <p className='person-title'>{title}</p> : null}
            {personBio ? <div className='person-bio'>{personBio}</div> : null}
          </div>
          <div className='widget-profile-card-modal__img'>
            {image?.filename ? <Image src={image} alt={name + ' ' + title} width={270} height={208} /> : null}
          </div>
        </div>
        <div className='widget-profile-card-modal__schedule-container'>
          {showSchedule ? (
            <div className='widget-time-block__root'>
              {conferenceData && conferenceData.length > 0 ? (
                conferenceData.map((conference, i) => {
                  return <StoryblokComponent blok={conference.content} key={i} />;
                })
              ) : (
                <span className='schedule-empty-filter'>{message}</span>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
