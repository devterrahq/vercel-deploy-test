'use client';

import { RichTextProvider as RefRichTextProvider } from '@npm-refactored/storyblok-rich-text';
import RichTextResolverOptions from '../helpers/richtext';

interface RichTextProviderProps {
  children?: React.ReactNode;
}
export default function RichTextProvider({ children }: RichTextProviderProps) {
  return <RefRichTextProvider renderOptions={RichTextResolverOptions}>{children}</RefRichTextProvider>;
}
