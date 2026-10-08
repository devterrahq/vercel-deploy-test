'use client';

import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import type { WidgetStatWithContentStoryblok } from '@/component-types';
import './WidgetStatWithContent.scss';

interface WidgetStatWithContentProps {
  blok: WidgetStatWithContentStoryblok;
}

export default function WidgetStatWithContent({ blok }: WidgetStatWithContentProps) {
  const render = useRichTextResolver();

  return (
    <article className='c--card-b'>
      {blok.stat ? <p className='c--card-b__title'>{blok.stat}</p> : null}
      {isRichtextDefined(blok.content) ? <div className='c--card-b__subtitle'>{render(blok.content)}</div> : null}
    </article>
  );
}
