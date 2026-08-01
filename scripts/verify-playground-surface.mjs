import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

async function collectTsx(directory) {
  const entries = await readdir(new URL(`../${directory}/`, import.meta.url), {
    withFileTypes: true,
  });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return collectTsx(path);
    return entry.name.endsWith(".tsx") ? [path] : [];
  }));
  return files.flat();
}

const [page, registry, output, outputCss, consumer, inventory, audit] =
  await Promise.all([
    read("playground/src/components/surface/SurfacePage.tsx"),
    read("playground/src/app/component-registry.ts"),
    read("playground/src/shared/RenderedOutput.tsx"),
    read("playground/src/shared/rendered-output.playground.css"),
    read("apps/consumer/src/App.tsx"),
    read("playground/docs/surface-ownership.md"),
    read("playground/docs/surface-adoption-audit.md"),
  ]);
const playgroundTsxPaths = await collectTsx("playground/src");
const playgroundTsx = await Promise.all(playgroundTsxPaths.map(async (path) => ({
  path,
  source: await read(path),
})));

assert.match(registry, /route:\s*"\/surface"/);
assert.match(page, /data-component-page="surface"/);
assert.equal(
  [...page.matchAll(/<Scenario\b/g)].length,
  9,
  "Surface playground must retain its nine adopted scenarios",
);
assert.match(output, /<Surface as="article" bordered/);
assert.match(output, /<Grid\.Root className="playground-output-evidence__layout">/);

const outerRule = outputCss.match(/\.playground-output-evidence\s*\{([^}]*)\}/)?.[1] ?? "";
assert.doesNotMatch(outerRule, /\b(?:background|border|box-shadow|padding)\s*:/);

assert.match(consumer, /from "@flowstack-ui\/brick\/surface"/);
assert.match(consumer, /<Surface[\s\S]*?level="subtle"/);
assert.match(inventory, /## Migrated owners/);
assert.match(inventory, /## Retained paint/);
assert.match(audit, /Status: \*\*Implemented\*\*/);
for (const { path, source } of playgroundTsx) {
  for (const match of source.matchAll(
    /<(?:div|article|section)\b[^>]*className="([^"]+)"/g,
  )) {
    const className = match[1];
    const genericOwner =
      /(?:^|\s)(?:forms-cell|[\w-]+-(?:overview|specimen-cell|appearance-panel|customization|stress-panel))(?:\s|$)/.test(
        className,
      );
    assert.equal(
      genericOwner,
      false,
      `${path} retains raw generic paint owner ${className}`,
    );
  }
  assert.doesNotMatch(
    source,
    /<div\b[^>]*data-brick-appearance/,
    `${path} retains a raw appearance surface`,
  );
  assert.doesNotMatch(
    source,
    /<Code>(?:light|dark)<\/Code>|<Badge\b[^>]*>(?:light|dark|Light|Dark|custom|customized|Customized)<\/Badge>/,
    `${path} bypasses the shared SpecimenLabel contract`,
  );
}
const evidenceSurface = await read("playground/src/shared/EvidenceSurface.tsx");
assert.match(evidenceSurface, /<Surface/);
assert.match(evidenceSurface, /data-playground-evidence=""/);
const app = await read("playground/src/app/PlaygroundApp.tsx");
assert.match(app, /styles\/surface-adoption\.css/);
for (const title of registry.matchAll(/title:\s*"([^"]+)"/g)) {
  assert.match(
    audit,
    new RegExp(`\\| ${title[1].replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")} \\|`),
    `Surface adoption audit omits ${title[1]}`,
  );
}

console.log(
  "Verified Surface route, shared paint ownership, Consumer adoption, route audit, and retained-paint inventory.",
);
