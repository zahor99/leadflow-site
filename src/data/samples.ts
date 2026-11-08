// One list of every public sample, in English and Hungarian. /work/ (hub), /work/<slug>/ (category page),
// /seo-desk/ and their /hu/ twins all read from here: add a sample once, it shows up everywhere.
// Rules: only our own products, made-up demo brands or public-data examples; never a client or prospect brand,
// never an unsolicited audit of a real brand (the Graza AI-search baseline stays unlinked, review 2026-11-08 #5).
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
  /** no text inside the asset (photos): no "angol nyelvű" tag on the HU pages */
  noText?: boolean;
  /** a crop of the strongest part of the asset, shown on the page; `m` = tighter single-figure crop for phones */
  hl?: { img: string; m?: string; cap: L; from?: L };
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
    seeAll: (n: number) => `See all ${n} samples`, fromPage: "From the sample", assetLang: "",
    scroll: "scroll sideways", prev: "Previous", next: "Next", all: "All samples", more: "More samples",
  },
  hu: {
    open: "Megnyitás", openReport: "A teljes jelentés megnyitása", play: "Videó lejátszása", openImage: "Megnyitás teljes méretben", read: "A cikk elolvasása",
    seeAll: (n: number) => `Mind a ${n} minta megtekintése`, fromPage: "Részlet a mintából", assetLang: "angol nyelvű",
    scroll: "oldalra görgethető", prev: "Előző", next: "Következő", all: "Összes minta", more: "További minták",
  },
};

const baselineCap = (site: string, en: string, hu: string) => l(
  `Page 1, at a glance: ${en}. This is the week-0 starting point for ${site}.`,
  `1. oldal, összefoglaló: ${hu}. Ez a ${site} 0. heti kiinduló állapota.`);

