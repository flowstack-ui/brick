import { mkdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import browserslistModule from "browserslist";
import { browserslistToTargets, bundleAsync } from "lightningcss";
import { componentStyleEntries } from "./css-entrypoints.mjs";
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
await mkdir(resolve(outputRoot, "styles"), { recursive: true });

const generatedTokens = resolve(cacheRoot, "tokens.source.css");
await writeFile(generatedTokens, await compileTokens(tokenSource));

const sourceImport = (path) => `@import "../../src/${path}";`;
const coreImports = [
  '@import "../../src/styles/layers.css";',
  '@import "./tokens.source.css";',
  '@import "../../src/styles/foundations.css";',
];
const componentImports = [...new Set(componentStyleEntries.flatMap(([, imports]) => imports))]
  .map(sourceImport);

const generatedStyles = resolve(cacheRoot, "styles.source.css");
const generatedCore = resolve(cacheRoot, "core.source.css");
await writeFile(generatedStyles, [...coreImports, ...componentImports].join("\n"));
await writeFile(generatedCore, coreImports.join("\n"));

const generatedComponents = await Promise.all(componentStyleEntries.map(async ([name, imports]) => {
  const input = resolve(cacheRoot, `${name}.source.css`);
  await writeFile(input, [sourceImport("styles/layers.css"), ...imports.map(sourceImport)].join("\n"));
  return [name, input];
}));

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
await bundle(generatedCore, "styles/core.css");
await Promise.all(generatedComponents.map(([name, input]) => bundle(input, `styles/${name}.css`)));
await bundle(generatedTokens, "tokens.css");
await bundle(resolve(packageRoot, "src/styles/reset.css"), "reset.css");

console.log(`Built Brick CSS (${mode}) for ${Object.keys(targets).length} browser targets.`);
