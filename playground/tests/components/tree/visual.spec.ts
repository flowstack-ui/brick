import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";

installVisualDefaults("/tree?qualification=1");

test("public guides and checking recipes", async ({ page }) => {
  await page.goto("/tree");
  const disclosure = page.getByRole("tree", { name: "Disclosure-only files", exact: true });
  await disclosure.getByRole("button", { name: "Toggle project folder" }).click();
  for (const appearance of ["light", "dark"] as const) {
    await setAppearance(page, appearance);
    await expect(page.getByRole("tree", { name: "Guided hierarchy", exact: true })).toHaveScreenshot(`guided-artwork-${appearance}.png`);
    const checks = page.getByRole("tree", { name: "Files to include", exact: true });
    await checks.evaluate(node => node.scrollIntoView({ block: "center" }));
    await page.mouse.move(0, 0);
    await expect(checks).toHaveScreenshot(`checking-${appearance}.png`, { maxDiffPixelRatio: 0 });
    await disclosure.evaluate(node => node.scrollIntoView({ block: "center" }));
    await expect(disclosure).toHaveScreenshot(`disclosure-aligned-${appearance}.png`, { maxDiffPixelRatio: 0 });
  }
});

test("public file explorer icons in light and dark", async ({ page }) => {
  await page.goto("/tree");
  const tree = page.getByRole("tree", { name: "Project files", exact: true }).first();
  for (const appearance of ["light", "dark"] as const) {
    await setAppearance(page, appearance);
    await expect(tree).toHaveScreenshot(`file-icons-${appearance}.png`, { maxDiffPixelRatio: 0 });
  }
});

test("Tree defaults, recipes, sizing, and selection", async ({ page }) => {
  await page.setViewportSize({ width: 1120, height: 1400 });
  await expect(page.locator("#scenario-tree-overview")).toHaveScreenshot("overview-light.png");
  await expect(page.locator("#scenario-tree-variants")).toHaveScreenshot("variants-light.png");
  await expect(page.locator("#scenario-tree-sizing")).toHaveScreenshot("sizing-light.png");
  await expect(page.locator("#scenario-tree-selection")).toHaveScreenshot("selection-light.png");
});

test("Tree appearance, responsive RTL, and forced colors", async ({ page }) => {
  await page.addStyleTag({ content: ".evidence-review-header { position: static !important; }" });
  await setAppearance(page, "dark");
  await page.setViewportSize({ width: 1120, height: 1600 });
  await expect(page.locator("#scenario-tree-appearance")).toHaveScreenshot("appearance-dark.png");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#scenario-tree-stress .tree-cell").first()).toHaveScreenshot("responsive-mobile.png");
  await expect(page.locator("#scenario-tree-stress .tree-cell").last()).toHaveScreenshot("rtl-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.locator("#scenario-tree-overview")).toHaveScreenshot("overview-forced-colors.png");
});
