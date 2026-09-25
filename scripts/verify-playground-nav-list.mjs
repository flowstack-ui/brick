import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [page, registry, navigation, audit, source, styles] = await Promise.all([
  read("playground/src/components/nav-list/NavListPage.tsx"),
  read("playground/src/app/component-registry.ts"),
  read("playground/src/shell/ComponentNavigation.tsx"),
  read("playground/docs/nav-list-adoption-audit.md"),
  read("src/components/nav-list/NavList.tsx"),
  read("src/components/nav-list/nav-list.css"),
]);

assert.match(registry, /route:\s*"\/nav-list"/);
assert.match(page, /data-component-page="nav-list"/);
const evidence = await read("playground/src/components/nav-list/NavListEvidence.tsx");
assert.equal([...evidence.matchAll(/<Scenario\b/g)].length, 9);
assert.match(page, /OwnerDocumentation/);
assert.match(page, /NavListEvidence/);
assert.match(source, /AtomNavList/);
assert.match(styles, /forced-colors:\s*active/);
assert.match(navigation, /<NavList\.Root/);
assert.match(navigation, /<NavList\.SectionLabel/);
assert.match(navigation, /active=\{currentRoute === entry\.route\}/);
assert.doesNotMatch(navigation, /<Link\b|<VStack\b|<ul\b|<li\b/);
assert.match(audit, /Status: \*\*Implemented\*\*/);

console.log("Verified Nav List route, shell adoption, and application-owned routing policy.");
