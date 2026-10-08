'use client';

import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import cn from 'classnames';
import type { PanelDividerStoryblok } from '@/component-types';
import './PanelDivider.scss';
import { BorderColorKeyToClassName } from '@/helpers/datasources/border-colors';

interface PanelDividerProps {
  blok: PanelDividerStoryblok;
}

function ThicknessKeyToClassName(key: 'thin' | 'medium' | 'thick' | undefined) {
  switch (key) {
    case 'medium':
      return 'panel-divider--medium';
    case 'thick':
      return 'panel-divider--thick';
    default:
      return '';
  }
}

export default function PanelDivider({ blok }: PanelDividerProps) {
  const hrClasses = cn(ThicknessKeyToClassName(blok.line_thickness), BorderColorKeyToClassName(blok.line_color));
  return (
    <PanelGeneric panelName='divider' blok={blok}>
      <hr className={hrClasses} />
    </PanelGeneric>
  );
}
