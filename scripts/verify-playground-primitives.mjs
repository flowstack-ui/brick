import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nativeHostFindings } from "./playground-native-hosts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "playground", "src");
const allowedRawHosts = new Map([
  // This specimen must use native text to qualify foreground inheritance.
  ["components/appearance/examples/AppearanceNative.tsx", [/^<p>$/]],
  // Failure reporting must survive a failed component import/render and cannot
  // depend on the library whose loading failure it reports. No example copy.
  ["preview/ExampleEnvironment.tsx", [/^<p role="alert">$/]],
  ["preview/preview-entry.tsx", [/^<p role="alert">$/]],
  // Text's semantic-emphasis examples intentionally contrast host semantics
  // with visual weight/style props. These are not independent text recipes.
  ["components/text/TextEvidence.tsx", [/^<strong>$/]],
  ["components/text/examples/TextStyle.tsx", [/^<strong>$/]],
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
  for (const { line, host, functionName } of nativeHostFindings(source, relative)) {
    // Extracted trusted article content is rendered under Prose in each use.
    if (relative === "components/prose/ProseEvidence.tsx" && functionName === "ArticleSample" && /^<(?:h1|h2|p)>$/u.test(host)) continue;
    // Retention fixture intentionally tests an uncontrolled native input, not
    // Input's own adapter. It is excluded from copied feature examples.
    if (relative === "components/carousel/CarouselEdgeCases.tsx" && /^<input\s+aria-label=\{`\$\{value\} retained input`\}\s+defaultValue=\{value\}\s*\/>$/u.test(host)) continue;
    if (allowed.some((pattern) => pattern.test(host))) continue;
    failures.push(`${relative}:${line}: ${host}`);
  }
}

if (failures.length) {
  throw new Error(
    `Playground authored content bypasses Brick Text/Input:\n${failures.join("\n")}`,
  );
}

console.log("Verified playground-authored copy and text entry use Brick primitives.");
