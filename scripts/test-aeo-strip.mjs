// Smoke test for the AEO strip/extract fix. Run: node scripts/test-aeo-strip.mjs
// Builds blog.ts with esbuild, feeds it a fixture replicating the REAL row
// format (marker-pair schema blocks + claim-audit + hallucinated author bio),
// plus the legacy inline format, and asserts nothing internal leaks.
import { build } from "esbuild";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const out = join(mkdtempSync(join(tmpdir(), "aeo-")), "blog.mjs");
await build({ entryPoints: ["src/lib/blog.ts"], outfile: out, format: "esm", bundle: false });
const { extractAeoSchemaBlocks, stripAeoComments } = await import(pathToFileURL(out));

const pairFixture = `# ai agent for sales

Body paragraph one.

<!-- aeo:faq:start -->
## Frequently asked questions

### Q1?
A1.
<!-- aeo:faq:end -->

## Sources and methodology

1. Something legit.

## About the author

Gergely Orosz is the operator of ... Uber and Microsoft ... fabricated.

<!-- aeo:schema:faqpage -->
{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] }
<!-- /aeo:schema:faqpage -->

<!-- aeo:schema:article -->
{ "@type": "BlogPosting", "headline": "x", "author": { "@type": "Person", "name": "Gergely Orosz" } }
<!-- /aeo:schema:article -->

<!-- aeo:claim-audit -->
| claim | bucket | source |
|---|---|---|
| a claim | (c) | a source |
<!-- /aeo:claim-audit -->`;

const inlineFixture = `# legacy post

Text.

<!-- aeo:schema:article
{ "@type": "BlogPosting", "headline": "y", "author": { "name": "Someone Else" } }
-->`;

const noCloseFixture = `# no closing marker

Text stays.

<!-- aeo:claim-audit -->
| leaks | without | close |`;

let failed = 0;
const check = (name, cond) => { console.log((cond ? "PASS" : "FAIL") + "  " + name); if (!cond) failed++; };

const blocks = extractAeoSchemaBlocks(pairFixture);
check("pair: extracts 2 JSON-LD blocks", blocks.length === 2);
check("pair: author normalized to Gergely Racz", blocks.some(b => b.includes('"Gergely Racz"')) && !blocks.some(b => b.includes("Orosz")));

const stripped = stripAeoComments(pairFixture);
check("pair: no JSON in body", !stripped.includes('"@context"') && !stripped.includes('"@type"'));
check("pair: no claim-audit table in body", !stripped.includes("| claim |") && !stripped.includes("(c)"));
check("pair: no aeo comments left", !stripped.includes("aeo:"));
check("pair: FAQ content kept", stripped.includes("### Q1?") && stripped.includes("A1."));
check("pair: hallucinated author bio removed", !stripped.includes("Orosz") && !stripped.includes("Uber"));
check("pair: legit sections kept", stripped.includes("Sources and methodology") && stripped.includes("Body paragraph one."));

const inlineBlocks = extractAeoSchemaBlocks(inlineFixture);
check("inline: extracts 1 block", inlineBlocks.length === 1);
check("inline: author normalized", inlineBlocks[0].includes("Gergely Racz"));
check("inline: body clean", !stripAeoComments(inlineFixture).includes("BlogPosting"));

const noClose = stripAeoComments(noCloseFixture);
check("no-close: table dropped to EOF", !noClose.includes("leaks") && noClose.includes("Text stays."));

console.log(failed ? `\n${failed} FAILURES` : "\nALL PASS");
process.exit(failed ? 1 : 0);
