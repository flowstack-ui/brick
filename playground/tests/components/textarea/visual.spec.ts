import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/textarea");

async function removeStickyCaptureOverlap(page: import("@playwright/test").Page) {
  await page.locator(".evidence-app-bar, .evidence-review-header").evaluateAll((elements) => {
    for (const element of elements) (element as HTMLElement).style.display = "none";
  });
}

test("Textarea recipes, geometry, resizing, content, and states", async ({ page }) => {
  await expect(page.getByTestId("textarea-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("textarea-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.getByTestId("textarea-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("textarea-shapes")).toHaveScreenshot("shapes-light.png");
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(page, page.getByTestId("textarea-resize"), "resize-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("textarea-states"), "states-light.png");
});

test("Textarea dark, constrained, RTL, and forced-color evidence", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.getByTestId("textarea-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(page, page.getByTestId("textarea-stress"), "stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.getByTestId("textarea-states"), "states-forced-colors.png");
});
