/**
 * Ambient declarations for side-effect stylesheet imports.
 *
 * Next.js only declares `*.module.css` / `*.module.scss` (typed class-name
 * maps). Global stylesheets such as `./Component.scss` and Swiper's
 * `swiper/css` entry points ship without type declarations, so newer
 * TypeScript versions report them as unresolved side-effect imports (TS2882)
 * without these declarations.
 */
declare module '*.css';
declare module '*.scss';
declare module 'swiper/css';
declare module 'swiper/css/*';
