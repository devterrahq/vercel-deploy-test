'use client';

import { useEffect, useState } from 'react';
import LogoGrid from '@/components/internal/logo-grid/LogoGrid';
import { getPartnersByUuids } from '@/helpers/api-client-helpers';
import { useDraftMode } from '@/providers/DraftModeProvider';
import type { WidgetLogoGridStoryblok } from '@/component-types';
import type { LogoGridData, PartnersMap } from '@/components/internal/logo-grid/logo-grid-data';
import type { WithResolvedData } from '@/helpers/data-resolver';

interface WidgetLogoGridProps {
  blok: WithResolvedData<'widget_logo_grid', WidgetLogoGridStoryblok, LogoGridData>;
}

export default function WidgetLogoGrid({ blok }: WidgetLogoGridProps) {
  const [partners, setPartners] = useState<PartnersMap>(blok.resolver_data?.partners || {});
  const isDraftMode = useDraftMode();

  useEffect(() => {
    const uuids =
      blok?.items
        ?.map((item) => {
          if (item.component === 'partner_logo_grid_item') {
            return item.partner;
          }
        })
        .filter((uuid): uuid is string => typeof uuid === 'string') || [];

    getPartnersByUuids(uuids.join(','), isDraftMode)
      .then((res) => {
        const partnerMap: PartnersMap = {};
        res?.forEach((partner) => {
          partnerMap[partner.uuid] = partner.content;
        });

        setPartners(partnerMap);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [blok?.items, blok?.resolver_data?.partners, isDraftMode]);

  return <LogoGrid partnersMap={partners} logoItems={blok.items} itemsPerRow={blok.items_per_row} />;
}
