'use client';

import LogoGrid from '@/components/internal/logo-grid/LogoGrid';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import cn from 'classnames';
import type { PanelLogoGridStoryblok } from '@/component-types';
import type { LogoGridData } from '@/components/internal/logo-grid/logo-grid-data';
import type { WithResolvedData } from '@/helpers/data-resolver';
import './PanelLogoGrid.scss';

interface PanelLogoGridProps {
  blok: WithResolvedData<'panel_logo_grid', PanelLogoGridStoryblok, LogoGridData>;
}

export default function PanelLogoGrid({ blok }: PanelLogoGridProps) {
  return (
    <PanelGeneric
      blok={blok}
      panelName='panel-logo-grid'
      root={{
        className: cn('panel-panel-logo-grid_root', { 'panel-panel-logo-grid_root--new-design': blok.new_design }),
      }}
    >
      <LogoGrid
        partnersMap={blok.resolver_data?.partners}
        logoItems={blok.items}
        itemsPerRow={blok.items_per_row}
        parallaxEnabled={blok.parallax_enabled}
        newDesign={blok.new_design}
      />
    </PanelGeneric>
  );
}
