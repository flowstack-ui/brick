import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const check = process.argv.includes("--check");
const output = resolve("src/components/_control-size/control-size.css");
const breakpoints = [["sm", "30rem"], ["md", "48rem"], ["lg", "64rem"], ["xl", "80rem"]];
const recipes = {
  "2xs": { padding: "0.5rem", blockPadding: "0.25rem", gap: "0.25rem", icon: "0.75rem", target: "1.5rem", valueRecipe: "caption", controlRecipe: "control-xs" },
  xs: { padding: "0.625rem", blockPadding: "0.375rem", gap: "0.25rem", icon: "0.875rem", target: "1.75rem", valueRecipe: "caption", controlRecipe: "control-xs" },
  sm: { padding: "0.75rem", blockPadding: "0.5rem", gap: "0.375rem", icon: "1rem", target: "2rem", valueRecipe: "body-sm", controlRecipe: "control-sm" },
  md: { padding: "0.75rem", blockPadding: "0.5rem", gap: "0.5rem", icon: "1rem", target: "2rem", valueRecipe: "body-sm", controlRecipe: "control-sm" },
  lg: { padding: "1rem", blockPadding: "0.625rem", gap: "0.5rem", icon: "1.125rem", target: "2.25rem", valueRecipe: "body-md", controlRecipe: "control-lg" },
  xl: { padding: "1rem", blockPadding: "0.75rem", gap: "0.625rem", icon: "1.25rem", target: "2.5rem", valueRecipe: "body-md", controlRecipe: "control-lg" },
  "2xl": { padding: "1.5rem", blockPadding: "1rem", gap: "0.75rem", icon: "1.5rem", target: "3rem", valueRecipe: "body-lg", controlRecipe: "control-xl" },
};

