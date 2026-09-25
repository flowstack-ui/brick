import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { semanticTypographyAlias, typographyDeclarations } from "./typography-declarations.mjs";

const packageRoot = resolve(import.meta.dirname, "..");
const componentRoot = resolve(packageRoot, "src/components");
const tokenSource = JSON.parse(
  await readFile(resolve(packageRoot, "src/styles/tokens.tokens.json"), "utf8"),
);

const recipes = [
  "menu-sm",
  "menu-md",
  "menu-lg",
  "prose-body",
  "prose-h1",
  "prose-h2",
  "prose-h3",
  "prose-h4",
  "prose-h5",
  "prose-h6",
  "prose-caption",
  "display",
  "display-sm",
  "display-md",
  "display-lg",
  "display-xl",
  "title-xl",
  "title-lg",
  "title-md",
  "title-sm",
  "title-2xs",
  "title-xs",
  "body-xl",
  "body-lg",
  "body-md",
  "body-sm",
  "caption",
  "eyebrow",
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
        failures.push(
          `semantic.${appearance}.typography.${recipe}.${field} is missing`,
        );
      }
    }
  }
}

const allowedGeometryDeclarations = new Map([
  // ItemLabel inherits the size-selected selection recipe from its owning row.
  ["checkbox-group/checkbox-group.css", ["font-size: inherit;"]],
  // Card label/input anatomy inherits its public font context; size aliases
  // resolve to body-sm/body-md recipes, including responsive overrides.
  ["checkbox-card/checkbox-card.css", ["font-family: inherit;"]],
  ["radio-card/radio-card.css", ["font-family: inherit;"]],
  // Data List's private aliases and public weight hook resolve to semantic
  // compact text recipes; responsive rules select those same recipe tokens.
  ["data-list/data-list.css", [
    "font-weight: var(--brick-data-list-label-weight, var(--_dl-label-weight));",
  ]],
  // Links and menu triggers inherit the trail's compact navigation recipe.
  ["breadcrumb/breadcrumb.css", ["letter-spacing: inherit;"]],
  // Progress uses semantic caption/body metrics with medium-weight status text.
  ["progress/progress.css", ["font-weight: var(--brick-font-weight-medium);"]],
  // Ring value size resolves only to the size-selected caption/body recipes.
  ["progress-circle/progress-circle.css", ["font-size: var(--brick-progress-circle-value-size);", "font-weight: var(--brick-font-weight-medium);"]],
  // Explicit List size=inherit follows the surrounding typography owner.
  ["list/list.css", ["letter-spacing: inherit;"]],
  // A stretched title link inherits its semantic Heading recipe; it does not
  // select a competing body weight merely because Link's variant is plain.
  ["link-box/link-box.css", ["--brick-link-font-weight: inherit;"]],
  // Compact regions inherit the complete size-selected semantic recipe.
  ["toggle-tip/toggle-tip.css", ["line-height: inherit;", "letter-spacing: inherit;", "font-weight: var(--brick-font-weight-semibold);"]],
  // TOC instance aliases resolve to complete size-selected semantic body recipes.
  ["table-of-contents/table-of-contents.css", [
    "font-family: var(--brick-table-of-contents-font-family);",
    "font-size: var(--brick-table-of-contents-font-size);",
    "font-weight: var(--brick-table-of-contents-font-weight);",
    "line-height: var(--brick-table-of-contents-line-height);",
    "letter-spacing: var(--brick-table-of-contents-letter-spacing);",
    "letter-spacing: inherit;",
  ]],
  // Editable shares Text's recipes; explicit inherit and paired editor parts
  // inherit that same context instead of maintaining a second typography scale.
  ["editable/editable.css", ["font-family: inherit;", "font-size: inherit;", "font-weight: inherit;", "line-height: inherit;", "letter-spacing: inherit;"]],
  // RowHeader is a semantic table header, not a visual column heading. Preserve
  // the owning body row's typography instead of the browser's bold th default.
  ["data-grid/data-grid.css", ["font-weight: inherit;"]],
  // Segments share the control's size-selected field-value leading.
  ["date-input/date-input.css", ["line-height: inherit;"]],
  // Alert retains semantic body fonts with compact 12/16 and 14/20 leading.
  // These owner-specific ratios do not alter global body text. The indicator em
  // represents artwork geometry rather than a second authored text recipe.
  ["alert/alert.css", ["font-size: var(--brick-alert-font-size);", "line-height: var(--brick-alert-line-height);", "--brick-alert-line-height: calc(20 / 14);", "--brick-alert-line-height: calc(16 / 12);", "font-size: var(--brick-alert-indicator-size);"]],
  // EmptyState's inherited icon em is fixed glyph geometry, not authored text.
  ["empty-state/empty-state.css", ["font-size: var(--brick-empty-state-indicator-size);"]],
  // Steps' instance hooks resolve to size-selected semantic recipes.
  ["steps/steps.css", [
    "font-family: var(--brick-steps-font-family);",
    "font-size: var(--brick-steps-font-size);",
    "font-weight: var(--brick-steps-font-weight);",
    "line-height: var(--brick-steps-line-height);",
    "letter-spacing: var(--brick-steps-letter-spacing);",
  ]],
  [
    "_action-menu/action-menu.css",
    [
      // Shortcut text inherits the menu family's font rather than the kbd font.
      "font-family: inherit;",
      "font-size: var(--brick-action-menu-font-size);",
      "line-height: var(--brick-action-menu-line-height);",
    ],
  ],
  [
    "avatar/avatar.css",
    [
      "--brick-avatar-fallback-font-size: 0.875rem;",
      "--brick-avatar-fallback-font-size: 0.625rem;",
      "--brick-avatar-fallback-font-size: 0.75rem;",
      "--brick-avatar-fallback-font-size: 1rem;",
      // Adopted compact xl frame (48px) uses 18px initials, not body copy.
      "--brick-avatar-fallback-font-size: 1.125rem;",
      "--brick-avatar-fallback-font-size: 1.25rem;",
      "--brick-avatar-fallback-font-size: 1.5rem;",
      "--brick-avatar-fallback-font-size: 1.75rem;",
      "--brick-avatar-fallback-font-size: 2rem;",
      "--brick-avatar-fallback-font-size: 2.25rem;",
      "font-family: var(--brick-font-family-body);",
      "font-weight: var(--brick-font-weight-semibold);",
      "font-weight: var(--brick-font-weight-medium);",
      "line-height: 1;",
    ],
  ],
  [
    "badge/badge.css",
    [
      "--brick-badge-font-size: var(--brick-font-size-2xs);",
      "font-family: var(--brick-font-family-body);",
      // Compact count geometry has a qualified 10–14px scale, not body text.
      "--brick-notification-badge-font-size: var(--brick-notification-badge-recipe-font);",
      "font-size: var(--brick-notification-badge-font-size);",
      "font-weight: var(--brick-font-weight-semibold);",
      "line-height: 1;",
    ],
  ],
  // Mark text changes weight only; size and line-height must inherit its sentence.
  ["mark/mark.css", ["font-weight: var(--brick-font-weight-medium);"]],
  // Highlight text inherits size/line-height and changes weight only, like Mark.
  ["highlight/highlight.css", ["font-weight: var(--brick-font-weight-medium);"]],
  ["field/field.css", ["font-weight: var(--brick-font-weight-regular);"]],
  ["fieldset/fieldset.css", ["font-weight: var(--brick-font-weight-regular);"]],
  ["icon-button/icon-button.css", ["line-height: 1;"]],
  // Decorative artwork slots use geometric em sizes and a centered line box.
  // These exceptions do not apply to each control's labels or value text.
  ["password-toggle-field/password-toggle-field.css", ["line-height: 1;"]],
  ["radiomark/radiomark.css", ["font-size: calc(var(--brick-radiomark-size) * 0.6);", "line-height: 1;"]],
  ["rating/rating.css", ["font-size: var(--brick-rating-item-size, var(--brick-rating-recipe-size));", "line-height: 1;"]],
  ["switch/switch.css", ["font-size: calc(var(--brick-switch-track-block-size) * 0.55);", "font-size: calc(var(--brick-switch-thumb-size) * 0.55);", "line-height: 1;"]],
  // Timeline's decorative 16/20/24/32px circles retain 10/12/12/14px numerals.
  ["timeline/timeline.css", ["font-size: var(--_brick-timeline-marker-text);"]],
  ["input/input.css", ["line-height: 1;"]],
  [
    "link/link.css",
    [
      "--brick-link-font-family: inherit;",
      "--brick-link-font-size: inherit;",
      "--brick-link-font-weight: inherit;",
      "--brick-link-line-height: inherit;",
      "--brick-link-letter-spacing: inherit;",
      "--brick-link-font-weight: var(--brick-font-weight-medium);",
    ],
  ],
  [
    "text/text.css",
    [
      "--brick-text-font-weight: inherit;",
      "--brick-text-font-weight: var(--brick-font-weight-thin);",
      "--brick-text-font-weight: var(--brick-font-weight-extralight);",
      "--brick-text-font-weight: var(--brick-font-weight-light);",
      "--brick-text-font-weight: var(--brick-font-weight-bold);",
      "--brick-text-font-weight: var(--brick-font-weight-extrabold);",
      "--brick-text-font-weight: var(--brick-font-weight-black);",
      "--brick-text-font-weight: var(--brick-font-weight-regular);",
      "--brick-text-font-weight: var(--brick-font-weight-medium);",
      "--brick-text-font-weight: var(--brick-font-weight-semibold);",
    ],
  ],
  // Blockquote Content inherits its quotation context; explicit Paragraph
  // children own authored typography rather than a second hardcoded scale.
  ["blockquote/blockquote.css", ["font-family: inherit;", "font-size: inherit;", "font-weight: inherit;", "line-height: inherit;", "letter-spacing: inherit;", "--brick-blockquote-content-font-family: inherit;", "--brick-blockquote-content-font-size: inherit;", "--brick-blockquote-content-font-weight: inherit;", "--brick-blockquote-content-line-height: inherit;", "--brick-blockquote-content-letter-spacing: inherit;"]],
  // Token/line spans inherit the complete pre recipe rather than the body-font
  // foundation applied to every brick-* class. Shiki only adds token emphasis.
  ["code-block/code-block.css", ["font-family: inherit;", "font-size: inherit;", "line-height: inherit;", "letter-spacing: inherit;"]],
  [
    "color-picker/color-picker.css",
    [
      "font-size: var(--brick-color-picker-control-font-size);",
      "line-height: var(--brick-color-picker-control-line-height);",
    ],
  ],
]);

