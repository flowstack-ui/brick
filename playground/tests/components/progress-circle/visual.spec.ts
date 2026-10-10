import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/progress-circle?qualification=1");
test("documentation examples in both appearances", async ({ page }) => {
  await page.goto("/progress-circle");
  await page.addStyleTag({ content: "[data-playground-app-bar] { visibility: hidden !important; }" });
  for (const appearance of ["light", "dark"] as const) {
    await setAppearance(page, appearance);
    for (const id of ["sizes","value","thickness","custom-stroke"]) {
      const section = page.locator("#"+id);
      await section.scrollIntoViewIfNeeded();
      await expect(section.getByRole("tab", { name: "Preview", exact: true })).toBeVisible();
      await expect(section).toHaveScreenshot("docs-"+id+"-"+appearance+".png");
    }
  }
});
test.beforeEach(async ({ page }) => { await page.addStyleTag({ content: ".brick-app-bar, [data-playground-app-bar], .evidence-review-header, .scenario-nav { display: none !important; }" }); });
test("Progress Circle defaults, recipes, geometry, and content", async ({ page }) => {
  await expect(page.getByTestId("progress-circle-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("progress-circle-states")).toHaveScreenshot("states-light.png");
  await expect(page.getByTestId("progress-circle-tones")).toHaveScreenshot("tones-light.png");
  await expect(page.getByTestId("progress-circle-sizes")).toHaveScreenshot("sizes-light.png");
  await expect(page.getByTestId("progress-circle-thickness")).toHaveScreenshot("thickness-light.png");
  await expect(page.getByTestId("progress-circle-content")).toHaveScreenshot("content-light.png");
  await setAppearance(page, "dark");
  await expect(page.getByTestId("progress-circle-appearance")).toHaveScreenshot("appearance-dark.png");
  await expectEvidenceScreenshot(page, page.getByTestId("progress-circle-customization"), "customization-dark.png");
});
test("Progress Circle mobile and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("progress-circle-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("progress-circle-states")).toHaveScreenshot("states-forced-colors.png");
});
