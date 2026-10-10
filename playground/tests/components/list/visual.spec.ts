import { expectEvidenceScreenshot, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/list?qualification=1");

test.beforeEach(async ({ page }) => {
  // The sticky documentation shell is not part of List's visual evidence.
  await page.getByRole("banner", { name: "Brick playground" }).evaluate(node => { node.style.visibility = "hidden"; });
});

test("List documentation typography and first-line icons", async ({ page }) => {
  await page.goto("/list?appearance=light&font=inter");
  await page.getByRole("banner", { name: "Brick playground" }).evaluate(node => { node.style.visibility = "hidden"; });
  await expectEvidenceScreenshot(page, page.locator("#icons"), "docs-icons-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.locator("#typography"), "docs-typography-light.png", { maxDiffPixelRatio: 0 });
  await page.goto("/list?appearance=dark&font=inter");
  await page.getByRole("banner", { name: "Brick playground" }).evaluate(node => { node.style.visibility = "hidden"; });
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#markers"), "docs-markers-dark-mobile.png", { maxDiffPixelRatio: 0 });
});

test("List defaults, recipes, markers, and structured anatomy", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1600 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-overview"), "overview-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-variants"), "variants-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-sizing"), "sizing-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-markers"), "markers-light.png", { maxDiffPixelRatio: 0 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-anatomy"), "anatomy-light.png", { maxDiffPixelRatio: 0 });
});

test("List appearance, customization, mobile RTL, and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1200 });
  await setAppearance(page, "dark");
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-appearance"), "appearance-dark.png", { maxDiffPixelRatio: 0 });
  await page.setViewportSize({ width: 390, height: 844 });
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-stress"), "stress-mobile.png", { maxDiffPixelRatio: 0 });
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expectEvidenceScreenshot(page, page.locator("#scenario-list-appearance"), "appearance-forced-colors.png", { maxDiffPixelRatio: 0 });
});
