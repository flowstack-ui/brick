import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, posix, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { componentStyleNames } from "./css-entrypoints.mjs";

const dryRun = process.argv.includes("--dry-run");
const tarballArgument = process.argv.indexOf("--tarball");
const tarball = tarballArgument === -1
  ? undefined
  : process.argv[tarballArgument + 1];

if (tarballArgument !== -1 && !tarball) {
  throw new Error("--tarball requires an archive path");
}

const temp = await mkdtemp(join(tmpdir(), "brick-package-"));

function readTarballFile(path) {
  const result = spawnSync("tar", ["-xOf", resolve(tarball), `package/${path}`], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, `unable to read ${path} from release archive`);
  return result.stdout;
}

async function readPackedFile(path) {
  return tarball ? readTarballFile(path) : readFile(path, "utf8");
}

function assertPackedLinksResolve(path, source, files) {
  const links = source.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^)]*)?\)/gu);
  for (const [, rawHref] of links) {
    const href = rawHref.replace(/^<|>$/gu, "").split("#", 1)[0];
    if (!href || /^(?:https?:|mailto:)/u.test(href)) continue;
    const target = posix.normalize(posix.join(posix.dirname(path), href));
    assert.ok(!target.startsWith("../"), `${path} links outside the package: ${rawHref}`);
    assert.ok(files.has(target), `${path} links to unpacked file ${target}`);
  }
}

