import { spawnSync } from "node:child_process";
import { visualSuitePattern } from "./browser-suite-kind.mjs";

const [project, ...testArguments] = process.argv.slice(2);
const visualOnly = testArguments.includes("--visual");
const forwardedArguments = testArguments.filter((argument) => argument !== "--visual");
const allowedProjects = new Set(["chromium", "firefox", "webkit", "mobile-chromium", "mobile-webkit"]);

if (!allowedProjects.has(project)) {
  console.error(`Usage: node scripts/run-browser-project.mjs <${[...allowedProjects].join("|")}>`);
  process.exit(1);
}

if (visualOnly && project !== "chromium") {
  console.error("Reviewed visual baselines belong to the Chromium project.");
  process.exit(1);
}
if (visualOnly) forwardedArguments.unshift(visualSuitePattern.source);

const result = spawnSync("npx", ["playwright", "test", ...forwardedArguments, `--project=${project}`], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
