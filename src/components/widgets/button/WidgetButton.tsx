'use client';

import { RefLink } from '@/components/internal/RefLink';
import { AccountCircleSvg, DownloadIcon, OpenInNewSvg, PlaceSvg, VideoPlayArrowSvg } from '@/components/svg';
import { SiteButtonStyleKeyToClassName } from '@/helpers/datasources';
import { IWITextString } from '@/helpers/richtext';
import cn from 'classnames';
import Link from 'next/link';
import type { MultilinkStoryblok, WidgetButtonStoryblok } from '@/component-types';

interface WidgetButtonProps {
  blok: WidgetButtonStoryblok;
}

export default function WidgetButton({ blok }: WidgetButtonProps) {
  return (
    <IWIButton
      storyblokLink={blok.link}
      placeOnNewLine={blok.place_on_new_line}
      buttonStyle={blok.button_style}
      buttonColor={blok.button_color}
      buttonSize={blok.button_size}
      beforeIcon={blok.before_icon}
      afterIcon={blok.after_icon}
      margin={blok.margin}
      ariaLabel={blok.aria_label}
      text={blok.text}
    >
      <span dangerouslySetInnerHTML={{ __html: blok.text ? IWITextString(blok.text) : '' }} />
    </IWIButton>
  );
}

interface IWIButtonProps {
  internalLink?: string;
  storyblokLink?: MultilinkStoryblok;
  ariaLabel?: string;
  text?: string;
  placeOnNewLine?: WidgetButtonStoryblok['place_on_new_line'];
  buttonStyle?: WidgetButtonStoryblok['button_style'];
  buttonColor?: WidgetButtonStoryblok['button_color'];
  buttonSize?: WidgetButtonStoryblok['button_size'];
  beforeIcon?: WidgetButtonStoryblok['before_icon'];
  afterIcon?: WidgetButtonStoryblok['after_icon'];
  margin?: WidgetButtonStoryblok['margin'];
  children?: React.ReactNode;
}
export function IWIButton({
  internalLink,
  storyblokLink,
  placeOnNewLine,
  buttonStyle,
  buttonColor,
  buttonSize,
  beforeIcon,
  afterIcon,
  margin,
  children,
  ariaLabel,
  text,
}: IWIButtonProps) {
  const buttonSizeClass = buttonSize || 'button-lg';
  const btnClass = cn(
    'btn',
    buttonStyle ? SiteButtonStyleKeyToClassName(buttonStyle) : 'button-solid',
    buttonSizeClass,
    beforeIcon || afterIcon ? 'btn-with-icon' : '',
    margin ? 'btn-space-' + margin : '',
    placeOnNewLine ? 'btn-place-on-new-line' : '',
    buttonColor ? 'override-' + buttonColor : '',
  );
  if (internalLink) {
    return (
      <>
        {placeOnNewLine && <br />}
        <Link href={internalLink} className={btnClass} aria-label={ariaLabel ? ariaLabel : text}>
          <span className={buttonStyle && buttonStyle.includes('text-link') ? 'btn-no-flex' : 'btn-flex-box'}>
            {beforeIcon ? <span className='before-icon'>{ButtonSVG(beforeIcon, buttonSize)}</span> : null}
            {children}
            {afterIcon ? <span className='after-icon'>{ButtonSVG(afterIcon, buttonSize)}</span> : null}
          </span>
        </Link>
      </>
    );
  } else if (storyblokLink) {
    return (
      <>
        {placeOnNewLine && <br />}
        <RefLink src={storyblokLink} className={btnClass} ariaLabel={ariaLabel ? ariaLabel : text}>
          <span className={buttonStyle && buttonStyle.includes('text-link') ? 'btn-no-flex' : 'btn-flex-box'}>
            {beforeIcon ? <span className='before-icon'>{ButtonSVG(beforeIcon, buttonSize)}</span> : null}
            {children}
            {afterIcon ? <span className='after-icon'>{ButtonSVG(afterIcon, buttonSize)}</span> : null}
          </span>
        </RefLink>
      </>
    );
  } else {
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    return <a>{children}</a>;
  }
}

export function ButtonSVG(svgKey: string, buttonSize?: string) {
  switch (svgKey) {
    case 'open_in_new':
      if (buttonSize === 'button-sm') {
        return <OpenInNewSvg height={17} width={17} role='presentation' />;
      }
      return <OpenInNewSvg role='presentation' />;
    case 'right_arrow':
      return <span>→</span>;
    case 'video_play_arrow':
      if (buttonSize === 'button-sm') {
        return <VideoPlayArrowSvg height={14} width={16} role='presentation' />;
      }
      return <VideoPlayArrowSvg role='presentation' />;
    case 'place':
      return <PlaceSvg role='presentation' />;
    case 'account_circle':
      return <AccountCircleSvg role='presentation' />;
    case 'download':
      return <DownloadIcon role='presentation' />;
  }
}
