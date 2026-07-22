import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./playground/tests",
  // Reviewed image baselines are captured on the owner's macOS environment.
  // CI runs portable behavior/a11y coverage and leaves those host-specific
  // visual comparisons to the explicit local release matrix.
  testIgnore: process.env.CI ? "**/visual.spec.ts" : undefined,
  outputDir: "./test-results",
  reporter: [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]],
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
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
    { name: "mobile-webkit", use: { ...devices["iPhone 15"] } },
  ],
  webServer: {
    command: "npm run preview:playground -- --host 127.0.0.1",
    port: 4010,
    reuseExistingServer: !process.env.CI,
  },
});
