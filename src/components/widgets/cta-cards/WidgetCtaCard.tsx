'use client';

import { RefLink } from '@/components/internal/RefLink';
import { CimaSvg, CpwaSvg, RmaSvg } from '@/components/svg';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isAssetDefined, isLinkDefined, useResponsiveFieldSizes } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { WidgetCtaCardStoryblok } from '@/component-types';
import type { WidgetItem } from '@/types';
import './WidgetCtaCard.scss';

interface WidgetCtaCardProps extends WidgetItem {
  blok: WidgetCtaCardStoryblok;
}

export default function WidgetCtaCard({ blok, responsiveFieldSizes }: WidgetCtaCardProps) {
  const render = useRichTextResolver();
  const Theme = resolveCtaIcon(blok.certification_type);
  const headline = render(blok.headline);
  const body = render(blok.body);
  const isLink = isLinkDefined(blok.link);

  const rootClass = cn('widget-cta_card__root', blok.certification_type);
  const imageSizes = useResponsiveFieldSizes(responsiveFieldSizes, '100vw');

  return (
    <div className={rootClass}>
      <div className='__text'>
        {headline ? <div className='cert-headline'>{headline}</div> : null}
        {body ? <div className='cert-body'>{body}</div> : null}
        {isLink || blok.link_text ? (
          <RefLink className='cert-link' src={blok.link}>
            {blok.link_text}
          </RefLink>
        ) : null}
      </div>
      <div className='__img'>
        {isAssetDefined(blok.image) ? <Image sizes={imageSizes} src={blok.image} /> : null}
        {Theme ? <div className='cert-wrapper'>{<Theme />}</div> : null}
      </div>
    </div>
  );
}

const resolveCtaIcon = (certType: string) => {
  if (certType === 'cima') {
    return CimaSvg;
  } else if (certType === 'cpwa') {
    return CpwaSvg;
  } else if (certType === 'rma') {
    return RmaSvg;
  } else return;
};
