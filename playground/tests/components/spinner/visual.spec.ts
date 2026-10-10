import { expect, expectEvidenceScreenshot, installVisualDefaults, setAppearance, test } from "../../visual-harness.js";
installVisualDefaults("/spinner?qualification=1");
test("spinner size and weight recipes", async ({ page }) => {
  await expectEvidenceScreenshot(page, page.locator('[data-scenario="spinner.sizes"]'), "sizes-light.png");
});
test("Spinner docs paint and artwork in both appearances", async ({ page }) => {
  await page.goto("/spinner");
  for (const appearance of ["light", "dark"] as const) {
    await setAppearance(page, appearance);
    for (const id of ["sizes", "track", "thickness", "custom-indicator", "overlay"]) {
      const example = page.locator(`#${id} [role="tabpanel"]`).first();
      await expect(example).toHaveScreenshot(`${id === "sizes" && appearance === "light" ? "docs-sizes" : id}-${appearance}.png`);
    }
  }
});
