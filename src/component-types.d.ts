import { StoryblokStory } from '@npm-refactored/storyblok-generate-ts'

export interface RichtextStoryblok {
  type: "doc";
  content: StoryblokRichtextContent[];
}
export interface StoryblokRichtextContent {
  type:
    | "heading"
    | "code_block"
    | "paragraph"
    | "blockquote"
    | "ordered_list"
    | "bullet_list"
    | "list_item"
    | "horizontal_rule"
    | "hard_break"
    | "image"
    | "emoji"
    | "blok"
    | "text";
  attrs?: {
    level?: number;
    class?: string;
    src?: string;
    alt?: string;
    title?: string;
    order?: number;
    body?: {
      _uid: string;
    }[];
  };
  marks?: {
    type:
      | "bold"
      | "italic"
      | "strike"
      | "underline"
      | "code"
      | "link"
      | "styled"
      | "subscript"
      | "superscript"
      | "highlight"
      | "textStyle"
      | "anchor";
    attrs?: {
      linktype?: string;
      href?: string;
      target?: string;
      anchor?: string;
      uuid?: string;
      class?: string;
      color?: string;
      id?: string;
    };
  }[];
  text?: string;
  content?: StoryblokRichtextContent[];
}

export interface AccordionGroupStoryblok {
  section_title?: string;
  section_content?: RichtextStoryblok;
  items?: AccordionItemStoryblok[];
  _uid: string;
  component: "accordion_group";
  [k: string]: any;
}

export interface AccordionItemStoryblok {
  headline: string;
  content: RichtextStoryblok;
  _uid: string;
  component: "accordion_item";
  [k: string]: any;
}

export interface AssetStoryblok {
  id: number | null;
  alt?: string | null;
  name: string;
  focus?: string | null;
  title?: string | null;
  filename: string | null;
  copyright?: string | null;
  fieldtype?: string;
  meta_data?: {
    [k: string]: any;
  };
  content_type?: string;
  is_external_url?: boolean;
}

export interface ArticleStoryblok {
  type: "blog" | "news";
  headline?: string;
  lead?: string;
  thumbnail?: AssetStoryblok;
  date?: string;
  publish_at?: string;
  authors?: (StoryblokStory<PersonStoryblok> | string)[];
  topics?: (StoryblokStory<BlogTopicStoryblok> | StoryblokStory<ArticleTopicStoryblok> | string)[];
  article_body?: RichtextStoryblok;
  below_article_content?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  hide_breadcrumbs?: boolean;
  breadcrumb_label?: string;
  exclude_from_sitemap?: boolean;
  exclude_from_internal_search?: boolean;
  robots_no_index?: boolean;
  robots_no_follow?: boolean;
  redirect_url?: string;
  permissions?: {
    roles: string[];
    requiresAuth: "yes" | "no" | "inherits";
    assignedRoles: {
      name: string;
      value: string;
      access: "allow" | "deny" | "unset";
    }[];
  };
  schema?: string;
  _uid: string;
  component: "article";
  [k: string]: any;
}

export interface ArticleTopicStoryblok {
  display_name?: string;
  _uid: string;
  component: "article_topic";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      cached_url?: string;
      linktype?: string;
      [k: string]: any;
    }
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

export interface CertificationCardStoryblok {
  image?: AssetStoryblok;
  title?: string;
  subtitle?: string;
  description?: string;
  link_label?: string;
  link?: MultilinkStoryblok;
  variant?: "" | "default" | "highlight";
  _uid: string;
  component: "certification_card";
  [k: string]: any;
}

export interface CIMACertificationStoryblok {
  discount_codes?: RichtextStoryblok;
  _uid: string;
  component: "CIMA Certification";
  [k: string]: any;
}

export interface ComparisonMatrixConfigItemStoryblok {
  column_style?: "" | "signature_gold" | "elite_orange" | "signature_gold featured-col" | "elite_orange featured-col";
  slot_choice: "1" | "2" | "3" | "4" | "5" | "6";
  label_desktop?: RichtextStoryblok;
  label_mobile?: RichtextStoryblok;
  _uid: string;
  component: "comparison_matrix_config_item";
  [k: string]: any;
}

export interface ComparisonMatrixHeadingRowStoryblok {
  label?: string;
  _uid: string;
  component: "comparison_matrix_heading_row";
  [k: string]: any;
}

export interface ComparisonMatrixImageRowStoryblok {
  row_style?: string;
  label?: RichtextStoryblok;
  item_1?: AssetStoryblok;
  item_2?: AssetStoryblok;
  item_3?: AssetStoryblok;
  item_4?: AssetStoryblok;
  item_5?: AssetStoryblok;
  item_6?: AssetStoryblok;
  _uid: string;
  component: "comparison_matrix_image_row";
  [k: string]: any;
}

export interface ComparisonMatrixRichTextRowStoryblok {
  row_style?: string;
  label?: RichtextStoryblok;
  item_1?: RichtextStoryblok;
  item_2?: RichtextStoryblok;
  item_3?: RichtextStoryblok;
  item_4?: RichtextStoryblok;
  item_5?: RichtextStoryblok;
  item_6?: RichtextStoryblok;
  _uid: string;
  component: "comparison_matrix_rich_text_row";
  [k: string]: any;
}

export interface ConferenceFooterStoryblok {
  logo?: AssetStoryblok;
  logo_link?: MultilinkStoryblok;
  copyright_text?: string;
  legal_links?: FooterLinkStoryblok[];
  footer_columns?: FooterColumnStoryblok[];
  _uid: string;
  component: "conference_footer";
  [k: string]: any;
}

