// One list of every public sample, in English and Hungarian. /work/ (hub), /work/<slug>/ (category page),
// /seo-desk/ and their /hu/ twins all read from here: add a sample once, it shows up everywhere.
// Rules: only our own work, made-up demo brands or our own products; never a client or prospect brand.
// Figures in titles/captions are read from the assets themselves; do not add numbers that are not in the file.
// `id` keeps anchors that Upwork catalog listings link to (/work/#keyword-research etc.).

export type Lang = "en" | "hu";
export type L = { en: string; hu: string };
export type Shape = "doc" | "portrait" | "wide" | "square";

export interface Sample {
  id?: string;
  kind: L;
  title: L;
  meta?: L;
  img: string;
  href?: string;          // opens in a new tab (PDF, image) or same tab (article)
  video?: string;         // opens in the video dialog
  shape?: Shape;          // default: video -> portrait, else doc
  extra?: { href: string; label: L }[];
  /** a crop of the strongest part of the asset, shown on the page so visitors see the quality without opening it */
  hl?: { img: string; cap: L };
}

export interface Category {
  slug: string;
  title: L;
  blurb: L;
  /** sample index shown large on the hub */
  spotlight?: number;
  /** extra anchors placed on the shelf, kept for old links */
  anchors?: string[];
  items: Sample[];
}

export const t = (x: L | undefined, lang: Lang) => (x ? x[lang] : "");
const G = "/work/gallery";
const H = `${G}/highlights`;
const l = (en: string, hu: string): L => ({ en, hu });

export const ui = {
  en: {
    open: "Open", openReport: "Open the full report", play: "Play the video", openImage: "Open full size", read: "Read the article",
    seeAll: (n: number) => `See all ${n} samples`, samples: "samples", fromPage: "From the sample", assetLang: "",
    scroll: "scroll sideways", prev: "Previous", next: "Next", all: "All samples", more: "More samples",
  },
  hu: {
    open: "Megnyitás", openReport: "A teljes jelentés megnyitása", play: "Videó lejátszása", openImage: "Megnyitás teljes méretben", read: "A cikk elolvasása",
    seeAll: (n: number) => `Mind a ${n} minta megtekintése`, samples: "minta", fromPage: "Részlet a mintából", assetLang: "angol nyelvű",
    scroll: "oldalra görgethető", prev: "Előző", next: "Következő", all: "Összes minta", more: "További minták",
  },
};

