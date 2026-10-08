import type { ReactNode } from 'react';
import type { ISbStoryData } from 'storyblok-js-client';

interface PageProps {
  blok: ISbStoryData;
  pagePath?: string;
  children?: ReactNode;
}

export default function GlobalPageTemplate({ blok, children }: PageProps) {
  if (
    !blok.content.component ||
    ['testimonial', 'Header', 'Footer', 'conference_header', 'conference_footer'].indexOf(blok.content.component) === -1
  ) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20vh' }}>
        <style dangerouslySetInnerHTML={{ __html: 'body { background-color: #e9e9e9; min-height: 100vh; }' }} />
        <h3>Preview not available</h3>
        <p>
          Storyblok is not configured to render a preview for <strong>{blok.content.component}</strong> pages.
        </p>
      </div>
    );
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: 'body { background-color: #e9e9e9; min-height: 100vh; }' }} />
      {children}
    </div>
  );
}
