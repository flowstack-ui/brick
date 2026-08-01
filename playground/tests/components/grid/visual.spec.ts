import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/grid");

async function removeStickyCaptureOverlap(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content:
      ".evidence-app-bar, .evidence-review-header, .scenario-nav { display: none !important; }",
  });
  await expect(page.locator(".scenario-nav")).toBeHidden();
}

test("Grid default, modes, gaps, and placement", async ({ page }) => {
  await expect(page.getByTestId("grid-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("grid-modes")).toHaveScreenshot("modes-light.png");
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(page, page.getByTestId("grid-gaps"), "gaps-light.png");
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("grid-placement"),
    "placement-light.png",
  );
});

test("Grid appearance, narrow RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.getByTestId("grid-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(page, page.locator("#scenario-grid-appearance"), "theme-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("grid-stress"), "stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("grid-placement"),
    "placement-forced-colors.png",
  );
});
