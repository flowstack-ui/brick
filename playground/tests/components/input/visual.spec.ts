import {
  expect,
  expectEvidenceScreenshot,
  installVisualDefaults,
  setAppearance,
  test,
  useForcedColors,
} from "../../visual-harness.js";

installVisualDefaults("/input");

async function removeStickyCaptureOverlap(page: import("@playwright/test").Page) {
  await page
    .locator(".evidence-app-bar, .evidence-review-header")
    .evaluateAll((elements) => {
      for (const element of elements) {
        (element as HTMLElement).style.display = "none";
      }
  });
}

test("Input recipes, geometry, content, and states", async ({ page }) => {
  await expect(page.getByTestId("input-overview")).toHaveScreenshot(
    "overview-light.png",
  );
  await expect(page.getByTestId("input-variants")).toHaveScreenshot(
    "variants-light.png",
  );
  await expect(page.getByTestId("input-sizes")).toHaveScreenshot(
    "sizes-light.png",
  );
  await expect(page.getByTestId("input-shapes")).toHaveScreenshot(
    "shapes-light.png",
  );
  await expect(page.getByTestId("input-adornments")).toHaveScreenshot(
    "adornments-light.png",
  );
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("input-states"),
    "states-light.png",
  );
});

test("Input dark, constrained, RTL, and forced-color evidence", async ({
  page,
}) => {
  await setAppearance(page, "dark");
  await expect(page.getByTestId("input-appearance")).toHaveScreenshot(
    "appearance-dark.png",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("input-stress")).toHaveScreenshot(
    "stress-mobile.png",
  );
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await removeStickyCaptureOverlap(page);
  await expectEvidenceScreenshot(
    page,
    page.getByTestId("input-states"),
    "states-forced-colors.png",
  );
});
