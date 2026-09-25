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
  "checkbox-card", "input-addon",
  "toggle-tip",
  "float",
  "table-of-contents",
  "qr-code", "tags-input", "editable", "native-select",
  "stat", "timeline", "marquee",
  "alert", "empty-state", "spinner",
  "action-bar", "floating-panel", "overlay-manager",
  "calendar", "date-input", "date-picker", "close-button", "download-trigger", "splitter", "steps",
  "accordion", "alert-dialog", "app-bar", "appearance", "aspect-ratio", "avatar", "avatar-group", "badge", "blockquote", "bottom-navigation", "breadcrumb", "button", "card", "carousel",
  "center", "checkbox", "checkbox-group", "checkmark", "chip", "code", "code-block", "collapsible", "combobox", "container",
  "context-menu", "data-grid", "data-list", "dialog", "divider", "drawer", "dropdown-menu", "em", "feed", "field", "fieldset", "form", "grid", "group",
  "hide", "highlight", "hover-card", "icon", "icon-button", "image", "input", "kbd", "textarea", "link", "link-box", "list", "multi-select", "bleed", "prose",
  "file-upload", "for", "format-byte", "format-number", "locale-provider", "menubar", "nav-list", "navigation-menu", "notification-badge", "number-input", "pin-input", "popover", "progress", "progress-circle", "radio-group", "radio-card", "radiomark", "rating", "scroll-area", "select", "sidebar", "slider",
  "mark", "pagination", "password-toggle-field", "reorderable-list", "segment-group", "show", "skeleton", "skip-link", "stack", "status", "color-swatch", "color-picker", "section", "frame", "surface", "swipeable-item", "switch", "table", "tabs", "text", "toast", "toggle", "toggle-group", "toolbar", "tooltip", "tree", "tree-grid",
  "visually-hidden", "z-stack",
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
  .filter((entry) => (
    entry !== "."
    && entry !== "./theme-contract.json"
    && entry !== "./date-value"
    && entry !== "./radius"
    // Non-visual utilities are qualified in record compositions and Atom's workbench.
    && entry !== "./selection"
    && entry !== "./action-delegate"
    && !entry.endsWith(".css")
    && !entry.startsWith("./agents/")
  ))
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
    // The isolated document host bridges native dir to headless keyboard context.
    // This is not permission for visual examples or shell UI to bypass Brick.
    if (path === "playground/src/preview/ExampleEnvironment.tsx") {
      const imports = [...source.matchAll(/import\s+([^;]+?)\s+from\s+["'](@flowstack-ui\/atom[^"']*)["']/g)];
      assert.equal(imports.length, 1);
      assert.equal(imports[0][1].trim(), "{ DirectionProvider }");
      assert.equal(imports[0][2], "@flowstack-ui/atom/direction");
      continue;
    }
    directAtomImports.push(path);
  }
}
assert.deepEqual(directAtomImports, [], "The Brick playground must not import Atom directly.");

console.log("Verified Brick route coverage and restricted headless document-direction bridge.");