export const categories: Category[] = [
  {
    slug: "seo",
    title: l("SEO and AI search", "SEO és AI-keresés"),
    blurb: l(
      "Rank tracking, AI Overview citations, technical audits and AI-search baselines, built from live Google data and checked page by page.",
      "Helyezéskövetés, AI Overview-hivatkozások, technikai auditok és AI-keresési felmérések, élő Google-adatokból, oldalanként ellenőrizve.",
    ),
    spotlight: 1,
    items: [
      { kind: l("SEO Desk baseline · 4 pages", "SEO Desk alapfelmérés · 4 oldal"),
        title: l("leadflowautomation.net: rank, AI answers, audit, links", "leadflowautomation.net: helyezés, AI-válaszok, audit, linkek"),
        meta: l("Our own site · 25 keywords, 4 AI engines", "Saját oldalunk · 25 kulcsszó, 4 AI-motor"),
        img: "/work/reports/seo-desk/seo-desk-baseline-leadflowautomation.webp", href: "/work/reports/seo-desk/seo-desk-baseline-leadflowautomation.pdf",
        hl: { img: `${H}/seodesk-lf.webp`, cap: l(
          "Page 1, at a glance: site health 100, mobile speed 97, and 0 of 25 keywords in Google's top 20. The report says so plainly.",
          "1. oldal, összefoglaló: oldalállapot 100, mobilsebesség 97, és a 25 kulcsszóból 0 van a Google első 20 találatában. A jelentés ezt ki is mondja.") } },
      { id: "seo-audit", kind: l("SEO audit · 11 pages", "SEO-audit · 11 oldal"),
        title: l("Shopify SEO audit with a ranked fix plan", "Shopify SEO-audit rangsorolt javítási tervvel"),
        meta: l("Our own store · 22 fixes, ordered by impact", "Saját webáruházunk · 22 javítás, hatás szerint sorrendben"),
        img: "/work/reports/seo-audit/cover.png", href: "/work/reports/seo-audit/shopify-seo-audit-sample.pdf",
        hl: { img: `${H}/seo-audit.webp`, cap: l(
          "Page 1: health score 38/100 and 0 pages in Google on audit day; 74 pages indexed by 26 March, after the fixes.",
          "1. oldal: 38/100 pontos állapot és 0 oldal a Google-ben az audit napján; a javítások után március 26-ig 74 oldal került be.") } },
      { kind: l("AI-search baseline · 5 pages", "AI-keresési felmérés · 5 oldal"),
        title: l("How AI answers describe a brand next to its rivals", "Hogyan írják le az AI-válaszok a márkát a versenytársak mellett"),
        meta: l("Public-data example · ChatGPT, Gemini, AI Overviews, Perplexity", "Nyilvános adatokból készült példa · ChatGPT, Gemini, AI Overviews, Perplexity"),
        img: "/work/reports/geo-baseline/cover.png", href: "/work/reports/geo-baseline/seo-geo-baseline-sample.pdf",
        hl: { img: `${H}/geo.webp`, cap: l("Page 1: four scores, each with the count behind it.", "1. oldal: négy mutató, mindegyik mellett a mögötte álló darabszám.") } },
      { id: "keyword-research", kind: l("Keyword research · 12 pages", "Kulcsszókutatás · 12 oldal"),
        title: l("E-commerce keyword research", "Webáruházas kulcsszókutatás"),
        meta: l("40 keywords · 25 markets · volume, CPC, intent", "40 kulcsszó · 25 piac · keresési volumen, CPC, szándék"),
        img: "/work/reports/keyword-research/cover.png", href: "/work/reports/keyword-research/ecommerce-keyword-research-sample.pdf",
        hl: { img: `${H}/kw.webp`, cap: l(
          "Page 10: the same keywords in five markets, monthly searches with cost per click underneath.",
          "10. oldal: ugyanazok a kulcsszavak öt piacon, havi keresésszám, alatta a kattintásonkénti költség.") } },
      { kind: l("SEO Desk baseline · 4 pages", "SEO Desk alapfelmérés · 4 oldal"),
        title: l("scalepod.ai: rank, AI answers, audit, links", "scalepod.ai: helyezés, AI-válaszok, audit, linkek"),
        meta: l("Our own product site", "Saját termékoldalunk"),
        img: "/work/reports/seo-desk/seo-desk-baseline-scalepod.webp", href: "/work/reports/seo-desk/seo-desk-baseline-scalepod.pdf",
        hl: { img: `${H}/seodesk-sp.webp`, cap: l("Page 1: health 50, mobile speed 93.", "1. oldal: állapot 50, mobilsebesség 93.") } },
    ],
  },
  {
    slug: "research",
    title: l("Research and data", "Kutatás és adatok"),
    blurb: l(
      "Market and product research, scraped datasets and outbound systems, delivered as a report you can act on, with the data behind it.",
      "Piac- és termékkutatás, gyűjtött adatállományok és megkeresési rendszerek: döntésre kész jelentés, mögötte a teljes adat.",
    ),
    spotlight: 0,
    items: [
      { id: "product-research", kind: l("Product research · 14 pages", "Termékkutatás · 14 oldal"),
        title: l("Which print-on-demand products to launch next", "Melyik print-on-demand terméket érdemes következőnek piacra vinni"),
        meta: l("18 products · 9 niches · 1,760 live listings priced", "18 termék · 9 rés · 1760 élő hirdetés árazva"),
        img: "/work/reports/product-research/cover.png", href: "/work/reports/product-research/ecommerce-product-research-sample.pdf",
        hl: { img: `${H}/prod.webp`, cap: l(
          "Page 5: search volume against margin. The two biggest-volume products lose money after fees.",
          "5. oldal: keresési volumen és árrés egy ábrán. A két legkeresettebb termék a díjak után veszteséges.") } },
      { id: "web-scraping", kind: l("Web scraping · 8 pages", "Webes adatgyűjtés · 8 oldal"),
        title: l("126,359 games, one clean dataset", "126 359 játék, egy tiszta adatállomány"),
        meta: l("13 fields · data dictionary · QA checks", "13 mező · adatszótár · minőségellenőrzés"),
        img: "/work/reports/web-scraping/cover.png", href: "/work/reports/web-scraping/web-scraping-sample-report.pdf",
        extra: [{ href: "/work/reports/web-scraping/sample-dataset.xlsx", label: l("Dataset (Excel)", "Adatok (Excel)") },
                { href: "/work/reports/web-scraping/sample-dataset.csv", label: l("CSV", "CSV") }],
        hl: { img: `${H}/scrape.webp`, cap: l("Page 6: four charts computed from the full dataset.", "6. oldal: négy ábra a teljes adatállományból számolva.") } },
      { id: "cold-email", kind: l("Outbound system · 7 pages", "Megkeresési rendszer · 7 oldal"),
        title: l("A personalised cold e-mail system, end to end", "Személyre szabott hidegmegkeresési rendszer, elejétől a végéig"),
        meta: l("Shown on one fictional prospect", "Egy kitalált cégen bemutatva"),
        img: "/work/reports/cold-email/cover.png", href: "/work/reports/cold-email/cold-email-system-sample.pdf",
        hl: { img: `${H}/cold.webp`, cap: l(
          "Page 2: the seven-step pipeline, from sourcing to the daily reply digest, with the guard at each step.",
          "2. oldal: a hétlépéses folyamat a címlistától a napi válaszösszesítőig, minden lépésnél az ellenőrzéssel.") } },
      { kind: l("Product research · inside pages", "Termékkutatás · belső oldalak"),
        title: l("Niche deep dive and launch shortlist", "Résenkénti elemzés és indulási rövidlista"),
        meta: l("From the same 14-page report", "Ugyanabból a 14 oldalas jelentésből"),
        img: "/work/reports/product-research/page-2.png", href: "/work/reports/product-research/ecommerce-product-research-sample.pdf" },
    ],
  },
  {
    slug: "articles",
    title: l("Articles", "Cikkek"),
    blurb: l(
      "Long-form articles for search and AI answers: researched, sourced, with FAQ and structured data. Each one is live on this site.",
      "Hosszú cikkek keresőkre és AI-válaszokra: kutatva, forrásokkal, GYIK-kal és strukturált adatokkal. Mindegyik élesben fut ezen az oldalon.",
    ),
    items: [
      { kind: l("Long-form · 2,200 words", "Hosszú cikk · 2200 szó"), shape: "wide",
        title: l("AI agent risks: the 5 walls that stop SMB deployments in the first 30 days", "AI-ügynökök kockázatai: az 5 fal, amely az első 30 napban megállítja a kkv-bevezetéseket"),
        img: "/blog-heroes/recBGgqw673LepaAV.png", href: "/blog/ai-agent-risks-the-5-walls-that-kill-smb-deployments-in-the-first-30-days/" },
      { kind: l("Analysis · 2,000 words", "Elemzés · 2000 szó"), shape: "wide",
        title: l("The true cost of a sales qualified lead", "Mennyibe kerül valójában egy értékesítésre kész érdeklődő"),
        img: "/blog-heroes/recXQSpsY4IBLDSz5.png", href: "/blog/the-true-cost-of-a-sales-qualified-lead/" },
      { kind: l("Ad-tech research · 2,200 words", "Hirdetéstechnológiai kutatás · 2200 szó"), shape: "wide",
        title: l("The MFA problem: how made-for-advertising sites drain ad budgets", "Az MFA-probléma: így szívják el a hirdetési keretet a hirdetésre gyártott oldalak"),
        img: "/blog-heroes/recH5Cc9OohYaJ6vo.png", href: "/blog/the-mfa-problem-how-made-for-advertising-sites-are-draining-your-ad-budget/" },
      { kind: l("Analysis · 2,100 words", "Elemzés · 2100 szó"), shape: "wide",
        title: l("The economics of AI content automation", "Az AI-alapú tartalomgyártás gazdaságtana"),
        img: "/blog-heroes/recM59nCafPzP3suz.png", href: "/blog/the-economics-of-ai-content-automation/" },
      { kind: l("Technical explainer · 2,000 words", "Technikai magyarázó · 2000 szó"), shape: "wide",
        title: l("AI voice receptionist: how it works", "AI-hangrecepciós: hogyan működik"),
        img: "/blog-heroes/recHfNKjWHfkSPEDN.png", href: "/blog/ai-voice-receptionist/" },
      { kind: l("SEO article", "SEO-cikk"), shape: "wide",
        title: l("AI agents for small business: 5 use cases that pay for themselves", "AI-ügynökök kisvállalkozásoknak: 5 felhasználás, amely megtérül"),
        img: "/blog-heroes/reclookejX27sWob2.png", href: "/blog/ai-agents-for-small-business-the-5-use-cases-that-actually-make-money-in-2026/" },
    ],
  },
  {
    slug: "social",
    title: l("Social media posts", "Közösségimédia-posztok"),
    blurb: l(
      "Posts, stories, carousels and thumbnails in each brand's own style, from beauty clinics to B2B. Photos are generated; type and layout are set by hand, never by the image model.",
      "Posztok, sztorik, karusszelek és bélyegképek az adott márka saját stílusában, a szépségszalontól a B2B-ig. A fotókat AI generálja, a betűket és a tördelést kézzel állítjuk be, sosem a képmodell.",
    ),
    spotlight: 0,
    items: ([
      ["medspa-myth-or-fact", "Instagram post", "Instagram-poszt", "Myth or fact: anti-ageing", "Tévhit vagy tény: öregedésgátlás", "Med spa", "Esztétikai klinika", "portrait"],
      ["b2b-carousel-1", "LinkedIn carousel · 1 of 4", "LinkedIn-karusszel · 1/4", "Where do your team's hours go?", "Hová lesznek a csapat órái?", "B2B services", "B2B szolgáltató", "portrait"],
      ["b2b-carousel-2", "LinkedIn carousel · 2 of 4", "LinkedIn-karusszel · 2/4", "One figure per slide", "Diánként egy szám", "B2B services", "B2B szolgáltató", "portrait"],
      ["skincare-glow-ritual", "Instagram post", "Instagram-poszt", "Signature glow ritual", "Ragyogás-rituálé", "Skin clinic", "Bőrklinika", "portrait"],
      ["barber-fresh-fade", "Story", "Sztori", "Fresh fade Friday", "Péntek: friss fade", "Barber", "Borbély", "portrait"],
      ["coach-ig-post", "Instagram post", "Instagram-poszt", "Your offer isn't the problem", "Nem az ajánlattal van a baj", "Coach", "Coach", "portrait"],
      ["lash-fills", "Instagram post", "Instagram-poszt", "Lash fills, before and after", "Pillatöltés előtte–utána", "Lash studio", "Műszempilla-stúdió", "portrait"],
      ["fitness-ig-post", "Instagram post", "Instagram-poszt", "Strong is a skill", "Az erő tanulható", "Gym", "Edzőterem", "portrait"],
      ["medspa-carousel-1", "Carousel cover", "Karusszel-borító", "5 skincare myths", "5 bőrápolási tévhit", "Med spa", "Esztétikai klinika", "portrait"],
      ["b2b-carousel-4", "LinkedIn carousel · 4 of 4", "LinkedIn-karusszel · 4/4", "Get the intake checklist", "Kérje el az ellenőrzőlistát", "B2B services", "B2B szolgáltató", "portrait"],
      ["nails-cuticle-care", "Instagram post", "Instagram-poszt", "Cuticle care in four steps", "Körömbőrápolás négy lépésben", "Nail atelier", "Körömszalon", "portrait"],
      ["esthetician-before-after", "Instagram post", "Instagram-poszt", "Before and after", "Előtte–utána", "Esthetician", "Kozmetikus", "portrait"],
      ["facial-carousel-cover", "Carousel cover", "Karusszel-borító", "Make your facial last all month", "Hogy a kezelés egész hónapban látsszon", "Skin clinic", "Bőrklinika", "portrait"],
      ["fitness-yt-thumb", "YouTube thumbnail", "YouTube-bélyegkép", "Stop doing this", "Ezt hagyja abba", "Gym", "Edzőterem", "wide"],
      ["b2b-webinar-title", "Webinar title slide", "Webinárium-címdia", "From inbox chaos to an AI-run intake desk", "A levelezési káosztól az AI-vezérelt ügyfélfelvételig", "B2B services", "B2B szolgáltató", "wide"],
    ] as const).map(([n, ke, kh, te, th, me, mh, shape]) => ({
      kind: l(ke, kh), title: l(te, th), meta: l(`${me} · made-up demo brand`, `${mh} · kitalált demómárka`),
      shape: shape as Shape, img: `${G}/social/${n}.webp`, href: `${G}/social/${n}.jpg`,
    })).concat([
      { kind: l("X infographic", "X-infografika"), title: l("5 boring AI agent use cases that make money", "5 unalmas AI-ügynökös felhasználás, ami pénzt hoz"),
        meta: l("Our own X account", "Saját X-fiókunk"), shape: "doc", img: `${G}/social/x-infographic-five-cases.webp`, href: `${G}/social/x-infographic-five-cases.jpg` },
      { kind: l("X infographic", "X-infografika"), title: l("5 walls SMB AI-agent deployments hit", "Az 5 fal, amibe a kkv-k AI-bevezetései ütköznek"),
        meta: l("Our own X account", "Saját X-fiókunk"), shape: "doc", img: `${G}/social/x-infographic-five-walls.webp`, href: `${G}/social/x-infographic-five-walls.jpg` },
    ] as Sample[]).map((s, i) => i === 0 ? { ...s, hl: { img: `${H}/social-set.webp`, cap: l(
      "Four posts for four made-up brands: a med spa, a B2B services firm, a gym and a coach. Each follows its own type and colour rules.",
      "Négy poszt négy kitalált márkának: esztétikai klinika, B2B szolgáltató, edzőterem és coach. Mindegyik a saját betű- és színszabályait követi.") } } : s),
  },
  {
    slug: "video",
    title: l("UGC ads and videos", "UGC-hirdetések és videók"),
    blurb: l(
      "UGC-style ads with labelled AI presenters, narrated product demos and short explainers: script, voice, animation and edit.",
      "UGC-stílusú hirdetések jelölt AI-előadóval, narrált termékbemutatók és rövid magyarázó videók: forgatókönyv, hang, animáció és vágás.",
    ),
    anchors: ["ugc"],
    spotlight: 2,
    items: [
      { kind: l("UGC ad · 40 s · 9:16", "UGC-hirdetés · 40 mp · 9:16"), title: l("AI-presenter hook, then a phone-native product demo", "AI-előadós nyitás, utána telefonra szabott termékdemó"),
        meta: l("Our own product, ScalePOD · AI presenter labelled", "Saját termékünk, a ScalePOD · AI-előadó jelölve"), img: "/work/videos/scalepod-ugc.jpg", video: "/work/videos/scalepod-ugc.mp4" },
      { kind: l("UGC review · 28 s · 9:16", "UGC-termékértékelés · 28 mp · 9:16"), title: l("Product review for a fictional brand", "Termékértékelés egy kitalált márkának"),
        meta: l("AI presenter, mechanism animation, captions", "AI-előadó, hatásmechanizmus-animáció, feliratok"), img: "/work/videos/nocta-review-ugc.jpg", video: "/work/videos/nocta-review-ugc.mp4" },
      { kind: l("Product demo · 2 min · 16:9", "Termékdemó · 2 perc · 16:9"), title: l("ScalePOD AI designer walkthrough", "A ScalePOD AI-tervező bemutatója"),
        meta: l("Narrated, motion graphics, real product screens", "Narrálva, mozgógrafikával, valódi termékképernyőkkel"), shape: "wide",
        img: "/work/videos/scalepod-ai-demo.jpg", video: "/work/videos/scalepod-ai-demo.mp4",
        hl: { img: "/work/videos/scalepod-ai-demo-review.jpg", cap: l(
          "A frame from the two-minute demo: the review page, where each design is checked like a physical sample. It plays on this page.",
          "Kocka a kétperces demóból: a jóváhagyó oldal, ahol minden terv úgy ellenőrizhető, mint egy fizikai minta. Itt az oldalon lejátszható.") } },
      { kind: l("Explainer · 22 s", "Magyarázó videó · 22 mp"), title: l("Knowledge assistant explainer", "Tudásasszisztens, röviden"),
        meta: l("Script, voice-over, animation", "Forgatókönyv, narráció, animáció"), shape: "wide", img: "/videos/poster_rag.jpg", video: "/videos/seg_rag.mp4" },
      { kind: l("Explainer · 22 s", "Magyarázó videó · 22 mp"), title: l("Shadow-AI risk explainer", "Az árnyék-AI kockázata, röviden"), shape: "wide", img: "/videos/poster_shadowai.jpg", video: "/videos/seg_shadowai.mp4" },
      { kind: l("Explainer · 22 s", "Magyarázó videó · 22 mp"), title: l("Data anonymisation explainer", "Adatanonimizálás, röviden"), shape: "wide", img: "/videos/poster_anonymizer.jpg", video: "/videos/seg_anonymizer.mp4" },
      { kind: l("Explainer · 22 s", "Magyarázó videó · 22 mp"), title: l("AI quoting explainer", "AI-alapú árajánlatkészítés, röviden"), shape: "wide", img: "/videos/poster_quoting.jpg", video: "/videos/seg_quoting.mp4" },
    ],
  },
  {
    slug: "papers",
    title: l("White papers and lead magnets", "Szakmai tanulmányok és letölthető anyagok"),
    blurb: l(
      "Designed PDFs that earn an e-mail address: white papers, guides, checklists, e-books and training manuals.",
      "Megtervezett PDF-ek, amelyekért az olvasó szívesen megadja az e-mail-címét: szakmai tanulmányok, útmutatók, ellenőrzőlisták, e-könyvek és oktatási kézikönyvek.",
    ),
    spotlight: 0,
    items: [
      { kind: l("White paper · 9 pages", "Szakmai tanulmány · 9 oldal"), title: l("AI-run discovery for ERP implementations", "AI-vezérelt igényfelmérés ERP-bevezetésekhez"),
        meta: l("192 requirement cards from one scripted test run", "192 követelménykártya egy szkriptelt tesztfutásból"),
        img: "/work/whitepapers/erp-discovery-agent-cover.png", href: "/work/whitepapers/erp-discovery-agent.pdf",
        hl: { img: `${H}/wp-erp.webp`, cap: l(
          "Page 5: the architecture, one engine behind three front doors, with the human review gates underneath.",
          "5. oldal: az architektúra, egy motor három belépési ponttal, alatta az emberi jóváhagyási pontok.") } },
      { kind: l("White paper · 11 pages", "Szakmai tanulmány · 11 oldal"), title: l("MCP servers as a product channel", "MCP-szerverek mint értékesítési csatorna"),
        meta: l("Lessons from 14 days of our ScalePOD pilot", "Tanulságok a ScalePOD 14 napos próbaüzeméből"),
        img: "/work/whitepapers/merch-mcp-server-cover.png", href: "/work/whitepapers/merch-mcp-server.pdf",
        hl: { img: `${H}/wp-mcp.webp`, cap: l("Page 4: the request path from the decorator's Claude to the server.", "4. oldal: a kérés útja a felhasználó Claude-jától a szerverig.") } },
      { kind: l("Guide · 8 pages", "Útmutató · 8 oldal"), title: l("The AI leverage blueprint", "AI-tervrajz cégvezetőknek"),
        meta: l("Where AI belongs in a company, and where it must not go", "Hol van helye az AI-nak a cégben, és hol nincs"),
        img: `${G}/lead/leadflow-ai-leverage-blueprint.webp`, href: "/downloads/leadflow-ai-leverage-blueprint.pdf",
        hl: { img: `${H}/lm-blue.webp`, cap: l("Page 3: how code, automation, AI models and people divide the work.", "3. oldal: hogyan osztozik a munkán a kód, az automatizálás, az AI-modell és az ember.") } },
      { kind: l("Checklist · 1 page", "Ellenőrzőlista · 1 oldal"), title: l("10 questions before any AI tool touches company data", "10 kérdés, mielőtt bármilyen AI-eszköz céges adathoz ér"),
        meta: l("GDPR and AI", "GDPR és AI"), img: `${G}/lead/leadflow-gdpr-ai-checklist.webp`, href: "/downloads/leadflow-gdpr-ai-checklist.pdf",
        hl: { img: `${H}/lm-gdpr.webp`, cap: l("The checklist, top half.", "Az ellenőrzőlista felső fele.") } },
      { kind: l("E-book cover", "E-könyv-borító"), title: l("The glow guide", "Ragyogás-útmutató"), meta: l("Skin clinic · made-up demo brand", "Bőrklinika · kitalált demómárka"),
        img: `${G}/lead/ebook-glow-guide.webp`, href: `${G}/lead/ebook-glow-guide.jpg` },
      { kind: l("Training manual", "Oktatási kézikönyv"), title: l("Lash extension manual: cover", "Műszempilla-kézikönyv: borító"), meta: l("Lash academy · made-up demo brand", "Szempillaakadémia · kitalált demómárka"),
        img: `${G}/lead/manual-lash-extension.webp`, href: `${G}/lead/manual-lash-extension.jpg` },
      { kind: l("Training manual", "Oktatási kézikönyv"), title: l("Lash extension manual: mapping page", "Műszempilla-kézikönyv: tervezőoldal"), meta: l("Lash academy · made-up demo brand", "Szempillaakadémia · kitalált demómárka"),
        img: `${G}/lead/manual-lash-mapping.webp`, href: `${G}/lead/manual-lash-mapping.jpg` },
      { kind: l("E-book cover", "E-könyv-borító"), title: l("The skin barrier guide", "Bőrbarrier-útmutató"), meta: l("Med spa · made-up demo brand", "Esztétikai klinika · kitalált demómárka"),
        img: `${G}/lead/ebook-skin-barrier.webp`, href: `${G}/lead/ebook-skin-barrier.jpg` },
    ],
  },
  {
    slug: "products",
    title: l("Product mockups and app design", "Termékmockupok és alkalmazástervek"),
    blurb: l(
      "One pattern taken to a print file, a mockup and a live listing by our own product pipeline. Plus the app screens of ScalePOD, our merch server for Claude.",
      "Egyetlen mintából nyomdai fájl, mockup és élő termékoldal, a saját termékgyártó folyamatunkkal. Mellette a ScalePOD, a Claude-hoz készült merch-szerverünk képernyőtervei.",
    ),
    spotlight: 3,
    items: ([
      ["pod-1-pattern", "Step 1 · pattern", "1. lépés · minta", "Seamless rose pattern", "Hézagmentes rózsaminta", "Tiled at print resolution", "Nyomdai felbontásban ismételve", "square"],
      ["pod-2-print-file", "Step 2 · print file", "2. lépés · nyomdai fájl", "Cut-and-sew print file", "Szabásminta-nyomóív", "Panels laid out for production", "Gyártásra elrendezett részek", "square"],
      ["pod-3-mockup", "Step 3 · mockup", "3. lépés · mockup", "Garment mockup", "Ruhamockup", "The pattern on the real garment cut", "A minta a valódi szabásmintán", "square"],
      ["pod-4-listing", "Step 4 · listing photo", "4. lépés · termékfotó", "Studio listing image", "Stúdió-termékfotó", "Model shot for the shop", "Modelles fotó a webáruházba", "square"],
      ["pod-5-lifestyle", "Step 5 · lifestyle", "5. lépés · hangulatfotó", "Lifestyle shot", "Hangulatkép", "For ads and the product page", "Hirdetésekhez és a termékoldalra", "square"],
      ["ui-chat-board", "App design", "Alkalmazásterv", "ScalePOD: mockups inside Claude", "ScalePOD: mockupok a Claude-ban", "Board view, dark theme", "Táblanézet, sötét téma", "wide"],
      ["ui-print-pack", "App design", "Alkalmazásterv", "ScalePOD: print pack ready", "ScalePOD: kész a nyomdai csomag", "Layered PSD and 300 dpi files", "Rétegezett PSD és 300 dpi-s fájlok", "wide"],
      ["ui-review-mobile", "App design · mobile", "Alkalmazásterv · mobil", "Client review: accept, change, reject", "Ügyfél-jóváhagyás: elfogad, módosít, elutasít", "The page the end customer opens", "Az oldal, amelyet a végügyfél megnyit", "portrait"],
      ["ui-review-list", "App design · mobile", "Alkalmazásterv · mobil", "Client review: the whole kit", "Ügyfél-jóváhagyás: a teljes csomag", "One decision per item", "Tételenként egy döntés", "portrait"],
    ] as const).map(([n, ke, kh, te, th, me, mh, shape]) => ({
      kind: l(ke, kh), title: l(te, th), meta: l(me, mh), shape: shape as Shape, img: `${G}/merch/${n}.webp`, href: `${G}/merch/${n}.jpg`,
      ...(n === "pod-4-listing" ? { hl: { img: `${G}/merch/pod-4-listing.jpg`, cap: l(
        "Step 4 of 5: the rose pattern from step 1 as a studio listing photo.",
        "Az 5 lépésből a 4.: az 1. lépés rózsamintája stúdió-termékfotón.") } } : {}),
    })),
  },
  {
    slug: "print",
    title: l("Print and event design", "Nyomdai és rendezvényarculat"),
    blurb: l(
      "Print-ready files for our own stand at the 2026 Budapest AI Summit: roll-up poster, booth fascia and A6 flyer, set by hand at print resolution.",
      "Nyomdakész anyagok a saját standunkhoz a 2026-os budapesti AI Summiton: roll-up, standfelirat és A6-os szórólap, kézzel tördelve, nyomdai felbontásban.",
    ),
    spotlight: 0,
    items: [
      { kind: l("Roll-up · 1 × 2 m", "Roll-up · 1 × 2 m"), title: l("Software that ships. Agent teams you can trust.", "Roll-up a standra"),
        meta: l("Print PDF at 1006 × 2006 mm", "Nyomdai PDF, 1006 × 2006 mm"), img: `${G}/print/summit-poster.webp`, href: `${G}/print/summit-poster.jpg`,
        hl: { img: `${G}/print/summit-poster.jpg`, cap: l("The 2-metre roll-up, proof view.", "A 2 méteres roll-up, levonatnézetben.") } },
      { kind: l("A6 flyer", "A6-os szórólap"), title: l("Booth flyer with QR codes", "Szórólap QR-kódokkal"), meta: l("Front, print-ready", "Előoldal, nyomdakész"),
        img: `${G}/print/summit-flyer.webp`, href: `${G}/print/summit-flyer.jpg` },
      { kind: l("Booth fascia · 660 × 330 mm", "Standfelirat · 660 × 330 mm"), title: l("Booth fascia", "Standfelirat"), meta: l("300 dpi print file", "300 dpi-s nyomdai fájl"), shape: "wide",
        img: `${G}/print/summit-fascia.webp`, href: "/print/fascia-660x330-landscape_PRINT.pdf" },
    ],
  },
  {
    slug: "systems",
    title: l("Systems in production", "Éles rendszerek"),
    blurb: l(
      "The engineering behind the samples: AI systems we built and run, for clients and for our own products. Details on the home page.",
      "A minták mögötti mérnöki munka: AI-rendszerek, amelyeket ügyfeleinknek és saját termékeinkhez építettünk és üzemeltetünk. Részletek a főoldalon.",
    ),
    items: ([
      ["case-rag", "RAG · enterprise", "RAG · nagyvállalat", "Two production RAG systems for a multi-billion-dollar US manufacturer", "Két éles RAG-rendszer egy többmilliárd dolláros amerikai gyártónak"],
      ["case-erp", "Agentic platform · ERP", "Ügynökplatform · ERP", "Supplier pricing and quoting on Business Central and HubSpot", "Beszállítói árazás és ajánlatadás Business Centralon és HubSpoton"],
      ["case-scalepod", "Multi-agent pipeline", "Többügynökös folyamat", "ScalePOD: product brief to published listing in 12 minutes", "ScalePOD: termékötlettől a közzétett termékoldalig 12 perc alatt"],
      ["case-estateops", "Voice agent + RAG", "Hangügynök + RAG", "EstateOps: an AI intake agent writing live into the CRM", "EstateOps: AI-ügyfélfelvétel, amely élőben ír a CRM-be"],
      ["case-saas", "Web platform", "Webes platform", "Booking and credit platform for a staffing marketplace", "Foglalási és kreditrendszer egy munkaerő-piactérnek"],
      ["case-ml", "Machine learning", "Gépi tanulás", "Sensor error compensation on embedded hardware", "Szenzorhiba-kompenzáció beágyazott hardveren"],
    ] as const).map(([n, ke, kh, te, th]) => ({ kind: l(ke, kh), title: l(te, th), shape: "wide" as Shape, img: `/images/${n}.webp`, href: "/#work" })),
  },
];

export const bySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const total = categories.reduce((n, c) => n + c.items.length, 0);
/** path of the same page in the other language */
export const otherLangPath = (path: string, lang: Lang) =>
  lang === "en" ? `/hu${path}` : path.replace(/^\/hu(?=\/)/, "") || "/";
