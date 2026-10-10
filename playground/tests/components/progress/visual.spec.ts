import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/progress?qualification=1");
test("documentation examples in both appearances", async ({ page }) => {
  await page.goto("/progress");
  await page.addStyleTag({ content: "[data-playground-app-bar] { visibility: hidden !important; }" });
  for (const appearance of ["light", "dark"] as const) {
    await setAppearance(page, appearance);
    for (const id of ["sizes","variants","inline","buffer"]) {
      const section = page.locator("#"+id);
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByRole("tab", { name: "Preview", exact: true })).toBeVisible();
      await expect(section).toHaveScreenshot("docs-"+id+"-"+appearance+".png");
    }
  }
});
test.beforeEach(async ({ page }) => { await page.addStyleTag({ content: ".brick-app-bar, [data-playground-app-bar], .evidence-review-header, .scenario-nav { display: none !important; }" }); });
test("Progress defaults, recipes, geometry, buffer, and output", async ({ page }) => {
  await expect(page.getByTestId("progress-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("progress-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("progress-tones")).toHaveScreenshot("tones-light.png");
  await expect(page.getByTestId("progress-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("progress-orientation")).toHaveScreenshot("orientation-light.png");
  await expect(page.getByTestId("progress-buffer")).toHaveScreenshot("buffer-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("progress-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.addStyleTag({ content: "[data-playground-app-bar], .evidence-review-header, .scenario-nav { display: none !important; }" });
  await expectEvidenceScreenshot(page, page.locator("#scenario-progress-appearance"), "theme-dark.png");
});
test("Progress mobile and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("progress-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("progress-states")).toHaveScreenshot("states-forced-colors.png");
});
