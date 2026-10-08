import { FacebookSvg, LinkedInSvg, TwitterXSvg } from '@/components/svg';
import { facebookShareLink, linkedInShareLink, xSocialShareLink } from '@/helpers/social-shares';

interface ArticleShareIconsProps {
  articleHeadline: string;
  iconSizes?: 'small' | 'normal';
  pageUrl?: URL;
}
export default function ArticleShareIcons({ articleHeadline, iconSizes, pageUrl }: ArticleShareIconsProps) {
  return (
    <div className='article-share-icons'>
      <a href={xSocialShareLink(articleHeadline || '', pageUrl)} target='_blank'>
        <TwitterXSvg width={iconSizes === 'small' ? 22 : undefined} height={iconSizes === 'small' ? 22 : undefined} />
      </a>
      <a href={linkedInShareLink(pageUrl)} target='_blank'>
        <LinkedInSvg width={iconSizes === 'small' ? 22 : undefined} height={iconSizes === 'small' ? 22 : undefined} />
      </a>
      {/* <FacebookShare href='' /> */}
      <a href={facebookShareLink(pageUrl)} target='_blank'>
        <FacebookSvg width={iconSizes === 'small' ? 22 : undefined} height={iconSizes === 'small' ? 22 : undefined} />
      </a>
    </div>
  );
}
