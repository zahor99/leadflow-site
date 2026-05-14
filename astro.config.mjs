// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// While the custom domain (leadflowautomation.com) is being recovered, the site
// serves from https://zahor99.github.io/leadflow-site/ — so all asset URLs need
// to be prefixed with /leadflow-site/. Once the custom domain is live, restore
// `site: 'https://leadflowautomation.com'` and remove the `base` line.
export default defineConfig({
  site: 'https://zahor99.github.io',
  base: '/leadflow-site/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
