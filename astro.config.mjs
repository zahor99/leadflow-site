// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Custom domain is leadflowautomation.net (www-canonical). The CNAME file
// in /public tells GitHub Pages to serve from www.leadflowautomation.net,
// and apex (leadflowautomation.net) auto-redirects to www via GitHub.
// (.com was lost in late-2025 expiry; recovered with .net 2026-05-14.)
export default defineConfig({
  site: 'https://www.leadflowautomation.net',
  integrations: [
    sitemap({
      // Summit funnel pages are noindex — keep them out of the sitemap too.
      filter: (page) =>
        !['/check/', '/thanks/', '/services/'].some((p) => page.endsWith(p)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
