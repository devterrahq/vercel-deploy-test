'use client';

import { Accordion } from '@/components/widgets/accordion/WidgetAccordion';
import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import cn from 'classnames';
import type { PanelAccordionStoryblok } from '@/component-types';
import './PanelAccordion.scss';

interface PanelAccordionProps {
  blok: PanelAccordionStoryblok;
  rootLevel?: boolean;
}

export default function PanelAccordion({ blok, rootLevel = false }: PanelAccordionProps) {
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const wrapperClasses = cn('panel-accordion_wrapper', parallaxClass, inViewClass);
  return (
    <PanelGeneric blok={blok} panelName='accordion'>
      <div className={wrapperClasses} ref={parallaxRef}>
        <Accordion items={blok.accordion} blok={blok} rootLevel={rootLevel} />
      </div>
    </PanelGeneric>
  );
}
