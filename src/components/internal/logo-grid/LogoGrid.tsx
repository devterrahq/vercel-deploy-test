'use client';

import { createContext, useContext } from 'react';
import { SiteBackgroundColorKeyToClassName, SiteTextColorKeyToClassName } from '@/helpers/datasources';
import { Grid } from '@npm-refactored/pr-grid';
import { Image } from '@npm-refactored/storyblok-next-image';
import { isAssetDefined, useResponsiveFieldSizes } from '@npm-refactored/storyblok-utilities';
import { WidgetImageCaption } from '@npm-refactored/widget-image-caption';
import cn from 'classnames';
import { RefLink } from '../RefLink';
import type { PartnersMap } from './logo-grid-data';
import type { LogoGridItemStoryblok, LogoGridTierStoryblok, PartnerLogoGridItemStoryblok } from '@/component-types';
import type { SBResponsiveField } from '@/types';
import type { GridProps } from '@npm-refactored/pr-grid';
import type { ResponsiveFieldInfo } from '@npm-refactored/storyblok-utilities';
import './LogoGrid.scss';

interface LogoGridProps {
  logoItems?: (LogoGridItemStoryblok | LogoGridTierStoryblok | PartnerLogoGridItemStoryblok)[];
  hideBottomBorder?: boolean;
  itemsPerRow: SBResponsiveField | undefined;
  partnersMap: PartnersMap | undefined;
  parallaxEnabled?: GridProps['parallaxEnabled'];
  parallaxOptions?: GridProps['parallaxOptions'];
  /** Renders the tiers and logos as the redesigned centered tiles. */
  newDesign?: boolean;
}

const PartnersMapContext = createContext<PartnersMap | undefined>(undefined);
export default function LogoGrid({
  partnersMap,
  logoItems,
  hideBottomBorder,
  itemsPerRow,
  parallaxEnabled,
  parallaxOptions,
  newDesign,
}: LogoGridProps) {
  const tiers: Array<LogoGridTierStoryblok> = [];
  const items: Array<LogoGridItemStoryblok | PartnerLogoGridItemStoryblok> = [];
  const responsiveInfo: ResponsiveFieldInfo | undefined = itemsPerRow
    ? {
        algorithm: 'items_per_row',
        data: itemsPerRow,
      }
    : undefined;

  logoItems &&
    logoItems.forEach((item) => {
      switch (item.component) {
        case 'logo_grid_item':
        case 'partner_logo_grid_item':
          items.push(item);
          break;
        case 'logo_grid_tier':
          tiers.push(item);
          break;
        default:
          break;
      }
    });

  return (
    <PartnersMapContext.Provider value={partnersMap}>
      <div className={cn('widget-logo-grid', { 'widget-logo-grid--new-design': newDesign })}>
        {items.length > 0 ? (
          <LogoGridGrid
            itemsPerRow={itemsPerRow}
            items={items}
            responsiveInfo={responsiveInfo}
            parallaxEnabled={parallaxEnabled}
            parallaxOptions={parallaxOptions}
          />
        ) : null}
        {tiers.length > 0
          ? tiers.map((tier, idx) => {
              const titleBackgroundColor = tier.title_background_color
                ? SiteBackgroundColorKeyToClassName(tier.title_background_color)
                : undefined;
              const titleTextColor = tier.title_text_color
                ? SiteTextColorKeyToClassName(tier.title_text_color)
                : undefined;
              const barClasses = cn('tiered-title-bar', titleBackgroundColor),
                textClasses = cn('tiered-title-text', titleBackgroundColor, titleTextColor);
              return (
                <LogoGridTier
                  key={tier._uid}
                  itemsPerRow={itemsPerRow}
                  logoGridTier={tier}
                  titleClasses={textClasses}
                  tierClasses={!hideBottomBorder && idx === tiers.length - 1 ? 'with-bottom-border' : ''}
                  barClasses={barClasses}
                  responsiveInfo={responsiveInfo}
                />
              );
            })
          : null}
      </div>
    </PartnersMapContext.Provider>
  );
}

