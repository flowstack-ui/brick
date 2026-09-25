import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const allProjects = [
  "chromium",
  "firefox",
  "webkit",
  "mobile-chromium",
  "mobile-webkit",
];

const requestedArguments = process.argv.slice(2);
const planOnly = requestedArguments.includes("--plan");
const requestedProjects = requestedArguments.filter((argument) => argument !== "--plan");
const projects = requestedProjects.length > 0 ? requestedProjects : allProjects;

const shardGroup = process.env.FLOWSTACK_RELEASE_SHARD_GROUP?.trim();

function parseShardGroup(value) {
  if (!value) return undefined;

  const match = /^(\d+)\/(\d+)$/.exec(value);
  if (!match) {
    throw new Error(
      `FLOWSTACK_RELEASE_SHARD_GROUP must use the form <group>/<groups>; received ${value}`,
    );
  }

  const group = Number(match[1]);
  const groups = Number(match[2]);
  if (group < 1 || groups < 1 || group > groups || groups > 12) {
    throw new Error(
      `FLOWSTACK_RELEASE_SHARD_GROUP must select a valid group within 1..12; received ${value}`,
    );
  }

  return { group, groups };
}

let selectedShardGroup;
try {
  selectedShardGroup = parseShardGroup(shardGroup);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

for (const project of projects) {
  if (!allProjects.includes(project)) {
    console.error(`Unknown release browser project: ${project}`);
    process.exit(1);
  }
}

let reportDirectory;
const summary = { startedAt: new Date().toISOString(), node: process.version, projects, shardGroup: selectedShardGroup, status: "running", runs: [] };
if (!planOnly) {
  mkdirSync("test-results", { recursive: true });
  reportDirectory = mkdtempSync(resolve("test-results", "release-"));
  console.log(`Release evidence: ${reportDirectory}`);
}
function saveSummary() {
  if (reportDirectory) writeFileSync(resolve(reportDirectory, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
}
saveSummary();

for (const project of projects) {
  // Keep WebKit workers below the observed macOS context-lifecycle ceiling.
  // Desktop WebKit stalls after roughly 55 isolated contexts and Mobile
  // WebKit after roughly 34 on the release host. Keep both below their
  // measured ceilings without adding retries or inflating test timeouts.
  const shardCount = project === "mobile-webkit" ? 32 : project === "webkit" ? 16 : 1;
  if (selectedShardGroup && shardCount === 1) {
    console.error(
      `FLOWSTACK_RELEASE_SHARD_GROUP is only valid for WebKit projects; received ${project}`,
    );
    process.exit(1);
  }

  const selectedShards = Array.from({ length: shardCount }, (_, index) => index + 1).filter(
    (shard) =>
      !selectedShardGroup ||
      (shard - selectedShardGroup.group) % selectedShardGroup.groups === 0,
  );

  if (selectedShardGroup) {
    console.log(
      `\nRunning ${project} release shard group ${selectedShardGroup.group}/${selectedShardGroup.groups}: ${selectedShards
        .map((shard) => `${shard}/${shardCount}`)
        .join(", ")}`,
    );
  }

  for (const shard of selectedShards) {
    const shardLabel = shardCount === 1 ? "" : `, shard ${shard}/${shardCount}`;
    console.log(`\nRunning the ${project} release project with 1 worker${shardLabel}...`);
    const args = ["playwright", "test", `--project=${project}`, "--workers=1"];
    if (shardCount > 1) args.push(`--shard=${shard}/${shardCount}`);
    if (planOnly) {
      console.log(`npx ${args.join(" ")}`);
      continue;
    }
    const artifactDirectory = resolve(reportDirectory, `${project}-${shard}-of-${shardCount}`);
    const started = Date.now();
    const result = spawnSync("npx", args, {
      encoding: "utf8",
      stdio: "inherit",
      env: { ...process.env, FLOWSTACK_TEST_ARTIFACT_DIR: artifactDirectory },
    });
    let stats;
    try { stats = JSON.parse(readFileSync(resolve(artifactDirectory, "report.json"), "utf8")).stats; } catch { /* Missing reports fail the evidence gate below. */ }
    summary.runs.push({ project, shard, shardCount, durationMs: Date.now() - started, exitCode: result.status, signal: result.signal, artifactDirectory, stats });
    if (result.status !== 0 || !stats || stats.unexpected > 0 || stats.flaky > 0) {
      summary.status = "failed";
      saveSummary();
      if (!stats) console.error(`Missing release report for ${project} shard ${shard}`);
      if (stats?.flaky > 0) console.error(`Flaky release results require diagnosis for ${project} shard ${shard}`);
      process.exit(result.status || 1);
    }
    saveSummary();
  }
}
summary.status = "passed";
summary.completedAt = new Date().toISOString();
saveSummary();
