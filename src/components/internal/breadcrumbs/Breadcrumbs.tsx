import { useMemo } from 'react';
import { normalizeSlug } from '@/helpers/slug-helpers';
import * as RefBreadcrumbs from '@npm-refactored/pr-breadcrumbs';
import { GenerateBreadcrumbJsonLD as generateBreadcrumbJsonLD } from '@npm-refactored/pr-breadcrumbs';
import Link from 'next/link';
import Script from 'next/script';
import type { BreadcrumbItem } from '@npm-refactored/pr-breadcrumbs';
import './Breadcrumbs.scss';

interface BreadcrumbProps {
  breadcrumbItems: Array<BreadcrumbItem>;
  jsonLdString?: string;
}

export function Breadcrumbs({ breadcrumbItems }: BreadcrumbProps) {
  const jsonLdString = useMemo(() => {
    return generateBreadcrumbJsonLD(breadcrumbItems);
  }, [breadcrumbItems]);

  return (
    <div className='container'>
      <RefBreadcrumbs.Container>
        {breadcrumbItems.map((item, idx) => {
          return (
            <RefBreadcrumbs.Item key={item.key}>
              {idx === breadcrumbItems.length - 1 ? (
                item.label
              ) : (
                <Link href={normalizeSlug(item.link)} aria-label={item.label}>
                  {item.label}
                </Link>
              )}
            </RefBreadcrumbs.Item>
          );
        })}
      </RefBreadcrumbs.Container>

      {jsonLdString ? (
        <Script
          id='breadcrumbsJson'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdString) }}
        />
      ) : null}
    </div>
  );
}
