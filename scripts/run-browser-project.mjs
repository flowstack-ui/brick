import { spawnSync } from "node:child_process";

const [project, ...testArguments] = process.argv.slice(2);
const allowedProjects = new Set(["chromium", "firefox", "webkit", "mobile-chromium", "mobile-webkit"]);

if (!allowedProjects.has(project)) {
  console.error(`Usage: node scripts/run-browser-project.mjs <${[...allowedProjects].join("|")}>`);
  process.exit(1);
}

const result = spawnSync("npx", ["playwright", "test", ...testArguments, `--project=${project}`], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
