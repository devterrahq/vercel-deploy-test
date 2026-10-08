import { useEffect } from 'react';

interface UniqueLink {
  loaded: boolean;
  onLoad: Array<() => void>;
}
interface UniqueLinkList {
  [key: string]: UniqueLink;
}
declare global {
  interface Window {
    RefUniqueLinks: UniqueLinkList;
  }
}

export function useUniqueScript(src: string, cb: () => void) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    // Does script already exist?
    const elements = document.getElementsByTagName('script');
    const eleArr: Array<HTMLScriptElement> = Array.prototype.slice.call(elements);
    const exist = eleArr.find((ele) => {
      return ele.getAttribute('src') === src;
    });

    if (exist) {
      // Already on the page
      if (window.RefUniqueLinks) {
        const uniqueLink = window.RefUniqueLinks[src];
        if (uniqueLink) {
          if (uniqueLink.loaded) {
            cb();
          } else {
            uniqueLink.onLoad.push(cb);
          }
        }
      }
    } else {
      const head = document.querySelector('head');
      const script = document.createElement('script');
      script.setAttribute('src', src);
      if (!window.RefUniqueLinks) {
        window.RefUniqueLinks = {};
      }

      const record: UniqueLink = {
        loaded: false,
        onLoad: [cb],
      };
      window.RefUniqueLinks = { [src]: record };

      script.onload = () => {
        const uniqueLink = window.RefUniqueLinks[src];
        if (uniqueLink) {
          uniqueLink.loaded = true;
          uniqueLink.onLoad.forEach((cb) => {
            cb();
          });
        }
      };
      head?.appendChild(script);
      return () => {
        head?.removeChild(script);
      };
    }
  }, [src, cb]);
}
