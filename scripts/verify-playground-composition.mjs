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
  "accordion", "alert-dialog", "app-bar", "aspect-ratio", "avatar", "badge", "bottom-navigation", "breadcrumb", "button", "card",
  "checkbox", "checkbox-group", "chip", "code", "code-block", "collapsible", "container",
  "context-menu", "data-grid", "dialog", "divider", "drawer", "dropdown-menu", "field", "fieldset", "form", "grid",
  "hover-card", "icon", "icon-button", "image", "input", "textarea", "link", "list", "multi-select",
  "menubar", "nav-list", "navigation-menu", "notification-badge", "popover", "progress", "progress-circle", "radio-group", "scroll-area", "select", "sidebar",
  "pagination", "skeleton", "stack", "surface", "switch", "table", "tabs", "text", "toast", "toggle", "toggle-group", "toolbar", "tooltip", "tree", "tree-grid",
  "visually-hidden",
];

const [registry, packageJson, tsxPaths] = await Promise.all([
  read("playground/src/app/component-registry.ts"),
  read("package.json"),
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

console.log("Verified complete Brick route coverage and no direct Atom imports.");
