import { getArticleCondensedDateString } from '@/helpers/date-helpers';
import { IWIText, IWITextString, truncateText } from '@/helpers/richtext';
import Link from 'next/link';
import type { ArticleStoryblok } from '@/component-types';

interface ArticleCondensedProps {
  article: ArticleStoryblok;
  leadLength: number;
}
export default function ArticleCondensed({ article, leadLength = 200 }: ArticleCondensedProps) {
  return (
    <article className='article-item article-condensed'>
      {article.headline ? (
        <h3 className='article-detailed--headline'>
          <Link href={`/${article.full_slug}`} dangerouslySetInnerHTML={{ __html: IWITextString(article.headline) }} />
        </h3>
      ) : null}
      {article.date ? (
        <div className='article-condensed--date'>{getArticleCondensedDateString(article.date)}</div>
      ) : null}
      {article.lead ? (
        <div className='article-condensed--lead richtext-margin-helper'>
          <IWIText as='p' text={truncateText(article.lead, leadLength)} />
        </div>
      ) : null}
    </article>
  );
}
