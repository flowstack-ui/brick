import { rm } from "node:fs/promises";
import { resolve } from "node:path";

// A package rebuild must not erase evidence or the independently built site
// that a browser qualification may currently be serving. Explicit `clean`
// still clears all generated outputs.
const packageOnly = process.argv.includes("--package-only");
const paths = packageOnly
  ? ["dist", ".brick-cache"]
  : ["dist", ".brick-cache", "coverage", "playground/dist"];
for (const path of paths) {
  await rm(resolve(path), { recursive: true, force: true });
}
