import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  }))).flat();
}

const failures = [];
for (const path of await files("playground/src")) {
  if (!/\.[jt]sx$/.test(path)) continue;
  const source = await readFile(path, "utf8");
  if (/<\/?(?:code|pre)(?:\s|>)/.test(source)) {
    failures.push(`${path}: use Brick Code or CodeBlock instead of a raw technical display host`);
  }
}

const renderedOutput = await readFile("playground/src/shared/RenderedOutput.tsx", "utf8");
if (!renderedOutput.includes("<CodeBlock.Root") || !renderedOutput.includes("<CodeBlock.Content")) {
  failures.push("RenderedOutput must compose CodeBlock for generated HTML");
}

const shorthand = await readFile("playground/src/shared/PlaygroundCodeBlock.tsx", "utf8");
if (!shorthand.includes("<CodeBlock.Root") || !shorthand.includes("<CodeBlock.Content")) {
  failures.push("PlaygroundCodeBlock must remain a thin CodeBlock composition");
}

if (failures.length) {
  console.error(`Playground Code adoption failed:\n\n${failures.map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log("Verified playground Code and CodeBlock ownership with no raw technical display hosts.");