function RenderItem(item: LogoGridItemStoryblok | PartnerLogoGridItemStoryblok, responsiveInfo?: ResponsiveFieldInfo) {
  const itemImageSize = useResponsiveFieldSizes(responsiveInfo, '100vw');

  if (item.component === 'logo_grid_item') {
    return RenderLogoGridItem(item, itemImageSize);
  } else if (item.component === 'partner_logo_grid_item') {
    return RenderPartnerLogoGridItem(item, itemImageSize);
  }
}
function RenderLogoGridItem(logoGridItem: LogoGridItemStoryblok, itemImageSize: string) {
  return (
    <RefLink className='col widget-logo-grid_link' src={logoGridItem.link} key={logoGridItem._uid}>
      <WidgetImageCaption caption={logoGridItem.caption} role='none'>
        {isAssetDefined(logoGridItem.image) ? (
          <Image className='widget-logo-grid_image' src={logoGridItem.image} sizes={itemImageSize} />
        ) : null}
      </WidgetImageCaption>
    </RefLink>
  );
}
function RenderPartnerLogoGridItem(partnerLogoGridItem: PartnerLogoGridItemStoryblok, itemImageSize: string) {
  const partnersMap = useContext(PartnersMapContext);
  if (!partnersMap) {
    console.warn('PartnersMapContext not found');
    return null;
  }

  if (!partnerLogoGridItem.partner || typeof partnerLogoGridItem.partner !== 'string') {
    return null;
  }

  const partnerData = partnersMap[partnerLogoGridItem.partner];
  if (!partnerData) {
    console.warn(`Partner with UUID ${partnerLogoGridItem.partner} not found in partnersMap`);
    return null;
  }

  return (
    <RefLink className='col widget-logo-grid_link' src={partnerData.site_url} key={partnerData._uid}>
      <WidgetImageCaption role='none'>
        {isAssetDefined(partnerData.logo) ? (
          <Image className='widget-logo-grid_image' src={partnerData.logo} sizes={itemImageSize} />
        ) : null}
      </WidgetImageCaption>
    </RefLink>
  );
}

interface LogoGridGridProps {
  items: Array<LogoGridItemStoryblok | PartnerLogoGridItemStoryblok>;
  itemsPerRow: SBResponsiveField | undefined;
  responsiveInfo?: ResponsiveFieldInfo;
  parallaxEnabled?: GridProps['parallaxEnabled'];
  parallaxOptions?: GridProps['parallaxOptions'];
}
function LogoGridGrid({ items, itemsPerRow, responsiveInfo, parallaxEnabled, parallaxOptions }: LogoGridGridProps) {
  if (!items) {
    return;
  }
  return (
    <Grid
      itemsPerRow={itemsPerRow}
      alignmentVertical='center'
      alignmentHorizontal='center'
      parallaxEnabled={parallaxEnabled}
      parallaxOptions={parallaxOptions}
    >
      {items.map((i) => RenderItem(i, responsiveInfo))}
    </Grid>
  );
}

interface LogoGridTierProps {
  logoGridTier: LogoGridTierStoryblok;
  tierClasses: string | undefined;
  barClasses: string | undefined;
  titleClasses: string | undefined;
  itemsPerRow: SBResponsiveField | undefined;
  responsiveInfo?: ResponsiveFieldInfo;
  parallaxEnabled?: GridProps['parallaxEnabled'];
  parallaxOptions?: GridProps['parallaxOptions'];
}
function LogoGridTier({
  logoGridTier,
  tierClasses,
  barClasses,
  titleClasses,
  itemsPerRow,
  responsiveInfo,
  parallaxEnabled,
  parallaxOptions,
}: LogoGridTierProps) {
  const rootClasses = cn('logo-grid-tier', tierClasses),
    decorativeBarClasses = cn('tiered-title-bar', barClasses),
    textClasses = cn('tiered-title-text', titleClasses);

  return (
    <div className={rootClasses} key={logoGridTier._uid}>
      {logoGridTier.title ? (
        <div className='tiered-header'>
          <div className={decorativeBarClasses} />
          <p className={textClasses}>{logoGridTier.title}</p>
        </div>
      ) : null}
      {logoGridTier.items ? (
        <LogoGridGrid
          itemsPerRow={itemsPerRow}
          items={logoGridTier.items}
          responsiveInfo={responsiveInfo}
          parallaxEnabled={parallaxEnabled}
          parallaxOptions={parallaxOptions}
        />
      ) : null}
    </div>
  );
}