export interface ConferenceHeaderStoryblok {
  logo?: AssetStoryblok;
  logo_link?: MultilinkStoryblok;
  nav_root_items?: (NavRootItemStoryblok | NavRootItemSlideoutStoryblok)[];
  cta?: WidgetButtonStoryblok[];
  utility_nav?: UtilityNavGroupStoryblok[];
  _uid: string;
  component: "conference_header";
  [k: string]: any;
}

export interface ConferenceHomeStoryblok {
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  hide_breadcrumbs?: boolean;
  breadcrumb_label?: string;
  exclude_from_sitemap?: boolean;
  exclude_from_internal_search?: boolean;
  robots_no_index?: boolean;
  robots_no_follow?: boolean;
  redirect_url?: string;
  body?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  permissions?: {
    roles: string[];
    requiresAuth: "yes" | "no" | "inherits";
    assignedRoles: {
      name: string;
      value: string;
      access: "allow" | "deny" | "unset";
    }[];
  };
  schema?: string;
  _uid: string;
  component: "conference_home";
  [k: string]: any;
}

export interface ConferenceScheduleItemStoryblok {
  session_title?: RichtextStoryblok;
  date: string;
  start_time: string;
  end_time: string;
  room?: string;
  presenters?: (StoryblokStory<PersonStoryblok> | string)[];
  session_description?: RichtextStoryblok;
  track_name: StoryblokStory<ConferenceTrackStoryblok> | string;
  ce_credits?: string;
  anchor?: string;
  _uid: string;
  component: "conference_schedule_item";
  [k: string]: any;
}

export interface ConferenceTrackStoryblok {
  name?: string;
  color?: "" | "#7A6B8E" | "#DF7411" | "#857731" | "#555555" | "#7A99AC" | "#B06161" | "#86A789";
  use_light_text?: boolean;
  _uid: string;
  component: "conference_track";
  [k: string]: any;
}

export interface FooterStoryblok {
  logo?: AssetStoryblok;
  logo_link?: MultilinkStoryblok;
  copyright_text?: string;
  legal_links?: FooterLinkStoryblok[];
  footer_columns?: FooterColumnStoryblok[];
  _uid: string;
  component: "Footer";
  [k: string]: any;
}

export interface FooterButtonStoryblok {
  text?: string;
  link?: MultilinkStoryblok;
  button_style?: "" | "solid" | "outline";
  button_size?: string;
  before_icon?: string;
  after_icon?: string;
  alignment_desktop?: "left" | "center" | "right" | "stretch";
  alignment_mobile?: string;
  _uid: string;
  component: "footer_button";
  [k: string]: any;
}

export interface FooterColumnStoryblok {
  body?: (
    | FooterLinkGroupStoryblok
    | FooterSocialRowStoryblok
    | FooterButtonStoryblok
    | FooterIconLinkStoryblok
    | WidgetRichtextStoryblok
  )[];
  _uid: string;
  component: "footer_column";
  [k: string]: any;
}

export interface FooterImageLinkStoryblok {
  image?: AssetStoryblok;
  link?: MultilinkStoryblok;
  _uid: string;
  component: "footer_image_link";
  [k: string]: any;
}

export interface FooterLinkStoryblok {
  text?: string;
  link?: MultilinkStoryblok;
  _uid: string;
  component: "footer_link";
  [k: string]: any;
}

export interface FooterLinkGroupStoryblok {
  title?: string;
  title_link?: MultilinkStoryblok;
  description?: RichtextStoryblok;
  footer_link_group_links?: FooterLinkStoryblok[];
  _uid: string;
  component: "footer_link_group";
  [k: string]: any;
}

export interface FooterSocialRowStoryblok {
  facebook_link?: MultilinkStoryblok;
  x_link?: MultilinkStoryblok;
  youtube_link?: MultilinkStoryblok;
  alignment_desktop?: string;
  alignment_mobile?: string;
  linkedin_link?: MultilinkStoryblok;
  _uid: string;
  component: "footer_social_row";
  [k: string]: any;
}

export interface HeaderStoryblok {
  show?: boolean;
  text?: RichtextStoryblok;
  link_text?: string;
  link?: MultilinkStoryblok;
  logo?: AssetStoryblok;
  logo_link?: MultilinkStoryblok;
  nav_root_items?: (NavRootItemStoryblok | NavRootItemSlideoutStoryblok)[];
  cta?: WidgetButtonStoryblok[];
  utility_nav?: UtilityNavGroupStoryblok[];
  _uid: string;
  component: "Header";
  [k: string]: any;
}

export interface HeroStatsStoryblok {
  items?: any[];
  layout?: "" | "row" | "column";
  alignment?: "" | "left" | "center" | "right";
  gap?: string;
  _uid: string;
  component: "hero_stats";
  [k: string]: any;
}

export interface InternalDocumentationPageStoryblok {
  description?: RichtextStoryblok;
  body?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
    | NavGroupStoryblok
    | NavLinkStoryblok
    | NavMenuStoryblok
    | NavRootItemStoryblok
    | NavRootItemButtonStoryblok
    | NavRootItemSlideoutStoryblok
    | NavSlideItemStoryblok
    | NavTextStoryblok
    | SubMenuStoryblok
    | UtilityNavGroupStoryblok
    | UtilityNavItemStoryblok
    | UtilityNavLoginItemStoryblok
  )[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  hide_breadcrumbs?: boolean;
  exclude_from_sitemap?: boolean;
  exclude_from_internal_search?: boolean;
  robots_no_index?: boolean;
  robots_no_follow?: boolean;
  redirect_url?: string;
  permissions?: {
    roles: string[];
    requiresAuth: "yes" | "no" | "inherits";
    assignedRoles: {
      name: string;
      value: string;
      access: "allow" | "deny" | "unset";
    }[];
  };
  _uid: string;
  component: "internal_documentation_page";
  [k: string]: any;
}

