import assert from "node:assert/strict";
import test from "node:test";
import { cssSourceClosure } from "../../scripts/css-source-closure.mjs";
import { inspectThemeSources } from "../../scripts/theme-contract.mjs";

test("AlertDialog modular styling owns the shared Dialog recipe", async () => {
  const inspection = await inspectThemeSources(new URL("../../", import.meta.url).pathname);
  const owners = cssSourceClosure(inspection.cssSources, "src/components/alert-dialog/alert-dialog.css");
  assert.ok(owners.has("src/components/dialog/dialog.css"));
  const alert = inspection.cssSources.get("src/components/alert-dialog/alert-dialog.css");
  assert.equal(/font-size:|padding:|box-shadow:/.test(alert), false, "AlertDialog must not duplicate shared geometry");
});

test("local CSS closure follows transitive imports but not unrelated or commented sources", () => {
  const sources = new Map([
    ["src/icon/icon.css", '@import "../button/button.css"; /* @import "../missing.css"; */'],
    ["src/button/button.css", '@import url("./paint.css");'],
    ["src/button/paint.css", '@import "./button.css";'],
    ["src/unrelated.css", ""],
  ]);
  assert.deepEqual([...cssSourceClosure(sources, "src/icon/icon.css")], [
    "src/icon/icon.css", "src/button/button.css", "src/button/paint.css",
  ]);
  assert.throws(() => cssSourceClosure(sources, "missing.css"), /Missing local CSS/);
  sources.set("src/button/paint.css", '@import "./missing.css";');
  assert.throws(() => cssSourceClosure(sources, "src/icon/icon.css"), /Missing local CSS/);
});

test("IconButton extension tokens retain actual shared Button fallback ownership", async () => {
  const inspection = await inspectThemeSources(new URL("../../", import.meta.url).pathname);
  const owners = cssSourceClosure(inspection.cssSources, "src/components/icon-button/icon-button.css");
  assert.ok(owners.has("src/components/button/button.css"));
  assert.ok(owners.has("src/components/button/button-additions.css"));
  assert.ok(inspection.references.some(({name, path, hasFallback}) =>
    name === "--brick-icon-button-background" && owners.has(path) && hasFallback));
  assert.equal(inspection.references.some(({name, path, hasFallback}) =>
    name === "--brick-icon-button-missing" && owners.has(path) && hasFallback), false);
});

test("constrained surface inputs include multiline fallbacks in shared CSS", async () => {
  const inspection = await inspectThemeSources(new URL("../../", import.meta.url).pathname);
  const owners = cssSourceClosure(inspection.cssSources, "src/components/app-bar/app-bar.css");
  const reference = inspection.references.find(({name, path, hasFallback}) =>
    name === "--brick-app-bar-translucent-blur" && owners.has(path) && hasFallback);
  assert.ok(reference, "Whitespace inside var() must not hide an owned fallback");
  assert.ok(owners.has("src/components/_surface-effects/surface-effects.css"));
});
