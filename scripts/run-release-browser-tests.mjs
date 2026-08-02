import { spawnSync } from "node:child_process";

const projects = [
  "chromium",
  "firefox",
  "webkit",
  "mobile-chromium",
  "mobile-webkit",
];

for (const project of projects) {
  console.log(`\nRunning the ${project} release project with 1 worker...`);
  const result = spawnSync(
    "npx",
    ["playwright", "test", `--project=${project}`, "--workers=1"],
    { encoding: "utf8", stdio: "inherit" },
  );
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
