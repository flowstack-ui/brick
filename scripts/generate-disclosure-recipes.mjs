// Closed, static responsive recipes. No browser or runtime style generation.
import { readFile, writeFile } from "node:fs/promises";
const check = process.argv.includes("--check");
const marker = "/* Generated disclosure recipes */";
const breakpoints = [
  ["", null],
  ["-sm", 30],
  ["-md", 48],
  ["-lg", 64],
  ["-xl", 80],
];
for (const owner of ["accordion", "collapsible"]) {
  const path = new URL(
    `../src/components/${owner}/${owner}.css`,
    import.meta.url,
  );
  const original = await readFile(path, "utf8");
  const base = original.split(marker)[0].trimEnd();
  let css = `${base}\n\n${marker}\n@layer brick.components {\n`;
  const variants =
    owner === "accordion"
      ? ["plain", "ghost", "soft", "outline", "subtle", "enclosed"]
      : ["plain", "soft", "outline"];
  for (const [suffix, width] of breakpoints) {
    if (width) css += `@media (min-width: ${width}rem) {\n`;
    for (const [size, height, padding, indicator, type] of [
      ["sm", 2.25, 3, 1, "sm"],
      ["md", 2.75, 4, 1.2, "md"],
      ["lg", 3.25, 4.5, 1.35, "lg"],
      ...(owner === "accordion" ? [["xl", 3.75, 5, 1.375, "lg"]] : []),
    ]) {
      css += `.brick-${owner}[data-size${suffix}="${size}"] {\n`;
      for (const [key, value] of Object.entries({
        "trigger-height": `${height}rem`,
        "trigger-padding-inline": `${padding / 4}rem`,
        "content-padding-inline": `${padding / 4}rem`,
        "content-padding-block":
          size === "sm" || size === "md"
            ? "var(--brick-space-4)"
            : "var(--brick-space-5)",
        "indicator-size": `${indicator}rem`,
        "font-family": `var(--brick-typography-body-${type}-font-family)`,
        "font-size": `var(--brick-typography-body-${type}-font-size)`,
        "font-weight": "var(--brick-typography-control-md-font-weight)",
        "line-height": `var(--brick-typography-body-${type}-line-height)`,
      }))
        css += `--brick-${owner}-${key}: ${value};\n`;
      css += "}\n";
    }
    for (const variant of variants) {
      const selector = `.brick-${owner}[data-variant${suffix}="${variant}"]:not([data-unstyled])`;
      const enclosed = variant === "enclosed" || variant === "outline";
      css += `${selector} {\n--brick-${owner}-background: ${variant === "soft" ? "var(--brick-color-surface-subtle)" : "transparent"};\n--brick-${owner}-trigger-hover-background: ${variant === "ghost" ? "transparent" : variant === "soft" ? "var(--brick-color-surface-raised)" : "var(--brick-color-surface-subtle)"};\n--brick-${owner}-trigger-open-background: ${variant === "soft" ? "var(--brick-color-surface-raised)" : owner === "collapsible" ? "var(--brick-color-surface-subtle)" : "transparent"};\nborder: ${enclosed ? `var(--brick-border-width) solid var(--brick-${owner}-border-color)` : "0 solid transparent"};\n}\n`;
      if (owner === "accordion") {
        const divider =
          variant === "ghost" || variant === "subtle"
            ? "0px"
            : "var(--brick-border-width)";
        css += `${selector} > .brick-accordion-item { border-block-end-width: ${divider}; border-radius: ${variant === "subtle" ? "var(--brick-accordion-radius)" : "0"}; background: transparent; }\n`;
        if (enclosed || variant === "soft") {
          css += `${selector} > .brick-accordion-item:first-child { border-start-start-radius: max(0px, calc(var(--brick-accordion-radius) - var(--brick-border-width))); border-start-end-radius: max(0px, calc(var(--brick-accordion-radius) - var(--brick-border-width))); }\n`;
          css += `${selector} > .brick-accordion-item:last-child { border-end-start-radius: max(0px, calc(var(--brick-accordion-radius) - var(--brick-border-width))); border-end-end-radius: max(0px, calc(var(--brick-accordion-radius) - var(--brick-border-width))); }\n`;
        }
        css += `${selector} > .brick-accordion-item:last-child { border-block-end-width: ${variant === "plain" ? divider : "0px"}; }\n`;
        css += `${selector} > .brick-accordion-item[data-state="open"] { background: ${variant === "subtle" ? "var(--brick-accordion-expanded-background, var(--brick-color-surface-subtle))" : variant === "enclosed" ? "var(--brick-color-surface-subtle)" : "transparent"}; }\n`;
        css += `${selector} > .brick-accordion-item[data-orientation="horizontal"] { border-block-end-width: 0; border-inline-end-width: ${divider}; }\n${selector} > .brick-accordion-item[data-orientation="horizontal"]:last-child { border-inline-end-width: 0; }\n`;
      }
    }
    if (width) css += "}\n";
  }
  css += "}\n";
  if (check) {
    if (css !== original) throw new Error(`${owner} generated recipes drifted`);
  } else await writeFile(path, css);
}