try {
  const result = spawnSync(
    "npm",
    tarball
      ? ["publish", "--dry-run", "--json", resolve(tarball)]
      : ["pack", "--json", "--pack-destination", temp, ...(dryRun ? ["--dry-run"] : [])],
    {
      encoding: "utf8",
      env: { ...process.env, npm_config_cache: join(temp, "npm-cache") },
    },
  );
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  const output = JSON.parse(result.stdout);
  const pack = Array.isArray(output) ? output[0] : output;
  const files = new Set(pack.files.map((file) => file.path));
  for (const required of [
    "LICENSE",
    "README.md",
    "dist/index.js",
    "dist/index.d.ts",
    "dist/button.js",
    "dist/button.d.ts",
    "dist/icon-button.js",
    "dist/icon-button.d.ts",
    "dist/app-bar.js",
    "dist/app-bar.d.ts",
    "dist/card.js",
    "dist/card.d.ts",
    "dist/dialog.js",
    "dist/dialog.d.ts",
    "dist/alert-dialog.js",
    "dist/alert-dialog.d.ts",
    "dist/drawer.js",
    "dist/drawer.d.ts",
    "dist/badge.js",
    "dist/badge.d.ts",
    "dist/avatar.js",
    "dist/avatar.d.ts",
    "dist/styles.css",
    "dist/styles/core.css",
    ...componentStyleNames.map((name) => `dist/styles/${name}.css`),
    "dist/tokens.css",
    "dist/reset.css",
    "docs/guides/installation.md",
    "docs/guides/appearance-and-tokens.md",
    "docs/guides/control-sizing.md",
    "docs/guides/agent-knowledge.md",
    "docs/guides/browser-support.md",
    "dist/agents/manifest.json",
    "dist/agents/coverage.json",
    "dist/theme-contract.json",
    "docs/guides/theme-contract.md",
    "package.json",
  ]) {
    assert.ok(files.has(required), `packed artifact is missing ${required}`);
  }

  const allowedMetadata = new Set([
    "LICENSE",
    "README.md",
    "package.json",
    "docs/guides/installation.md",
    "docs/guides/appearance-and-tokens.md",
    "docs/guides/control-sizing.md",
    "docs/guides/theme-contract.md",
    "docs/guides/agent-knowledge.md",
    "docs/guides/browser-support.md",
  ]);
  for (const file of files) {
    const isRuntimeFile = /^dist\/.+\.(?:js|css|d\.ts)(?:\.map)?$/u.test(file);
    const isAgentArtifact = /^dist\/agents\/.+\.(?:json|md)$/u.test(file);
    const isThemeContract = file === "dist/theme-contract.json";
    assert.ok(
      allowedMetadata.has(file) || isRuntimeFile || isAgentArtifact || isThemeContract,
      `packed artifact contains non-public file ${file}`,
    );
  }

  const packageJson = JSON.parse(await readPackedFile("package.json"));
  assert.equal(packageJson.repository.url, "git+https://github.com/flowstack-ui/brick.git");
  const agentManifest = JSON.parse(await readPackedFile("dist/agents/manifest.json"));
  const agentCoverage = JSON.parse(await readPackedFile("dist/agents/coverage.json"));
  const themeContract = JSON.parse(await readPackedFile("dist/theme-contract.json"));
  assert.equal(themeContract.$schema, "flowstack.brick-theme-contract.v1");
  assert.equal(themeContract.contractVersion, 4);
  assert.equal(themeContract.contrast.algorithm, "wcag2-relative-luminance");
  assert.equal(themeContract.contrast.pairs.length, 91);
  assert.equal(packageJson.exports["./theme-contract.json"], "./dist/theme-contract.json");
  assert.equal(agentManifest.package, packageJson.name);
  assert.equal(agentManifest.packageVersion, packageJson.version);
  assert.equal(agentManifest.coverage, "./coverage.json");
  assert.equal(agentCoverage.schema, "flowstack.agent-coverage.v1");
  assert.equal(agentCoverage.package, packageJson.name);
  assert.equal(agentCoverage.packageVersion, packageJson.version);
  assert.equal(packageJson.exports["./agents/coverage.json"], "./dist/agents/coverage.json");
  assert.equal(agentCoverage.summary.unclassified, 0);
  assert.equal(agentCoverage.summary.invalidExclusions, 0);
  assert.equal(agentCoverage.summary.unresolvedSelections, 0);
  assert.equal(agentCoverage.summary.guidedComponentOwners, agentCoverage.summary.componentOwners);
  assert.equal(agentCoverage.failures.length, 0);
  assert.ok(agentCoverage.surfaces.some(({ surface, classification }) => surface === "." && classification === "aggregate"));
  assert.ok(Array.isArray(agentCoverage.nativeApplicationDestinations));
  for (const component of agentCoverage.components) {
    const manifestRecord = agentManifest.components.find(({ id }) => id === component.id);
    assert.ok(manifestRecord, `coverage component is absent from manifest: ${component.id}`);
    assert.deepEqual(component.manifestPaths, { json: manifestRecord.json, markdown: manifestRecord.markdown });
    assert.equal(typeof component.agentSources?.json, "string");
    assert.equal(typeof component.agentSources?.markdown, "string");
    assert.ok(Array.isArray(component.publicValueSymbols));
  }
  for (const guide of agentCoverage.guides) {
    const manifestRecord = agentManifest.guides.find(({ id }) => id === guide.id);
    assert.ok(manifestRecord, `coverage guide is absent from manifest: ${guide.id}`);
    assert.deepEqual(guide.manifestPaths, { json: manifestRecord.json, markdown: manifestRecord.markdown });
    assert.equal(typeof guide.agentSources?.json, "string");
    assert.equal(typeof guide.agentSources?.markdown, "string");
  }
  assert.deepEqual(
    agentCoverage.components.map(({ id }) => id).sort(),
    agentManifest.components.map(({ id }) => id).sort(),
  );
  assert.ok(agentManifest.components.length > 0, "Agent Knowledge manifest is empty");
  for (const requiredComponent of ["accordion", "list", "select"]) {
    assert.ok(
      agentManifest.components.some((component) => component.id === requiredComponent),
      `Agent Knowledge manifest is missing ${requiredComponent}`,
    );
  }
  for (const component of agentManifest.components) {
    assert.ok(files.has(`dist/agents/${component.id}.json`));
    assert.ok(files.has(`dist/agents/${component.id}.md`));
    const artifact = JSON.parse(await readPackedFile(`dist/agents/${component.id}.json`));
    assert.equal(artifact.schema, "flowstack.agent-component.v1");
    assert.equal(artifact.id, component.id);
    assert.equal(artifact.package, packageJson.name);
    assert.equal(artifact.layer, "brick");
  }
  for (const guide of agentManifest.guides) {
    assert.ok(files.has(`dist/agents/${guide.id}.json`));
    assert.ok(files.has(`dist/agents/${guide.id}.md`));
    const artifact = JSON.parse(await readPackedFile(`dist/agents/${guide.id}.json`));
    assert.equal(artifact.schema, "flowstack.agent-guide.v1");
    assert.equal(artifact.id, guide.id);
    assert.equal(artifact.package, packageJson.name);
    assert.equal(artifact.layer, "brick");
  }

  const publicMarkdown = [
    "README.md",
    "docs/guides/installation.md",
    "docs/guides/appearance-and-tokens.md",
    "docs/guides/control-sizing.md",
    "docs/guides/theme-contract.md",
    "docs/guides/agent-knowledge.md",
    "docs/guides/browser-support.md",
  ];
  const forbiddenDocumentation = [
    /\bplayground\b/iu,
    /\bapps\/consumer\b/iu,
    /\b(?:application|packed) Consumer\b/u,
    /\bdev:consumer\b/iu,
    /\bworkbook\b/iu,
    /\bcontribut(?:e|ing|or)\b/iu,
    /manual[- ](?:review|test|protocol)/iu,
    /\bcheck:release\b/iu,
    /\btest:browser\b/iu,
    /\bnpm run\b/iu,
  ];
  for (const path of publicMarkdown) {
    const source = await readPackedFile(path);
    for (const pattern of forbiddenDocumentation) {
      assert.doesNotMatch(source, pattern, `${path} contains repository-only guidance`);
    }
    assertPackedLinksResolve(path, source, files);
  }

  console.log(
    `Verified ${pack.files.length} packed files (${pack.size} bytes)${tarball ? " in the release archive" : ""}.`,
  );
} finally {
  await rm(temp, { recursive: true, force: true });
}