export interface ListingPageStoryblok {
  article_type?: string;
  article_layout?: "condensed" | "detailed";
  above_listing_blocks?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  below_listing_blocks?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  hide_breadcrumbs?: boolean;
  breadcrumb_label?: string;
  exclude_from_sitemap?: boolean;
  exclude_from_internal_search?: boolean;
  robots_no_index?: boolean;
  robots_no_follow?: boolean;
  redirect_url?: string;
  permissions?: {
    roles: string[];
    requiresAuth: "yes" | "no" | "inherits";
    assignedRoles: {
      name: string;
      value: string;
      access: "allow" | "deny" | "unset";
    }[];
  };
  aside_blocks?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  no_results_content?: RichtextStoryblok;
  schema?: string;
  _uid: string;
  component: "listing_page";
  [k: string]: any;
}

export interface ListingPageV2Storyblok {
  article_type?: string;
  article_layout?: "condensed" | "detailed";
  only_from_current_folder?: boolean;
  above_listing_blocks?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  listing_header?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  below_listing_blocks?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  aside_blocks?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  no_results_content?: RichtextStoryblok;
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  hide_breadcrumbs?: boolean;
  breadcrumb_label?: string;
  exclude_from_sitemap?: boolean;
  exclude_from_internal_search?: boolean;
  robots_no_index?: boolean;
  robots_no_follow?: boolean;
  redirect_url?: string;
  permissions?: {
    roles: string[];
    requiresAuth: "yes" | "no" | "inherits";
    assignedRoles: {
      name: string;
      value: string;
      access: "allow" | "deny" | "unset";
    }[];
  };
  schema?: string;
  _uid: string;
  component: "listing_page_v2";
  [k: string]: any;
}

export interface LogoGridItemStoryblok {
  image?: AssetStoryblok;
  caption?: string;
  link?: MultilinkStoryblok;
  _uid: string;
  component: "logo_grid_item";
  [k: string]: any;
}

export interface LogoGridTierStoryblok {
  title?: string;
  title_text_color?: string;
  title_background_color?: string;
  items?: (LogoGridItemStoryblok | PartnerLogoGridItemStoryblok)[];
  _uid: string;
  component: "logo_grid_tier";
  [k: string]: any;
}

export interface NavGroupStoryblok {
  group_header?: string;
  group_header_link?: MultilinkStoryblok;
  column_span?: "3" | "4" | "6" | "8" | "9" | "12";
  subitem_span?: "3" | "4" | "6" | "12";
  subitems?: (NavLinkStoryblok | NavTextStoryblok)[];
  _uid: string;
  component: "nav_group";
  [k: string]: any;
}

export interface NavLinkStoryblok {
  link_text?: string;
  link?: MultilinkStoryblok;
  before_icon?: string;
  after_icon?: string;
  _uid: string;
  component: "nav_link";
  [k: string]: any;
}

export interface NavMenuStoryblok {
  nav_root_items?: (NavRootItemStoryblok | NavRootItemSlideoutStoryblok)[];
  _uid: string;
  component: "nav_menu";
  [k: string]: any;
}

export interface NavRootItemStoryblok {
  aside?: WidgetMenuCtaStoryblok[];
  hide_aside?: boolean;
  root_item_text?: string;
  overview_title?: string;
  root_item_link?: MultilinkStoryblok;
  overview_description?: RichtextStoryblok;
  sub_menu_type?: "simple" | "fullwidth";
  sizing?: "" | "3" | "6" | "9" | "12";
  nav_groups?: NavGroupStoryblok[];
  _uid: string;
  component: "nav_root_item";
  [k: string]: any;
}

export interface NavRootItemButtonStoryblok {
  root_item_text?: string;
  root_item_link?: MultilinkStoryblok;
  overview_description?: RichtextStoryblok;
  _uid: string;
  component: "nav_root_item_button";
  [k: string]: any;
}

export interface NavRootItemSlideoutStoryblok {
  sizing?: "" | "3" | "6" | "9" | "12";
  nav_groups?: (NavSlideItemStoryblok | NavLinkStoryblok)[];
  root_item_text?: string;
  root_item_link?: MultilinkStoryblok;
  overview_description?: RichtextStoryblok;
  slideout_sizing?: string;
  _uid: string;
  component: "nav_root_item_slideout";
  [k: string]: any;
}

export interface NavSlideItemStoryblok {
  root_item_text?: string;
  overview_title?: string;
  overview_link?: MultilinkStoryblok;
  overview_description?: RichtextStoryblok;
  sub_menu?: NavGroupStoryblok[];
  sizing?: string;
  _uid: string;
  component: "nav_slide_item";
  [k: string]: any;
}

export interface NavTextStoryblok {
  nav_text?: string;
  sub_menu?: SubMenuStoryblok[];
  _uid: string;
  component: "nav_text";
  [k: string]: any;
}

export interface NotFoundPageStoryblok {
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  body?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  hide_breadcrumbs?: boolean;
  exclude_from_sitemap?: boolean;
  exclude_from_internal_search?: boolean;
  robots_no_index?: boolean;
  robots_no_follow?: boolean;
  _uid: string;
  component: "not_found_page";
  [k: string]: any;
}

