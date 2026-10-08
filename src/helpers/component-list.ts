import ConferenceFooter from '@/components/internal/conference-footer/ConferenceFooter';
import ConferenceHeader from '@/components/internal/conference-header/ConferenceHeader';
import ConferenceScheduleItem from '@/components/internal/conference-schedule-item/ConferenceScheduleItem';
import Footer from '@/components/internal/footer/Footer';
import Header from '@/components/internal/header/Header';
import TimeBlock from '@/components/internal/time-block/TimeBlock';
// Page Types
import Article from '@/components/page-types/article/Article';
import ConferenceHome from '@/components/page-types/ConferenceHome';
import InternalDocumentationPage from '@/components/page-types/InternalDocumentationPage';
import ListingPage from '@/components/page-types/ListingPage/ListingPage';
import NotFoundPage from '@/components/page-types/NotFoundPage';
import Page from '@/components/page-types/Page';
import SearchPage from '@/components/page-types/Search';
import TestimonialPreview from '@/components/page-types/Testimonial';
// Panels
import PanelAccordion from '@/components/panels/accordion/PanelAccordion';
import PanelColumns from '@/components/panels/columns/PanelColumns';
import PanelComparisonMatrix from '@/components/panels/comparison-matrix/PanelComparisonMatrix';
import PanelDivider from '@/components/panels/divider/PanelDivider';
import PanelEventCta from '@/components/panels/event-cta/PanelEventCta';
import PanelGrid from '@/components/panels/grid/PanelGrid';
import PanelHero from '@/components/panels/hero/Hero';
import PanelHeroCertification from '@/components/panels/hero/HeroCertifications';
import PanelHeroWithVideo from '@/components/panels/hero/PanelHeroVideo';
import PanelHorizontalTabs from '@/components/panels/horizontal-tabs/PanelHorizontalTabs';
import PanelImageText from '@/components/panels/image-text/PanelImageText';
import PanelImage from '@/components/panels/image/PanelImage';
import PanelLayoutA from '@/components/panels/layout-a/PanelLayoutA';
import PanelLogoGrid from '@/components/panels/logo-grid/PanelLogoGrid';
import PanelRichtext from '@/components/panels/richtext/PanelRichtext';
import PanelSchedule from '@/components/panels/schedule/PanelSchedule';
import PanelSpeakerListingGrid from '@/components/panels/speaker-listing-grid/PanelSpeakerListingGrid';
import PanelStep from '@/components/panels/step/PanelStep';
import PanelTable from '@/components/panels/table/PanelTable';
import PanelTestimonialCarousel from '@/components/panels/testimonial-carousel/PanelTestimonialCarousel';
import PanelTestimonialSlider from '@/components/panels/testimonial-slider/PanelTestimonialSlider';
import PanelTestimonial from '@/components/panels/testimonial/PanelTestimonial';
import PanelTextWidgetGrid from '@/components/panels/text-widget-grid/PanelTextWidgetGrid';
import PanelTextWidget from '@/components/panels/text-widget/PanelTextWidget';
import PanelThreeColumnText from '@/components/panels/three-column-text/PanelThreeColumnText';
import PanelTwoColumnText from '@/components/panels/two-column-text/PanelTwoColumnText';
import PanelVideoText from '@/components/panels/video-text/PanelVideoText';
// Widgets
import WidgetAccordion from '@/components/widgets/accordion/WidgetAccordion';
import WidgetArticleArchiveListingClient from '@/components/widgets/article-archive-listing/WidgetArticleArchiveListing';
import WidgetArticleTopicListingClient from '@/components/widgets/article-topic-listing/WidgetArticleTopicListing';
import WidgetButton from '@/components/widgets/button/WidgetButton';
import WidgetButtonModal from '@/components/widgets/button/WidgetButtonModal';
import WidgetCardLink from '@/components/widgets/card-link/WidgetCardLink';
import WidgetColumn from '@/components/widgets/column/WidgetColumn';
import WidgetConferencePrice from '@/components/widgets/conference-price/WidgetConferencePrice';
import WidgetCountdownTimer from '@/components/widgets/countdown-timer/WidgetCountdownTimer';
import WidgetCtaCard from '@/components/widgets/cta-cards/WidgetCtaCard';
import WidgetGrid from '@/components/widgets/grid/WidgetGrid';
import WidgetHtml5VideoEmbed from '@/components/widgets/html5-video-embed/WidgetHtml5VideoEmbed';
import WidgetHubspotEmbed from '@/components/widgets/hubspot-embed/WidgetHubspotEmbed';
import WidgetIconText from '@/components/widgets/icon-text/WidgetIconText';
import WidgetIFrameEmbed from '@/components/widgets/iframe-embed/WidgetIframeEmbed';
import WidgetImageTextCard from '@/components/widgets/image-text-card/WidgetImageTextCard';
import WidgetImageWithContent from '@/components/widgets/image-with-content/WidgetImageWithContent';
import WidgetImage from '@/components/widgets/image/WidgetImage';
import WidgetLogoGrid from '@/components/widgets/logo-grid/WidgetLogoGrid';
import WidgetMenuCta from '@/components/widgets/menu-cta/WidgetMenuCta';
import WidgetNestableColumns from '@/components/widgets/nestable-columns/WidgetNestableColumns';
import WidgetPillA from '@/components/widgets/pill-a/WidgetPillA';
import WidgetProfileCard from '@/components/widgets/profile-card/WidgetProfileCard';
import WidgetRichtext from '@/components/widgets/richtext/WidgetRichtext';
import WidgetScriptEmbed from '@/components/widgets/script-embed/WidgetScriptEmbed';
import WidgetStatWithContent from '@/components/widgets/stat-with-content/WidgetStatWithContent';
import WidgetStatistic from '@/components/widgets/statistic/WidgetStatistic';
import WidgetStep from '@/components/widgets/step/WidgetStep';
import WidgetTabContent from '@/components/widgets/tab-content/WidgetTabContent';
import WidgetTable from '@/components/widgets/table/WidgetTable';
import WidgetVimeoEmbed from '@/components/widgets/vimeo-embed/WidgetVimeoEmbed';
import WidgetYoutubeEmbed from '@/components/widgets/youtube-embed/WidgetYoutubeEmbed';
// Types
import type { SbReactComponentsMap } from '@storyblok/react/rsc';

