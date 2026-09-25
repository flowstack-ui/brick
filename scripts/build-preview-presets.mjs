import { readFile, writeFile, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import postcss from "postcss";

// Build-time tools are supplied explicitly; no private workspace paths are shipped.
const args = process.argv.slice(2);
const argument = name => args[args.indexOf(name) + 1];
if (!args.includes("--theme-module") || !args.includes("--colors-module")) {
  throw new Error("Supply --theme-module <Theme dist/index.js> --colors-module <Colors dist/index.js>");
}
const { compileTheme } = await import(pathToFileURL(argument("--theme-module")));
const { generatePaletteCandidate, reviewPaletteCandidate, COLOR_GENERATION_REQUEST_SCHEMA } = await import(pathToFileURL(argument("--colors-module")));
const root = new URL("../", import.meta.url);
const contract = JSON.parse(await readFile(new URL("dist/theme-contract.json", root), "utf8"));
const base = { $schema: "flowstack.theme.v1", metadata: { id: "preview-default", name: "Preview default" }, compatibility: { brick: contract.package.version }, appearances: { supported: ["light", "dark"], default: "system" } };
const baseline = compileTheme(base, contract);
const baselineRules = new Map();
postcss.parse(baseline.css).walkRules(rule => {
  const key = rule.selector.replaceAll("preview-default", "PRESET");
  baselineRules.set(key, new Map(rule.nodes.filter(n => n.type === "decl").map(n => [n.prop, n.value])));
});
const artifacts = [];
let css = "/* Generated from contrast-validated Theme compilations. Do not edit. */\n";
function add(kind, name, definition, candidate) {
  const compilation = compileTheme(definition, contract);
  if (!compilation.report.valid || compilation.report.warnings.length) throw new Error(`Unqualified preset ${kind}/${name}`);
  const tree = postcss.parse(compilation.css);
  tree.walkRules(rule => {
    const key = rule.selector.replaceAll(definition.metadata.id, "PRESET");
    const defaults = baselineRules.get(key);
    rule.walkDecls(declaration => { if (defaults?.get(declaration.prop) === declaration.value) declaration.remove(); });
    rule.selector = rule.selector.replaceAll(`[data-flowstack-theme="${definition.metadata.id}"]`, `:root[data-preview-${kind}="${name}"]`);
    if (!rule.nodes.length) rule.remove();
  });
  tree.walkAtRules(rule => { if (rule.nodes && !rule.nodes.length) rule.remove(); });
  css += tree.toString() + "\n";
  artifacts.push({ kind, name, definition, ...(candidate ? { candidate } : {}), manifest: compilation.manifest, report: compilation.report });
}
for (const [name, color] of Object.entries({ blue: "#3157d5", teal: "#0d9488", rose: "#be185d", orange: "#ea580c" })) {
  const candidate = reviewPaletteCandidate(generatePaletteCandidate({ $schema: COLOR_GENERATION_REQUEST_SCHEMA, seeds: [{ id: "brand", color, profile: "interface" }] }), { status: "accepted", notes: "Agent-reviewed local playground comparison candidate. Requires Theme contrast validation; not an owner-approved product palette." });
  if (candidate.status !== "accepted") throw new Error(`Rejected Colors candidate ${name}`);
  // Explicit application-owned mapping includes selection, which is part of
  // Brick's current atomic accent family. Never weaken the compiler contract.
  const brick = Object.fromEntries(["light", "dark"].map(appearance => {
    const roles = candidate.families[0].appearances[appearance].roles;
    const accent = Object.fromEntries(["border", "on-soft", "on-solid", "soft", "soft-hover", "soft-pressed", "solid", "solid-hover", "solid-pressed", "text"].map(key => [key, roles[key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())].srgb.hex]));
    // Brick has more dark surface levels than the candidate's reference canvas.
    // Use the readable accent role for focus, then validate every Brick surface.
    return [appearance, { color: { accent, "focus-ring": accent.text, selection: { background: accent.solid, foreground: accent["on-solid"] } } }];
  }));
  add("accent", name, { ...base, metadata: { id: `preview-accent-${name}`, name: `Preview ${name}` }, brick }, candidate);
}
for (const [name, radius] of Object.entries({ square: { subtle: "0px", control: "0px", surface: "0px", overlay: "0px" }, small: { subtle: "0.125rem", control: "0.25rem", surface: "0.375rem", overlay: "0.5rem" }, large: { subtle: "0.375rem", control: "0.75rem", surface: "1rem", overlay: "1.25rem" } })) {
  add("radius", name, { ...base, metadata: { id: `preview-radius-${name}`, name: `Preview radius ${name}` }, foundations: { radius } });
}
for (const [name, family] of Object.entries({ inter: '"Inter Variable", system-ui, sans-serif', outfit: '"Outfit Variable", system-ui, sans-serif' })) {
  add("font", name, { ...base, metadata: { id: `preview-font-${name}`, name: `Preview font ${name}` }, foundations: { font: { family: { body: family, heading: family } } } });
}
const directory = new URL("playground/theme-fixtures/preview-presets/", root);
css = css.trimEnd() + "\n";
await mkdir(directory, { recursive: true });
await writeFile(new URL("presets.css", directory), css);
await writeFile(new URL("presets.json", directory), JSON.stringify({ cssSha256: createHash("sha256").update(css).digest("hex"), bytes: Buffer.byteLength(css), artifacts }, null, 2) + "\n");
console.log(`Compiled ${artifacts.length} factored presets: ${Buffer.byteLength(css)} CSS bytes.`);
