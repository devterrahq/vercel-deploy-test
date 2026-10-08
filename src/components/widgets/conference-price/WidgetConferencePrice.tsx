import type { WidgetConferencePriceStoryblok } from '@/component-types';
import './WidgetConferencePrice.scss';

interface WidgetConferencePriceProps {
  blok: WidgetConferencePriceStoryblok;
}

export default function WidgetConferencePrice({ blok }: WidgetConferencePriceProps) {
  const size = blok?.size ? `conference-size-${blok.size}` : 'conference-size-medium';
  return (
    <div className='widget-conference-price__root'>
      <p className={size}>
        {blok?.full_price ? (
          blok.discounted_price ? (
            <span className='full-price price'>
              <span>$</span>
              {blok.full_price}
            </span>
          ) : (
            <b className='discounted-price price'>
              <span>$</span>
              {blok?.full_price}
            </b>
          )
        ) : null}
        {blok?.discounted_price ? (
          <b className='discounted-price price'>
            <span>$</span>
            {blok?.discounted_price}
          </b>
        ) : null}
      </p>
    </div>
  );
}
