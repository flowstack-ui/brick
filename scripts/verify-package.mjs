import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const dryRun = process.argv.includes("--dry-run");
const temp = await mkdtemp(join(tmpdir(), "brick-package-"));

try {
  const result = spawnSync(
    "npm",
    ["pack", "--json", "--pack-destination", temp, ...(dryRun ? ["--dry-run"] : [])],
    {
      encoding: "utf8",
      env: { ...process.env, npm_config_cache: join(temp, "npm-cache") },
    },
  );
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  const [pack] = JSON.parse(result.stdout);
  const files = new Set(pack.files.map((file) => file.path));
  for (const required of [
    "LICENSE",
    "README.md",
    "dist/index.js",
    "dist/index.d.ts",
    "dist/button.js",
    "dist/button.d.ts",
    "dist/card.js",
    "dist/card.d.ts",
    "dist/styles.css",
    "dist/tokens.css",
    "dist/reset.css",
    "package.json",
  ]) {
    assert.ok(files.has(required), `packed artifact is missing ${required}`);
  }

  for (const file of files) {
    assert.doesNotMatch(file, /(?:^|\/)(?:src|test|playground|scripts|node_modules)(?:\/|$)/);
  }

  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  assert.equal(packageJson.repository.url, "git+https://github.com/flowstack-ui/brick.git");
  console.log(`Verified ${pack.files.length} packed files (${pack.size} bytes).`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
