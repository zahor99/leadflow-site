#!/usr/bin/env node
/**
 * Build-time hero image bundler.
 *
 * Pulls the Diagram[0] attachment for every blog row in the X Content Pipeline
 * (Airtable appEiEdrHTeKFxBWJ / tblUQPFtXJSU4PiS9) and writes each one to
 * public/blog-heroes/<row-id>.<ext> so Astro will copy them into dist/ at build
 * time and the site can serve them same-origin instead of relying on Airtable's
 * v5.airtableusercontent.com signed URLs (which expire ~6 months out).
 *
 * Runs automatically via the npm `prebuild` hook before `astro build`.
 *
 * Graceful failure modes:
 *   - AIRTABLE_PAT missing: warn + exit 0 (don't break local dev).
 *   - Airtable 4xx/5xx: exit 1 (fail the build).
 *   - Individual attachment download fails: log + continue (other rows still build).
 *
 * Idempotency: maintains public/blog-heroes/.manifest.json keyed by row id ->
 * { url, file }. On re-run, rows whose attachment URL matches the manifest
 * skip the download.
 */

import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");
const OUT_DIR = join(PROJECT_ROOT, "public", "blog-heroes");
// Manifest lives OUTSIDE public/ so Astro doesn't copy it to dist/ (where it
// would publicly expose the signed Airtable attachment URLs).
const MANIFEST_PATH = join(PROJECT_ROOT, ".blog-heroes.manifest.json");

const BASE_ID = "appEiEdrHTeKFxBWJ";
const TABLE_ID = "tblUQPFtXJSU4PiS9";

// Field IDs — keep in sync with src/lib/blog.ts
const FIELD_IDEA = "fldeuzFTtW9mK48Pq";
const FIELD_DRAFT = "flduKUGW9EzBHLFop";
const FIELD_STATUS = "fldNM1sBbY37VoOj2";
const FIELD_DIAGRAM = "fld4UpEclclvMg2Dp";

function extFromFilename(name) {
  if (typeof name !== "string") return ".png";
  const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!m) return ".png";
  const ext = m[1];
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return `.${ext}`;
  return ".png";
}

function fmtBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function loadManifest() {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    // missing or invalid — start fresh
  }
  return {};
}

async function saveManifest(manifest) {
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}

async function fetchAllBlogRows(pat) {
  const params = new URLSearchParams();
  params.append("fields[]", FIELD_IDEA);
  params.append("fields[]", FIELD_DRAFT);
  params.append("fields[]", FIELD_STATUS);
  params.append("fields[]", FIELD_DIAGRAM);
  params.append(
    "filterByFormula",
    "AND(NOT({Blog Article Draft}=''), OR({Status}='draft', {Status}='published'))",
  );
  params.append("pageSize", "100");
  params.append("returnFieldsByFieldId", "true");

  const rows = [];
  let offset;
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
        `Airtable fetch failed: ${res.status} ${res.statusText} — ${text.slice(0, 300)}`,
      );
    }
    const json = await res.json();
    for (const r of json.records) {
      rows.push(r);
    }
    offset = json.offset;
  } while (offset);

  return rows;
}

async function downloadAttachment(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  const pat = process.env.AIRTABLE_PAT;
  if (!pat) {
    console.warn(
      "[blog-heroes] AIRTABLE_PAT not set — skipping hero image bundling. " +
        "Set it before `npm run build` to fetch real images.",
    );
    return 0;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const manifest = await loadManifest();

  let rows;
  try {
    rows = await fetchAllBlogRows(pat);
  } catch (err) {
    console.error(`[blog-heroes] ${err.message}`);
    return 1;
  }

  let downloaded = 0;
  let skipped = 0;
  let failures = 0;

  for (const r of rows) {
    const idea = (r.fields[FIELD_IDEA] ?? "").toString();
    const attachments = r.fields[FIELD_DIAGRAM];
    if (!Array.isArray(attachments) || attachments.length === 0) continue;
    const a = attachments[0];
    if (!a || !a.url || !a.filename) continue;

    const ext = extFromFilename(a.filename);
    const relPath = `public/blog-heroes/${r.id}${ext}`;
    const absPath = join(OUT_DIR, `${r.id}${ext}`);

    const cached = manifest[r.id];
    if (cached && cached.url === a.url && existsSync(absPath)) {
      try {
        const s = await stat(absPath);
        console.log(
          `[blog-heroes] ${r.id} (${idea.slice(0, 60) || "untitled"}) -> ${relPath} (cached, ${fmtBytes(s.size)})`,
        );
        skipped += 1;
        continue;
      } catch {
        // fall through to re-download
      }
    }

    try {
      const size = await downloadAttachment(a.url, absPath);
      manifest[r.id] = { url: a.url, file: `${r.id}${ext}`, filename: a.filename };
      console.log(
        `[blog-heroes] ${r.id} (${idea.slice(0, 60) || "untitled"}) -> ${relPath} (${fmtBytes(size)})`,
      );
      downloaded += 1;
    } catch (err) {
      console.error(`[blog-heroes] ${r.id} download failed: ${err.message}`);
      failures += 1;
    }
  }

  await saveManifest(manifest);
  console.log(
    `[blog-heroes] done — ${downloaded} downloaded, ${skipped} cached, ${failures} failed.`,
  );
  // Don't fail the build on individual download failures; the page just
  // renders a 404 image, same failure mode as the old expiring URLs.
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(`[blog-heroes] unhandled: ${err.stack || err.message}`);
    process.exit(1);
  });
