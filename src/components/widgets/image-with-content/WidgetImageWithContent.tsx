'use client';

import { StoryblokComponent } from '@storyblok/react';
import { IWIText } from '@/helpers/richtext';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isAssetDefined, isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import type { WidgetImageWithContentStoryblok } from '@/component-types';
import './WidgetImageWithContent.scss';

interface WidgetImageWithContentProps {
  blok: WidgetImageWithContentStoryblok;
}

export default function WidgetImageWithContent({ blok }: WidgetImageWithContentProps) {
  const render = useRichTextResolver();
  const button = blok.button?.[0];

  return (
    <article className='c--card-a'>
      {isAssetDefined(blok.image) ? (
        <div className='c--card-a__media-wrapper'>
          <Image
            className='c--card-a__media-wrapper__media'
            src={blok.image}
            alt={blok.image.alt ?? ''}
            sizes='(max-width: 768px) 100vw, 33vw'
            unoptimized={blok.image.is_external_url}
          />
        </div>
      ) : null}
      <div className='c--card-a__bd'>
        <div className='c--card-a__bd__content'>
          <IWIText as='h3' className='c--card-a__bd__content__title' text={blok.title} />
          {isRichtextDefined(blok.content) ? (
            <div className='c--card-a__bd__content__subtitle'>{render(blok.content)}</div>
          ) : null}
        </div>
        {button ? (
          <div className='c--card-a__bd__ft'>
            <StoryblokComponent blok={button} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
