/* eslint-disable @next/next/no-before-interactive-script-outside-document */
/// https://knowledge.hubspot.com/forms/how-can-i-share-a-hubspot-form-if-im-using-an-external-site#add-the-form-embed-code
import { storyblokEditable } from '@storyblok/react';
import * as React from 'react';
import { useUniqueScript } from '@/components/internal/uniqueScript/UniqueScript';
import { getClassName } from '@npm-refactored/classname-helpers';
import cn from 'classnames';
import type { GenericComponentWithoutRef } from '@/types';
import type { SbBlokData } from '@storyblok/react';

interface WidgetNextHubspotEmbedBlok extends SbBlokData {
  region?: string;
  portal_id?: string;
  form_id?: string;
}

type WidgetNextHubspotEmbedProps = GenericComponentWithoutRef<{
  /** If widget is root level and not embeded in a panel */
  rootLevel?: boolean;
  classPrefix?: string;
  as?: React.ElementType;
  blok: WidgetNextHubspotEmbedBlok;
}>;

const WidgetNextHubspotEmbed: React.FC<WidgetNextHubspotEmbedProps> = (props: WidgetNextHubspotEmbedProps) => {
  const { blok, rootLevel = true, classPrefix, className, ...rest } = props;

  const Component = props.as || 'div';
  const rootClass = cn(getClassName('widget-hubspot-embed', classPrefix), className);

  const customID = `hbspt_embed_${blok._uid || ''}`;
  function initForm() {
    if (typeof window != 'undefined' && window.hasOwnProperty('hbspt')) {
      // @ts-expect-error - hbspt is not typed
      window.hbspt.forms.create({
        region: blok.region || 'na1',
        portalId: blok.portal_id,
        formId: blok.form_id,
        target: `#${customID}`,
      });
    }
  }

  useUniqueScript('//js.hsforms.net/forms/embed/v2.js', initForm);

  return (
    <Component {...(rootLevel && storyblokEditable(blok))} {...rest} className={rootClass}>
      <div {...(typeof customID === 'string' && { id: customID })} className='hbsptform' />
    </Component>
  );
};

export { WidgetNextHubspotEmbed };
export type { WidgetNextHubspotEmbedProps, WidgetNextHubspotEmbedBlok };