export interface PageStoryblok {
  seo?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  hide_breadcrumbs?: boolean;
  breadcrumb_label?: string;
  exclude_from_sitemap?: boolean;
  exclude_from_internal_search?: boolean;
  robots_no_index?: boolean;
  robots_no_follow?: boolean;
  redirect_url?: string;
  body?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  permissions?: {
    roles: string[];
    requiresAuth: "yes" | "no" | "inherits";
    assignedRoles: {
      name: string;
      value: string;
      access: "allow" | "deny" | "unset";
    }[];
  };
  schema?: string;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PanelStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  _uid: string;
  component: "panel";
  [k: string]: any;
}

export interface PanelAccordionStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_position?: string;
  header_width?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  accordion?: (
    | AccordionItemStoryblok
    | AccordionGroupHeaderStoryblok
    | AccordionGroupStoryblok
    | AccordionFaqItemStoryblok
  )[];
  enable_parallax?: boolean;
  _uid: string;
  component: "panel_accordion";
  [k: string]: any;
}

export interface PanelColumnsStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  row_gap?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  column_gap?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  columns?: WidgetColumnStoryblok[];
  row_breakpoint?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  alignment?: any;
  horizontal_alignment?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  vertical_alignment?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  enable_parallax?: boolean;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  _uid: string;
  component: "panel_columns";
  [k: string]: any;
}

export interface PanelComparisonMatrixStoryblok {
  config_items?: ComparisonMatrixConfigItemStoryblok[];
  mobile_subhead?: RichtextStoryblok;
  body?: (
    | ComparisonMatrixHeadingRowStoryblok
    | ComparisonMatrixRichTextRowStoryblok
    | ComparisonMatrixImageRowStoryblok
  )[];
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  enable_parallax?: boolean;
  _uid: string;
  component: "panel_comparison_matrix";
  [k: string]: any;
}

export interface PanelDividerStoryblok {
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  line_color?: string;
  line_thickness?: "thin" | "medium" | "thick";
  _uid: string;
  component: "panel_divider";
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface PanelEventCtaStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_position?: string;
  header_width?: string;
  content?: RichtextStoryblok;
  aside_images?: MultiassetStoryblok;
  video_thumbnail?: AssetStoryblok;
  video?: (WidgetHtml5VideoEmbedStoryblok | WidgetVimeoEmbedStoryblok | WidgetYoutubeEmbedStoryblok)[];
  enable_parallax?: boolean;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  footer_position?: string;
  _uid: string;
  component: "panel_event_cta";
  [k: string]: any;
}

export interface PanelGridStoryblok {
  alignment_vertical?: string;
  alignment_horizontal?: string;
  gutters_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  gutters_column?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  items_per_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  items?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  parallax_enabled?: boolean;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  footer_position?: string;
  footer_text_color?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  header_position?: string;
  header_text_color?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  _uid: string;
  component: "panel_grid";
  [k: string]: any;
}

export interface PanelHeroStoryblok {
  pill?: WidgetPillAStoryblok[];
  content?: RichtextStoryblok;
  image?: AssetStoryblok;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  background?: boolean;
  _uid: string;
  component: "panel_hero";
  [k: string]: any;
}

export interface PanelHeroCertificationStoryblok {
  certification?: "" | "cima" | "cpwa" | "rma";
  content?: RichtextStoryblok;
  image?: AssetStoryblok;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  _uid: string;
  component: "panel_hero_certification";
  [k: string]: any;
}

export interface PanelHeroWithVideoStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  video_embed?: (WidgetVimeoEmbedStoryblok | WidgetYoutubeEmbedStoryblok | WidgetHtml5VideoEmbedStoryblok)[];
  content?: RichtextStoryblok;
  fallback_image?: AssetStoryblok;
  _uid: string;
  component: "panel_hero_with_video";
  [k: string]: any;
}

export interface PanelHorizontalTabsStoryblok {
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_asset?: AssetStoryblok;
  panel_background_color?: string;
  tabs?: WidgetTabContentStoryblok[];
  header_text_color?: string;
  header_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  footer_text_color?: string;
  footer_position?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_asset?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_asset?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  _uid: string;
  component: "panel_horizontal_tabs";
  [k: string]: any;
}

export interface PanelImageStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  image?: AssetStoryblok;
  image_size?: string;
  image_position?: string;
  enable_parallax?: boolean;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  footer_position?: string;
  _uid: string;
  component: "panel_image";
  [k: string]: any;
}

export interface PanelImageTextStoryblok {
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  header_position?: string;
  header_text_color?: string;
  content?: RichtextStoryblok;
  content_text_color?: string;
  content_alignment?: string;
  image_side?: string;
  image_size?: string;
  image?: AssetStoryblok;
  enable_parallax?: boolean;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  footer_position?: string;
  footer_text_color?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  _uid: string;
  component: "panel_image_text";
  [k: string]: any;
}

export interface PanelLayoutAStoryblok {
  title?: string;
  content?: RichtextStoryblok;
  video?: (WidgetHtml5VideoEmbedStoryblok | WidgetYoutubeEmbedStoryblok)[];
  cards?: WidgetCardLinkStoryblok[];
  background_image?: AssetStoryblok;
  _uid: string;
  component: "panel_layout_a";
  [k: string]: any;
}

export interface PanelLogoGridStoryblok {
  new_design?: boolean;
  items_per_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  items?: (LogoGridItemStoryblok | LogoGridTierStoryblok | PartnerLogoGridItemStoryblok)[];
  caption_position?: "top" | "bottom";
  caption_text_align?: string;
  parallax_enabled?: boolean;
  hide_bottom_border?: boolean;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  gutters_column?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  gutters_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  _uid: string;
  component: "panel_logo_grid";
  [k: string]: any;
}

