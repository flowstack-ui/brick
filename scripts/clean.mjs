import { rm } from "node:fs/promises";
import { resolve } from "node:path";

for (const path of ["dist", ".brick-cache", "coverage", "playground/dist"]) {
  await rm(resolve(path), { recursive: true, force: true });
}
