'use client';

import { useParallax } from '@npm-refactored/hooks';
import { PanelTable as RefPanelTable } from '@npm-refactored/panel-table';
import cn from 'classnames';
import type { PanelTableStoryblok } from '@/component-types';
import './PanelTable.scss';

interface PanelTableTextProps {
  blok: PanelTableStoryblok;
}

export default function PanelTable({ blok }: PanelTableTextProps) {
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const classes = cn(parallaxClass, inViewClass);

  return (
    <div className={classes} ref={parallaxRef}>
      <RefPanelTable blok={blok} />
    </div>
  );
}