export interface PanelRichtextStoryblok {
  content?: RichtextStoryblok;
  content_width?: string;
  content_alignment?: string;
  vertical_alignment?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  footer_position?: string;
  footer_text_color?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  header_position?: string;
  header_text_color?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  horizontal_position?: string;
  enable_parallax?: boolean;
  _uid: string;
  component: "panel_richtext";
  [k: string]: any;
}

export interface PanelScheduleStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  footer_position?: string;
  footer_text_color?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  header_position?: string;
  header_text_color?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  start_date: string;
  end_date: string;
  display_date_filter?: boolean;
  display_track_filter?: boolean;
  time_blocks?: TimeBlockStoryblok[];
  enable_parallax?: boolean;
  _uid: string;
  component: "panel_schedule";
  [k: string]: any;
}

export interface PanelSpeakerListingGridStoryblok {
  items_per_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  conference?: any;
  speakers?: WidgetProfileCardStoryblok[];
  parallax_enabled?: boolean;
  alignment_vertical?: string;
  alignment_horizontal?: string;
  gutters_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  gutters_column?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  footer_position?: string;
  footer_text_color?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  header_position?: string;
  header_text_color?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  _uid: string;
  component: "panel_speaker_listing_grid";
  [k: string]: any;
}

export interface PanelStepStoryblok {
  step_number?: string;
  title?: string;
  title_color?: string;
  description?: RichtextStoryblok;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  enable_parallax?: boolean;
  _uid: string;
  component: "panel_step";
  [k: string]: any;
}

export interface PanelTableStoryblok {
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  header_width?: string;
  table?: string;
  sticky_first_row?: boolean;
  sticky_first_column?: boolean;
  header_text_color?: string;
  header_position?: string;
  footer_text_color?: string;
  footer_position?: string;
  enable_parallax?: boolean;
  _uid: string;
  component: "panel_table";
  [k: string]: any;
}

export interface PanelTestimonialStoryblok {
  testimonial_data?: StoryblokStory<TestimonialStoryblok> | string;
  quote_text_color?: string;
  title_text_color?: string;
  description_text_color?: string;
  parallax_enabled?: boolean;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  header_width?: string;
  header_text_color?: string;
  header_position?: string;
  footer_text_color?: string;
  footer_position?: string;
  _uid: string;
  component: "panel_testimonial";
  [k: string]: any;
}

export interface PanelTestimonialCarouselStoryblok {
  testimonial_data?: (StoryblokStory<TestimonialStoryblok> | string)[];
  testimonial_card_background_color?: string;
  quote_text_color?: string;
  title_text_color?: string;
  description_text_color?: string;
  parallax_enabled?: boolean;
  carousel_speed?: string;
  header_text_color?: string;
  header_position?: string;
  footer_text_color?: string;
  footer_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  header_width?: string;
  _uid: string;
  component: "panel_testimonial_carousel";
  [k: string]: any;
}

export interface PanelTestimonialSliderStoryblok {
  quotes?: WidgetTestimonialSliderStoryblok[];
  header_text_color?: string;
  header_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  footer_text_color?: string;
  footer_position?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: "";
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  _uid: string;
  component: "panel_testimonial_slider";
  [k: string]: any;
}

export interface PanelTextWidgetStoryblok {
  content?: RichtextStoryblok;
  content_text_color?: string;
  content_alignment?: string;
  content_side?: string;
  mobile_order?: "text" | "widget";
  content_size?: string;
  widget?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  enable_parallax?: boolean;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_width?: string;
  header_position?: string;
  header_text_color?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  footer_position?: string;
  footer_text_color?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  _uid: string;
  component: "panel_text_widget";
  [k: string]: any;
}

export interface PanelTextWidgetGridStoryblok {
  content_text_color?: string;
  content?: RichtextStoryblok;
  grid_fill_direction?: "left-to-right" | "right-to-left";
  grid_items_per_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  grid_items?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  _uid: string;
  component: "panel_text_widget_grid";
  [k: string]: any;
}

export interface PanelThreeColumnTextStoryblok {
  column_1_text?: RichtextStoryblok;
  column_2_text?: RichtextStoryblok;
  column_3_text?: RichtextStoryblok;
  center_horizontal_alignment?: string;
  center_vertical_alignment?: string;
  right_horizontal_alignment?: string;
  right_vertical_alignment?: string;
  left_horizontal_alignment?: string;
  left_vertical_alignment?: string;
  left_column?: any;
  second_column?: any;
  third_column?: any;
  column_gap?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  enable_parallax?: boolean;
  _uid: string;
  component: "panel_three_column_text";
  [k: string]: any;
}

export interface PanelTwoColumnTextStoryblok {
  content_left_color?: string;
  content_left_size?: string;
  content_left_alignment?: string;
  content_left_horizontal_align?: string;
  content_left_font_size?: string;
  content_right_color?: string;
  content_right_alignment?: string;
  content_right_font_size?: string;
  content_right_horizontal_align?: string;
  left_text?: RichtextStoryblok;
  right_text?: RichtextStoryblok;
  enable_parallax?: boolean;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_background_color?: string;
  top_bar_height?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_background_color?: string;
  bottom_bar_height?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_width?: string;
  header_width?: string;
  header_text_color?: string;
  header_position?: string;
  footer_text_color?: string;
  footer_position?: string;
  left?: any;
  right?: any;
  column_gap?: string;
  _uid: string;
  component: "panel_two_column_text";
  [k: string]: any;
}

