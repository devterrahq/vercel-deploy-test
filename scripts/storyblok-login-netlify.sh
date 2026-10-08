#!/bin/bash

export $(grep -v '^#' .env.local | xargs)

if [ -z "$STORYBLOK_OAUTH_TOKEN" ]; then
  echo "STORYBLOK_OAUTH_TOKEN is not defined. Please make sure it is set in your .env file."
  exit 1
fi

if [ -z "$NEXT_PUBLIC_STORYBLOK_REGION" ]; then
  echo "NEXT_PUBLIC_STORYBLOK_REGION is not defined. Please make sure it is set in your .env file."
  exit 1
fi

# Execute the commands
npx storyblok login --token $STORYBLOK_OAUTH_TOKEN --region $NEXT_PUBLIC_STORYBLOK_REGION && npm run generate
