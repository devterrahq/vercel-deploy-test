#!/bin/bash
echo "Updating field options url...";

LOCAL_SITE='https://localhost:3010';
STARTER_SITE='https://storyblok-nextjs-starter.netlify.app';
DEV_SITE='https://dev--investment-and-wealth-institute-storyblok.vercel.app';
PUBLISHED_SITE='https://dev--investment-and-wealth-institute-storyblok.vercel.app';

SET_LOCAL=0;
SET_DEV=0;

# By passing the -l flag will set urls to local values
# By passing the -d flag will set urls to dev values
while getopts "ld" flag;
do
  case "${flag}" in
    l)
      SET_LOCAL=1;
      ;;
    d)
      SET_DEV=1;
      ;;
  esac
done
echo $"LCL: $SET_LOCAL";
echo $"DEV: $SET_DEV";
# get space id from .env
echo "Getting space id from .env...";
export $(grep -v '^#' .env.local | xargs)

echo "Space id: $STORYBLOK_SPACE_ID";

# get up-to-date components.json
echo "Pulling components from Storyblok...";
npx storyblok pull-components --space $STORYBLOK_SPACE_ID --path=src/ -f storyblok

# update components.json
echo "Updating components.json...";
if [ $SET_LOCAL == 1 ]
then
  echo $"FROM $PUBLISHED_SITE";
  echo $"OR $STARTER_SITE";
  echo $"OR $DEV_SITE";
  echo $"TO $LOCAL_SITE";
  sed -i -e "s|$PUBLISHED_SITE|$LOCAL_SITE|g" -e "s|$STARTER_SITE|$LOCAL_SITE|g" -e "s|$DEV_SITE|$LOCAL_SITE|g" src/components.storyblok.json;
elif [ $SET_DEV == 1 ]
then
  echo $"FROM $PUBLISHED_SITE";
  echo $"OR $STARTER_SITE";
  echo $"OR $LOCAL_SITE";
  echo $"TO $DEV_SITE";
  sed -i -e "s|$PUBLISHED_SITE|$DEV_SITE|g" -e "s|$STARTER_SITE|$DEV_SITE|g" -e "s|$LOCAL_SITE|$DEV_SITE|g" src/components.storyblok.json;
else
  echo $"FROM $LOCAL_SITE";
  echo $"OR $STARTER_SITE";
  echo $"OR $DEV_SITE";
  echo $"TO $PUBLISHED_SITE";
  sed -i -e "s|$LOCAL_SITE|$PUBLISHED_SITE|g" -e "s|$STARTER_SITE|$PUBLISHED_SITE|g" -e "s|$DEV_SITE|$PUBLISHED_SITE|g" src/components.storyblok.json;
fi

# push components to storyblok
echo "Pushing components to Storyblok...";
npx storyblok push-components --space $STORYBLOK_SPACE_ID src/components.storyblok.json;

# pull components from storyblok & generate types
echo "Generating types...";
npm run generate;

