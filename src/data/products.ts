// Products shown by name in the top menu and the footer.
// The real-estate assistant's name lives here only: change `name` and `slug`
// (and rename src/pages/<slug>.astro) to rename the product everywhere.
export const PROPERTY_ASSISTANT = {
  name: "Agency OS for Real Estate",
  slug: "agency-os-real-estate",
  tagline: "One office. One brain. One sales team.",
};

export const PRODUCTS = [
  { name: PROPERTY_ASSISTANT.name, href: `/${PROPERTY_ASSISTANT.slug}/`, note: "Real-estate agencies" },
  { name: "SEO Desk", href: "/seo-desk/", note: "Local search" },
];
