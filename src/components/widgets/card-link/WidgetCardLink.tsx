'use client';

import { RefLink } from '@/components/internal/RefLink';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import type { WidgetCardLinkStoryblok } from '@/component-types';
import './WidgetCardLink.scss';

interface WidgetCardLinkProps {
  blok: WidgetCardLinkStoryblok;
}

export default function WidgetCardLink({ blok }: WidgetCardLinkProps) {
  const render = useRichTextResolver();

  return (
    <RefLink src={blok.link} className='c--card-c'>
      <span className='c--card-c__hd'>
        {blok.title ? <h3 className='c--card-c__hd__title'>{blok.title}</h3> : null}
        <span className='c--card-c__hd__icon' aria-hidden='true' />
      </span>
      {isRichtextDefined(blok.content) ? <div className='c--card-c__content'>{render(blok.content)}</div> : null}
    </RefLink>
  );
}
