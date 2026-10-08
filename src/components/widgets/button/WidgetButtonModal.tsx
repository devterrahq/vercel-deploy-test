'use client';

import { StoryblokComponent } from '@storyblok/react';
import Modal from '@/components/internal/modal/Modal';
import { SiteButtonStyleKeyToClassName } from '@/helpers/datasources';
import { IWITextString } from '@/helpers/richtext';
import cn from 'classnames';
import { ButtonSVG } from './WidgetButton';
import type { WidgetButtonModalStoryblok } from '@/component-types';

interface WidgetButtonProps {
  blok: WidgetButtonModalStoryblok;
}
//meaningless comment to commit a change
export default function WidgetButtonModal({ blok }: WidgetButtonProps) {
  const buttonSize = blok.button_size ? blok.button_size : 'button-lg';
  const btnClass = cn(
    'btn',
    blok.button_style ? SiteButtonStyleKeyToClassName(blok.button_style) : 'button-solid',
    buttonSize,
    blok.before_icon || blok.after_icon ? 'btn-with-icon' : '',
    blok.margin ? 'btn-space-' + blok.margin : '',
    blok.place_on_new_line ? 'btn-place-on-new-line' : '',
    blok.button_color ? 'override-' + blok.button_color : '',
  );
  if (blok.button_style && blok.button_style.includes('text-link')) {
    return (
      <>
        {blok.place_on_new_line && <br />}
        <Modal
          accessibleTitle={blok?.aria_label}
          openTrigger={
            <button className={btnClass}>
              <span className='btn-no-flex'>
                {blok.before_icon ? (
                  <span className='before-icon'>{ButtonSVG(blok.before_icon, buttonSize)}</span>
                ) : null}
                <span dangerouslySetInnerHTML={{ __html: blok.text ? IWITextString(blok.text) : '' }} />
                {blok.after_icon ? <span className='after-icon'>{ButtonSVG(blok.after_icon, buttonSize)}</span> : null}
              </span>
            </button>
          }
          whiteBackground={blok.use_white_background}
        >
          <div>
            {blok.body?.map((bodyBlok) => {
              return <StoryblokComponent key={bodyBlok._uid} blok={bodyBlok} />;
            })}
          </div>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        {blok.place_on_new_line && <br />}
        <Modal
          openTrigger={
            <button className={btnClass}>
              <span className='btn-flex-box'>
                {blok.before_icon ? (
                  <span className='before-icon'>{ButtonSVG(blok.before_icon, buttonSize)}</span>
                ) : null}
                <span dangerouslySetInnerHTML={{ __html: blok.text ? IWITextString(blok.text) : '' }} />
                {blok.after_icon ? <span className='after-icon'>{ButtonSVG(blok.after_icon, buttonSize)}</span> : null}
              </span>
            </button>
          }
          whiteBackground={blok.use_white_background}
        >
          <div>
            {blok.body?.map((bodyBlok) => {
              return <StoryblokComponent key={bodyBlok._uid} blok={bodyBlok} />;
            })}
          </div>
        </Modal>
      </>
    );
  }
}
