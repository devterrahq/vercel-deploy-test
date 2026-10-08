'use client';

import { useStoryblokLinkByUUID } from '@/hooks/useStoryblokLinks';
import NextLink from 'next/link';
import type { MultilinkStoryblok } from '@/component-types';

interface LinkProps {
  src?: MultilinkStoryblok;
  link?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
  ariaRole?: string;

  // NextLink props
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
}

export function RefLink({
  src,
  link,
  children,
  className,
  ariaLabel,
  ariaRole,
  replace = false,
  scroll = true,
  prefetch = true,
  ...rest
}: LinkProps) {
  const storyLinkUri = useStoryblokLinkByUUID(src);
  let linkURI = '';
  let isInternal = false;
  let target = '_self';

  if (src) {
    let newHref = '';
    switch (src.linktype) {
      case 'story':
        isInternal = true;
        newHref = '/';

        if (storyLinkUri) {
          newHref = storyLinkUri;
          break;
        }

        if (src.story && src.story.url) {
          newHref = `/${src.story.url}`;
          break;
        }

        if (typeof window !== 'undefined' && 'href' in src === false) {
          console.warn(
            `No story URL. This is usually caused when an empty link field is rendered. Confirm the application is checking the link field before rendering the link or add a link in the Storyblok Editor. Here is the corresponding link text (approx.): ${
              typeof children === 'string' ? children : ''
            }`,
          );
        }

        break;
      case 'asset':
      case 'url':
        newHref = src.url;
        break;
      case 'email':
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        newHref = `mailto:${src.email}`;
        break;
      default:
        break;
    }
    if (!newHref && src.cached_url) {
      if (src.cached_url === 'home') {
        newHref = '/';
      } else {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        newHref = '/' + src.cached_url;
      }
    }
    if (src.anchor) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      newHref += `#${src.anchor}`;
    }
    if (src.target) {
      target = src.target;
    }
    if (newHref) {
      linkURI = newHref;
    }
  }
  if (link) {
    linkURI = link;
  }

  if (linkURI) {
    if (isInternal) {
      return (
        <NextLink
          scroll={scroll}
          replace={replace}
          prefetch={prefetch}
          className={className}
          href={linkURI}
          target={target}
          aria-label={ariaLabel}
          role={ariaRole}
          {...rest}
        >
          {children}
        </NextLink>
      );
    } else {
      return (
        <a className={className} href={linkURI} target={target} aria-label={ariaLabel} role={ariaRole} {...rest}>
          {children}
        </a>
      );
    }
  } else {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className={className} aria-label={ariaLabel} role={ariaRole} {...rest}>
        {children}
      </a>
    );
  }
}
