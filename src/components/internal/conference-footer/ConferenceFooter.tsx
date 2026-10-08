'use client';

import { storyblokEditable } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { FacebookSvg, LinkedInSvg, TwitterXSvg, YoutubeSvg } from '@/components/svg';
import { ButtonSVG } from '@/components/widgets/button/WidgetButton';
import * as RefFooter from '@npm-refactored/pr-footer';
import { Image } from '@npm-refactored/storyblok-next-image';
import { ResolveRichText } from '@npm-refactored/storyblok-rich-text';
import { isLinkDefined } from '@npm-refactored/storyblok-utilities';
import { ReplaceTokens } from '@npm-refactored/text-helpers';
import cn from 'classnames';
import { RefLink } from '../RefLink';
// Types
import type {
  ConferenceFooterStoryblok,
  FooterButtonStoryblok,
  FooterLinkGroupStoryblok,
  FooterSocialRowStoryblok,
  // FooterStoryblok,
} from '@/component-types';
import type { TokenDefinition, TokenValueFunction } from '@npm-refactored/text-helpers';
import type { SbBlokData } from '@storyblok/react';
// Styles
import '../footer/Footer.scss';
import './ConferenceFooter.scss';

interface ConferenceFooterProps {
  blok: ConferenceFooterStoryblok;
}

const YearTokenFunction: TokenValueFunction = () => {
  const d = new Date();
  return d.getFullYear().toString();
};
const TOKENS: TokenDefinition = {
  'YEAR': YearTokenFunction,
  '(C)': '&copy;',
  '(TM)': '&trade;',
  '(R)': '&reg;',
};

export default function ConferenceFooter({ blok }: ConferenceFooterProps) {
  const [copyrightText, setCopyrightText] = useState<string>('');

  useEffect(() => {
    if (blok.copyright_text) {
      setCopyrightText(ReplaceTokens(blok.copyright_text, TOKENS));
    }
  }, [blok.copyright_text]);

  return (
    <RefFooter.Root>
      <RefFooter.Container>
        <RefFooter.ColumnsContainer colCount={blok.footer_columns?.length}>
          {blok.footer_columns?.map((columnBlok) => {
            return (
              <RefFooter.Column key={columnBlok._uid} {...storyblokEditable(columnBlok)}>
                {columnBlok.body?.map((columnChildBlok) => {
                  return RenderColumnChild(columnChildBlok);
                })}
              </RefFooter.Column>
            );
          })}
        </RefFooter.ColumnsContainer>
        <RefFooter.CorporateContainer {...storyblokEditable(blok)}>
          <RefFooter.BrandSection>
            {isLinkDefined(blok.logo_link) ? (
              <RefLink src={blok.logo_link} aria-label={blok.logo?.alt}>
                <Image src={blok.logo} />
              </RefLink>
            ) : (
              <Image src={blok.logo} />
            )}
          </RefFooter.BrandSection>
          <div className='conference-footer-copyright'>
            <RefFooter.CopyrightText dangerouslySetInnerHTML={{ __html: copyrightText }}></RefFooter.CopyrightText>
            <RefFooter.LegalLinksSection>
              {blok.legal_links?.map((footerLinkBlok) => {
                return (
                  <li key={footerLinkBlok._uid}>
                    <RefLink src={footerLinkBlok.link}>{footerLinkBlok.text}</RefLink>
                  </li>
                );
              })}
            </RefFooter.LegalLinksSection>
          </div>
        </RefFooter.CorporateContainer>
      </RefFooter.Container>
    </RefFooter.Root>
  );
}

function RenderColumnChild(columnChildBlok: SbBlokData) {
  if (!columnChildBlok) return null;
  switch (columnChildBlok.component) {
    case 'footer_link_group':
      const linkGroupBlok = columnChildBlok as FooterLinkGroupStoryblok;
      const description = ResolveRichText(linkGroupBlok?.description);
      return (
        <RefFooter.LinkGroup key={linkGroupBlok._uid}>
          <h5 className='footer-link-group--title'>
            {isLinkDefined(linkGroupBlok.title_link) ? (
              <RefLink src={linkGroupBlok.title_link}>{linkGroupBlok.title}</RefLink>
            ) : (
              linkGroupBlok.title
            )}
          </h5>
          {description ? (
            <div className='footer-link-group--description conference-footer-link-group-description'>{description}</div>
          ) : null}
          <ul>
            {linkGroupBlok.footer_link_group_links?.map((linkGroupLinkBlok) => {
              return (
                <li key={linkGroupLinkBlok._uid}>
                  <RefLink src={linkGroupLinkBlok.link}>{linkGroupLinkBlok.text}</RefLink>
                </li>
              );
            })}
          </ul>
        </RefFooter.LinkGroup>
      );
    case 'footer_social_row':
      const socialRowBlok = columnChildBlok as FooterSocialRowStoryblok;
      return RenderSocialLinks(socialRowBlok);
    case 'footer_button':
      const footerButtonBlok = columnChildBlok as FooterButtonStoryblok;
      const btnClasses = cn(
        footerButtonBlok.alignment_desktop ? `${footerButtonBlok.alignment_desktop}-desktop` : undefined,
        footerButtonBlok.alignment_mobile,
      );
      const linkClasses = cn(
        'btn',
        footerButtonBlok.button_style,
        footerButtonBlok.button_size,
        footerButtonBlok.before_icon || footerButtonBlok.after_icon ? 'btn-with-icon' : '',
      );

      return (
        <RefFooter.FooterButton key={footerButtonBlok._uid} className={btnClasses}>
          <RefLink className={linkClasses} src={footerButtonBlok.link}>
            {footerButtonBlok.before_icon ? ButtonSVG(footerButtonBlok.before_icon) : null}
            {footerButtonBlok.text}
            {footerButtonBlok.after_icon ? ButtonSVG(footerButtonBlok.after_icon) : null}
          </RefLink>
        </RefFooter.FooterButton>
      );
    default:
      return <div key={'blok_not_supported'}>Item Not Supported</div>;
  }
}

function RenderSocialLinks(socialRowBlok: FooterSocialRowStoryblok) {
  const socialRowClasses = cn(
    socialRowBlok.alignment_desktop ? `${socialRowBlok.alignment_desktop as string}-desktop` : undefined,
    socialRowBlok.alignment_mobile,
  );
  return (
    <RefFooter.SocialRow key={socialRowBlok._uid} className={socialRowClasses} {...storyblokEditable(socialRowBlok)}>
      {isLinkDefined(socialRowBlok.facebook_link) ? (
        <li key='social-link-facebook'>
          <RefLink src={socialRowBlok.facebook_link}>
            <FacebookSvg />
          </RefLink>
        </li>
      ) : null}
      {isLinkDefined(socialRowBlok.x_link) ? (
        <li key='social-link-x'>
          <RefLink src={socialRowBlok.x_link}>
            <TwitterXSvg />
          </RefLink>
        </li>
      ) : null}
      {isLinkDefined(socialRowBlok.youtube_link) ? (
        <li key='social-link-youtube'>
          <RefLink src={socialRowBlok.youtube_link}>
            <YoutubeSvg />
          </RefLink>
        </li>
      ) : null}
      {isLinkDefined(socialRowBlok.linkedin_link) ? (
        <li key='social-link-linkedin'>
          <RefLink src={socialRowBlok.linkedin_link}>
            <LinkedInSvg />
          </RefLink>
        </li>
      ) : null}
    </RefFooter.SocialRow>
  );
}
