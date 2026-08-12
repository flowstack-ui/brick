import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const fixture = new URL("playground/theme-fixtures/qualification/", root);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, fixture), "utf8"));

const [contract, source, manifest, report, tokens, css] = await Promise.all([
  readJson("../../../dist/theme-contract.json"),
  readJson("theme.source.json"),
  readJson("generated/theme.manifest.json"),
  readJson("generated/theme.report.json"),
  readJson("generated/theme.tokens.json"),
  readFile(new URL("generated/theme.css", fixture), "utf8"),
]);

assert.equal(source.metadata.id, "qualification");
assert.equal(manifest.theme.id, source.metadata.id);
assert.equal(report.themeId, source.metadata.id);
assert.equal(report.valid, true);
assert.deepEqual(report.warnings, []);
assert.equal(manifest.brickContract.schema, contract.$schema);
assert.equal(manifest.brickContract.version, contract.contractVersion);
assert.deepEqual(manifest.brickContract.package, contract.package);
assert.equal(manifest.activation.cssLayer, contract.css.themeLayer);
assert.equal(manifest.activation.themeAttribute, contract.css.themeAttribute);
assert.equal(manifest.activation.appearanceAttribute, contract.css.appearanceAttribute);

const required = contract.tokens.filter(({ classification }) => classification === "required");
assert.equal(report.counts.brickRequired, required.length * contract.css.appearanceValues.length);
assert.equal(report.counts.componentInputs, contract.componentThemeInputs.length);
for (const { name } of required) {
  assert.match(css, new RegExp(`${name.replaceAll("-", "\\-")}:`), `missing ${name}`);
}
for (const { name } of contract.componentThemeInputs) {
  assert.match(css, new RegExp(`${name.replaceAll("-", "\\-")}:`), `missing ${name}`);
}

assert.match(css, /@layer flowstack\.theme/);
assert.match(css, /\[data-flowstack-theme="qualification"\]/);
assert.match(css, /color-scheme: light dark/);
assert.match(css, /color-scheme: light/);
assert.match(css, /color-scheme: dark/);
assert.equal(tokens.$extensions["flowstack.theme"].brickVersion, contract.package.version);
assert.equal(tokens.$extensions["flowstack.theme"].id, source.metadata.id);
assert.ok(tokens.roles.promotion, "project roles must remain available outside Brick roles");

console.log(`Verified compiled Theme qualification fixture against ${contract.package.name} ${contract.package.version}.`);
