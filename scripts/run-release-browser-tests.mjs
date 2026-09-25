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
const requestedProjects = requestedArguments.filter(
  (argument) => argument !== "--plan",
);
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
const summary = {
  startedAt: new Date().toISOString(),
  node: process.version,
  projects,
  shardGroup: selectedShardGroup,
  status: "running",
  runs: [],
};
if (!planOnly) {
  mkdirSync("test-results", { recursive: true });
  reportDirectory = mkdtempSync(resolve("test-results", "release-"));
  console.log(`Release evidence: ${reportDirectory}`);
}
function saveSummary() {
  if (reportDirectory)
    writeFileSync(
      resolve(reportDirectory, "summary.json"),
      JSON.stringify(summary, null, 2) + "\n",
    );
}
saveSummary();

function inventory(args) {
  const result = spawnSync("npx", [...args, "--list", "--reporter=json"], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  try {
    if (result.status !== 0)
      throw new Error(result.stderr || "inventory command failed");
    const report = JSON.parse(result.stdout);
    if (report.errors?.length)
      throw new Error("inventory contains discovery errors");
    let count = 0;
    function visit(suites) {
      for (const suite of suites) {
        for (const spec of suite.specs ?? []) count += spec.tests?.length ?? 0;
        visit(suite.suites ?? []);
      }
    }
    visit(report.suites);
    if (!count) throw new Error("inventory is empty");
    return count;
  } catch (error) {
    summary.status = "failed";
    saveSummary();
    throw new Error(`Cannot safely plan browser contexts: ${error.message}`);
  }
}

for (const project of projects) {
  // Keep WebKit workers below the observed macOS context-lifecycle ceiling.
  // Desktop WebKit stalls after roughly 55 isolated contexts and Mobile
  // WebKit after roughly 34 on the release host. Keep both below their
  // measured ceilings without adding retries or inflating test timeouts.
  const contextBudget =
    project === "mobile-webkit" ? 24 : project === "webkit" ? 40 : undefined;
  if (selectedShardGroup && !contextBudget) {
    console.error(
      `FLOWSTACK_RELEASE_SHARD_GROUP is only valid for WebKit projects; received ${project}`,
    );
    process.exit(1);
  }
  const baseArgs = [
    "playwright",
    "test",
    `--project=${project}`,
    "--workers=1",
  ];
  // File-level sharding cannot bound a large catalog file. Tests remain
  // sequential, but test-level distribution keeps each browser process bounded.
  if (contextBudget) baseArgs.push("--fully-parallel");
  const testCount = contextBudget ? inventory(baseArgs) : undefined;
  const shardCount = contextBudget ? Math.ceil(testCount / contextBudget) : 1;

  const selectedShards = Array.from(
    { length: shardCount },
    (_, index) => index + 1,
  ).filter(
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
    console.log(
      `\nRunning the ${project} release project with 1 worker${shardLabel}...`,
    );
    const args = [...baseArgs];
    if (shardCount > 1) args.push(`--shard=${shard}/${shardCount}`);
    if (planOnly) {
      console.log(`npx ${args.join(" ")}`);
      continue;
    }
    const plannedTests = contextBudget ? inventory(args) : undefined;
    if (contextBudget && plannedTests > contextBudget) {
      summary.status = "failed";
      saveSummary();
      console.error(
        `Shard exceeds its browser context budget: ${plannedTests} > ${contextBudget}`,
      );
      process.exit(1);
    }
    const artifactDirectory = resolve(
      reportDirectory,
      `${project}-${shard}-of-${shardCount}`,
    );
    const started = Date.now();
    const result = spawnSync("npx", args, {
      encoding: "utf8",
      stdio: "inherit",
      env: { ...process.env, FLOWSTACK_TEST_ARTIFACT_DIR: artifactDirectory },
    });
    let stats;
    try {
      stats = JSON.parse(
        readFileSync(resolve(artifactDirectory, "report.json"), "utf8"),
      ).stats;
    } catch {
      /* Missing reports fail the evidence gate below. */
    }
    summary.runs.push({
      project,
      shard,
      shardCount,
      contextBudget,
      plannedTests,
      durationMs: Date.now() - started,
      exitCode: result.status,
      signal: result.signal,
      artifactDirectory,
      stats,
    });
    const reportedTests =
      stats && stats.expected + stats.unexpected + stats.skipped + stats.flaky;
    if (
      result.status !== 0 ||
      !stats ||
      stats.unexpected > 0 ||
      stats.flaky > 0 ||
      (plannedTests !== undefined && reportedTests !== plannedTests)
    ) {
      summary.status = "failed";
      saveSummary();
      if (!stats)
        console.error(`Missing release report for ${project} shard ${shard}`);
      if (stats?.flaky > 0)
        console.error(
          `Flaky release results require diagnosis for ${project} shard ${shard}`,
        );
      if (plannedTests !== undefined && reportedTests !== plannedTests)
        console.error(
          `Reported test count does not match planned inventory for ${project} shard ${shard}`,
        );
      process.exit(result.status || 1);
    }
    saveSummary();
  }
}
summary.status = "passed";
summary.completedAt = new Date().toISOString();
saveSummary();
