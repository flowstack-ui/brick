import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

async function collectTsx(directory) {
  const entries = await readdir(new URL(`../${directory}/`, import.meta.url), { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return collectTsx(path);
    return entry.name.endsWith(".tsx") ? [path] : [];
  }))).flat();
}

const [page, registry, consumer, card, surface, audit] = await Promise.all([
  read("playground/src/components/list/ListPage.tsx"),
  read("playground/src/app/component-registry.ts"),
  read("apps/consumer/src/App.tsx"),
  read("playground/src/components/card/CardPage.tsx"),
  read("playground/src/components/surface/SurfacePage.tsx"),
  read("playground/docs/list-adoption-audit.md"),
]);

assert.match(registry, /route:\s*"\/list"/);
assert.match(page, /data-component-page="list"/);
assert.equal([...page.matchAll(/<Scenario\b/g)].length, 9);
assert.match(consumer, /from "@flowstack-ui\/brick\/list"/);
assert.match(consumer, /<List\.Root marker="none">/);
assert.match(card, /<List\.Item asChild>\{card\}<\/List\.Item>/);
assert.match(surface, /<List\.Item asChild>/);
assert.match(audit, /Status: \*\*Implemented\*\*/);

const tsxPaths = [...await collectTsx("playground/src"), ...await collectTsx("apps/consumer/src")];
const retained = [];
for (const path of tsxPaths) {
  const source = await read(path);
  if (/<(?:ul|ol|li)\b/.test(source)) retained.push(path);
}
for (const path of retained) {
  assert.match(audit, new RegExp(path.includes("stack/") ? "Stack semantic-host evidence" : path.includes("list/") ? "List rendered-output/composition evidence" : path.includes("ComponentNavigation") ? "scenario anchor navigation" : "Nav List and Sidebar navigation"), `Unclassified raw list host in ${path}`);
}

console.log("Verified List route, Consumer adoption, composed host evidence, and raw-list inventory.");
