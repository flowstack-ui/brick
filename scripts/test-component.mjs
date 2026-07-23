import { spawnSync } from "node:child_process";
import { componentIds, componentTestPaths } from "./component-test-manifest.mjs";

const modes = new Set(["all", "unit", "types", "browser"]);
const [mode = "all", componentId] = process.argv.slice(2);

if (!modes.has(mode) || !componentId || !componentIds.includes(componentId)) {
  console.error(
    `Usage: node scripts/test-component.mjs <all|unit|types|browser> <component>\n\n` +
      `Components: ${componentIds.join(", ")}`,
  );
  process.exit(1);
}

const paths = componentTestPaths(componentId);

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function runUnit() {
  run("npm", ["exec", "--", "vitest", "run", paths.unit, "--coverage=false"]);
}

function runTypes() {
  run("npm", [
    "exec",
    "--",
    "tsc",
    "--noEmit",
    "--target",
    "ES2022",
    "--module",
    "NodeNext",
    "--moduleResolution",
    "NodeNext",
    "--jsx",
    "react-jsx",
    "--strict",
    "--skipLibCheck",
    "--lib",
    "ES2022,DOM,DOM.Iterable",
    paths.types,
  ]);
}

function runBrowser() {
  run("npm", ["run", "build:playground"]);
  run("npm", ["exec", "--", "playwright", "test", paths.browser, "--project=chromium"]);
}

if (mode === "all" || mode === "unit") runUnit();
if (mode === "all" || mode === "types") runTypes();
if (mode === "all" || mode === "browser") runBrowser();
