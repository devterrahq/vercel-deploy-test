/**
 * Used to consistenly output text color classes from storyblok values in the field-options/site-text-colors.json file
 * @param key String from a dropdown in the storyblok editor
 * @returns Classname to use
 */
export function SiteTextColorKeyToClassName(key?: string): string {
  if (!key) return '';
  return `text-${key}`;
}

/**
 * Used to consistenly output background color classes from storyblok values in the field-options/site-background-colors.json file
 * @param key String from a dropdown in the storyblok editor
 * @returns Classname to use
 */
export function SiteBackgroundColorKeyToClassName(key?: string): string {
  if (!key) return '';
  return `background-${key}`;
}

/**
 * Used to consistenly output button & link classes from storyblok values in the field-options/widget-button-styles.json file
 * @param key String from a dropdown in the storyblok editor
 * @returns Classname to use
 */
export function SiteButtonStyleKeyToClassName(key?: string): string {
  if (!key) return '';
  switch (key) {
    case 'button-solid':
      return 'button-solid';
    case 'button-outline':
      return 'button-outline';
    case 'button-text-navy':
      return 'text-link-navy';
    case 'button-text-white':
      return 'text-link-white';
    // case 'solid-light-blue':
    //   return 'solid-light-blue';
    // case 'text-link-navy-cta':
    //   return 'text-link-navy-cta';
    // case 'text-link-navy-small':
    //   return 'text-link-navy-small';
    // case 'text-link-white':
    //   return 'text-link-white';
    default:
      return key;
  }
}
