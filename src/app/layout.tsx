import { setupStoryblokInit } from '@/helpers/storyblok-init';
// import NextAuthProvider from '@/providers/NextAuthProvider';
import RichTextProvider from '@/providers/RichTextProvider';
import StoryblokProvider from '@/providers/StoryblokProvider';
import cn from 'classnames';
// import { getServerSession } from 'next-auth';
import { Roboto, Roboto_Slab } from 'next/font/google';
// import { authOptions } from './api/auth/[...nextauth]/route';
import type { Metadata } from 'next';
import '@/styles/main.scss';
import { Suspense } from 'react';
import { VWOScript } from 'vwo-smartcode-nextjs';
import Analytics from '../components/internal/analytics/Analytics';

// import Script from 'next/script';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto',
});
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-roboto-slab',
  display: 'swap',
});

setupStoryblokInit();

export const metadata: Metadata = {
  // title: 'Storyblok',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const rootClasses = cn(roboto.variable, robotoSlab.variable);

  return (
    //  <NextAuthProvider session={session}>
    <StoryblokProvider>
      <RichTextProvider>
        {/* <!-- Google tag (gtag.js) --> */}
        <html lang='en' className={rootClasses}>
          <head>
            <Suspense>
              <Analytics />
            </Suspense>
            <VWOScript accountId='1083903' />
          </head>
          <body>{children}</body>
        </html>
      </RichTextProvider>
    </StoryblokProvider>
    // </NextAuthProvider>
  );
}
