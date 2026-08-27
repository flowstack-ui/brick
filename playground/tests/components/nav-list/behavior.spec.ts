import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/nav-list"); });

test("defaults and recipes preserve finished navigation semantics", async ({ page }) => {
  const root = page.getByTestId("nav-list-overview").locator(".brick-nav-list");
  await expect(root).toHaveAttribute("data-orientation", "vertical");
  await expect(root).toHaveAttribute("data-variant", "soft");
  await expect(root).toHaveAttribute("data-tone", "accent");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root.getByRole("link", { name: "Workspace" })).toHaveAttribute("aria-current", "page");
});

test("logical row padding can align leading and trailing content independently", async ({ page }) => {
  const root = page.getByTestId("nav-list-overview").locator(".brick-nav-list");
  const link = root.getByRole("link", { name: "Workspace" });

  await root.evaluate((element) => {
    element.style.setProperty("--brick-nav-list-row-padding-inline-start", "1rem");
    element.style.setProperty("--brick-nav-list-row-padding-inline-end", "2rem");
  });

  await expect(link).toHaveCSS("padding-left", "16px");
  await expect(link).toHaveCSS("padding-right", "32px");
});

test("neutral soft current paint stays visible and changes on hover", async ({ page }) => {
  const root = page.locator('[data-scenario="nav-list.tones"] .brick-nav-list[data-tone="neutral"][data-variant="soft"]').first();
  const current = root.getByRole("link", { name: "Workspace" });
  const before = await current.evaluate((element) => getComputedStyle(element).backgroundColor);
  const foreground = await current.evaluate((element) => getComputedStyle(element).color);
  const parent = await current.evaluate((element) => getComputedStyle(element.parentElement!).backgroundColor);
  expect(before).not.toBe(parent);
  await current.hover();
  await expect.poll(() => current.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(before);
  await expect(current).toHaveCSS("color", foreground);
});

test("accent current foreground survives hover across navigation variants", async ({ page }) => {
  const roots = page.locator('[data-scenario="nav-list.variants"] .brick-nav-list[data-tone="accent"]');

  for (const root of await roots.all()) {
    const current = root.getByRole("link", { name: "Workspace" });
    const foreground = await current.evaluate((element) => getComputedStyle(element).color);
    await current.hover();
    await expect(current).toHaveCSS("color", foreground);
  }
});

test("disclosure updates native state and relationship output", async ({ page }) => {
  const scenario = page.locator('[data-scenario="nav-list.sections"]');
  const trigger = scenario.getByRole("button", { name: "Foundations" });
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const contentId = await trigger.getAttribute("aria-controls");
  expect(contentId).toBeTruthy();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(`#${contentId}`)).toBeHidden();
});

test("disabled links, composition output, horizontal wrap, RTL, and accessibility remain correct", async ({ page }) => {
  const disabled = page.locator('[data-scenario="nav-list.content"] .brick-nav-list__link').filter({ hasText: "Billing" });
  await expect(disabled).toHaveAttribute("aria-disabled", "true");
  const outputs = page.locator('[data-scenario="nav-list.composition"] [data-rendered-output]');
  await expect(outputs).toHaveCount(2);
  await expect(outputs.nth(0)).toContainText("<ol");
  await expect(outputs.nth(1)).toContainText("aria-current");
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.locator('[data-scenario="nav-list.stress"]');
  const box = await stress.boundingBox();
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await expect(stress.locator('[dir="rtl"]')).toHaveCSS("direction", "rtl");
  const results = await new AxeBuilder({ page }).include('[data-component-page="nav-list"]').analyze();
  expect(results.violations).toEqual([]);
});

test("the playground shell consumes public Nav List", async ({ page }) => {
  const navigation = page.getByRole("navigation", { name: "Component navigation" });
  if (await navigation.count() === 0) {
    await page.getByRole("button", { name: "Open component navigation" }).click();
  }
  await expect(navigation).toHaveClass(/brick-nav-list/);
  await expect(navigation.getByRole("link", { name: "Nav List" })).toHaveAttribute("aria-current", "page");
});
