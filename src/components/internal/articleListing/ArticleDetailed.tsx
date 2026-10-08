import { Byline } from '@/components/page-types/article/Article';
import { IWIButton } from '@/components/widgets/button/WidgetButton';
import { getArticleCondensedDateString } from '@/helpers/date-helpers';
import { IWIText, IWITextString, truncateText } from '@/helpers/richtext';
import { Image } from '@npm-refactored/storyblok-next-image';
import { isAssetDefined } from '@npm-refactored/storyblok-utilities';
import Link from 'next/link';
// import ArticleShareIcons from '../articleShareIcons/ArticleShareIcons';
import type { ArticleStoryblok, PersonStoryblok } from '@/component-types';
import type { StoryblokStory } from '@npm-refactored/storyblok-generate-ts';

interface ArticleDetailedProps {
  article: ArticleStoryblok;
  leadLength?: number;
}
export default function ArticleDetailed({ article, leadLength = 200 }: ArticleDetailedProps) {
  const authors = article.authors as StoryblokStory<PersonStoryblok>[] | undefined;
  // let pageUrl: URL | undefined;
  // if (typeof window !== undefined) {
  //   pageUrl = new URL(window.location.href);
  // }

  const hasThumbnail = isAssetDefined(article.thumbnail);

  return (
    <article className='article-item article-detailed'>
      {hasThumbnail ? (
        <div className='article-detailed--thumbnail display-mobile'>
          <Image className='article-detailed--img' src={article.thumbnail} />
        </div>
      ) : null}
      {article.headline ? (
        <h3 className='article-detailed--headline'>
          <Link href={`/${article.full_slug}`} dangerouslySetInnerHTML={{ __html: IWITextString(article.headline) }} />
        </h3>
      ) : null}

      {/* <ArticleShareIcons iconSizes='small' articleHeadline={article.headline || ''} pageUrl={pageUrl} /> */}
      <div className={`article-detailed--content ${!hasThumbnail ? ' article-detailed--content-no-photo' : ''}`}>
        <div className='article-detailed--lead-wrapper'>
          {authors && authors.length > 0 ? <div className='article-detailed--byline'>{Byline(authors)}</div> : null}
          {article.date ? (
            <div className='article-detailed--date'>{getArticleCondensedDateString(article.date)}</div>
          ) : null}
          <div className='article-detailed--lead richtext-margin-helper'>
            <IWIText as='p' text={truncateText(article.lead, leadLength)} />
          </div>
          <IWIButton
            internalLink={`/${article.full_slug}`}
            buttonStyle='text-link-navy'
            afterIcon='right_arrow'
            buttonSize='button-sm'
          >
            READ MORE
          </IWIButton>
        </div>
        {hasThumbnail ? (
          <div className='article-detailed--thumbnail display-desk'>
            <Image className='article-detailed--img' src={article.thumbnail} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
