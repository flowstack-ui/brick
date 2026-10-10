import { readFile, writeFile } from "node:fs/promises";
const path = new URL("../src/components/chip/chip.css", import.meta.url);
const original = await readFile(path, "utf8");
const marker = "/* Generated Chip recipes */";
let css = original.split(marker)[0].trimEnd() + `\n\n${marker}\n@layer brick.components {\n`;
for (const tone of ["accent", "info", "success", "warning", "danger", "contrast"]) {
  const values = tone === "contrast" ? ["text-primary", "surface-base", "text-primary", "surface-base", "text-primary", "text-primary"] : ["solid", "on-solid", "soft", "on-soft", "border", "text"].map(v => `${tone}-${v}`);
  css += `.brick-chip[data-tone="${tone}"] {\n`;
  ["solid", "on-solid", "soft", "on-soft", "border", "text"].forEach((name,i) => { css += `--brick-chip-tone-${name}: var(--brick-color-${values[i]});\n`; });
  css += "}\n";
}
const sizes = { sm:[28,8,4,4,12,16,24,18,6,4,12,12,12], md:[32,10,4,6,14,20,24,20,6,4,12,14,14], lg:[36,12,6,8,16,24,28,24,8,6,14,16,18], xl:[40,14,6,8,16,28,28,32,10,6,14,18,24] };
const keys = ["c-height","c-padding","c-end","c-gap","c-font","c-icon","c-remove","k-height","k-padding","k-gap","k-font","k-icon","k-avatar"];
for (const [suffix,width] of [["",0],["-sm",30],["-md",48],["-lg",64],["-xl",80]]) {
  if(width) css += `@media (min-width: ${width}rem) {\n`;
  for(const [size,values] of Object.entries(sizes)) {
    css += `.brick-chip[data-size${suffix}="${size}"] {\n`;
    keys.forEach((key,i)=>{
      const role = key === "c-font" ? ({sm:"xs",md:"sm",lg:"lg",xl:"xl"})[size] : key === "k-font" ? (["sm","md"].includes(size) ? "xs" : "sm") : null;
      css += `--_brick-chip-${key}: ${role ? `var(--brick-typography-control-${role}-font-size)` : values[i]/16+"rem"};\n`;
    });
    css += "}\n";
  }
  for(const density of ["comfortable","compact"]) {
    const p=density==="compact"?"k":"c";
    css += `.brick-chip[data-density${suffix}="${density}"] {\n`;
    for(const [name,key] of Object.entries({"min-block-size":"height","padding-inline-start":"padding","gap":"gap","font-size":"font","leading-size":"icon","avatar-size":p==="k"?"avatar":"icon"})) css += `--brick-chip-${name}: var(--_brick-chip-${p}-${key});\n`;
    css += `--brick-chip-padding-inline-end: ${p==="k"?".25rem":"var(--_brick-chip-c-end)"};\n--brick-chip-remove-size: ${p==="k"?"1.5rem":"var(--_brick-chip-c-remove)"};\n}\n`;
  }
  for(const variant of ["soft","subtle","outline","surface","solid"]) {
    const solid=variant==="solid", outline=variant==="outline";
    css += `.brick-chip[data-variant${suffix}="${variant}"] {\n--brick-chip-background: ${outline?"transparent":`var(--brick-chip-tone-${solid?"solid":"soft"})`};\n--brick-chip-foreground: var(--brick-chip-tone-${outline?"text":solid?"on-solid":"on-soft"});\n--brick-chip-border-color: ${["soft","subtle"].includes(variant)?"transparent":`var(--brick-chip-tone-${solid?"solid":"border"})`};\n}\n`;
  }
  if(width) css += "}\n";
}
css += "}\n";
if(process.argv.includes("--check")) { if(css!==original) throw new Error("Chip recipes drifted; run node scripts/generate-chip-recipes.mjs"); }
else await writeFile(path,css);
