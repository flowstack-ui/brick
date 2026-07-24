import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/stack");

async function removeStickyCaptureOverlap(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content:
      ".evidence-app-bar, .evidence-review-header, .scenario-nav { display: none !important; }",
  });
  await expect(page.locator(".scenario-nav")).toBeHidden();
}

test("Stack defaults, family, gaps, alignment, and wrapping", async ({ page }) => {
  await expect(page.getByTestId("stack-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("stack-family")).toHaveScreenshot("family-light.png");
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(page, page.getByTestId("stack-gaps"), "gaps-light.png");
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("stack-alignments"),
    "alignment-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("stack-wrapping"),
    "wrapping-light.png",
  );
});

test("Stack appearance, customization, narrow RTL, and forced colors", async ({ page }) => {
  await setAppearance(page, "dark");
  await expect(page.getByTestId("stack-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("stack-stress"),
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("stack-family"),
    "family-forced-colors.png",
  );
});
