import { mkdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import browserslistModule from "browserslist";
import { browserslistToTargets, bundleAsync } from "lightningcss";
import { compileTokens } from "./token-compiler.mjs";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const modeIndex = process.argv.indexOf("--mode");
const mode = modeIndex >= 0 ? process.argv[modeIndex + 1] : "production";
if (!new Set(["production", "development"]).has(mode)) {
  throw new Error(`Unknown CSS build mode: ${mode}`);
}

const production = mode === "production";
const cacheRoot = resolve(packageRoot, ".brick-cache", mode);
const outputRoot = production ? resolve(packageRoot, "dist") : cacheRoot;
const tokenSource = resolve(packageRoot, "src/styles/tokens.tokens.json");
const browserslist = typeof browserslistModule === "function"
  ? browserslistModule
  : browserslistModule.default;
const targets = browserslistToTargets(browserslist(undefined, { path: packageRoot }));

await rm(cacheRoot, { recursive: true, force: true });
await mkdir(cacheRoot, { recursive: true });
await mkdir(outputRoot, { recursive: true });

const generatedTokens = resolve(cacheRoot, "tokens.source.css");
await writeFile(generatedTokens, await compileTokens(tokenSource));

const generatedStyles = resolve(cacheRoot, "styles.source.css");
await writeFile(
  generatedStyles,
  [
    '@import "../../src/styles/layers.css";',
    '@import "./tokens.source.css";',
    '@import "../../src/styles/foundations.css";',
    '@import "../../src/components/button/button.css";',
    '@import "../../src/components/icon-button/icon-button.css";',
    '@import "../../src/components/app-bar/app-bar.css";',
    '@import "../../src/components/card/card.css";',
    '@import "../../src/components/dialog/dialog.css";',
    '@import "../../src/components/alert-dialog/alert-dialog.css";',
    '@import "../../src/components/drawer/drawer.css";',
    '@import "../../src/components/badge/badge.css";',
    '@import "../../src/components/avatar/avatar.css";',
    '@import "../../src/components/toggle/toggle.css";',
    '@import "../../src/components/toggle-group/toggle-group.css";',
    '@import "../../src/styles/floating-arrow.css";',
    '@import "../../src/components/tooltip/tooltip.css";',
    '@import "../../src/components/hover-card/hover-card.css";',
    '@import "../../src/components/popover/popover.css";',
    '@import "../../src/components/form/form.css";',
    '@import "../../src/components/field/field.css";',
    '@import "../../src/components/fieldset/fieldset.css";',
    '@import "../../src/components/checkbox/checkbox.css";',
    '@import "../../src/components/checkbox-group/checkbox-group.css";',
  ].join("\n"),
);

async function bundle(input, outputName) {
  const result = await bundleAsync({
    filename: input,
    minify: production,
    sourceMap: true,
    targets,
  });
  const output = resolve(outputRoot, outputName);
  await writeFile(
    output,
    `${result.code.toString().trim()}\n/*# sourceMappingURL=${basename(output)}.map */\n`,
  );
  await writeFile(`${output}.map`, result.map);
}

await bundle(generatedStyles, "styles.css");
await bundle(generatedTokens, "tokens.css");
await bundle(resolve(packageRoot, "src/styles/reset.css"), "reset.css");

console.log(`Built Brick CSS (${mode}) for ${Object.keys(targets).length} browser targets.`);
