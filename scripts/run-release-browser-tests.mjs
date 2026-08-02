import { spawnSync } from "node:child_process";

const allProjects = [
  "chromium",
  "firefox",
  "webkit",
  "mobile-chromium",
  "mobile-webkit",
];

const requestedProjects = process.argv.slice(2);
const projects = requestedProjects.length > 0 ? requestedProjects : allProjects;

for (const project of projects) {
  if (!allProjects.includes(project)) {
    console.error(`Unknown release browser project: ${project}`);
    process.exit(1);
  }
}

for (const project of projects) {
  const shardCount = project.includes("webkit") ? 12 : 1;
  for (let shard = 1; shard <= shardCount; shard += 1) {
    const shardLabel = shardCount === 1 ? "" : `, shard ${shard}/${shardCount}`;
    console.log(`\nRunning the ${project} release project with 1 worker${shardLabel}...`);
    const args = ["playwright", "test", `--project=${project}`, "--workers=1"];
    if (shardCount > 1) args.push(`--shard=${shard}/${shardCount}`);
    const result = spawnSync("npx", args, {
      encoding: "utf8",
      stdio: "inherit",
    });
    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}
