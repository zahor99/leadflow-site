// One list of every public sample. /work/ (hub, one carousel per category), /work/<slug>/ (full category page)
// and product pages (e.g. /seo-desk/) all read from here: add a sample once, it shows up everywhere.
// Rules: only our own work, made-up demo brands or our own products; never a client or prospect brand.
// `id` keeps anchors that Upwork catalog listings link to (/work/#keyword-research etc.).

export type Shape = "doc" | "portrait" | "wide" | "square";

export interface Sample {
  id?: string;
  kind: string;
  title: string;
  meta?: string;
  img: string;
  href?: string;          // opens in a new tab (PDF, image, article)
  video?: string;         // opens in the video dialog
  shape?: Shape;          // default: video -> portrait, else doc
  extra?: { href: string; label: string }[];
}

export interface Category {
  slug: string;
  title: string;
  blurb: string;
  price?: string;
  /** extra anchors placed on the shelf, kept for old links */
  anchors?: string[];
  items: Sample[];
}

const G = "/work/gallery";

export const categories: Category[] = [
  {
    slug: "seo",
    title: "SEO and AI search",
    blurb: "Rank tracking, AI Overview citations, technical audits and AI-search baselines, built from live Google data and checked page by page.",
    price: "Also as a Claude connector: the SEO Desk, from 4 credits a check.",
    items: [
      { kind: "SEO Desk baseline", title: "leadflowautomation.net: rank, AI Overview, audit, links", meta: "Our own site, 10 keywords, Nov 2026",
        img: "/work/reports/seo-desk/seo-desk-baseline-leadflowautomation.webp", href: "/work/reports/seo-desk/seo-desk-baseline-leadflowautomation.pdf" },
      { id: "seo-audit", kind: "SEO audit", title: "Shopify SEO audit with a prioritised fix plan", meta: "Health score, crawl, on-page, schema",
        img: "/work/reports/seo-audit/cover.png", href: "/work/reports/seo-audit/shopify-seo-audit-sample.pdf" },
      { kind: "AI-search baseline", title: "How AI answers describe a brand against its rivals", meta: "GEO baseline across answer engines",
        img: "/work/reports/geo-baseline/cover.png", href: "/work/reports/geo-baseline/seo-geo-baseline-sample.pdf" },
      { id: "keyword-research", kind: "Keyword research", title: "E-commerce keyword research", meta: "Volume, CPC, intent, clusters, rewritten titles",
        img: "/work/reports/keyword-research/cover.png", href: "/work/reports/keyword-research/ecommerce-keyword-research-sample.pdf" },
      { kind: "SEO Desk baseline", title: "scalepod.ai: rank, AI Overview, audit, links", meta: "Our own product site, Nov 2026",
        img: "/work/reports/seo-desk/seo-desk-baseline-scalepod.webp", href: "/work/reports/seo-desk/seo-desk-baseline-scalepod.pdf" },
    ],
  },
  {
    slug: "research",
    title: "Research and data",
    blurb: "Market and product research, scraped datasets and outbound systems, delivered as a report you can act on and the data behind it.",
    items: [
      { id: "product-research", kind: "Product research", title: "E-commerce product and market research", meta: "Demand vs competition, price bands, shortlist",
        img: "/work/reports/product-research/cover.png", href: "/work/reports/product-research/ecommerce-product-research-sample.pdf" },
      { id: "web-scraping", kind: "Web scraping", title: "A public catalogue, scraped to a clean dataset", meta: "Data dictionary, QA checks, charts",
        img: "/work/reports/web-scraping/cover.png", href: "/work/reports/web-scraping/web-scraping-sample-report.pdf",
        extra: [{ href: "/work/reports/web-scraping/sample-dataset.xlsx", label: "Dataset (Excel)" }, { href: "/work/reports/web-scraping/sample-dataset.csv", label: "CSV" }] },
      { id: "cold-email", kind: "Outbound system", title: "Personalised cold e-mail outreach system", meta: "List to verified decision makers to reply digest",
        img: "/work/reports/cold-email/cover.png", href: "/work/reports/cold-email/cold-email-system-sample.pdf" },
      { kind: "Research report", title: "Product research, inside pages", meta: "Niche deep dive and launch shortlist",
        img: "/work/reports/product-research/page-2.png", href: "/work/reports/product-research/ecommerce-product-research-sample.pdf" },
    ],
  },
  {
    slug: "articles",
    title: "Articles",
    blurb: "Long-form articles for search and AI answers: researched, sourced, with FAQ and structured data. Each one is live on this site.",
    items: [
      { kind: "Long-form · 2,200 words", title: "AI agent risks: the 5 walls that kill SMB deployments in the first 30 days", shape: "wide",
        img: "/blog-heroes/recBGgqw673LepaAV.png", href: "/blog/ai-agent-risks-the-5-walls-that-kill-smb-deployments-in-the-first-30-days/" },
      { kind: "Analysis · 2,000 words", title: "The true cost of a sales qualified lead", shape: "wide",
        img: "/blog-heroes/recXQSpsY4IBLDSz5.png", href: "/blog/the-true-cost-of-a-sales-qualified-lead/" },
      { kind: "Ad-tech research · 2,200 words", title: "The MFA problem: how made-for-advertising sites drain your ad budget", shape: "wide",
        img: "/blog-heroes/recH5Cc9OohYaJ6vo.png", href: "/blog/the-mfa-problem-how-made-for-advertising-sites-are-draining-your-ad-budget/" },
      { kind: "Analysis · 2,100 words", title: "The economics of AI content automation", shape: "wide",
        img: "/blog-heroes/recM59nCafPzP3suz.png", href: "/blog/the-economics-of-ai-content-automation/" },
      { kind: "Technical explainer · 2,000 words", title: "AI voice receptionist: how it works", shape: "wide",
        img: "/blog-heroes/recHfNKjWHfkSPEDN.png", href: "/blog/ai-voice-receptionist/" },
      { kind: "SEO article", title: "AI agents for small business: the 5 use cases that make money", shape: "wide",
        img: "/blog-heroes/reclookejX27sWob2.png", href: "/blog/ai-agents-for-small-business-the-5-use-cases-that-actually-make-money-in-2026/" },
    ],
  },
  {
    slug: "social",
    title: "Social media posts",
    blurb: "Posts, stories, carousels and thumbnails in a brand's own style, from beauty clinics to B2B. Photos are generated; the type and layout are set by hand, never by the image model.",
    items: [
      ["medspa-myth-or-fact", "Instagram post", "Myth or fact: anti-ageing", "Med spa · demo brand", "portrait"],
      ["b2b-carousel-1", "LinkedIn carousel · 1 of 4", "Where do your team's hours go?", "B2B services · demo brand", "portrait"],
      ["b2b-carousel-2", "LinkedIn carousel · 2 of 4", "2.8× faster quote turnaround", "B2B services · demo brand", "portrait"],
      ["skincare-glow-ritual", "Instagram post", "Signature glow ritual", "Skin clinic · demo brand", "portrait"],
      ["barber-fresh-fade", "Story", "Fresh fade Friday", "Barber · demo brand", "portrait"],
      ["coach-ig-post", "Instagram post", "Your offer isn't the problem", "Coach · demo brand", "portrait"],
      ["lash-fills", "Instagram post", "Lash fills, before and after", "Lash studio · demo brand", "portrait"],
      ["fitness-ig-post", "Instagram post", "Strong is a skill", "Gym · demo brand", "portrait"],
      ["medspa-carousel-1", "Carousel cover", "5 skincare myths", "Med spa · demo brand", "portrait"],
      ["b2b-carousel-4", "LinkedIn carousel · 4 of 4", "Get the intake checklist", "Lead magnet call to action", "portrait"],
      ["nails-cuticle-care", "Instagram post", "Cuticle care in four steps", "Nail atelier · demo brand", "portrait"],
      ["esthetician-before-after", "Instagram post", "Before and after", "Esthetician · demo brand", "portrait"],
      ["facial-carousel-cover", "Carousel cover", "Make your facial last all month", "Skin clinic · demo brand", "portrait"],
      ["fitness-yt-thumb", "YouTube thumbnail", "Stop doing this", "Gym · demo brand", "wide"],
      ["b2b-webinar-title", "Webinar title slide", "From inbox chaos to an AI-run intake desk", "B2B services · demo brand", "wide"],
      ["x-infographic-five-cases", "X infographic", "5 boring AI agent use cases that print money", "Our own X account", "doc"],
      ["x-infographic-five-walls", "X infographic", "5 walls SMB AI-agent deployments hit", "Our own X account", "doc"],
    ].map(([n, kind, title, meta, shape]) => ({
      kind, title, meta, shape: shape as Shape, img: `${G}/social/${n}.webp`, href: `${G}/social/${n}.jpg`,
    })),
  },
  {
    slug: "video",
    title: "UGC ads and videos",
    blurb: "UGC-style ads with labelled AI presenters, narrated product demos and short explainers: script, voice, animation and edit.",
    anchors: ["ugc"],
    items: [
      { kind: "UGC ad · 40 s · 9:16", title: "AI-presenter hook + phone-native product demo", meta: "Our own product, ScalePOD",
        img: "/work/videos/scalepod-ugc.jpg", video: "/work/videos/scalepod-ugc.mp4" },
      { kind: "UGC review · 28 s · 9:16", title: "Product review for a fictional brand", meta: "AI presenter, mechanism animation, captions",
        img: "/work/videos/nocta-review-ugc.jpg", video: "/work/videos/nocta-review-ugc.mp4" },
      { kind: "Product demo · 2 min · 16:9", title: "ScalePOD AI designer walkthrough", meta: "Narrated, motion graphics, real UI", shape: "wide",
        img: "/work/videos/scalepod-ai-demo.jpg", video: "/work/videos/scalepod-ai-demo.mp4" },
      { kind: "Explainer · 22 s", title: "Knowledge assistant explainer", meta: "Script, voice-over, animation", shape: "wide",
        img: "/videos/poster_rag.jpg", video: "/videos/seg_rag.mp4" },
      { kind: "Explainer · 22 s", title: "Shadow-AI risk explainer", shape: "wide", img: "/videos/poster_shadowai.jpg", video: "/videos/seg_shadowai.mp4" },
      { kind: "Explainer · 22 s", title: "Data anonymisation explainer", shape: "wide", img: "/videos/poster_anonymizer.jpg", video: "/videos/seg_anonymizer.mp4" },
      { kind: "Explainer · 22 s", title: "AI quoting explainer", shape: "wide", img: "/videos/poster_quoting.jpg", video: "/videos/seg_quoting.mp4" },
    ],
  },
  {
    slug: "papers",
    title: "White papers and lead magnets",
    blurb: "Designed PDFs that earn an e-mail address: white papers, guides, checklists, e-books and training manuals.",
    items: [
      { kind: "White paper · 9 pages", title: "AI-run discovery for ERP implementations", meta: "An agent over MCP for fit-gap discovery",
        img: "/work/whitepapers/erp-discovery-agent-cover.png", href: "/work/whitepapers/erp-discovery-agent.pdf" },
      { kind: "White paper", title: "MCP servers as a product channel", meta: "Lessons from our ScalePOD server",
        img: "/work/whitepapers/merch-mcp-server-cover.png", href: "/work/whitepapers/merch-mcp-server.pdf" },
      { kind: "Guide (PDF)", title: "AI leverage blueprint", meta: "Where AI saves time in a small company",
        img: `${G}/lead/leadflow-ai-leverage-blueprint.webp`, href: "/downloads/leadflow-ai-leverage-blueprint.pdf" },
      { kind: "Checklist (PDF)", title: "GDPR and AI checklist", meta: "10 questions before any AI tool touches personal data",
        img: `${G}/lead/leadflow-gdpr-ai-checklist.webp`, href: "/downloads/leadflow-gdpr-ai-checklist.pdf" },
      { kind: "E-book cover", title: "The glow guide", meta: "Skin clinic · demo brand", img: `${G}/lead/ebook-glow-guide.webp`, href: `${G}/lead/ebook-glow-guide.jpg` },
      { kind: "Training manual", title: "Lash extension manual: cover", meta: "Lash academy · demo brand", img: `${G}/lead/manual-lash-extension.webp`, href: `${G}/lead/manual-lash-extension.jpg` },
      { kind: "Training manual", title: "Lash extension manual: mapping page", meta: "Lash academy · demo brand", img: `${G}/lead/manual-lash-mapping.webp`, href: `${G}/lead/manual-lash-mapping.jpg` },
      { kind: "E-book cover", title: "The skin barrier guide", meta: "Med spa · demo brand", img: `${G}/lead/ebook-skin-barrier.webp`, href: `${G}/lead/ebook-skin-barrier.jpg` },
    ],
  },
  {
    slug: "products",
    title: "Product mockups and app design",
    blurb: "From one pattern to a print file, a mockup and a live listing, made by our own product pipeline. Plus the app screens of ScalePOD, our merch server for Claude.",
    items: [
      ["pod-1-pattern", "Step 1 · pattern", "Seamless rose pattern", "Generated, tiled at print resolution", "square"],
      ["pod-2-print-file", "Step 2 · print file", "Cut-and-sew print file", "Panels laid out for production", "square"],
      ["pod-3-mockup", "Step 3 · mockup", "Garment mockup", "Pattern on the real garment cut", "square"],
      ["pod-4-listing", "Step 4 · listing photo", "Studio listing image", "Model shot for the shop", "square"],
      ["pod-5-lifestyle", "Step 5 · lifestyle", "Lifestyle shot", "For ads and the product page", "square"],
      ["ui-chat-board", "App design", "ScalePOD: mockups inside Claude", "Board view, dark theme", "wide"],
      ["ui-print-pack", "App design", "ScalePOD: print pack ready", "Layered PSD and 300 dpi files", "wide"],
      ["ui-review-mobile", "App design · mobile", "Client review: accept, change, reject", "The page a customer opens", "portrait"],
      ["ui-review-list", "App design · mobile", "Client review: the whole kit", "One decision per item", "portrait"],
    ].map(([n, kind, title, meta, shape]) => ({
      kind, title, meta, shape: shape as Shape, img: `${G}/merch/${n}.webp`, href: `${G}/merch/${n}.jpg`,
    })),
  },
  {
    slug: "print",
    title: "Print and event design",
    blurb: "Print-ready files for our own stand at the 2026 Budapest AI Summit: roll-up poster, booth fascia and A6 flyer, set by hand at print resolution.",
    items: [
      { kind: "Roll-up poster · 1 × 2 m", title: "Software that ships. Agent teams you can trust.", meta: "Print PDF at 1006 × 2006 mm",
        img: `${G}/print/summit-poster.webp`, href: `${G}/print/summit-poster.jpg` },
      { kind: "A6 flyer", title: "Booth flyer with QR codes", meta: "Front, print-ready", img: `${G}/print/summit-flyer.webp`, href: `${G}/print/summit-flyer.jpg` },
      { kind: "Booth fascia · 660 × 330 mm", title: "Booth fascia", meta: "300 dpi print file", shape: "wide",
        img: `${G}/print/summit-fascia.webp`, href: "/print/fascia-660x330-landscape_PRINT.pdf" },
    ],
  },
  {
    slug: "systems",
    title: "Systems in production",
    blurb: "The engineering behind the samples: AI systems we built and run for clients and for our own products. Details on the home page.",
    items: [
      ["case-rag", "RAG · enterprise", "Two production RAG systems for a multi-billion-dollar US manufacturer"],
      ["case-erp", "Agentic platform · ERP", "Supplier pricing and quoting on Business Central and HubSpot"],
      ["case-scalepod", "Multi-agent pipeline", "ScalePOD: brief to published listings in 12 minutes"],
      ["case-estateops", "Voice agent + RAG", "EstateOps: AI intake agent writing live into the CRM"],
      ["case-saas", "Web platform", "Booking and credit platform for a staffing marketplace"],
      ["case-ml", "Machine learning", "Sensor error compensation on embedded hardware"],
    ].map(([n, kind, title]) => ({ kind, title, shape: "wide" as Shape, img: `/images/${n}.webp`, href: "/#work" })),
  },
];

export const bySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const total = categories.reduce((n, c) => n + c.items.length, 0);
