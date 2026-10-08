'use client';

import { StoryblokComponent } from '@storyblok/react';
import * as Ref from '@npm-refactored/storyblok-widget-image-text-card';
import type { WidgetImageTextCardStoryblok } from '@/component-types';
import type { WidgetItem } from '@/types';
import './WidgetImageTextCard.scss';
import { isLinkDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { AccessibilityStrategy } from '@npm-refactored/storyblok-widget-image-text-card';

interface WidgetImageTextCardProps extends WidgetItem {
  blok: WidgetImageTextCardStoryblok;
  accessibilityStrategy?: AccessibilityStrategy;
}
export default function WidgetImageTextCard({
  blok,
  // responsiveFieldSizes,
  accessibilityStrategy,
}: WidgetImageTextCardProps) {
  const rootCardClasses = cn(
    blok?.border_color ? `outline-${blok.border_color}` : '',
    blok?.border_color && blok.border_color !== 'transparent' ? 'has-outline' : '',
    blok?.background_color ? `background-${blok.background_color}` : '',
    blok?.text_color ? `text-${blok.text_color}` : '',
    blok?.padding ? 'has-padding' : '',
    blok?.image_border ? 'has-image-border' : '',
    blok?.content_alignment ? blok.content_alignment : '',
  );

  let strategy: AccessibilityStrategy = accessibilityStrategy || 'individual-links';
  if (!accessibilityStrategy && blok?.buttons?.length === 1) {
    strategy = 'whole-card';
  }

  return (
    <Ref.WidgetImageTextCardRoot
      blok={blok}
      className={rootCardClasses}
      accessibilityStrategy={strategy}
      wholeCardLink={
        blok.buttons && blok.buttons.length === 1 && blok.buttons[0]?.link && isLinkDefined(blok.buttons[0]?.link)
          ? blok.buttons[0]?.link
          : undefined
      }
    >
      {blok.buttons &&
        blok.buttons.map((subBlok, idx) => {
          const props: { tabIndex?: number } = {};
          if (strategy !== 'whole-card' && idx === 0 && blok.buttons && blok.buttons.length === 1) {
            props.tabIndex = -1;
          }
          return <StoryblokComponent blok={subBlok} key={subBlok._uid} {...props} />;
        })}
    </Ref.WidgetImageTextCardRoot>
  );
}