export interface PanelVideoTextStoryblok {
  footer_content?: RichtextStoryblok;
  footer_content_alignment?: string;
  footer_text_color?: string;
  footer_width?: string;
  footer_position?: string;
  header_content?: RichtextStoryblok;
  header_content_alignment?: string;
  header_text_color?: string;
  header_width?: string;
  header_position?: string;
  content_group?: any;
  content?: RichtextStoryblok;
  content_text_color?: string;
  content_alignment?: string;
  video_group?: any;
  video_embed?: (WidgetYoutubeEmbedStoryblok | WidgetVimeoEmbedStoryblok | WidgetHtml5VideoEmbedStoryblok)[];
  video_side?: string;
  video_size?: string;
  video_thumbnail?: AssetStoryblok;
  enable_parallax?: boolean;
  text?: any;
  panel_text_color?: string;
  background?: any;
  panel_background_image?: AssetStoryblok;
  panel_background_color?: string;
  panel_background_position?: string;
  spacing?: any;
  panel_padding_top?: string;
  panel_padding_bottom?: string;
  top_bar?: any;
  top_bar_background_image?: AssetStoryblok;
  top_bar_height?: string;
  top_bar_background_color?: string;
  bottom_bar?: any;
  bottom_bar_background_image?: AssetStoryblok;
  bottom_bar_height?: string;
  bottom_bar_background_color?: string;
  _uid: string;
  component: "panel_video_text";
  [k: string]: any;
}

export interface PartnerStoryblok {
  site_url?: MultilinkStoryblok;
  logo?: AssetStoryblok;
  _uid: string;
  component: "partner";
  [k: string]: any;
}

export interface PartnerLogoGridItemStoryblok {
  partner?: StoryblokStory<PartnerStoryblok> | string;
  _uid: string;
  component: "partner_logo_grid_item";
  [k: string]: any;
}

export interface PersonStoryblok {
  name?: string;
  title?: string;
  certifications?: string;
  summary?: string;
  image?: AssetStoryblok;
  biography?: RichtextStoryblok;
  social_media?: any[];
  _uid: string;
  component: "person";
  [k: string]: any;
}

export interface SearchPageStoryblok {
  no_terms_message?: RichtextStoryblok;
  no_results_message?: RichtextStoryblok;
  search_placeholder_text?: string;
  before_results?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  after_results?: (
    | PanelAccordionStoryblok
    | PanelColumnsStoryblok
    | PanelComparisonMatrixStoryblok
    | PanelDividerStoryblok
    | PanelEventCtaStoryblok
    | PanelGridStoryblok
    | PanelHeroStoryblok
    | PanelHeroCertificationStoryblok
    | PanelHeroWithVideoStoryblok
    | PanelHorizontalTabsStoryblok
    | PanelImageStoryblok
    | PanelImageTextStoryblok
    | PanelLayoutAStoryblok
    | PanelLogoGridStoryblok
    | PanelRichtextStoryblok
    | PanelScheduleStoryblok
    | PanelSpeakerListingGridStoryblok
    | PanelStepStoryblok
    | PanelTableStoryblok
    | PanelTestimonialStoryblok
    | PanelTestimonialCarouselStoryblok
    | PanelTestimonialSliderStoryblok
    | PanelTextWidgetStoryblok
    | PanelTextWidgetGridStoryblok
    | PanelThreeColumnTextStoryblok
    | PanelTwoColumnTextStoryblok
    | PanelVideoTextStoryblok
  )[];
  _uid: string;
  component: "search_page";
  [k: string]: any;
}

export interface StatItemStoryblok {
  value?: string;
  label?: string;
  _uid: string;
  component: "stat_item";
  [k: string]: any;
}

export interface SubMenuStoryblok {
  sub_menu_type?: "" | "simple" | "fullwidth" | "hybrid";
  items?: (NavRowStoryblok | NavGroupStoryblok)[];
  _uid: string;
  component: "sub_menu";
  [k: string]: any;
}

export interface TestimonialStoryblok {
  headline?: string;
  disclaimer?: string;
  name?: string;
  title?: string;
  content?: RichtextStoryblok;
  photo?: AssetStoryblok;
  _uid: string;
  component: "testimonial";
  [k: string]: any;
}

export interface TimeBlockStoryblok {
  date: string;
  time_range_label?: string;
  subtitle?: RichtextStoryblok;
  sessions?: (StoryblokStory<ConferenceScheduleItemStoryblok> | string)[];
  _uid: string;
  component: "time_block";
  [k: string]: any;
}

export interface UtilityNavGroupStoryblok {
  utility_nav_items?: (UtilityNavItemStoryblok | UtilityNavLoginItemStoryblok)[];
  _uid: string;
  component: "utility_nav_group";
  [k: string]: any;
}

export interface UtilityNavItemStoryblok {
  item_text?: string;
  mobile_item_text?: string;
  item_link?: MultilinkStoryblok;
  before_icon?: string;
  after_icon?: string;
  _uid: string;
  component: "utility_nav_item";
  [k: string]: any;
}

export interface UtilityNavLoginItemStoryblok {
  item_text?: string;
  item_link?: MultilinkStoryblok;
  _uid: string;
  component: "utility_nav_login_item";
  [k: string]: any;
}

export interface WidgetAccordionStoryblok {
  items?: AccordionItemStoryblok[];
  _uid: string;
  component: "widget_accordion";
  [k: string]: any;
}

export interface WidgetArticleArchiveListingStoryblok {
  _uid: string;
  component: "widget_article_archive_listing";
  [k: string]: any;
}

