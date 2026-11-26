// Products shown by name in the top menu and the footer.
// The real-estate assistant's name lives here only: change `name` and `slug`
// (and rename src/pages/<slug>.astro) to rename the product everywhere.
export const PROPERTY_ASSISTANT = {
  name: "Agency OS for Real Estate",
  slug: "agency-os-real-estate",
  tagline: "One office. One brain. One sales team.",
};

// Sales page retired from public view 26 Nov 2026 (not finished): page source kept in
// src/drafts/agency-os-real-estate.astro. To bring it back: move it to src/pages/, restore this
// footer entry, the two menu links in Nav.astro and the product links on contact/refunds/terms.

export const PRODUCTS = [
  { name: "SEO Desk", href: "/seo-desk/", note: "Local search" },
];
