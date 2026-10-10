import { execFileSync } from "node:child_process";

// Only disposable GitHub macOS runners: never change a developer's preferences.
// https://github.com/microsoft/playwright/issues/41808
if (process.env.GITHUB_ACTIONS === "true" && process.platform === "darwin") {
  execFileSync("defaults", ["write", "org.webkit.Playwright", "AppleKeyboardUIMode", "-int", "2"], { stdio: "inherit" });
  console.log("Enabled full keyboard navigation for hosted Playwright WebKit.");
}
