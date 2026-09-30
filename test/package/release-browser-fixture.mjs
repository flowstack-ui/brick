import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";

export function withBrowserRunnerFixture(options, use) {
  const directory = mkdtempSync(join(tmpdir(), "brick-runner-test-"));
  try {
    const bin = join(directory, "bin");
    mkdirSync(bin);
    writeFileSync(
      join(bin, "npx"),
      `#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const options = ${JSON.stringify(options)};
const shard = process.argv.find(arg => arg.startsWith("--shard="))?.slice(8).split("/").map(Number);
let count = options.count ?? 80;
if (shard) count = Math.floor(count * shard[0] / shard[1]) - Math.floor(count * (shard[0] - 1) / shard[1]);
if (shard && options.overBudget) count = 41;
if (process.argv.includes("--list")) {
  if (options.discoveryError) { console.log(JSON.stringify({errors:[{message:"missing packed dist"}]})); process.exit(1); }
  if (options.invalid) { console.log("invalid"); process.exit(0); }
  console.log(JSON.stringify({suites:[{specs:Array.from({length:count}, () => ({tests:[{}]}))}]}));
} else if (options.outcome !== "missing") {
  fs.mkdirSync(process.env.FLOWSTACK_TEST_ARTIFACT_DIR, {recursive:true});
  fs.writeFileSync(path.join(process.env.FLOWSTACK_TEST_ARTIFACT_DIR, "report.json"), JSON.stringify({stats:{expected:count - (["flaky", "mismatch"].includes(options.outcome) ? 1 : 0),unexpected:0,skipped:0,flaky:options.outcome === "flaky" ? 1 : 0}}));
}
`,
      { mode: 0o755 },
    );
    return use(directory, {
      ...process.env,
      FLOWSTACK_RELEASE_SHARD_GROUP: "",
      PATH: `${bin}${delimiter}${process.env.PATH}`,
    });
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
