import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [page, registry, shell, stack, appBar, audit, source, styles] = await Promise.all([
  read("playground/src/components/scroll-area/ScrollAreaPage.tsx"),
  read("playground/src/app/component-registry.ts"),
  read("playground/src/shell/PlaygroundShell.tsx"),
  read("playground/src/components/stack/StackPage.tsx"),
  read("playground/src/components/app-bar/AppBarPage.tsx"),
  read("playground/docs/scroll-area-adoption-audit.md"),
  read("src/components/scroll-area/ScrollArea.tsx"),
  read("src/components/scroll-area/scroll-area.css"),
]);

assert.match(registry, /route:\s*"\/scroll-area"/);
assert.match(page, /data-component-page="scroll-area"/);
assert.equal([...page.matchAll(/<Scenario\b/g)].length, 9);
assert.match(source, /AtomScrollArea/);
assert.match(source, /scrollbarVisibility = "auto"/);
assert.match(styles, /data-scrollbar-visibility="interaction"/);
assert.match(styles, /:focus-within/);
assert.match(styles, /forced-colors:\s*active/);
assert.match(shell, /className="evidence-sidebar-scroll"/);
assert.match(shell, /className="scenario-nav-scroll"/);
assert.match(stack, /className="stack-constraint"[^>]*orientation="horizontal"/);
assert.match(appBar, /className="app-bar-position-stage"[^>]*scrollbarVisibility="interaction"/);
assert.match(audit, /Status: \*\*Implemented\*\*/);
assert.match(audit, /## Retained native overflow/);

console.log("Verified Scroll Area route, visibility, and intentional playground adoption.");
