import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/text?qualification=1");

async function removeStickyCaptureOverlap(page: import("@playwright/test").Page) {
  await page.addStyleTag({
    content:
      "[data-playground-app-bar], .evidence-review-header, .scenario-nav { display: none !important; }",
  });
  await expect(page.locator(".scenario-nav")).toBeHidden();
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

test("Text default, hierarchy, tones, semantics, and overflow", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.getByTestId("text-overview"), "overview-light.png");
  await expectEvidenceScreenshot(page, page.getByTestId("text-variants"), "variants-light.png");
  await removeStickyCaptureOverlap(page);
  await expect(page.getByTestId("text-tones")).toHaveScreenshot("tones-light.png");
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("text-semantics"),
    "semantics-light.png",
  );
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("text-overflow"),
    "overflow-light.png",
  );
});

test("Text dark, narrow RTL, and forced-color evidence", async ({ page }) => {
  await removeStickyCaptureOverlap(page);
  await setAppearance(page, "dark");
  await expect(page.getByTestId("text-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.getByTestId("text-stress"), "stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("text-tones"),
    "tones-forced-colors.png",
  );
});
