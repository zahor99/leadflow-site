/**
 * Build-time blog helpers. Imported by Astro frontmatter — runs on the
 * GitHub Actions runner (or local `npm run build`), never in the browser.
 *
 * AIRTABLE_PAT is a build-only env var (no PUBLIC_ prefix) so Vite/Astro
 * will refuse to inline it into the client bundle.
 */

const BASE_ID = "appEiEdrHTeKFxBWJ";
const TABLE_ID = "tblUQPFtXJSU4PiS9";

// Field IDs (stable across renames)
const FIELD_IDEA = "fldeuzFTtW9mK48Pq"; // "Idea" / topic
const FIELD_DRAFT = "flduKUGW9EzBHLFop"; // "Blog Article Draft"
const FIELD_STATUS = "fldNM1sBbY37VoOj2"; // "Status"

export interface BlogRow {
  id: string;
  idea: string;
  draft: string;
  status: string;
}

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableListResponse {
  records: AirtableRecord[];
  offset?: string;
}

/**
 * Fetches rows from the X Content Pipeline where Blog Article Draft is
 * non-empty AND Status is 'draft' or 'published'. Build-time only.
 */
export async function fetchBlogRows(): Promise<BlogRow[]> {
  // Server-only env: read from process.env (build runner) first; fall back
  // to import.meta.env only for the rare case a developer set it that way.
  // NEVER access this in code that runs in the browser — it would leak the PAT.
  const pat =
    (typeof process !== "undefined" && process.env && process.env.AIRTABLE_PAT) ||
    (import.meta.env as Record<string, string | undefined>).AIRTABLE_PAT;
  if (!pat) {
    // During local dev without the secret, return [] so `astro dev` still works.
    // The GH Actions build sets AIRTABLE_PAT and will pull real rows.
    console.warn(
      "[blog] AIRTABLE_PAT not set — returning empty list. Set it before `npm run build` for real data.",
    );
    return [];
  }

  const filter = `AND(NOT({Blog Article Draft}=''), OR({Status}='draft', {Status}='published'))`;
  const params = new URLSearchParams();
  params.append("fields[]", FIELD_IDEA);
  params.append("fields[]", FIELD_DRAFT);
  params.append("fields[]", FIELD_STATUS);
  params.append("filterByFormula", filter);
  params.append("pageSize", "100");
  // Force field-ID-keyed responses so a future rename of the Airtable
  // column doesn't silently break the build.
  params.append("returnFieldsByFieldId", "true");

  const rows: BlogRow[] = [];
  let offset: string | undefined;
  do {
    const u = new URL(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`);
    u.search = params.toString();
    if (offset) u.searchParams.set("offset", offset);

    const res = await fetch(u.toString(), {
      headers: { Authorization: `Bearer ${pat}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `[blog] Airtable fetch failed: ${res.status} ${res.statusText} — ${text.slice(0, 300)}`,
      );
    }
    const json = (await res.json()) as AirtableListResponse;
    for (const r of json.records) {
      const draft = (r.fields[FIELD_DRAFT] ?? "") as string;
      const idea = (r.fields[FIELD_IDEA] ?? "") as string;
      const statusRaw = r.fields[FIELD_STATUS];
      // Status is a singleSelect — the REST API returns the name as a string.
      const status =
        typeof statusRaw === "string"
          ? statusRaw
          : statusRaw && typeof statusRaw === "object" && "name" in statusRaw
            ? String((statusRaw as { name: string }).name)
            : "";
      if (!draft.trim()) continue;
      rows.push({ id: r.id, idea, draft, status });
    }
    offset = json.offset;
  } while (offset);

  return rows;
}

/** Pull the first H1 line. Returns "" if none. */
export function extractH1(md: string): string {
  const m = md.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : "";
}

/** Kebab-case a heading into a URL slug. */
export function deriveSlug(h1: string): string {
  return h1
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/['"`’]/g, "") // strip apostrophes/quotes
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

/**
 * Extract the first sentence of the TL;DR line. Looks for a `> **TL;DR.**`
 * blockquote (writer convention) and returns the first sentence after it.
 */
export function extractTldrFirstSentence(md: string): string {
  const blockMatch = md.match(/>\s*\*\*TL;DR\.?\*\*\s*(.+?)(?:\n\n|\n>?\s*$)/s);
  let text = "";
  if (blockMatch) {
    text = blockMatch[1].replace(/\n>\s?/g, " ").trim();
  } else {
    // Fallback: first non-empty, non-heading, non-comment paragraph.
    const lines = md.split(/\n\n+/);
    for (const block of lines) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("#")) continue;
      if (trimmed.startsWith("<!--")) continue;
      text = trimmed;
      break;
    }
  }
  // First sentence (up to first . ! or ? followed by space or end).
  const sentence = text.match(/^.*?[.!?](?=\s|$)/);
  return (sentence ? sentence[0] : text).trim();
}

/**
 * Parse the `<!-- aeo:meta ... -->` HTML comment block into a key/value map.
 */
export function extractAeoMeta(md: string): Record<string, string> {
  const m = md.match(/<!--\s*aeo:meta\s*([\s\S]*?)-->/);
  if (!m) return {};
  const result: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^\s*([a-z_]+)\s*:\s*(.+?)\s*$/i);
    if (kv) result[kv[1]] = kv[2];
  }
  return result;
}

/**
 * Extract the inner JSON from `<!-- aeo:schema:faqpage ... -->` and
 * `<!-- aeo:schema:article ... -->` comments. Returns each as a JSON
 * string suitable for `<script type="application/ld+json">`.
 */
export function extractAeoSchemaBlocks(md: string): string[] {
  const blocks: string[] = [];
  const re = /<!--\s*aeo:schema:[a-z]+\s*([\s\S]*?)-->/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(md)) !== null) {
    const raw = match[1].trim();
    if (!raw) continue;
    try {
      // Round-trip through JSON.parse to validate + minify.
      const parsed = JSON.parse(raw);
      blocks.push(JSON.stringify(parsed));
    } catch {
      // If it's not valid JSON (e.g. a stray `aeo:claim-audit` table),
      // skip silently — only structured JSON-LD belongs in <head>.
    }
  }
  return blocks;
}

/**
 * Remove all `<!-- aeo:* -->` HTML comments from the markdown so they
 * don't appear in the rendered article body.
 */
export function stripAeoComments(md: string): string {
  return md.replace(/<!--\s*aeo:[\s\S]*?-->/g, "").replace(/\n{3,}/g, "\n\n");
}
