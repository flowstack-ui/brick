import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/scroll-area"); });

test("defaults and every physical axis produce native scrolling", async ({ page }) => {
  const viewport = page.getByTestId("scroll-area-default").locator(".brick-scroll-area-viewport");
  await expect(viewport).toHaveAttribute("role", "region");
  await expect(viewport).toHaveAttribute("tabindex", "0");
  await expect(viewport).toHaveCSS("overflow-y", "auto");
  expect(await viewport.evaluate((node) => node.scrollHeight > node.clientHeight)).toBe(true);
  await viewport.evaluate((node) => { node.scrollTop = 80; });
  expect(await viewport.evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
  const horizontal = page.locator('[data-scenario="scroll-area.orientations"]').locator('[data-orientation="horizontal"] .brick-scroll-area-viewport');
  expect(await horizontal.evaluate((node) => node.scrollWidth > node.clientWidth)).toBe(true);
});

test("gutter and visibility remain explicit without removing scrolling", async ({ page }) => {
  const stable = page.locator('[data-scenario="scroll-area.gutter"]').locator('[data-scrollbar-gutter="stable"] .brick-scroll-area-viewport');
  await expect(stable).toHaveCSS("scrollbar-gutter", "stable");
  const always = page.locator('[data-scenario="scroll-area.visibility"]').locator('[data-scrollbar-visibility="always"] .brick-scroll-area-viewport');
  await expect(always).toHaveCSS("overflow-y", "scroll");
  const root = page.locator('[data-scenario="scroll-area.visibility"]').locator('[data-scrollbar-visibility="interaction"]');
  const interaction = root.locator(".brick-scroll-area-viewport");
  const rest = await interaction.evaluate((node) => getComputedStyle(node).scrollbarColor);
  await root.hover();
  expect(await interaction.evaluate((node) => getComputedStyle(node).scrollbarColor)).not.toBe(rest);
});

test("composition, refs, reflow, and accessibility remain sound", async ({ page }) => {
  await page.getByRole("button", { name: "Inspect viewport ref" }).click();
  await expect(page.getByText("Ref host: ARTICLE")).toBeVisible();
  await expect(page.locator('[data-scenario="scroll-area.composition"]').locator("[data-rendered-output]")).toContainText("Composed timeline");
  await page.setViewportSize({ width: 390, height: 844 });
  const box = await page.locator('[data-scenario="scroll-area.stress"]').boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  const results = await new AxeBuilder({ page }).include('[data-component-page="scroll-area"]').analyze();
  expect(results.violations).toEqual([]);
});
