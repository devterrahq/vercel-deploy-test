'use client';

import { StoryblokComponent } from '@storyblok/react';
import { useEffect, useState } from 'react';
import { getGlobalHeaderStory } from '@/helpers/api-client-helpers';
import type { ConferenceHeaderStoryblok, HeaderStoryblok } from '@/component-types';

/// https://nextjs.org/docs/app/building-your-application/routing/error-handling

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export default function Error({ error }: ErrorProps) {
  const [headerStory, setHeaderStory] = useState<HeaderStoryblok | ConferenceHeaderStoryblok>();

  useEffect(() => {
    getGlobalHeaderStory()
      .then((data) => {
        setHeaderStory(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(`Error Boundary Triggered: ${error.digest}`);
    console.error(error);
  }, [error]);

  // Dont stop 404 errors
  if (error && 'digest' in error) {
    if (error.digest === 'NEXT_NOT_FOUND') {
      throw error;
    }
  }

  return (
    <div>
      {headerStory ? <StoryblokComponent blok={headerStory} /> : null}
      <div className='container'>
        <h2>Something went wrong!</h2>
        <code>{error ? `Error Digest: ${error.digest}` : 'Error is not defined'}</code>
        {/* <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button> */}
      </div>
    </div>
  );
}
