import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/combobox"); });

test("Combobox defaults, filtering, selection, clearing, and keyboard remain integrated", async ({ page }) => {
  const overview = page.locator('[data-scenario="combobox.overview"]'); const input = overview.getByRole("combobox", { name: "City" });
  await expect(overview.locator(".brick-combobox-control")).toHaveAttribute("data-variant", "outline");
  await input.fill("lis");
  const content = page.locator(".brick-combobox-content:visible");
  await expect(content).toHaveAttribute("data-size", "md");
  await expect(page.getByRole("option", { name: "Lisbon" })).toHaveCSS("min-height", "44px"); await input.press("ArrowDown"); await input.press("Enter");
  await expect(input).toHaveValue("Lisbon"); await overview.getByRole("button", { name: "Clear city" }).click(); await expect(input).toHaveValue("");
});

test("chevron toggles and popup matches the complete control width", async ({ page }) => {
  const overview = page.locator('[data-scenario="combobox.overview"]');
  const control = overview.locator(".brick-combobox-control");
  await overview.getByRole("button", { name: "Toggle City options" }).click();
  const content = page.locator(".brick-combobox-content:visible");
  await expect(content).toBeVisible();
  const controlBox = await control.boundingBox();
  const contentBox = await content.boundingBox();
  expect(controlBox).not.toBeNull();
  expect(contentBox).not.toBeNull();
  expect(contentBox!.width).toBeGreaterThanOrEqual(controlBox!.width - 1);
});

test("recipes and RTL retain closed visual contracts", async ({ page }) => {
  const controls = page.locator('[data-scenario="combobox.recipes"] .brick-combobox-control'); await expect(controls).toHaveCount(3);
  for (let i=0;i<3;i+=1) await expect(controls.nth(i)).toHaveAttribute("data-variant", ["outline","soft","underline"][i]);
  await expect(page.locator('[data-scenario="combobox.stress"]').getByRole("combobox", { name: "المدينة" })).toBeVisible();
});

test("playground evidence is concise, aligned, and clearly separated", async ({ page }) => {
  const anatomy = page.locator('[data-scenario="combobox.anatomy"]');
  await expect(anatomy.getByRole("combobox")).toHaveCount(1);
  await expect(anatomy.locator(".playground-output-evidence")).toHaveCSS("overflow", "hidden");
  const codeBlock = anatomy.locator("[data-rendered-output]");
  expect(await codeBlock.evaluate((element) => element.clientHeight)).toBeLessThanOrEqual(160);
  expect(await codeBlock.evaluate((element) => element.scrollHeight)).toBeGreaterThan(await codeBlock.evaluate((element) => element.clientHeight));

  if ((await page.viewportSize())!.width > 760) {
    for (const scenario of ["combobox.behavior", "combobox.states"]) {
      const cells = page.locator(`[data-scenario="${scenario}"] .combobox-cell`);
      const heights = await cells.evaluateAll((nodes) => nodes.map((node) => node.getBoundingClientRect().height));
      for (let index = 0; index < heights.length; index += 2) expect(heights[index]).toBeCloseTo(heights[index + 1], 1);
    }
  }

  const appearance = page.locator('[data-scenario="combobox.appearance"]');
  for (const surface of await appearance.locator(".combobox-appearance-surface").all()) {
    const badgeBox = await surface.locator(".brick-badge").boundingBox();
    const fieldBox = await surface.locator(".brick-field").boundingBox();
    expect(badgeBox).not.toBeNull();
    expect(fieldBox).not.toBeNull();
    expect(fieldBox!.y - badgeBox!.y - badgeBox!.height).toBeGreaterThanOrEqual(8);
  }
  await expect(appearance.getByText("Customized", { exact: true })).not.toHaveAttribute("data-tone", "accent");

  const customization = appearance.locator(".combobox-customization");
  await expect(customization).toHaveCSS("gap", "1px");
  await expect(customization.locator(":scope > *")).toHaveCount(2);
  const stress = page.locator('[data-scenario="combobox.stress"] .combobox-grid');
  await expect(stress).toHaveCSS("gap", "16px");
  await expect(stress.locator(".combobox-cell")).toHaveCount(2);
});

test("option rows inherit small, medium, and large control density", async ({ page }) => {
  const sizing = page.locator('[data-scenario="combobox.sizing"] .combobox-grid').first();
  const triggers = sizing.getByRole("button", { name: "Toggle City options" });
  for (const [index, size] of ["sm", "md", "lg"].entries()) {
    await triggers.nth(index).click();
    const content = page.locator(".brick-combobox-content:visible");
    await expect(content).toHaveAttribute("data-size", size);
    await expect(content.getByRole("option").first()).toHaveCSS("min-height", ["36px", "44px", "52px"][index]);
    await page.keyboard.press("Escape");
  }
});

test("popup positions, flips when constrained, and route has no axe violations", async ({ page }) => {
  const input = page.locator('[data-scenario="combobox.overview"]').getByRole("combobox"); await input.click();
  const content = page.locator(".brick-combobox-content:visible"); await expect(content).toHaveAttribute("data-positioned", "");
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze(); expect(results.violations).toEqual([]);
});

test("portalled options remain below sticky playground navigation while scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const overview = page.locator('[data-scenario="combobox.overview"]');
  await overview.getByRole("button", { name: "Toggle City options" }).click();
  const popup = page.locator(".brick-combobox-content:visible");
  const header = page.locator(".evidence-review-header");

  await page.evaluate(() => window.scrollBy(0, 300));
  await expect(popup).toBeVisible();

  const paintOrder = await page.evaluate(() => {
    const popupElement = document.querySelector<HTMLElement>(".brick-combobox-content");
    const headerElement = document.querySelector<HTMLElement>(".evidence-review-header");
    if (!popupElement || !headerElement) return null;
    const popupRect = popupElement.getBoundingClientRect();
    const headerRect = headerElement.getBoundingClientRect();
    const intersection = {
      left: Math.max(popupRect.left, headerRect.left),
      right: Math.min(popupRect.right, headerRect.right),
      top: Math.max(popupRect.top, headerRect.top),
      bottom: Math.min(popupRect.bottom, headerRect.bottom),
    };
    const x = (intersection.left + intersection.right) / 2;
    const y = (intersection.top + intersection.bottom) / 2;
    return {
      headerContainsTopElement: headerElement.contains(document.elementFromPoint(x, y)),
      headerZIndex: Number(getComputedStyle(headerElement).zIndex),
      intersects: intersection.right > intersection.left && intersection.bottom > intersection.top,
      popupZIndex: Number(getComputedStyle(popupElement).zIndex),
    };
  });

  expect(paintOrder).not.toBeNull();
  expect(paintOrder!.intersects).toBe(true);
  expect(paintOrder!.popupZIndex).toBeLessThan(paintOrder!.headerZIndex);
  expect(paintOrder!.headerContainsTopElement).toBe(true);
});
