import { defineConfig, devices } from "@playwright/test";
import { resolve } from "node:path";
import { visualSuitePattern as visualSuites } from "./scripts/browser-suite-kind.mjs";

// Each bounded release invocation retains its own evidence instead of replacing
// the previous shard's report. Ordinary focused runs keep their usual locations.
const artifactDirectory = process.env.FLOWSTACK_TEST_ARTIFACT_DIR;

export default defineConfig({
  testDir: "./playground/tests",
  // Reviewed image baselines are captured on the owner's macOS environment.
  // CI runs portable behavior/a11y coverage and leaves those host-specific
  // visual comparisons to the explicit local release matrix.
  testIgnore: process.env.CI ? visualSuites : undefined,
  outputDir: artifactDirectory ? resolve(artifactDirectory, "results") : "./test-results",
  reporter: artifactDirectory
    ? [["list"], ["json", { outputFile: resolve(artifactDirectory, "report.json") }], ["html", { open: "never", outputFolder: resolve(artifactDirectory, "html") }]]
    : [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}{ext}",
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.03,
      scale: "css",
    },
  },
  use: {
    baseURL: "http://127.0.0.1:4010",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", testIgnore: visualSuites, use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", testIgnore: visualSuites, use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chromium", testIgnore: visualSuites, use: { ...devices["Pixel 7"] } },
    { name: "mobile-webkit", testIgnore: visualSuites, use: { ...devices["iPhone 15"] } },
  ],
  webServer: {
    command: "npm run preview:playground -- --host 127.0.0.1",
    port: 4010,
    reuseExistingServer: false,
  },
});
