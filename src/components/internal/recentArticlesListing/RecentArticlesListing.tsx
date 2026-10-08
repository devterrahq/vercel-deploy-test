'use client';

import { useEffect, useState } from 'react';
import { getRecentArticlesOfType } from '@/helpers/api-client-helpers';
import Link from 'next/link';
import type { ArticleStoryblok } from '@/component-types';
import type { ExtendedStory } from '@/types';
import './RecentArticlesListing.scss';

interface RecentArticlesListingProps {
  articleType?: ArticleStoryblok['type'];
}
export default function RecentArticlesListing({ articleType }: RecentArticlesListingProps) {
  const [articles, setArticles] = useState<Array<ExtendedStory<ArticleStoryblok>>>([]);

  useEffect(() => {
    if (articleType) {
      getRecentArticlesOfType(articleType)
        .then((data) => {
          if (data) {
            setArticles(data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [articleType]);

  return (
    <div className='widget-recent-articles-listing'>
      <h3 className='widget-recent-articles-listing--heading'>Recent Posts</h3>
      {articles && articles.length > 0 ? (
        <ul className='widget-recent-articles-listing--list'>
          {articles.map((article) => (
            <li key={article.uuid} className='widget-recent-articles-listing--item'>
              <Link href={`/${article.full_slug}`}>{article.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent articles to show</p>
      )}
    </div>
  );
}
