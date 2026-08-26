/* Shared indexing flags for every page generator (build-tour-pages.mjs,
   build-legal-pages.mjs). Kept in one module so the two builds can never
   disagree about what is indexable. */

// Keep false until a native Polish speaker approves the /pl/ copy. While false,
// every /pl/ page is noindexed and PL URLs stay out of the sitemap.
export const PL_INDEXABLE = false;

// Noindexes EVERY page, SK included. Was true while the build was deployed to
// the GitHub Pages preview. Now false — the site is live on lp.mountainsafari.sk
// and runs Google Ads traffic, so it must be indexable. Only set it back to true
// if you point a build at a throwaway preview host.
export const PREVIEW = false;
