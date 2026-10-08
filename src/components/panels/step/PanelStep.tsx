'use client';

import { Step } from '@/components/widgets/step/WidgetStep';
import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import cn from 'classnames';
import type { PanelStepStoryblok } from '@/component-types';
import './PanelStep.scss';

interface PanelStepProps {
  blok: PanelStepStoryblok;
}

export default function PanelStep({ blok }: PanelStepProps) {
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const wrapperClasses = cn(parallaxClass, inViewClass);

  return (
    <PanelGeneric blok={blok} panelName='step'>
      <div className={wrapperClasses} ref={parallaxRef}>
        <Step
          stepNumber={blok.step_number}
          title={blok.title}
          description={blok.description}
          titleColor={blok.title_color}
        />
      </div>
    </PanelGeneric>
  );
}
