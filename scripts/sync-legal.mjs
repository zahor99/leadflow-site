// Copy the LIVE terms and privacy notice of the online tools (tools.leadflowautomation.net) into the website, so the
// site publishes the same text the customer accepts. Run after every terms change on the server, then commit:
//   node scripts/sync-legal.mjs          (writes src/content/legal/*.html)
//   node scripts/sync-legal.mjs --check  (exit 1 when the site copy differs from the live text)
// The server copy stays the one that counts; the site copy says so and links to it.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const BASE = "https://tools.leadflowautomation.net";
const OUT = new URL("../src/content/legal/", import.meta.url);
const PAGES = { terms: "/terms", privacy: "/privacy" };
// links inside the texts point at the tool's own pages; on the site they point at the site copies
const LINKS = [["href=\"/privacy\"", "href=\"/privacy/tools/\""], ["href=\"/terms\"", "href=\"/terms/\""]];

async function body(path) {
  const r = await fetch(BASE + path, { headers: { "User-Agent": "leadflow-site legal sync" } });
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  const html = await r.text();
  const m = html.match(/<main>([\s\S]*?)<footer>/);
  if (!m) throw new Error(`${path}: page layout changed (no <main>…<footer>)`);
  let s = m[1].trim();
  if (/class=["']draft["']/.test(s)) throw new Error(`${path}: the live text is still marked draft; not publishing it`);
  if (/<script|on\w+=/i.test(s)) throw new Error(`${path}: unexpected script in the legal text`);
  for (const [a, b] of LINKS) s = s.split(a).join(b);
  return s + "\n";
}

const check = process.argv.includes("--check");
mkdirSync(OUT, { recursive: true });
let differ = 0;
for (const [name, path] of Object.entries(PAGES)) {
  const live = await body(path);
  const file = new URL(`tools-${name}.html`, OUT);
  let have = "";
  try { have = readFileSync(file, "utf8"); } catch {}
  if (have === live) { console.log(`${name}: same as live`); continue; }
  differ++;
  if (check) console.log(`${name}: DIFFERS from ${BASE}${path}`);
  else { writeFileSync(file, live); console.log(`${name}: updated from ${BASE}${path}`); }
}
if (check && differ) process.exit(1);
