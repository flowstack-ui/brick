import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const packageRoot = resolve(import.meta.dirname, "..");
const componentRoot = resolve(packageRoot, "src/components");
const tokenSource = JSON.parse(
  await readFile(resolve(packageRoot, "src/styles/tokens.tokens.json"), "utf8"),
);

const recipes = [
  "display",
  "title-lg",
  "title-md",
  "title-sm",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "code-inline",
  "code-block-sm",
  "code-block-md",
  "label-md",
  "label-strong",
  "supporting-sm",
  "validation-sm",
  "overlay-title",
  "compact-title",
  "compact-title-lg",
  "surface-title-sm",
  "surface-title-md",
  "surface-title-lg",
  "field-value-md",
  "field-value-lg",
  "control-xs",
  "control-sm",
  "control-md",
  "control-lg",
  "control-xl",
];
const fields = [
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
];

const failures = [];
for (const appearance of ["light", "dark"]) {
  const typography = tokenSource.semantic?.[appearance]?.typography;
  for (const recipe of recipes) {
    for (const field of fields) {
      if (!typography?.[recipe]?.[field]?.$value) {
        failures.push(`semantic.${appearance}.typography.${recipe}.${field} is missing`);
      }
    }
  }
}

const allowedGeometryDeclarations = new Map([
  ["_action-menu/action-menu.css", [
    "font-size: var(--brick-action-menu-font-size);",
    "line-height: var(--brick-action-menu-line-height);",
  ]],
  ["avatar/avatar.css", [
    "--brick-avatar-fallback-font-size: 0.875rem;",
    "--brick-avatar-fallback-font-size: 0.625rem;",
    "--brick-avatar-fallback-font-size: 0.75rem;",
    "--brick-avatar-fallback-font-size: 1rem;",
    "--brick-avatar-fallback-font-size: 1.25rem;",
    "font-family: var(--brick-font-family-body);",
    "font-weight: var(--brick-font-weight-semibold);",
    "line-height: 1;",
  ]],
  ["badge/badge.css", [
    "font-family: var(--brick-font-family-body);",
    "font-size: 0.6875rem;",
    "font-weight: var(--brick-font-weight-semibold);",
    "line-height: 1;",
  ]],
  ["field/field.css", ["font-weight: var(--brick-font-weight-regular);"]],
  ["fieldset/fieldset.css", ["font-weight: var(--brick-font-weight-regular);"]],
  ["icon-button/icon-button.css", ["line-height: 1;"]],
  ["input/input.css", ["line-height: 1;"]],
  ["link/link.css", [
    "--brick-link-font-family: inherit;",
    "--brick-link-font-size: inherit;",
    "--brick-link-font-weight: inherit;",
    "--brick-link-line-height: inherit;",
    "--brick-link-letter-spacing: inherit;",
    "--brick-link-font-weight: var(--brick-font-weight-medium);",
  ]],
  ["text/text.css", [
    "--brick-text-font-weight: inherit;",
    "--brick-text-font-weight: var(--brick-font-weight-regular);",
    "--brick-text-font-weight: var(--brick-font-weight-medium);",
    "--brick-text-font-weight: var(--brick-font-weight-semibold);",
  ]],
  ["code-block/code-block.css", ["letter-spacing: inherit;"]],
]);

const componentDirectories = await readdir(componentRoot, { withFileTypes: true });
for (const directory of componentDirectories) {
  if (!directory.isDirectory()) continue;
  const directoryPath = resolve(componentRoot, directory.name);
  for (const entry of await readdir(directoryPath, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".css")) continue;
    const relative = `${directory.name}/${entry.name}`;
    const source = await readFile(resolve(directoryPath, entry.name), "utf8");
    const allowed = new Set(allowedGeometryDeclarations.get(relative) ?? []);
    for (const [index, line] of source.split("\n").entries()) {
      const declaration = line.trim();
      if (!/(?:font-family|font-size|font-weight|line-height|letter-spacing)\s*:/.test(declaration)) {
        continue;
      }
      if (
        declaration.includes("var(--brick-typography-") ||
        declaration.includes("var(--brick-text-") ||
        declaration.includes("var(--brick-field-") ||
        declaration.includes("var(--brick-fieldset-") ||
        declaration.includes("var(--brick-button-") ||
        declaration.includes("var(--brick-input-") ||
        declaration.includes("var(--brick-textarea-") ||
        declaration.includes("var(--brick-select-") ||
        declaration.includes("var(--brick-multi-select-") ||
        declaration.includes("var(--brick-link-") ||
        declaration.includes("var(--brick-breadcrumb-") ||
        declaration.includes("var(--brick-bottom-navigation-") ||
        declaration.includes("var(--brick-collapsible-") ||
        declaration.includes("var(--brick-accordion-") ||
        declaration.includes("var(--brick-tabs-") ||
        declaration.includes("var(--brick-code-") ||
        declaration.includes("var(--brick-badge-") ||
        declaration.includes("var(--brick-avatar-") ||
        declaration.includes("var(--brick-nav-list-") ||
        declaration.includes("var(--brick-list-") ||
        declaration.includes("var(--brick-card-title-size)") ||
        allowed.has(declaration)
      ) {
        continue;
      }
      failures.push(`${relative}:${index + 1} bypasses semantic typography: ${declaration}`);
    }
  }
}

if (failures.length) {
  console.error(`Typography verification failed:\n\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${recipes.length} semantic typography recipes and component CSS drift boundaries.`);
}