const componentDirectories = await readdir(componentRoot, {
  withFileTypes: true,
});
for (const directory of componentDirectories) {
  if (!directory.isDirectory()) continue;
  const directoryPath = resolve(componentRoot, directory.name);
  for (const entry of await readdir(directoryPath, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".css")) continue;
    const relative = `${directory.name}/${entry.name}`;
    const source = await readFile(resolve(directoryPath, entry.name), "utf8");
    const allowed = new Set(allowedGeometryDeclarations.get(relative) ?? []);
    const declarations = typographyDeclarations(source);
    for (const match of declarations) {
      const declaration = `${match.groups.property}: ${match.groups.value
        .trim()
        .replace(/\s+/gu, " ")
        .replace(/var\(\s+/gu, "var(")
        .replace(/\s+\)/gu, ")")};`;
      if (
        declaration.includes("var(--brick-typography-") ||
        declaration.includes("var(--brick-text-") ||
        declaration.includes("var(--brick-field-") ||
        declaration.includes("var(--brick-fieldset-") ||
        declaration.includes("var(--brick-button-") ||
        declaration.includes("var(--brick-control-size-") ||
        declaration.includes("var(--brick-input-") ||
        declaration.includes("var(--brick-password-") ||
        declaration.includes("var(--brick-number-input-") ||
        declaration.includes("var(--brick-combobox-") ||
        declaration.includes("var(--brick-textarea-") ||
        declaration.includes("var(--brick-select-") ||
        declaration.includes("var(--brick-multi-select-") ||
        declaration.includes("var(--brick-link-") ||
        declaration.includes("var(--brick-breadcrumb-") ||
        declaration.includes("var(--brick-pagination-") ||
        declaration.includes("var(--brick-bottom-navigation-") ||
        declaration.includes("var(--brick-collapsible-") ||
        declaration.includes("var(--brick-accordion-") ||
        declaration.includes("var(--brick-tabs-") ||
        declaration.includes("var(--brick-segment-group-") ||
        declaration.includes("var(--brick-code-") ||
        declaration.includes("var(--brick-kbd-") ||
        declaration.includes("var(--brick-blockquote-") ||
        declaration.includes("var(--brick-prose-") ||
        declaration.includes("var(--_brick-prose-") ||
        declaration.includes("var(--brick-badge-") ||
        declaration.includes("var(--brick-chip-") ||
        // Chip's independent responsive density aliases resolve to semantic control typography.
        (relative === "chip/chip.css" && /^--brick-chip-font-size: var\(--_brick-chip-[ck]-font\);$/.test(declaration)) ||
        declaration.includes("var(--brick-avatar-") ||
        declaration.includes("var(--brick-nav-list-") ||
        declaration.includes("var(--brick-list-") ||
        declaration.includes("var(--brick-card-title-size)") ||
        allowed.has(declaration) ||
        semanticTypographyAlias(match.groups.value, source)
      ) {
        continue;
      }
      const propertyOffset = match.index + match[0].indexOf(match.groups.property);
      const line = source.slice(0, propertyOffset).split("\n").length;
      failures.push(
        `${relative}:${line} bypasses semantic typography: ${declaration}`,
      );
    }
  }
}

if (failures.length) {
  console.error(
    `Typography verification failed:\n\n${failures.map((failure) => `- ${failure}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `Verified ${recipes.length} semantic typography recipes and component CSS drift boundaries.`,
  );
}
