import { z } from 'zod';
import type { ReactNode } from 'react';
import type { ISbComponentType, ISbStoryData } from 'storyblok-js-client';

// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export type GenericComponentWithoutRef<P = {}, E extends React.ElementType<any> = 'div'> = P &
  React.ComponentPropsWithoutRef<E>;

export interface NextError {
  digest?: string;
  mutableCookies?: string;
}

export type SearchParams = { [key: string]: string | string[] | undefined };
export type NormalizedSearchParams = Record<string, string | undefined>;

export interface CatchAllPageProps {
  params: { M: string; slug: string[] };
  searchParams?: SearchParams;
}

export interface MegaParamPageProps {
  params: { M: string };
  searchParams?: SearchParams;
}

export interface Permissions {
  roles: string[];
  requiresAuth: 'yes' | 'no' | 'inherits';
  assignedRoles: {
    name: string;
    value: string;
    access: 'allow' | 'deny' | 'unset';
  }[];
}

export type SvgComponent = (arg0: SvgProps) => ReactNode;
export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  color?: `#${string}` | 'currentColor';
  width?: number;
  height?: number;
}

export type Breakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type BreakpointList = ['default', 'sm', 'md', 'lg', 'xl', 'xxl'];
export type SBResponsiveField = {
  fieldValue: Record<
    Breakpoint,
    {
      value: string | null;
    }
  >;
  isCustom: boolean;
};

export type SBComponent<ComponentName extends string = string> = ISbComponentType<ComponentName> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
};

export type SBStoryData<Component = SBComponent> = ISbStoryData<Component>;

export type KnownKeys<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

export const StoryblokComponentJson = z.object({
  components: z.array(
    z.object({
      name: z.string(),
      display_name: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      id: z.string(),
      schema: z.record(
        z.object({
          type: z.union([
            z.literal('bloks'),
            z.literal('text'),
            z.literal('textarea'),
            z.literal('richtext'),
            z.literal('markdown'),
            z.literal('number'),
            z.literal('datetime'),
            z.literal('boolean'),
            z.literal('options'),
            z.literal('option'),
            z.literal('asset'),
            z.literal('multiasset'),
            z.literal('multilink'),
            z.literal('table'),
            z.literal('image'),
            z.literal('file'),
            z.literal('custom'),
          ]),
          pos: z.number().optional(),
        }),
      ),
      image: z.string(),
      preview_field: z.string().optional(),
      is_root: z.boolean(),
      preview_tmpl: z.union([z.string(), z.null()]),
      is_nestable: z.boolean(),
      all_presets: z.array(z.object({})),
      real_name: z.string(),
      component_group_uuid: z.string(),
      color: z.string(),
      icon: z.union([z.string(), z.null()]),
      component_group_name: z.union([z.string(), z.null()]),
    }),
  ),
});

export type ExtendedStory<T> = T & { uuid: string; full_slug: string; name: string };

export interface ResponsiveFieldInfo {
  algorithm: 'column_widths' | 'items_per_row';
  data: SBResponsiveField;
}
export interface WidgetItem {
  responsiveFieldSizes?: ResponsiveFieldInfo;
}

export interface MegaParam {
  authenticated: boolean;
  roles: string[];
  searchParams: NormalizedSearchParams;
  isDraftMode: boolean;
}

// == Filter Query Type Definitions == //
type Primitive = string | number | boolean | symbol | undefined | null;
type Condition = {
  is?: string | number | boolean;
  in?: string | number | boolean;
  not_in?: string | number | boolean;
  like?: string;
  not_like?: string;
  any_in_array?: string;
  all_in_array?: string;
  gt_date?: string;
  lt_date?: string;
  gt_int?: string | number;
  lt_int?: string | number;
  gt_float?: string | number;
  lt_float?: string | number;
};
type Query<Story> = {
  [K in keyof Story]?: RegularFilter<Story[K]> | Condition;
};
type RegularFilter<Story> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof Story as Exclude<K, '__or'>]?: Story[K] extends Primitive | any[]
    ? Condition
    : RegularFilter<Story[K]> | Condition;
};
interface OrFilter<Story> {
  __or?: Query<Story>[];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Filter<Story = Record<string, any>> = RegularFilter<Story> | OrFilter<Story>;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any;
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
    Vimeo: typeof Vimeo;
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace YT {
    class Player {
      constructor(elementId: string | HTMLElement, options: YouTubePlayerOptions);
      mute(): void;
      unMute(): void;
      isMuted(): boolean;
      playVideo(): void;
      pauseVideo(): void;
      stopVideo(): void;
    }

    interface YouTubePlayerOptions {
      videoId: string;
      playerVars?: {
        autoplay?: 1 | 0;
        mute?: 1 | 0;
        loop?: 1 | 0;
        controls?: 1 | 0;
        modestbranding?: 1 | 0;
        rel?: 1 | 0;
        showinfo?: 1 | 0;
        fs?: 1 | 0;
        disablekb?: 1 | 0;
        playlist?: string;
        playsinline?: 1 | 0;
      };
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: PlayerEvent) => void;
        onError?: (event: PlayerEvent) => void;
      };
    }

    interface PlayerEvent {
      target: Player;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vimeo {
    class Player {
      constructor(iframe: HTMLIFrameElement, options: VimeoPlayerOptions);
      play(): Promise<void>;
      pause(): Promise<void>;
      setMuted(muted: boolean): Promise<void>;
      on(event: string, callback: () => void): void;
    }

    interface VimeoPlayerOptions {
      id?: number;
      url?: string;
      width?: number;
      height?: number;
      autoplay?: boolean;
      loop?: boolean;
      muted?: boolean;
      background?: boolean;
      responsive?: boolean;
      controls?: boolean;
      title?: boolean;
      byline?: boolean;
      portrait?: boolean;
      dnt?: boolean; // Do Not Track
    }
  }
}