export interface WidgetArticleTopicListingStoryblok {
  heading?: string;
  padding_top?: string;
  _uid: string;
  component: "widget_article_topic_listing";
  [k: string]: any;
}

export interface WidgetButtonStoryblok {
  text?: string;
  aria_label?: string;
  link?: MultilinkStoryblok;
  button_style?: string;
  button_size?: string;
  before_icon?: string;
  after_icon?: string;
  button_color?: "cima" | "cpwa" | "rma";
  margin?: "" | "right" | "left" | "both";
  place_on_new_line?: boolean;
  _uid: string;
  component: "widget_button";
  [k: string]: any;
}

export interface WidgetButtonModalStoryblok {
  use_white_background?: boolean;
  body?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  text?: string;
  aria_label?: string;
  button_style?: string;
  button_size?: string;
  before_icon?: string;
  after_icon?: string;
  margin?: "" | "right" | "left" | "both";
  place_on_new_line?: boolean;
  button_color?: "cima" | "cpwa" | "rma";
  _uid: string;
  component: "widget_button_modal";
  [k: string]: any;
}

export interface WidgetCardLinkStoryblok {
  title?: string;
  content?: RichtextStoryblok;
  link: MultilinkStoryblok;
  _uid: string;
  component: "widget_card_link";
  [k: string]: any;
}

export interface WidgetColumnStoryblok {
  order?: string;
  body?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  sizes?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  _uid: string;
  component: "widget_column";
  [k: string]: any;
}

export interface WidgetConferencePriceStoryblok {
  discounted_price?: string;
  full_price?: string;
  size?: "" | "small" | "medium" | "large";
  _uid: string;
  component: "widget_conference_price";
  [k: string]: any;
}

export interface WidgetCountdownTimerStoryblok {
  timer_text?: string;
  timer_expire_text?: string;
  event_date: string;
  seconds?: boolean;
  content_alignment?: string;
  use_panel_background?: boolean;
  widget_text_color?: string;
  border_color?: string;
  _uid: string;
  component: "widget_countdown_timer";
  [k: string]: any;
}

export interface WidgetCtaCardStoryblok {
  image?: AssetStoryblok;
  certification_type: "" | "cima" | "cpwa" | "rma";
  headline?: RichtextStoryblok;
  body?: RichtextStoryblok;
  link?: MultilinkStoryblok;
  link_text?: string;
  _uid: string;
  component: "widget_cta_card";
  [k: string]: any;
}

export interface WidgetGridStoryblok {
  alignment_vertical?: string;
  alignment_horizontal?: string;
  gutters_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  gutters_column?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  items_per_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  items?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  margin_top?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  margin_bottom?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  _uid: string;
  component: "widget_grid";
  [k: string]: any;
}

export interface WidgetHtml5VideoEmbedStoryblok {
  video?: AssetStoryblok;
  thumbnail?: AssetStoryblok;
  title?: string;
  description?: string;
  _uid: string;
  component: "widget_html5_video_embed";
  [k: string]: any;
}

export interface WidgetHubspotEmbedStoryblok {
  region?: string;
  portal_id?: string;
  form_id?: string;
  _uid: string;
  component: "widget_hubspot_embed";
  [k: string]: any;
}

export interface WidgetIconTextStoryblok {
  orientation?: "horizontal" | "vertical";
  icon?: AssetStoryblok;
  link_text?: string;
  link?: MultilinkStoryblok;
  link_size?: string;
  link_style?: string;
  link_after_icon?: string;
  link_override?: "cima" | "cpwa" | "rma";
  link_last?: boolean;
  description?: RichtextStoryblok;
  content_text_color?: string;
  _uid: string;
  component: "widget_icon_text";
  [k: string]: any;
}

export interface WidgetIframeEmbedStoryblok {
  embed_code?: string;
  _uid: string;
  component: "widget_iframe_embed";
  [k: string]: any;
}

export interface WidgetImageStoryblok {
  image?: AssetStoryblok;
  image_size?: string;
  horizontal_position?: string;
  _uid: string;
  component: "widget_image";
  [k: string]: any;
}

export interface WidgetImageTextCardStoryblok {
  banner_text?: string;
  banner_style?: "" | "navy-banner" | "yellow-banner" | "navy-white-banner" | "white-banner";
  display_banner?: boolean;
  image?: AssetStoryblok;
  headline?: string;
  description?: RichtextStoryblok;
  buttons?: WidgetButtonStoryblok[];
  card_style?:
    | ""
    | "default"
    | "course-cards"
    | "blue-headline-large"
    | "image-and-link"
    | "navy-headline"
    | "cima-headline-large"
    | "cpwa-headline-large"
    | "rma-headline-large";
  content_alignment?: string;
  image_border?: boolean;
  _uid: string;
  component: "widget_image_text_card";
  [k: string]: any;
}

export interface WidgetImageWithContentStoryblok {
  image: AssetStoryblok;
  title?: string;
  content?: RichtextStoryblok;
  button?: WidgetButtonStoryblok[];
  _uid: string;
  component: "widget_image_with_content";
  [k: string]: any;
}

export interface WidgetLogoGridStoryblok {
  items_per_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  items?: (LogoGridItemStoryblok | LogoGridTierStoryblok | PartnerLogoGridItemStoryblok)[];
  caption_position?: "top" | "bottom";
  caption_text_align?: string;
  gutters_column?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  gutters_row?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  hide_bottom_border?: boolean;
  _uid: string;
  component: "widget_logo_grid";
  [k: string]: any;
}

export interface WidgetMarketoFormEmbedStoryblok {
  script?: string;
  loading_strategy?: "" | "beforeInteractive" | "afterInteractive" | "lazyOnload";
  _uid: string;
  component: "widget_marketo_form_embed";
  [k: string]: any;
}