const aliases = {
  ".brick-input.brick-control-size": {
    "--brick-input-min-block-size": "var(--brick-control-size-block)",
    "--brick-input-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-input-gap": "var(--brick-control-size-gap)",
    "--brick-input-font-family": "var(--brick-control-size-value-font-family)",
    "--brick-input-font-size": "var(--brick-control-size-value-font-size)",
    "--brick-input-font-weight": "var(--brick-control-size-value-font-weight)",
    "--brick-input-line-height": "var(--brick-control-size-value-line-height)",
    "--brick-input-letter-spacing": "var(--brick-control-size-value-letter-spacing)",
    "--brick-input-adornment-size": "var(--brick-control-size-icon)",
    "--brick-input-clear-target-size": "var(--brick-control-size-target)",
    "--brick-input-clear-icon-size": "var(--brick-control-size-icon)",
  },
  ".brick-textarea.brick-control-size": {
    "--brick-textarea-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-textarea-padding-block": "var(--brick-control-size-padding-block)",
    "--brick-textarea-gap": "var(--brick-control-size-gap)",
    "--brick-textarea-font-family": "var(--brick-control-size-value-font-family)",
    "--brick-textarea-font-size": "var(--brick-control-size-value-font-size)",
    "--brick-textarea-font-weight": "var(--brick-control-size-value-font-weight)",
    "--brick-textarea-line-height": "var(--brick-control-size-value-line-height)",
    "--brick-textarea-letter-spacing": "var(--brick-control-size-value-letter-spacing)",
  },
  ".brick-select-trigger.brick-control-size": {
    "--brick-select-trigger-min-block-size": "var(--brick-control-size-block)",
    "--brick-select-trigger-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-select-trigger-gap": "var(--brick-control-size-gap)",
    "--brick-select-trigger-font-family": "var(--brick-control-size-font-family)",
    "--brick-select-trigger-font-size": "var(--brick-control-size-font-size)",
    "--brick-select-trigger-font-weight": "var(--brick-control-size-font-weight)",
    "--brick-select-trigger-line-height": "var(--brick-control-size-line-height)",
    "--brick-select-trigger-letter-spacing": "var(--brick-control-size-letter-spacing)",
    "--brick-select-icon-size": "var(--brick-control-size-icon)",
  },
  ".brick-select-content.brick-control-size": {
    "--brick-select-item-min-block-size": "var(--brick-control-size-block)",
    "--brick-select-item-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-select-item-gap": "var(--brick-control-size-gap)",
    "--brick-select-item-font-family": "var(--brick-control-size-font-family)",
    "--brick-select-item-font-size": "var(--brick-control-size-font-size)",
    "--brick-select-item-font-weight": "var(--brick-control-size-font-weight)",
    "--brick-select-item-line-height": "var(--brick-control-size-line-height)",
    "--brick-select-indicator-size": "var(--brick-control-size-icon)",
  },
  ".brick-multi-select-trigger.brick-control-size": {
    "--brick-multi-select-trigger-min-block-size": "var(--brick-control-size-block)",
    "--brick-multi-select-trigger-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-multi-select-trigger-gap": "var(--brick-control-size-gap)",
    "--brick-multi-select-trigger-font-family": "var(--brick-control-size-font-family)",
    "--brick-multi-select-trigger-font-size": "var(--brick-control-size-font-size)",
    "--brick-multi-select-trigger-font-weight": "var(--brick-control-size-font-weight)",
    "--brick-multi-select-trigger-line-height": "var(--brick-control-size-line-height)",
    "--brick-multi-select-trigger-letter-spacing": "var(--brick-control-size-letter-spacing)",
    "--brick-multi-select-icon-size": "var(--brick-control-size-icon)",
  },
  ".brick-multi-select-content.brick-control-size": {
    "--brick-multi-select-item-min-block-size": "var(--brick-control-size-block)",
    "--brick-multi-select-item-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-multi-select-item-gap": "var(--brick-control-size-gap)",
    "--brick-multi-select-item-font-family": "var(--brick-control-size-font-family)",
    "--brick-multi-select-item-font-size": "var(--brick-control-size-font-size)",
    "--brick-multi-select-item-font-weight": "var(--brick-control-size-font-weight)",
    "--brick-multi-select-item-line-height": "var(--brick-control-size-line-height)",
    "--brick-multi-select-indicator-size": "var(--brick-control-size-icon)",
  },
  ".brick-combobox-control.brick-control-size": {
    "--brick-combobox-min-block-size": "var(--brick-control-size-block)",
    "--brick-combobox-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-combobox-gap": "var(--brick-control-size-gap)",
    "--brick-combobox-font-family": "var(--brick-control-size-value-font-family)",
    "--brick-combobox-font-size": "var(--brick-control-size-value-font-size)",
    "--brick-combobox-font-weight": "var(--brick-control-size-value-font-weight)",
    "--brick-combobox-line-height": "var(--brick-control-size-value-line-height)",
    "--brick-combobox-letter-spacing": "var(--brick-control-size-value-letter-spacing)",
    "--brick-combobox-action-size": "var(--brick-control-size-target)",
    "--brick-combobox-icon-size": "var(--brick-control-size-icon)",
  },
  ".brick-combobox-content.brick-control-size": {
    "--brick-combobox-item-min-block-size": "var(--brick-control-size-block)",
    "--brick-combobox-item-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-combobox-item-gap": "var(--brick-control-size-gap)",
    "--brick-combobox-item-font-family": "var(--brick-control-size-font-family)",
    "--brick-combobox-item-font-size": "var(--brick-control-size-font-size)",
    "--brick-combobox-item-font-weight": "var(--brick-control-size-font-weight)",
    "--brick-combobox-item-line-height": "var(--brick-control-size-line-height)",
  },
  ".brick-number-input.brick-control-size": {
    "--brick-number-input-height": "var(--brick-control-size-block)",
    "--brick-number-input-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-number-input-stepper-inline-size": "calc(var(--brick-control-size-block) / 2)",
    "--brick-number-input-step-icon-size": "var(--brick-control-size-icon)",
    "--brick-number-input-font-family": "var(--brick-control-size-font-family)",
    "--brick-number-input-font-size": "var(--brick-control-size-font-size)",
    "--brick-number-input-font-weight": "var(--brick-control-size-font-weight)",
    "--brick-number-input-line-height": "var(--brick-control-size-line-height)",
  },
  ".brick-password-toggle-field.brick-control-size": {
    "--brick-password-height": "var(--brick-control-size-block)",
    "--brick-password-padding-inline": "var(--brick-control-size-padding-inline)",
    "--brick-password-icon-size": "var(--brick-control-size-icon)",
    "--brick-password-font-family": "var(--brick-control-size-value-font-family)",
    "--brick-password-font-size": "var(--brick-control-size-value-font-size)",
    "--brick-password-font-weight": "var(--brick-control-size-value-font-weight)",
    "--brick-password-line-height": "var(--brick-control-size-value-line-height)",
    "--brick-password-letter-spacing": "var(--brick-control-size-value-letter-spacing)",
  },
  ".brick-otp-field.brick-control-size": {
    "--brick-otp-size": "var(--brick-control-size-block)",
    "--brick-otp-font-family": "var(--brick-control-size-value-font-family)",
    "--brick-otp-font-size": "var(--brick-control-size-value-font-size)",
    "--brick-otp-font-weight": "var(--brick-control-size-value-font-weight)",
    "--brick-otp-line-height": "var(--brick-control-size-value-line-height)",
  },
};

