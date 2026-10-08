'use client';

import { StepSvg } from '@/components/svg/StepSvg';
import { SiteTextColorKeyToClassName } from '@/helpers/datasources/site';
import { IWIText } from '@/helpers/richtext';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import cn from 'classnames';
import type { WidgetStepStoryblok } from '@/component-types';
import type { RichtextDocument } from '@npm-refactored/storyblok-rich-text';
import './WidgetStep.scss';

interface WidgetStepProps {
  blok: WidgetStepStoryblok;
}
export default function WidgetStep({ blok }: WidgetStepProps) {
  return (
    <Step
      stepNumber={blok.step_number}
      title={blok.title}
      description={blok.description}
      titleColor={blok.title_color}
      paddingTop={blok.padding_top}
      paddingBottom={blok.padding_bottom}
    />
  );
}

interface StepProps {
  stepNumber?: string;
  title?: string;
  description?: RichtextDocument;
  titleColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
}
export function Step({ stepNumber, title, description, titleColor, paddingTop, paddingBottom }: StepProps) {
  const render = useRichTextResolver();
  const wrapperClasses = cn(
    'widget-step',
    PaddingKeyToClass(paddingTop, 'top'),
    PaddingKeyToClass(paddingBottom, 'bottom'),
  );
  const titleClasses = cn('widget-step-title', SiteTextColorKeyToClassName(titleColor ? titleColor : 'dark-navy'));
  return (
    <div className={wrapperClasses}>
      {stepNumber ? (
        <div className='widget-step-number'>
          <StepSvg step={stepNumber || '1'} />
        </div>
      ) : null}
      <div className='widget-step-content'>
        {title ? <IWIText as='h3' className={titleClasses} text={title} /> : null}
        {description ? <div className='richtext-margin-helper'>{render(description)}</div> : null}
      </div>
    </div>
  );
}

function PaddingKeyToClass(key: string | undefined, side: 'top' | 'bottom') {
  switch (key) {
    case 'sm':
    case 'md':
    case 'lg':
      return `step-padding-${side}-${key}`;
    default:
      return '';
  }
}
