'use client';

import { signIn } from 'next-auth/react';
import './LogInOptions.scss';

export default function LogInOptions() {
  return (
    <div className='login-opts'>
      <button
        className='login-opts_btn btn'
        onClick={() =>
          void signIn('atlassian', {
            callbackUrl: 'http://localhost:3000/services/web-design',
          })
        }
      >
        <div className='login-opts_btn_internal-container'>
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 62.4 56.13' aria-hidden='true'>
            <defs>
              <linearGradient
                id='icon-bitbucket-colored_svg__a'
                x1='64.01'
                x2='32.99'
                y1='24.01'
                y2='48.23'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.18' stopColor='#0052cc'></stop>
                <stop offset='1' stopColor='#2684ff'></stop>
              </linearGradient>
            </defs>
            <g data-name='Layer 2'>
              <path fill='none' d='M24.7 37.25h13.05l3.15-18.38H21.23l3.47 18.38z'></path>
              <path
                fill='#2684ff'
                d='M2 0a2 2 0 0 0-2 2.32l8.49 51.54a2.72 2.72 0 0 0 2.66 2.27h40.73a2 2 0 0 0 2-1.68l8.49-52.12A2 2 0 0 0 60.4 0zm35.75 37.25h-13l-3.52-18.38H40.9z'
              ></path>
              <path
                fill='url(#icon-bitbucket-colored_svg__a)'
                d='M59.67 18.87H40.9l-3.15 18.38h-13L9.4 55.48a2.71 2.71 0 0 0 1.75.66h40.74a2 2 0 0 0 2-1.68z'
              ></path>
            </g>
          </svg>
          Sign in with Bitbucket
        </div>
      </button>
    </div>
  );
}
