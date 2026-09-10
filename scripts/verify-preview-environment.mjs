import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import ts from "typescript";
const root = new URL("../", import.meta.url);
const read = path => readFile(new URL(path, root), "utf8");
assert.doesNotMatch(await read("playground/src/shared/Scenario.tsx"), /PreviewFrame|<iframe/, "App-bar settings must not replace inline examples with preview frames.");
assert.doesNotMatch(await read("playground/src/app/PlaygroundApp.tsx"), /PreviewContext\.Provider/, "Normal component routes must remain inline, including old isolated links.");
execFileSync(process.execPath, [new URL("build-preview-registry.mjs", import.meta.url).pathname, "--check"], { stdio: "inherit" });
const source = await read("playground/src/shell/PlaygroundSettingsPopover.tsx");
const ast = ts.createSourceFile("settings.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let content = 0;
function visit(node) {
  if (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === "Popover.Content") {
    content++;
    const parts = node.children.filter(ts.isJsxElement).map(child => child.openingElement.tagName.getText(ast));
    assert.deepEqual(parts, ["Popover.Header", "Popover.Body"], "Settings must retain padded Header and scrolling Body as direct Content regions.");
  }
  ts.forEachChild(node, visit);
}
visit(ast);
assert.equal(content, 1);
const css = await read("playground/theme-fixtures/preview-presets/presets.css");
const record = JSON.parse(await read("playground/theme-fixtures/preview-presets/presets.json"));
const contract = JSON.parse(await read("dist/theme-contract.json"));
assert.equal(createHash("sha256").update(css).digest("hex"), record.cssSha256);
assert.ok(Buffer.byteLength(css) <= 16000, "Factored preset CSS budget exceeded.");
assert.equal(record.artifacts.length, 9);
for (const artifact of record.artifacts) {
  assert.equal(artifact.report.valid, true);
  assert.deepEqual(artifact.report.warnings, []);
  assert.equal(artifact.manifest.brickContract.version, contract.contractVersion);
  assert.deepEqual(artifact.manifest.brickContract.package, contract.package);
  for (const pair of artifact.report.contrast.pairs) assert.ok(pair.valid && pair.ratio >= pair.minimumRatio);
}
assert.doesNotMatch(await read("playground/src/preview/preview-entry.tsx"), /styles\/shell\.css/);
console.log("Verified paired registry, Popover anatomy, preset contrast/digests and 16 KB CSS budget.");
