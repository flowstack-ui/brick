import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createThemeContract, serializeThemeContract } from "./theme-contract.mjs";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(packageRoot, "dist/theme-contract.json");
await mkdir(dirname(output), { recursive: true });
await writeFile(output, serializeThemeContract(await createThemeContract(packageRoot)));
console.log("Built Brick theme contract.");
