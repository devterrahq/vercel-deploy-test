'use client';

import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import cn from 'classnames';
import type { PanelRichtextStoryblok } from '@/component-types';
import './PanelRichtext.scss';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';

interface PanelRichtextProps {
  blok: PanelRichtextStoryblok;
}

export default function PanelRichtext({ blok }: PanelRichtextProps) {
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const verticalAlignment = blok.vertical_alignment ? `panel-richtext-vertical-${blok.vertical_alignment}` : '';
  const horizontalAlignment = blok.horizontal_position ? `panel-richtext-horizontal-${blok.horizontal_position}` : '';
  const textAlign = blok.content_alignment ? `panel-richtext-text-align-${blok.content_alignment}` : '';
  const width = blok.content_width ? `col-12 col-md-${blok.content_width}` : '';

  const alignmentClasses = cn(
    verticalAlignment,
    horizontalAlignment,
    textAlign,
    'panel-richtext__root',
    parallaxClass,
    inViewClass,
  );
  const richtextClasses = cn(width, 'panel-richtext-content', 'richtext-margin-helper');

  return (
    <PanelGeneric blok={blok} panelName='richtext'>
      {isRichtextDefined(blok.content) ? (
        <div className={alignmentClasses} ref={parallaxRef}>
          <div className={richtextClasses}>{render(blok.content)}</div>
        </div>
      ) : null}
    </PanelGeneric>
  );
}
