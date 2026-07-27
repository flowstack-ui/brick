import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

async function collect(directory, extension) {
  const entries = await readdir(new URL(`../${directory}/`, import.meta.url), {
    withFileTypes: true,
  });
  return (await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return collect(path, extension);
    return entry.name.endsWith(extension) ? [path] : [];
  }))).flat();
}

const expectedRouteIds = [
  "alert-dialog", "app-bar", "avatar", "badge", "breadcrumb", "button", "card",
  "checkbox", "checkbox-group", "code", "code-block", "container",
  "dialog", "divider", "drawer", "field", "fieldset", "form", "grid",
  "hover-card", "icon", "icon-button", "image", "input", "textarea", "link", "list", "multi-select",
  "nav-list", "notification-badge", "popover", "radio-group", "scroll-area", "select", "sidebar",
  "skeleton", "stack", "surface", "switch", "tabs", "text", "toggle", "toggle-group", "tooltip",
];

const [registry, packageJson, audit, tsxPaths] = await Promise.all([
  read("playground/src/app/component-registry.ts"),
  read("package.json"),
  read("../docs/audits/playground-brick-adoption-2026-07-26.md"),
  collect("playground/src", ".tsx"),
]);

const registeredIds = [...registry.matchAll(/\bid:\s*"([^"]+)"/g)]
  .map((match) => match[1])
  .sort();
assert.deepEqual(registeredIds, [...expectedRouteIds].sort());

const packageData = JSON.parse(packageJson);
const publicComponentIds = Object.keys(packageData.exports)
  .filter((entry) => entry !== "." && !entry.endsWith(".css"))
  .map((entry) => entry.slice(2))
  .sort();
assert.deepEqual(
  publicComponentIds,
  expectedRouteIds.filter((id) => id !== "notification-badge").sort(),
  "Every component entrypoint must own a playground route; Notification Badge is Badge anatomy.",
);

const directAtomImports = [];
for (const path of tsxPaths) {
  const source = await read(path);
  if (/from\s+["']@flowstack-ui\/atom(?:\/|["'])/.test(source)) {
    directAtomImports.push(path);
  }
}
assert.deepEqual(directAtomImports, [], "The Brick playground must not import Atom directly.");

for (const heading of [
  "Route and component completeness",
  "Intentional native runtime hosts",
  "Rejected playground-only components",
  "Future Brick candidates",
  "Conclusion",
]) {
  assert.match(audit, new RegExp(`## ${heading}`));
}

console.log("Verified complete Brick route coverage, no direct Atom imports, and the final playground adoption audit.");
