/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: '@import "@/styles/abstracts/index.scss";',
  },
  env: {
    BASE_URL: process.env.VERCEL_ENV === 'production' ? process.env.URL : 'https://' + process.env.VERCEL_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a-us.storyblok.com', // If using the EU CDN, change this to a.storyblok.com
        pathname: '**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            // only allow storyblok.com
            value: '*',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