const components: SbReactComponentsMap = {
  // Pages
  page: Page,
  article: Article,
  listing_page: ListingPage,
  listing_page_v2: ListingPage,
  search_page: SearchPage,
  not_found_page: NotFoundPage,
  internal_documentation_page: InternalDocumentationPage,
  conference_home: ConferenceHome,

  // Internal
  Footer: Footer,
  Header: Header,
  testimonial: TestimonialPreview,
  time_block: TimeBlock,
  conference_header: ConferenceHeader,
  conference_footer: ConferenceFooter,
  conference_schedule_item: ConferenceScheduleItem,

  // Panels
  panel_image: PanelImage,
  panel_image_text: PanelImageText,
  panel_table: PanelTable,
  panel_columns: PanelColumns,
  panel_grid: PanelGrid,
  panel_hero: PanelHero,
  panel_hero_certification: PanelHeroCertification,
  panel_hero_with_video: PanelHeroWithVideo,
  panel_logo_grid: PanelLogoGrid,
  panel_accordion: PanelAccordion,
  panel_testimonial_carousel: PanelTestimonialCarousel,
  panel_testimonial: PanelTestimonial,
  panel_testimonial_slider: PanelTestimonialSlider,
  panel_layout_a: PanelLayoutA,
  panel_comparison_matrix: PanelComparisonMatrix,
  panel_video_text: PanelVideoText,
  panel_speaker_listing_grid: PanelSpeakerListingGrid,
  panel_event_cta: PanelEventCta,
  panel_schedule: PanelSchedule,
  panel_text_widget: PanelTextWidget,
  panel_two_column_text: PanelTwoColumnText,
  panel_richtext: PanelRichtext,
  panel_step: PanelStep,
  panel_three_column_text: PanelThreeColumnText,
  panel_divider: PanelDivider,
  panel_text_widget_grid: PanelTextWidgetGrid,
  panel_horizontal_tabs: PanelHorizontalTabs,

  // Widgets
  widget_table: WidgetTable,
  widget_script_embed: WidgetScriptEmbed,
  widget_marketo_form_embed: WidgetScriptEmbed,
  widget_richtext: WidgetRichtext,
  widget_column: WidgetColumn,
  widget_cta_card: WidgetCtaCard,
  widget_vimeo_embed: WidgetVimeoEmbed,
  widget_button: WidgetButton,
  widget_button_modal: WidgetButtonModal,
  widget_accordion: WidgetAccordion,
  widget_statistic: WidgetStatistic,
  widget_menu_cta: WidgetMenuCta,
  widget_grid: WidgetGrid,
  widget_nestable_columns: WidgetNestableColumns,
  widget_profile_card: WidgetProfileCard,
  widget_image_text_card: WidgetImageTextCard,
  widget_image_with_content: WidgetImageWithContent,
  widget_card_link: WidgetCardLink,
  widget_stat_with_content: WidgetStatWithContent,
  widget_pill_a: WidgetPillA,
  widget_image: WidgetImage,
  widget_youtube_embed: WidgetYoutubeEmbed,
  widget_html5_video_embed: WidgetHtml5VideoEmbed,
  widget_icon_text: WidgetIconText,
  widget_hubspot_embed: WidgetHubspotEmbed,
  widget_iframe_embed: WidgetIFrameEmbed,
  widget_conference_price: WidgetConferencePrice,
  widget_countdown_timer: WidgetCountdownTimer,
  widget_step: WidgetStep,
  widget_article_archive_listing: WidgetArticleArchiveListingClient,
  widget_article_topic_listing: WidgetArticleTopicListingClient,
  widget_logo_grid: WidgetLogoGrid,
  widget_tab_content: WidgetTabContent,
};

export { components };
