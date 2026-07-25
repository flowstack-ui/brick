import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/divider"); });

test("default and semantics preserve the adopted Atom contract", async ({ page }) => {
  const divider = page.getByTestId("divider-default");
  await expect(divider).toHaveJSProperty("tagName", "HR");
  await expect(divider).toHaveAttribute("role", "none");
  await expect(divider).toHaveAttribute("data-orientation", "horizontal");
  await expect(divider).toHaveAttribute("data-variant", "solid");
  await expect(divider).toHaveAttribute("data-thickness", "subtle");
  await expect(divider).toHaveAttribute("data-inset", "none");
  const semantic = page.getByTestId("divider-semantics").locator('[role="separator"]');
  await expect(semantic).toHaveAttribute("aria-label", "Archived workspace");
});

test("orientation, variants, thickness, inset, and labels are controlled", async ({ page }) => {
  const vertical = page.getByTestId("divider-orientations").locator('[data-orientation="vertical"]');
  await expect(vertical).toHaveCSS("align-self", "stretch");
  expect((await vertical.boundingBox())?.height).toBeGreaterThan(20);
  const styles = await page.getByTestId("divider-variants").locator(".brick-divider").evaluateAll((items) => items.map((item) => getComputedStyle(item).borderTopStyle));
  expect(styles).toEqual(["solid", "dashed", "dotted"]);
  const widths = await page.getByTestId("divider-thicknesses").locator(".brick-divider").evaluateAll((items) => items.map((item) => getComputedStyle(item).borderTopWidth));
  expect(widths).toEqual(["1px", "2px", "4px"]);
  const labels = page.getByTestId("divider-labels").locator(".brick-divider");
  await expect(labels).toHaveCount(3);
  await expect(labels.nth(0)).toHaveAttribute("data-label-align", "start");
  await expect(labels.nth(2)).toHaveAttribute("data-label-align", "end");
});

test("composition, customization, RTL, reflow, and accessibility remain sound", async ({ page }) => {
  await expect(page.getByTestId("divider-semantics").locator("[data-rendered-output]")).toContainText("Composed section boundary");
  await page.getByRole("button", { name: "Inspect ref" }).click();
  await expect(page.getByText("Ref host: HR")).toBeVisible();
  const custom = page.getByTestId("divider-appearance").locator(".divider-customization .brick-divider");
  expect(await custom.evaluate((element) => getComputedStyle(element).borderTopColor)).not.toBe("rgba(0, 0, 0, 0)");
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("divider-stress");
  const box = await stress.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).include('[data-component-page="divider"]').analyze();
  expect(results.violations).toEqual([]);
});
