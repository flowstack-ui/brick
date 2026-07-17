import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { resolve } from "node:path";
import browserslistModule from "browserslist";
import { browserslistToTargets, bundleAsync } from "lightningcss";

const input = resolve("test/fixtures/css/compiler-contract.css");
const outputRoot = resolve(".brick-cache/prototype");
await mkdir(outputRoot, { recursive: true });
const browserslist = typeof browserslistModule === "function"
  ? browserslistModule
  : browserslistModule.default;
const targets = browserslistToTargets(browserslist());

const readable = await bundleAsync({ filename: input, minify: false, targets });
const production = await bundleAsync({ filename: input, minify: true, targets });
const readableCss = readable.code.toString();
const productionCss = production.code.toString();

for (const marker of ["@layer", "@container", "@keyframes", "prefers-reduced-motion", "forced-colors"]) {
  assert.match(readableCss, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
assert.doesNotMatch(productionCss, /@import|@tailwind|@source|@theme/);
assert.ok(productionCss.length < readableCss.length, "production CSS should be minified");

await writeFile(resolve(outputRoot, "readable.css"), readableCss);
await writeFile(resolve(outputRoot, "production.css"), productionCss);

console.log(
  JSON.stringify(
    {
      brotli: brotliCompressSync(production.code).byteLength,
      gzip: gzipSync(production.code).byteLength,
      minified: production.code.byteLength,
      readable: readable.code.byteLength,
      targets: Object.keys(targets).length,
    },
    null,
    2,
  ),
);
