import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format } from "prettier";

const root = fileURLToPath(new URL("../", import.meta.url));
const write = process.argv.includes("--write");
let count = 0;
let invalid = false;

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await visit(filename);
    } else if (
      entry.name.endsWith(".tsx") &&
      path.basename(directory) === "examples"
    ) {
      count++;
      const source = await readFile(filename, "utf8");
      const formatted = await format(source, {
        filepath: filename,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: "all",
        endOfLine: "lf",
      });
      if (/\bdata-testid\s*=/.test(source)) {
        console.error(
          `${path.relative(root, filename)}: keep test-only IDs outside copyable examples.`,
        );
        invalid = true;
      }
      if (source !== formatted) {
        if (write) await writeFile(filename, formatted);
        else {
          console.error(
            `${path.relative(root, filename)}: run npm run format:playground-examples.`,
          );
          invalid = true;
        }
      }
    }
  }
}

await visit(path.join(root, "playground/src/components"));
if (!count) throw new Error("No playground examples found.");
console.log(
  `${write ? "Formatted" : "Checked"} ${count} playground example files.`,
);
if (invalid) process.exitCode = 1;
