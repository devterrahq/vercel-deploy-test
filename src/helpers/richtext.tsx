import { StoryblokComponent } from '@storyblok/react';
import { MARK_LINK } from 'storyblok-rich-text-react-renderer';
import { RefLink } from '@/components/internal/RefLink';
import type { MultilinkStoryblok } from '@/component-types';
import type { RenderOptions } from 'storyblok-rich-text-react-renderer';

// https://www.npmjs.com/package/storyblok-rich-text-react-renderer

const OPTIONS: RenderOptions = {
  markResolvers: {
    [MARK_LINK](children, props) {
      const { uuid, linktype, href, anchor, target } = props;
      let src: MultilinkStoryblok | undefined = undefined;

      switch (linktype) {
        case 'story':
          src = {
            ...('story' in props && props?.story ? { story: props.story } : {}),
            linktype: 'story',
            id: uuid,
            anchor: anchor,
            target: target,
            cached_url: href,
          };
          break;
        case 'asset':
          src = {
            linktype: 'asset',
            url: href,
            target: target,
          };
          break;
        case 'url':
          src = {
            linktype: 'url',
            url: href,
            target: target,
          };
          break;
        case 'email':
          src = {
            linktype: 'email',
            email: href,
          };
          break;
        default:
          break;
      }

      return <RefLink src={src}>{children}</RefLink>;
    },
  },
  blokResolvers: {},
  defaultBlokResolver: (name, props) => {
    const blok = { ...props, component: name };
    return <StoryblokComponent blok={blok} key={props._uid} />;
  },
};

function convertTextToHtml(text: string) {
  let newText = `${text}`;
  // Tradmarks
  newText = newText.replaceAll('®', '<sup>®</sup>');
  return newText;
}
interface IWITextProps {
  as: React.ElementType;
  text?: string;
  className?: string;
}
export const IWIText: React.FC<IWITextProps> = ({ as = 'p', text, className, ...rest }) => {
  if (!text) return;
  const Component = as;

  return <Component className={className} dangerouslySetInnerHTML={{ __html: convertTextToHtml(text) }} {...rest} />;
};
export function IWITextString(text: string) {
  return convertTextToHtml(text);
}

export function truncateText(text: string | undefined, charLimit: number) {
  if (!text || text.length < charLimit || typeof text !== 'string') {
    return text;
  }
  const newText = text.substring(0, charLimit);
  return newText.substring(0, newText.lastIndexOf(' ')) + '...';
}

export default OPTIONS;