function declarations(size, recipe, indent) {
  const value = `--brick-typography-${recipe.valueRecipe}`;
  const control = `--brick-typography-${recipe.controlRecipe}`;
  return [
    ["--brick-control-size-block", `var(--brick-control-min-block-size-${size})`],
    ["--brick-control-size-padding-inline", recipe.padding],
    ["--brick-control-size-padding-block", recipe.blockPadding],
    ["--brick-control-size-gap", recipe.gap],
    ["--brick-control-size-icon", recipe.icon],
    ["--brick-control-size-target", recipe.target],
    ["--brick-control-size-value-font-family", `var(${value}-font-family)`],
    ["--brick-control-size-value-font-size", `var(${value}-font-size)`],
    ["--brick-control-size-value-font-weight", `var(${value}-font-weight)`],
    ["--brick-control-size-value-line-height", `var(${value}-line-height)`],
    ["--brick-control-size-value-letter-spacing", `var(${value}-letter-spacing)`],
    ["--brick-control-size-font-family", `var(${control}-font-family)`],
    ["--brick-control-size-font-size", `var(${control}-font-size)`],
    ["--brick-control-size-font-weight", `var(${control}-font-weight)`],
    ["--brick-control-size-line-height", `var(${control}-line-height)`],
    ["--brick-control-size-letter-spacing", `var(${control}-letter-spacing)`],
  ].map(([name, value]) => `${indent}${name}: ${value};`).join("\n");
}

function rules(breakpoint) {
  const attribute = breakpoint ? `data-size-${breakpoint}` : "data-size";
  const indent = breakpoint ? "    " : "  ";
  return Object.entries(recipes).map(([size, recipe]) =>
    `${indent}.brick-control-size[${attribute}="${size}"] {\n${declarations(size, recipe, `${indent}  `)}\n${indent}}`,
  ).join("\n\n");
}

const responsive = breakpoints.map(([breakpoint, width]) =>
  `  @media (width >= ${width}) {\n${rules(breakpoint)}\n  }`,
).join("\n\n");
const aliasRules = Object.entries(aliases).map(([selector, values]) =>
  `  ${selector} {\n${Object.entries(values).map(([name, value]) => `    ${name}: ${value};`).join("\n")}\n  }`,
).join("\n\n");
const next = `@layer brick.components {\n${rules()}\n\n${responsive}\n\n${aliasRules}\n}\n`;

if (Buffer.byteLength(next) > 60_000) {
  throw new Error("Generated form-control size CSS exceeds its 60 KB source budget.");
}

if (check) {
  const current = await readFile(output, "utf8").catch(() => "");
  if (current !== next) throw new Error(`${output} is stale. Run npm run generate:form-control-sizes.`);
} else {
  await writeFile(output, next);
}

console.log(`${check ? "Form-control size CSS is current" : "Generated form-control size CSS"} (${Buffer.byteLength(next)} bytes).`);
