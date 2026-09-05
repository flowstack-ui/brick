import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const check = process.argv.includes("--check");
const markerStart = "  /* action-size-recipes:start */";
const markerEnd = "  /* action-size-recipes:end */";
const breakpoints = [
  ["sm", "30rem"],
  ["md", "48rem"],
  ["lg", "64rem"],
  ["xl", "80rem"],
];

const buttonRecipes = {
  "2xs": {
    "min-block-size": "1.5rem",
    "padding-block": "0.125rem",
    "padding-inline": "0.5rem",
    gap: "0.25rem",
    "font-size": "var(--brick-typography-control-xs-font-size)",
    "line-height": "var(--brick-typography-control-xs-line-height)",
    "icon-size": "0.875rem",
  },
  xs: {
    "min-block-size": "2rem",
    "padding-block": "0.25rem",
    "padding-inline": "0.625rem",
    gap: "0.25rem",
    "font-size": "var(--brick-typography-control-xs-font-size)",
    "line-height": "var(--brick-typography-control-xs-line-height)",
    "icon-size": "1rem",
  },
  sm: {
    "min-block-size": "2.25rem",
    "padding-block": "0.375rem",
    "padding-inline": "0.875rem",
    gap: "0.5rem",
    "font-size": "var(--brick-typography-control-sm-font-size)",
    "line-height": "var(--brick-typography-control-sm-line-height)",
    "icon-size": "1rem",
  },
  md: {
    "min-block-size": "2.5rem",
    "padding-block": "0.5rem",
    "padding-inline": "1rem",
    gap: "0.5rem",
    "font-size": "var(--brick-typography-control-sm-font-size)",
    "line-height": "var(--brick-typography-control-sm-line-height)",
    "icon-size": "1.25rem",
  },
  lg: {
    "min-block-size": "2.75rem",
    "padding-block": "0.5rem",
    "padding-inline": "1.25rem",
    gap: "0.75rem",
    "font-size": "var(--brick-typography-body-md-font-size)",
    "line-height": "var(--brick-typography-body-md-line-height)",
    "icon-size": "1.25rem",
  },
  xl: {
    "min-block-size": "3rem",
    "padding-block": "0.625rem",
    "padding-inline": "1.25rem",
    gap: "0.625rem",
    "font-size": "var(--brick-typography-body-md-font-size)",
    "line-height": "var(--brick-typography-body-md-line-height)",
    "icon-size": "1.25rem",
  },
  "2xl": {
    "min-block-size": "4rem",
    "padding-block": "0.75rem",
    "padding-inline": "1.75rem",
    gap: "0.75rem",
    "font-size": "var(--brick-typography-control-xl-font-size)",
    "line-height": "var(--brick-typography-control-xl-line-height)",
    "icon-size": "1.5rem",
  },
};

const iconButtonRecipes = Object.fromEntries(
  Object.entries({
    "2xs": ["1.5rem", "0.875rem"],
    xs: ["2rem", "1rem"],
    sm: ["2.25rem", "1rem"],
    md: ["2.5rem", "1.25rem"],
    lg: ["2.75rem", "1.25rem"],
    xl: ["3rem", "1.25rem"],
    "2xl": ["4rem", "1.5rem"],
  }).map(([size, [controlSize, iconSize]]) => [
    size,
    { size: controlSize, "icon-size": iconSize },
  ]),
);

function declarations(component, recipe, indentation) {
  return Object.entries(recipe)
    .map(([property, value]) => `${indentation}--brick-${component}-${property}: ${value};`)
    .join("\n");
}

function selectors(component, recipes, breakpoint) {
  const attribute = breakpoint ? `data-size-${breakpoint}` : "data-size";
  const indentation = breakpoint ? "    " : "  ";
  return Object.entries(recipes)
    .map(
      ([size, recipe]) =>
        `${indentation}.brick-${component}[${attribute}="${size}"] {\n${declarations(
          component,
          recipe,
          `${indentation}  `,
        )}\n${indentation}}`,
    )
    .join("\n\n");
}

function generatedSection(component, recipes) {
  const responsive = breakpoints
    .map(
      ([breakpoint, width]) =>
        `  @media (width >= ${width}) {\n${selectors(
          component,
          recipes,
          breakpoint,
        )}\n  }`,
    )
    .join("\n\n");
  return `${markerStart}\n${selectors(component, recipes)}\n\n${responsive}\n${markerEnd}`;
}

async function update(relativePath, component, recipes, budgetBytes) {
  const path = resolve(relativePath);
  const source = await readFile(path, "utf8");
  const start = source.indexOf(markerStart);
  const end = source.indexOf(markerEnd);
  if (start < 0 || end < start) {
    throw new Error(`${relativePath} is missing action-size recipe markers.`);
  }

  const section = generatedSection(component, recipes);
  const generatedBytes = Buffer.byteLength(section);
  if (generatedBytes > budgetBytes) {
    throw new Error(
      `${relativePath} action-size recipes use ${generatedBytes} bytes, above the ${budgetBytes}-byte authored CSS budget.`,
    );
  }
  const next = `${source.slice(0, start)}${section}${source.slice(
    end + markerEnd.length,
  )}`;
  if (check) {
    if (source !== next) {
      throw new Error(
        `${relativePath} has stale action-size recipes. Run npm run generate:action-sizes.`,
      );
    }
    return generatedBytes;
  }
  await writeFile(path, next);
  return generatedBytes;
}

const buttonBytes = await update(
  "src/components/button/button.css",
  "button",
  buttonRecipes,
  15_000,
);
const iconButtonBytes = await update(
  "src/components/icon-button/icon-button.css",
  "icon-button",
  iconButtonRecipes,
  5_500,
);

console.log(
  `${check ? "Action-size CSS is current" : "Generated action-size CSS"} ` +
    `(Button ${buttonBytes} bytes; IconButton ${iconButtonBytes} bytes).`,
);
