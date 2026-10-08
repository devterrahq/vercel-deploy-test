'use client';

import { StoryblokComponent } from '@storyblok/react';
import { Image } from '@npm-refactored/storyblok-next-image';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isAssetDefined, isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import type { PanelLayoutAStoryblok } from '@/component-types';
import './PanelLayoutA.scss';

interface PanelLayoutAProps {
  blok: PanelLayoutAStoryblok;
}

export default function PanelLayoutA({ blok }: PanelLayoutAProps) {
  const render = useRichTextResolver();
  const video = blok.video?.[0];
  const cards = blok.cards ?? [];

  return (
    <PanelGeneric blok={blok} panelName='layout-a'>
      <div className='c--layout-a'>
        {isAssetDefined(blok.background_image) ? (
          <div className='c--layout-a__bg-items' aria-hidden='true'>
            <Image
              className='c--layout-a__bg-items__media'
              src={blok.background_image}
              alt=''
              fill
              sizes='100vw'
              unoptimized={blok.background_image?.is_external_url}
            />
          </div>
        ) : null}
        <div className='c--layout-a__ft-items'>
          <div className='c--layout-a__ft-items__item-left'>
            {blok.title || isRichtextDefined(blok.content) ? (
              <div className='c--layout-a__ft-items__item-left__bd'>
                {blok.title ? <h2 className='c--layout-a__ft-items__item-left__bd__title'>{blok.title}</h2> : null}
                {isRichtextDefined(blok.content) ? (
                  <div className='c--layout-a__ft-items__item-left__bd__content'>{render(blok.content)}</div>
                ) : null}
              </div>
            ) : null}
            {video ? (
              <div className='c--layout-a__ft-items__item-left__media-wrapper'>
                <StoryblokComponent blok={video} />
              </div>
            ) : null}
          </div>
          {cards.length ? (
            <ul className='c--layout-a__ft-items__list-group'>
              {cards.map((card) => (
                <li key={card._uid} className='c--layout-a__ft-items__list-group__item'>
                  <StoryblokComponent blok={card} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </PanelGeneric>
  );
}
