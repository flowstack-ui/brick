import { readFile, writeFile } from "node:fs/promises";
const path = "src/components/color-picker/color-picker.css";
const original = await readFile(path, "utf8");
const sizes = {
  "2xs": ["1.5", "8", ".75", ".75", "1", "1.125", "caption"],
  xs: ["2", "9", ".875", ".875", "1", "1.25", "control-sm"],
  sm: ["2.25", "10", ".875", ".875", "1.125", "1.5", "control-sm"],
  md: ["2.5", "11.25", ".875", ".875", "1.25", "1.75", "control-md"],
  lg: ["2.75", "11.25", ".875", ".875", "1.375", "1.75", "control-lg"],
  xl: ["3", "12", ".875", ".875", "1.5", "2", "control-lg"],
  "2xl": ["4", "14", ".875", "1", "2", "2.5", "control-lg"],
};
const names = ["control-size", "area-block-size", "slider-block-size", "thumb-size", "value-swatch-size", "swatch-size"];
const rules = (suffix) => Object.entries(sizes).map(([size, values]) => {
  const props = names.map((name, i) => `    --brick-color-picker-${name}: ${values[i]}rem;`);
  for (const prop of ["font-size", "line-height"]) props.push(`    --brick-color-picker-control-${prop}: var(--brick-typography-${values[6]}-${prop});`);
  return `  .brick-color-picker[data-size${suffix}="${size}"] {\n${props.join("\n")}\n  }`;
}).join("\n");
const output = `/* BEGIN GENERATED COLOR PICKER SIZES */\n${rules("")}\n` +
  [["sm",30],["md",48],["lg",64],["xl",80]].map(([bp,width]) => `  @media (min-width: ${width}rem) {\n${rules(`-${bp}`)}\n  }`).join("\n") + "\n/* END GENERATED COLOR PICKER SIZES */";
const next = original.replace(/\/\* BEGIN GENERATED COLOR PICKER SIZES \*\/[\s\S]*?\/\* END GENERATED COLOR PICKER SIZES \*\//, output);
if (next === original && !original.includes(output)) throw new Error("Missing generation markers");
if (process.argv.includes("--check")) { if (next !== original) throw new Error("Regenerate ColorPicker sizes"); }
else await writeFile(path, next);
