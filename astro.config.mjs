// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Build guard (review 2026-11-08 #21): the samples pages link /blog/<slug>/ articles that are generated from
// Airtable at build time. Without AIRTABLE_PAT no blog pages are built and those links 404. In CI this fails the
// build; locally it prints a loud error. SKIP_BLOG_CHECK=1 silences it.
const blogGuard = {
  name: 'blog-link-guard',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (process.env.SKIP_BLOG_CHECK === '1') return;
      const out = fileURLToPath(dir);
      const data = readFileSync(new URL('./src/data/samples.ts', import.meta.url), 'utf-8');
      const linked = [...data.matchAll(/href: "\/blog\/([^"\/]+)\/"/g)].map((m) => m[1]);
      if (!linked.length) return;
      const missing = linked.filter((slug) => !existsSync(`${out}/blog/${slug}/index.html`));
      if (!missing.length) return;
      const msg = `
!!! BLOG GUARD: ${missing.length} of ${linked.length} articles linked from the samples pages were not built ` +
        `(missing: ${missing.join(', ')}). Set AIRTABLE_PAT, or SKIP_BLOG_CHECK=1 for local work.
`;
      if (process.env.CI || process.env.GITHUB_ACTIONS) throw new Error(msg);
      console.error('[41m[37m' + msg + '[0m');
    },
  },
};

// Custom domain is leadflowautomation.net (www-canonical). The CNAME file
// in /public tells GitHub Pages to serve from www.leadflowautomation.net,
// and apex (leadflowautomation.net) auto-redirects to www via GitHub.
// (.com was lost in late-2025 expiry; recovered with .net 2026-05-14.)
export default defineConfig({
  site: 'https://www.leadflowautomation.net',
  integrations: [
    blogGuard,
    sitemap({
      // Summit funnel + unlisted pages are noindex — keep them out of the sitemap too.
      filter: (page) =>
        !['/check/', '/thanks/', '/services/', '/resources/', '/ai-marketing-desk/'].some((p) => page.endsWith(p)) &&
        !/\/(hu\/)?(work|seo-desk|marketing-mcp)\//.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
