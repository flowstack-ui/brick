import { readFile } from "node:fs/promises";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { componentStyleNames } from "./css-entrypoints.mjs";

for (const script of ["build:css:dev", "build:css"]) {
  const result = spawnSync("npm", ["run", script], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const report = {};
for (const name of ["styles.css", "styles/core.css", "tokens.css", "reset.css"]) {
  const readable = await readFile(resolve(".brick-cache/development", name));
  const production = await readFile(resolve("dist", name));
  report[name] = {
    readable: readable.byteLength,
    minified: production.byteLength,
    gzip: gzipSync(production).byteLength,
    brotli: brotliCompressSync(production).byteLength,
  };
}

const componentSizes = await Promise.all(componentStyleNames.map(async (name) => {
  const path = `styles/${name}.css`;
  const readable = await readFile(resolve(".brick-cache/development", path));
  const production = await readFile(resolve("dist", path));
  return {
    name,
    readable: readable.byteLength,
    minified: production.byteLength,
    gzip: gzipSync(production).byteLength,
    brotli: brotliCompressSync(production).byteLength,
  };
}));
const sum = (key) => componentSizes.reduce((total, entry) => total + entry[key], 0);
const largest = componentSizes.reduce((current, entry) => entry.gzip > current.gzip ? entry : current);
report["component styles (aggregate)"] = {
  readable: sum("readable"),
  minified: sum("minified"),
  gzip: sum("gzip"),
  brotli: sum("brotli"),
};
report[`largest component (${largest.name})`] = {
  readable: largest.readable,
  minified: largest.minified,
  gzip: largest.gzip,
  brotli: largest.brotli,
};

console.table(report);
