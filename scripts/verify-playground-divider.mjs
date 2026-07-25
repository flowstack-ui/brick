import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [page, registry, audit, consumer, source, styles] = await Promise.all([
  read("playground/src/components/divider/DividerPage.tsx"),
  read("playground/src/app/component-registry.ts"),
  read("playground/docs/divider-adoption-audit.md"),
  read("apps/consumer/src/App.tsx"),
  read("src/components/divider/Divider.tsx"),
  read("src/components/divider/divider.css"),
]);

assert.match(registry, /route:\s*"\/divider"/);
assert.match(page, /data-component-page="divider"/);
assert.equal([...page.matchAll(/<Scenario\b/g)].length, 9);
assert.match(page, /<Divider/);
assert.match(source, /AtomDivider\.Root/);
assert.match(source, /data-orientation/);
assert.match(styles, /forced-colors:\s*active/);
assert.match(styles, /CanvasText/);
assert.match(consumer, /from "@flowstack-ui\/brick\/divider"/);
assert.match(consumer, /<Divider decorative=\{false\}/);
assert.match(audit, /Status: \*\*Implemented\*\*/);
assert.match(audit, /## Migrated owners/);
assert.match(audit, /## Retained borders/);

console.log("Verified Divider route, Atom ownership, Consumer proof, and retained-border audit.");
