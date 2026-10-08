import { Testimonial } from '../panels/testimonial/PanelTestimonial';
import type { PanelTestimonialStoryblok, TestimonialStoryblok } from '@/component-types';

interface TestimonialPreviewProps {
  blok: TestimonialStoryblok;
}
export default function TestimonialPreview({ blok }: TestimonialPreviewProps) {
  const blokData: PanelTestimonialStoryblok = {
    _uid: 'testimonial-preview',
    component: 'panel_testimonial',
    quote_text_color: 'dark-navy',
    title_text_color: 'dark-navy',
    description_text_color: 'dark-navy',
    panel_background_color: 'light-blue',
    panel_padding_top: 'md',
    panel_padding_bottom: 'md',
  };
  return <Testimonial blok={blokData} testimonial={blok} />;
}
