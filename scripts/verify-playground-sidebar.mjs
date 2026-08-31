import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [page, registry, shell, css, audit, source] = await Promise.all([
  read("playground/src/components/sidebar/SidebarPage.tsx"),
  read("playground/src/app/component-registry.ts"),
  read("playground/src/shell/PlaygroundShell.tsx"),
  read("playground/src/styles/shell.css"),
  read("playground/docs/sidebar-adoption-audit.md"),
  read("src/components/sidebar/Sidebar.tsx"),
]);
assert.match(registry, /route:\s*"\/sidebar"/);
assert.match(page, /data-component-page="sidebar"/);
assert.equal([...page.matchAll(/<Scenario\b/g)].length, 9);
assert.match(source, /AtomSidebar/);
assert.match(
  shell,
  /<Sidebar\.Root className="evidence-layout" position="sticky">/,
);
assert.match(shell, /<Sidebar\.Panel/);
assert.doesNotMatch(shell, /<Sidebar\.Panel asChild>/);
assert.match(shell, /<Sidebar\.Main asChild>/);
assert.match(shell, /<ScrollArea\.Viewport focusable>/);
assert.match(shell, /<Drawer\.Root/);
assert.doesNotMatch(shell, /<aside className="evidence-sidebar"/);
assert.doesNotMatch(css, /grid-template-columns:\s*17rem/);
assert.match(audit, /Status: \*\*Implemented\*\*/);
console.log(
  "Verified Sidebar route, desktop shell adoption, and application-owned mobile Drawer policy.",
);
