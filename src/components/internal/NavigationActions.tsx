'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Image } from '@npm-refactored/storyblok-next-image';
import './NavigationActions.scss';

export default function NavigationActions() {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <div className='nav-actions'>
        {session.user.image && (
          <div className='nav-actions_img-container'>
            <Image
              className='nav-actions_img'
              src={session.user?.image}
              alt={session.user?.name ?? 'User Profile Picture'}
              width={50}
              height={50}
            />
          </div>
        )}

        <div className='nav-actions_user-container'>
          {session.user?.name && <p className='nav-actions_name'>{session.user.name}</p>}
          {session.user?.email && <p className={'nav-actions_email'}>{session.user.email}</p>}
        </div>

        <button
          className='nav-actions_log-out-btn'
          type='button'
          onClick={() => void signOut({ callbackUrl: `${window.location.origin}` })}
          aria-label={'Sign out'}
        >
          <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M21.3333 22.1667L25.5 18M25.5 18L21.3333 13.8333M25.5 18H15.5M15.5 10.5H14.5C13.0999 10.5 12.3998 10.5 11.865 10.7725C11.3946 11.0122 11.0122 11.3946 10.7725 11.865C10.5 12.3998 10.5 13.0999 10.5 14.5V21.5C10.5 22.9001 10.5 23.6002 10.7725 24.135C11.0122 24.6054 11.3946 24.9878 11.865 25.2275C12.3998 25.5 13.0999 25.5 14.5 25.5H15.5'
              stroke='black'
              strokeWidth='1.66667'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    );
  } else if (status === 'unauthenticated') {
    return (
      <div className='nav-actions'>
        <button className='btn solid' type='button' onClick={() => void signIn()}>
          Log in
        </button>
      </div>
    );
  } else {
    return (
      <div className='nav-actions'>
        <button className='btn solid' type='button'>
          Log in
        </button>
      </div>
    );
  }
}