export const categories: Category[] = [
  {
    slug: "seo",
    title: l("SEO and AI search", "SEO és AI-keresés"),
    blurb: l(
      "Technical audits, keyword research and AI-visibility baselines, built from live Google data and checked page by page.",
      "Technikai auditok, kulcsszókutatás és AI-láthatósági felmérések, élő Google-adatokból, oldalanként ellenőrizve.",
    ),
    spotlight: 0,
    items: [
      { id: "seo-audit", kind: l("SEO audit · 11 pages", "SEO-audit · 11 oldal"),
        title: l("Shopify SEO audit with a prioritised fix plan", "Shopify SEO-audit rangsorolt javítási tervvel"),
        meta: l("Our own store · 19 findings, ordered by impact", "Saját webáruházunk · 19 megállapítás, hatás szerint sorrendben"),
        img: "/work/reports/seo-audit/cover.png", href: "/work/reports/seo-audit/shopify-seo-audit-sample.pdf",
        hl: { img: `${H}/seo-audit.webp`, m: `${H}/seo-audit-m.webp`, cap: l(
          "Page 1: health score 38/100 and 0 pages in Google on audit day; 74 pages indexed by 26 March, after Search Console setup.",
          "1. oldal: 38/100 pontos állapot és 0 oldal a Google-ben az audit napján; a Search Console beállítása után március 26-ig 74 oldal került az indexbe.") } },
      { id: "keyword-research", kind: l("Keyword research · 12 pages", "Kulcsszókutatás · 12 oldal"),
        title: l("E-commerce keyword research", "Webáruházas kulcsszókutatás"),
        meta: l("40 keywords · 25 markets · volume, CPC (cost per click), intent", "40 kulcsszó · 25 piac · keresésszám, CPC (kattintásonkénti költség), szándék"),
        img: "/work/reports/keyword-research/cover.png", href: "/work/reports/keyword-research/ecommerce-keyword-research-sample.pdf",
        hl: { img: `${H}/kw.webp`, m: `${H}/kw-m.webp`, cap: l(
          "Page 10: the same keywords in five markets, monthly searches with the cost per click underneath.",
          "10. oldal: ugyanazok a kulcsszavak öt piacon, havi keresésszám, alatta a kattintásonkénti költség.") } },
      { kind: l("AI-visibility baseline · 4 pages", "AI-láthatósági felmérés · 4 oldal"),
        title: l("Week-0 baseline: leadflowautomation.net", "0. heti kiinduló felmérés: leadflowautomation.net"),
        meta: l("Made by hand · ChatGPT, Gemini, Perplexity, AI Overview", "Kézzel készült · ChatGPT, Gemini, Perplexity, AI Overview"),
        img: "/work/reports/seo-desk/seo-desk-baseline-leadflowautomation.webp", href: "/work/reports/seo-desk/seo-desk-baseline-leadflowautomation.pdf",
        hl: { img: `${H}/seodesk-lf.webp`, m: `${H}/seodesk-lf-m.webp`, cap: baselineCap("leadflowautomation.net",
          "site health 100, mobile speed 97, 0 of 25 keywords in Google's top 20, 0% AI visibility",
          "oldalállapot 100, mobilsebesség 97, a 25 kulcsszóból 0 a Google első 20 találatában, 0% AI-láthatóság") } },
      { kind: l("AI-visibility baseline · 4 pages", "AI-láthatósági felmérés · 4 oldal"),
        title: l("Week-0 baseline: scalepod.ai", "0. heti kiinduló felmérés: scalepod.ai"),
        meta: l("Made by hand · our own product site", "Kézzel készült · saját termékoldalunk"),
        img: "/work/reports/seo-desk/seo-desk-baseline-scalepod.webp", href: "/work/reports/seo-desk/seo-desk-baseline-scalepod.pdf",
        hl: { img: `${H}/seodesk-sp.webp`, m: `${H}/seodesk-sp-m.webp`, cap: baselineCap("scalepod.ai",
          "site health 50, mobile speed 93, 0 of 25 keywords in Google's top 20, 0% AI visibility",
          "oldalállapot 50, mobilsebesség 93, a 25 kulcsszóból 0 a Google első 20 találatában, 0% AI-láthatóság") } },
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
        meta: l("18 products · 9 niches · 1,760 live listings priced", "18 termék · 9 piaci rés · 1760 élő hirdetés árazva"),
        img: "/work/reports/product-research/cover.png", href: "/work/reports/product-research/ecommerce-product-research-sample.pdf",
        hl: { img: `${H}/prod.webp`, m: `${H}/prod-m.webp`, cap: l(
          "Page 5: search volume against margin. Of the two biggest-volume products, one loses money and the other barely breaks even after fees.",
          "5. oldal: keresésszám és árrés egy ábrán. A két legkeresettebb termék közül az egyik a díjak után veszteséges, a másik épphogy nullszaldós.") } },
      { id: "web-scraping", kind: l("Web scraping · 8 pages", "Webes adatgyűjtés · 8 oldal"),
        title: l("126,359 games, one clean dataset", "126 359 játék, egy tiszta adatállomány"),
        meta: l("13 fields · data dictionary · QA checks", "13 mező · adatszótár · minőségellenőrzés"),
        img: "/work/reports/web-scraping/cover.png", href: "/work/reports/web-scraping/web-scraping-sample-report.pdf",
        extra: [{ href: "/work/reports/web-scraping/sample-dataset.xlsx", label: l("Dataset (Excel)", "Adatok (Excel)") },
                { href: "/work/reports/web-scraping/sample-dataset.csv", label: l("CSV", "CSV") }],
        hl: { img: `${H}/scrape.webp`, m: `${H}/scrape-m.webp`, cap: l("Page 6: four charts computed from the full dataset.", "6. oldal: négy ábra a teljes adatállományból számolva.") } },
      { id: "cold-email", kind: l("Outbound system · 7 pages", "Megkeresési rendszer · 7 oldal"),
        title: l("A personalised cold e-mail system, end to end", "Személyre szabott hideg e-mailes megkeresési rendszer, elejétől a végéig"),
        meta: l("Shown on one fictional prospect", "Egy kitalált cégen bemutatva"),
        img: "/work/reports/cold-email/cover.png", href: "/work/reports/cold-email/cold-email-system-sample.pdf",
        hl: { img: `${H}/cold.webp`, m: `${H}/cold-m.webp`, cap: l(
          "Page 2: the seven-step pipeline, from sourcing to the daily reply digest, with the check at each step.",
          "2. oldal: a hétlépéses folyamat a címlistától a napi válaszösszesítőig, minden lépésnél az ellenőrzéssel.") } },
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
      ["medspa-myth-or-fact", "Instagram post", "Instagram-poszt", "Myth or fact: anti aging", "Tévhit vagy tény: anti aging", "Med spa", "Esztétikai klinika", "portrait"],
      ["b2b-carousel-1", "LinkedIn carousel · 1 of 4", "LinkedIn-karusszel · 1/4", "Where do your team's hours go?", "Hová lesznek a csapat órái?", "B2B services", "B2B szolgáltató", "portrait"],
      ["b2b-carousel-2", "LinkedIn carousel · 2 of 4", "LinkedIn-karusszel · 2/4", "One figure per slide, labelled as an example", "Diánként egy szám, példaként jelölve", "B2B services", "B2B szolgáltató", "portrait"],
      ["skincare-glow-ritual", "Instagram post", "Instagram-poszt", "Signature glow ritual", "Ragyogás-rituálé", "Skin clinic", "Bőrklinika", "portrait"],
      ["barber-fresh-fade", "Story", "Sztori", "Fresh fade Friday", "Péntek: friss fade", "Barber", "Borbély", "portrait"],
      ["coach-ig-post", "Instagram post", "Instagram-poszt", "Your offer isn't the problem", "Nem az ajánlattal van a baj", "Coach", "Coach", "portrait"],
      ["fitness-ig-post", "Instagram post", "Instagram-poszt", "Strong is a skill", "Az erő tanulható", "Gym", "Edzőterem", "portrait"],
      ["medspa-carousel-1", "Carousel cover", "Karusszel-borító", "5 skincare myths", "5 bőrápolási tévhit", "Med spa", "Esztétikai klinika", "portrait"],
      ["b2b-carousel-4", "LinkedIn carousel · 4 of 4", "LinkedIn-karusszel · 4/4", "Get the intake checklist", "Kérje el az ellenőrzőlistát", "B2B services", "B2B szolgáltató", "portrait"],
      ["nails-cuticle-care", "Instagram post", "Instagram-poszt", "Cuticle care in four steps", "Körömbőrápolás négy lépésben", "Nail atelier", "Körömszalon", "portrait"],
      ["facial-carousel-cover", "Carousel cover", "Karusszel-borító", "Make your facial last all month", "Hogy a kezelés egész hónapban látsszon", "Skin clinic", "Bőrklinika", "portrait"],
      ["fitness-yt-thumb", "YouTube thumbnail", "YouTube-bélyegkép", "Stop doing this", "Ezt hagyd abba", "Gym", "Edzőterem", "wide"],
      ["b2b-webinar-title", "Webinar title slide", "Webinárium-címdia", "From inbox chaos to an AI-run intake desk", "A levelezési káosztól az AI-vezérelt ügyfélfelvételig", "B2B services", "B2B szolgáltató", "wide"],
    ] as const).map(([n, ke, kh, te, th, me, mh, shape], i) => ({
      kind: l(ke, kh), title: l(te, th), meta: l(`${me} · made-up demo brand`, `${mh} · kitalált demómárka`),
      shape: shape as Shape, img: `${G}/social/${n}.webp`, href: `${G}/social/${n}.jpg`,
      ...(i === 0 ? { hl: { img: `${H}/social-set.webp`, from: l("Four of the posts below", "Négy az alábbi posztok közül"), cap: l(
        "Four posts for four made-up brands: a med spa, a B2B services firm, a gym and a coach. Each follows its own type and colour rules.",
        "Négy poszt négy kitalált márkának: esztétikai klinika, B2B szolgáltató, edzőterem és coach. Mindegyik a saját betű- és színszabályait követi.") } } : {}),
    } as Sample)).concat([
      { kind: l("X infographic", "X-infografika"), title: l("5 boring AI agent use cases that make money", "5 unalmas AI-ügynökös felhasználás, ami pénzt hoz"),
        meta: l("Our own X account", "Saját X-fiókunk"), shape: "doc", img: `${G}/social/x-infographic-five-cases.webp`, href: `${G}/social/x-infographic-five-cases.jpg` },
      { kind: l("X infographic", "X-infografika"), title: l("5 walls SMB AI-agent deployments hit", "Az 5 fal, amibe a kkv-k AI-bevezetései ütköznek"),
        meta: l("Our own X account", "Saját X-fiókunk"), shape: "doc", img: `${G}/social/x-infographic-five-walls.webp`, href: `${G}/social/x-infographic-five-walls.jpg` },
    ]),
  },
  {
    slug: "video",
    title: l("UGC ads and videos", "UGC-hirdetések és videók"),
    blurb: l(
      "UGC ads (short videos in the style of a customer talking to camera) with labelled AI presenters, narrated product demos and short explainers: script, voice, animation and edit.",
      "UGC-hirdetések (rövid videók abban a stílusban, mintha egy vásárló beszélne a kamerába) AI-jelöléssel ellátott előadóval, narrált termékbemutatók és rövid magyarázó videók: forgatókönyv, hang, animáció és vágás.",
    ),
    anchors: ["ugc"],
    spotlight: 2,
    items: [
      { kind: l("UGC ad · 40 s · 9:16", "UGC-hirdetés · 40 mp · 9:16"), title: l("AI-presenter hook, then a phone-native product demo", "AI-előadós nyitás, utána telefonra szabott termékdemó"),
        meta: l("Our own product, ScalePOD · AI presenter labelled", "Saját termékünk, a ScalePOD · AI-jelöléssel ellátott előadó"), img: "/work/videos/scalepod-ugc-poster.jpg", video: "/work/videos/scalepod-ugc.mp4" },
      { kind: l("UGC review · 28 s · 9:16", "UGC-termékértékelés · 28 mp · 9:16"), title: l("Product review for a fictional brand", "Termékértékelés egy kitalált márkának"),
        meta: l("AI presenter, mechanism animation, captions", "AI-jelöléssel ellátott előadó, hatásmechanizmus-animáció, feliratok"), img: "/work/videos/nocta-review-ugc.jpg", video: "/work/videos/nocta-review-ugc.mp4" },
      { kind: l("Product demo · 2 min · 16:9", "Termékdemó · 2 perc · 16:9"), title: l("ScalePOD AI designer walkthrough", "A ScalePOD AI-tervező bemutatója"),
        meta: l("Narrated, motion graphics, real product screens", "Narrálva, mozgógrafikával, valódi termékképernyőkkel"), shape: "wide",
        img: "/work/videos/scalepod-ai-demo.jpg", video: "/work/videos/scalepod-ai-demo.mp4",
        hl: { img: "/work/videos/scalepod-ai-demo-review.jpg", cap: l(
          "A frame from the two-minute demo: the review page, where each design is checked like a physical sample. The video plays on this page.",
          "Képkocka a kétperces demóból: a jóváhagyó oldal, ahol minden terv úgy ellenőrizhető, mint egy fizikai minta. A videó itt az oldalon lejátszható.") } },
      { kind: l("Explainer · 22 s", "Magyarázó videó · 22 mp"), title: l("Knowledge assistant explainer", "Tudásasszisztens, röviden"),
        meta: l("Script, voice-over, animation", "Forgatókönyv, narráció, animáció"), shape: "wide", img: "/videos/poster_rag.jpg", video: "/videos/seg_rag.mp4" },
      { kind: l("Explainer · 22 s", "Magyarázó videó · 22 mp"), title: l("Shadow-AI risk explainer", "Az árnyék-AI kockázata, röviden"), shape: "wide", img: "/videos/poster_shadowai.jpg", video: "/videos/seg_shadowai.mp4" },
      { kind: l("Explainer · 23 s", "Magyarázó videó · 23 mp"), title: l("Data anonymisation explainer", "Adatanonimizálás, röviden"), shape: "wide", img: "/videos/poster_anonymizer.jpg", video: "/videos/seg_anonymizer.mp4" },
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
        hl: { img: `${H}/wp-erp.webp`, m: `${H}/wp-erp-m.webp`, cap: l(
          "Page 5: the architecture, one engine behind three front doors, with the human review gates underneath.",
          "5. oldal: az architektúra, egy motor három belépési ponttal, alatta az emberi jóváhagyási pontok.") } },
      { kind: l("White paper · 11 pages", "Szakmai tanulmány · 11 oldal"), title: l("MCP servers as a product channel", "MCP-szerverek mint értékesítési csatorna"),
        meta: l("MCP (Model Context Protocol) is how Claude connects to outside tools. Lessons from 14 days of our ScalePOD pilot.",
                "Az MCP (Model Context Protocol) az a szabvány, amellyel a Claude külső eszközökhöz kapcsolódik. Tanulságok a ScalePOD 14 napos próbaüzeméből."),
        img: "/work/whitepapers/merch-mcp-server-cover.png", href: "/work/whitepapers/merch-mcp-server.pdf",
        hl: { img: `${H}/wp-mcp.webp`, m: `${H}/wp-mcp-m.webp`, cap: l("Page 4: the request path from the user's Claude to the server.", "4. oldal: a kérés útja a felhasználó Claude-jától a szerverig.") } },
      { kind: l("Guide · 8 pages", "Útmutató · 8 oldal"), title: l("The AI leverage blueprint", "AI-tervrajz cégvezetőknek"),
        meta: l("Where AI belongs in a company, and where it must not go", "Hol van helye az AI-nak a cégben, és hol nincs"),
        img: `${G}/lead/leadflow-ai-leverage-blueprint.webp`, href: "/downloads/leadflow-ai-leverage-blueprint.pdf",
        hl: { img: `${H}/lm-blue.webp`, m: `${H}/lm-blue-m.webp`, cap: l("Page 3: how code, automation, AI models and people divide the work.", "3. oldal: hogyan osztozik a munkán a kód, az automatizálás, az AI-modell és az ember.") } },
      { kind: l("Checklist · 1 page", "Ellenőrzőlista · 1 oldal"), title: l("10 questions before any AI tool touches company data", "10 kérdés, mielőtt bármilyen AI-eszköz céges adathoz ér"),
        meta: l("GDPR and AI", "GDPR és AI"), img: `${G}/lead/leadflow-gdpr-ai-checklist.webp`, href: "/downloads/leadflow-gdpr-ai-checklist.pdf",
        hl: { img: `${H}/lm-gdpr.webp`, m: `${H}/lm-gdpr-m.webp`, cap: l("The checklist, top half.", "Az ellenőrzőlista felső fele.") } },
      { kind: l("E-book cover", "E-könyv-borító"), title: l("The glow guide", "Ragyogás-útmutató"), meta: l("Skin clinic · made-up demo brand", "Bőrklinika · kitalált demómárka"),
        img: `${G}/lead/ebook-glow-guide.webp`, href: `${G}/lead/ebook-glow-guide.jpg` },
      { kind: l("Training manual · cover and inside page", "Oktatási kézikönyv · borító és belső oldal"), title: l("Lash extension manual", "Műszempilla-kézikönyv"), meta: l("Lash academy · made-up demo brand", "Szempillaakadémia · kitalált demómárka"),
        img: `${G}/lead/manual-lash-extension.webp`, href: `${G}/lead/manual-lash-extension.jpg`,
        extra: [{ href: `${G}/lead/manual-lash-mapping.jpg`, label: l("Inside page: lash mapping", "Belső oldal: pillatérkép") }] },
      { kind: l("E-book cover", "E-könyv-borító"), title: l("The skin barrier guide", "Bőrbarrier-útmutató"), meta: l("Med spa · made-up demo brand", "Esztétikai klinika · kitalált demómárka"),
        img: `${G}/lead/ebook-skin-barrier.webp`, href: `${G}/lead/ebook-skin-barrier.jpg` },
    ],
  },
  {
    slug: "products",
    title: l("Product images and concept screens", "Termékképek és koncepcióképernyők"),
    blurb: l(
      "One generated pattern taken to a listing photo and a lifestyle shot by our own product pipeline, with an AI-generated model. Plus concept screens for ScalePOD, our merch server for Claude.",
      "Egyetlen generált mintából termékfotó és hangulatkép, a saját termékgyártó folyamatunkkal, AI által generált modellel. Mellette koncepcióképernyők a ScalePOD-hoz, a Claude-hoz készült merch-szerverünkhöz.",
    ),
    spotlight: 1,
    items: ([
      ["pod-1-pattern", "Pattern", "Minta", "Seamless rose pattern", "Hézagmentes rózsaminta", "Generated, then tiled", "Generálva, majd ismételve", "square", true],
      ["pod-4-listing", "Listing photo · AI-generated model", "Termékfotó · AI által generált modell", "The rose pattern as a studio listing photo", "A rózsaminta stúdió-termékfotón", "For the shop page", "A webáruház termékoldalára", "square", true],
      ["pod-5-lifestyle", "Lifestyle photo · AI-generated model", "Hangulatkép · AI által generált modell", "The same jacket in a lifestyle shot", "Ugyanaz a dzseki hangulatképen", "For ads and the product page", "Hirdetésekhez és a termékoldalra", "square", true],
      ["ui-chat-board", "Concept screen", "Koncepcióképernyő", "ScalePOD: mockup board", "ScalePOD: mockuptábla", "Chat and board view, dark theme", "Csevegő- és táblanézet, sötét téma", "wide", false],
      ["ui-print-pack", "Concept screen", "Koncepcióképernyő", "ScalePOD: print pack ready", "ScalePOD: kész a nyomdai csomag", "Layered PSD and 300 dpi files", "Rétegezett PSD és 300 dpi-s fájlok", "wide", false],
      ["ui-review-mobile", "Concept screen · mobile", "Koncepcióképernyő · mobil", "Client review: accept, reject or regenerate", "Ügyfél-jóváhagyás: elfogad, elutasít vagy újragenerál", "One item at a time", "Tételenként", "portrait", false],
      ["ui-review-list", "Concept screen · mobile", "Koncepcióképernyő · mobil", "Client review: the whole kit", "Ügyfél-jóváhagyás: a teljes csomag", "One decision per item", "Tételenként egy döntés", "portrait", false],
    ] as const).map(([n, ke, kh, te, th, me, mh, shape, noText]) => ({
      kind: l(ke, kh), title: l(te, th), meta: l(me, mh), shape: shape as Shape, noText, img: `${G}/merch/${n}.webp`, href: `${G}/merch/${n}.jpg`,
      ...(n === "pod-4-listing" ? { hl: { img: `${G}/merch/pod-4-listing.jpg`, cap: l(
        "The generated rose pattern on a jacket, as a studio listing photo. The model is AI-generated.",
        "A generált rózsaminta egy dzsekin, stúdió-termékfotón. A modell AI által generált.") } } : {}),
    })),
  },
  {
    slug: "print",
    title: l("Print and event design", "Nyomdai és rendezvényarculat"),
    blurb: l(
      "Files for our own stand at the 2026 Budapest AI Summit: roll-up, A6 flyer and booth fascia, set by hand at print resolution.",
      "Anyagok a saját standunkhoz a 2026-os budapesti AI Summiton: roll-up, A6-os szórólap és standfelirat, kézzel tördelve, nyomdai felbontásban.",
    ),
    spotlight: 0,
    items: [
      { kind: l("Roll-up · 1 × 2 m, with A6 flyer", "Roll-up · 1 × 2 m, A6-os szórólappal"), title: l("“Software that ships. Agent teams you can trust.”", "Roll-up és szórólap a standra"),
        meta: l("Proof view of the 1006 × 2006 mm roll-up", "Az 1006 × 2006 mm-es roll-up levonata"), img: `${G}/print/summit-poster.webp`, href: `${G}/print/summit-poster.jpg`,
        extra: [{ href: `${G}/print/summit-flyer.jpg`, label: l("A6 flyer, front", "A6-os szórólap, előoldal") }],
        hl: { img: `${G}/print/summit-poster.jpg`, cap: l("The 2-metre roll-up, proof view.", "A 2 méteres roll-up, levonatnézetben.") } },
      { kind: l("Booth fascia · 660 × 330 mm", "Standfelirat · 660 × 330 mm"), title: l("Booth fascia", "Standfelirat"), meta: l("Print PDF, 300 dpi", "Nyomdai PDF, 300 dpi"), shape: "wide",
        img: `${G}/print/summit-fascia.webp`, href: "/print/fascia-660x330-landscape_PRINT.pdf" },
    ],
  },
];

export const bySlug = (slug: string) => categories.find((c) => c.slug === slug);
/** path of the same page in the other language */
export const otherLangPath = (path: string, lang: Lang) =>
  lang === "en" ? `/hu${path}` : path.replace(/^\/hu(?=\/)/, "") || "/";
