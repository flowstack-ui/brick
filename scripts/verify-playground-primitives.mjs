import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "playground", "src");
const allowedRawHosts = new Map([
  ["components/checkbox-group/CheckboxGroupPage.tsx", [/<strong data-adapter=/, /<small data-adapter=/]],
  ["components/field/FieldPage.tsx", [/<p data-adapter=/]],
  ["components/fieldset/FieldsetPage.tsx", [/<p data-adapter=/]],
  ["components/text/TextPage.tsx", [/^<strong>$/]],
]);

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(target));
    else if (/\.[jt]sx$/.test(entry.name)) files.push(target);
  }
  return files;
}

const failures = [];
for (const file of await collect(sourceRoot)) {
  const relative = path.relative(sourceRoot, file);
  const source = await readFile(file, "utf8");
  const allowed = allowedRawHosts.get(relative) ?? [];
  for (const [index, line] of source.split("\n").entries()) {
    const rawHosts = line.match(/<(?:h[1-6]|p|input|strong|small)\b[^>]*>/g) ?? [];
    for (const rawHost of rawHosts) {
      if (allowed.some((pattern) => pattern.test(rawHost))) continue;
      failures.push(`${relative}:${index + 1}: ${rawHost}`);
    }
  }
}

if (failures.length) {
  throw new Error(
    `Playground authored content bypasses Brick Text/Input:\n${failures.join("\n")}`,
  );
}

console.log("Verified playground-authored copy and text entry use Brick primitives.");
