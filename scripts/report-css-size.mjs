import { readFile } from "node:fs/promises";
import { brotliCompressSync, gzipSync } from "node:zlib";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

for (const script of ["build:css:dev", "build:css"]) {
  const result = spawnSync("npm", ["run", script], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const report = {};
for (const name of ["styles.css", "tokens.css", "reset.css"]) {
  const readable = await readFile(resolve(".brick-cache/development", name));
  const production = await readFile(resolve("dist", name));
  report[name] = {
    readable: readable.byteLength,
    minified: production.byteLength,
    gzip: gzipSync(production).byteLength,
    brotli: brotliCompressSync(production).byteLength,
  };
}

console.table(report);
