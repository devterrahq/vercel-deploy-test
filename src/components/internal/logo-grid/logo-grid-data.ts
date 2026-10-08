import { getPartnersByUuids } from '@/helpers/api-client-helpers';
import type { PanelLogoGridStoryblok, PartnerStoryblok, WidgetLogoGridStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';

export type PartnersMap = Record<string, PartnerStoryblok>;
export type LogoGridData = {
  partners: PartnersMap;
};

export async function getLogoGridData({
  options: { isDraftMode },
  component,
}: ComponentResolverData<PanelLogoGridStoryblok | WidgetLogoGridStoryblok>): Promise<LogoGridData> {
  const partners = component?.items?.flatMap((item) => {
    if (item.component === 'partner_logo_grid_item') {
      return item.partner;
    }

    if (item.component === 'logo_grid_tier') {
      return (
        item.items?.map((item) => {
          if (item.component === 'partner_logo_grid_item') {
            return item.partner;
          }
        }) || []
      );
    }

    return [];
  });

  const isResolved = partners?.every((partner) => typeof partner !== 'string');
  const partnerMap: PartnersMap = {};

  if (!isResolved) {
    const res = await getPartnersByUuids((partners as string[]).join(','), isDraftMode);

    res?.forEach((partner) => {
      partnerMap[partner.uuid] = partner.content;
    });
  } else {
    partners?.forEach((partner) => {
      if (typeof partner !== 'string' && partner?.uuid) {
        partnerMap[partner.uuid] = partner.content;
      }
    });
  }

  return {
    partners: partnerMap,
  };
}