export interface WidgetMenuCtaStoryblok {
  content_alignment?: string;
  headline?: string;
  description?: RichtextStoryblok;
  image?: AssetStoryblok;
  buttons?: WidgetButtonStoryblok[];
  _uid: string;
  component: "widget_menu_cta";
  [k: string]: any;
}

export interface WidgetNestableColumnsStoryblok {
  row_gap?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  column_gap?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  columns?: (
    | CertificationCardStoryblok
    | HeroStatsStoryblok
    | StatItemStoryblok
    | WidgetAccordionStoryblok
    | WidgetArticleArchiveListingStoryblok
    | WidgetArticleTopicListingStoryblok
    | WidgetButtonStoryblok
    | WidgetButtonModalStoryblok
    | WidgetCardLinkStoryblok
    | WidgetConferencePriceStoryblok
    | WidgetCountdownTimerStoryblok
    | WidgetCtaCardStoryblok
    | WidgetGridStoryblok
    | WidgetHtml5VideoEmbedStoryblok
    | WidgetHubspotEmbedStoryblok
    | WidgetIconTextStoryblok
    | WidgetIframeEmbedStoryblok
    | WidgetImageStoryblok
    | WidgetImageTextCardStoryblok
    | WidgetImageWithContentStoryblok
    | WidgetLogoGridStoryblok
    | WidgetMarketoFormEmbedStoryblok
    | WidgetMenuCtaStoryblok
    | WidgetNestableColumnsStoryblok
    | WidgetPillAStoryblok
    | WidgetProfileCardStoryblok
    | WidgetRichtextStoryblok
    | WidgetScriptEmbedStoryblok
    | WidgetStatisticStoryblok
    | WidgetStatWithContentStoryblok
    | WidgetStepStoryblok
    | WidgetTabContentStoryblok
    | WidgetTableStoryblok
    | WidgetTestimonialStoryblok
    | WidgetTestimonialSliderStoryblok
    | WidgetVimeoEmbedStoryblok
    | WidgetYoutubeEmbedStoryblok
  )[];
  row_breakpoint?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  alignment?: any;
  horizontal_alignment?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  vertical_alignment?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  margin_top?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  margin_bottom?: {
    fieldValue: {
      default: {
        value: string | null;
      };
      sm: {
        value: string | null;
      };
      md: {
        value: string | null;
      };
      lg: {
        value: string | null;
      };
      xl: {
        value: string | null;
      };
      xxl: {
        value: string | null;
      };
    };
    isCustom: boolean;
  };
  _uid: string;
  component: "widget_nestable_columns";
  [k: string]: any;
}

export interface WidgetPillAStoryblok {
  text?: string;
  _uid: string;
  component: "widget_pill_a";
  [k: string]: any;
}

export interface WidgetProfileCardStoryblok {
  person?: StoryblokStory<WidgetProfileCardStoryblok> | StoryblokStory<PersonStoryblok> | string;
  link_text?: string;
  _uid: string;
  component: "widget_profile_card";
  [k: string]: any;
}

export interface WidgetRichtextStoryblok {
  content: RichtextStoryblok;
  content_text_color?: string;
  content_alignment?: string;
  content_width?: string;
  _uid: string;
  component: "widget_richtext";
  [k: string]: any;
}

export interface WidgetScriptEmbedStoryblok {
  script?: string;
  loading_strategy?: "" | "beforeInteractive" | "afterInteractive" | "lazyOnload";
  _uid: string;
  component: "widget_script_embed";
  [k: string]: any;
}

export interface WidgetStatisticStoryblok {
  should_animate?: boolean;
  animation_duration?: string;
  pre_text?: string;
  number?: string;
  post_text?: string;
  description?: RichtextStoryblok;
  _uid: string;
  component: "widget_statistic";
  [k: string]: any;
}

export interface WidgetStatWithContentStoryblok {
  stat?: string;
  content?: RichtextStoryblok;
  _uid: string;
  component: "widget_stat_with_content";
  [k: string]: any;
}

export interface WidgetStepStoryblok {
  step_number?: string;
  title?: string;
  title_color?: string;
  description?: RichtextStoryblok;
  padding_top?: string;
  padding_bottom?: string;
  _uid: string;
  component: "widget_step";
  [k: string]: any;
}

export interface WidgetTabContentStoryblok {
  label?: string;
  content?: any[];
  _uid: string;
  component: "widget_tab_content";
  [k: string]: any;
}

export interface WidgetTableStoryblok {
  table?: string;
  sticky_first_row?: boolean;
  sticky_first_column?: boolean;
  _uid: string;
  component: "widget_table";
  [k: string]: any;
}

export interface WidgetTestimonialStoryblok {
  quote?: RichtextStoryblok;
  name?: string;
  title?: string;
  image?: AssetStoryblok;
  _uid: string;
  component: "widget_testimonial";
  [k: string]: any;
}

export interface WidgetTestimonialSliderStoryblok {
  quote?: string;
  quoter?: StoryblokStory<PersonStoryblok> | string;
  _uid: string;
  component: "widget_testimonial_slider";
  [k: string]: any;
}

export interface WidgetVimeoEmbedStoryblok {
  embed_code?: string;
  _uid: string;
  component: "widget_vimeo_embed";
  [k: string]: any;
}

export interface WidgetYoutubeEmbedStoryblok {
  embed_code?: string;
  thumbnail?: AssetStoryblok;
  _uid: string;
  component: "widget_youtube_embed";
  [k: string]: any;
}
