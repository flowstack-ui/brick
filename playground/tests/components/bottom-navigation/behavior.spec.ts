import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/bottom-navigation"); });

test("defaults expose the complete visual and behavioral contract", async ({ page }) => {
  const navigation = page.getByTestId("bottom-navigation-overview").getByRole("navigation");
  await expect(navigation).toHaveAttribute("data-variant", "outline");
  await expect(navigation).toHaveAttribute("data-tone", "accent");
  await expect(navigation).toHaveAttribute("data-layout", "full");
  await expect(navigation).toHaveAttribute("data-arrangement", "equal");
  await expect(navigation).toHaveAttribute("data-size", "md");
  await expect(navigation).toHaveAttribute("data-position", "static");
  await expect(navigation).toHaveAttribute("data-selection", "indicator");
  await expect(navigation).toHaveAttribute("data-selection-shape", "pill");
  await expect(navigation).toHaveAttribute("data-label-visibility", "always");
  await expect(navigation).toHaveAttribute("data-safe-area", "");
  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
});

test("recipes, layouts, arrangements, sizes, and positions are closed and observable", async ({ page }) => {
  const recipes = page.getByTestId("bottom-navigation-recipes").locator(".brick-bottom-navigation");
  await expect(recipes).toHaveCount(8);
  expect(await recipes.evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute("data-variant")))] .sort())).toEqual(["ghost", "outline", "soft", "solid"]);
  expect(await recipes.evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute("data-tone")))] .sort())).toEqual(["accent", "neutral"]);
  const layoutBars = page.getByTestId("bottom-navigation-layout").locator(".brick-bottom-navigation");
  await expect(layoutBars).toHaveCount(4);
  await expect(layoutBars.nth(1)).toHaveAttribute("data-layout", "floating");
  await expect(layoutBars.nth(3)).toHaveAttribute("data-arrangement", "centered");
  const sizes = page.getByTestId("bottom-navigation-size-position").locator('[data-size]');
  expect(await sizes.evaluateAll((nodes) => [...new Set(nodes.map((node) => node.getAttribute("data-size")))] .sort())).toEqual(["lg", "md", "sm"]);
  const positionGroup = page.getByTestId("bottom-navigation-size-position").locator(".bottom-navigation-group").nth(1);
  for (const position of ["static", "sticky", "absolute", "fixed"]) {
    await expect(positionGroup.locator(`[data-position="${position}"]`)).toHaveCSS("position", position);
  }
});

test("selection targets, label policies, content, and controlled state remain distinct", async ({ page }) => {
  const selection = page.getByTestId("bottom-navigation-selection");
  await expect(selection.locator('[data-selection="indicator"]')).toHaveCount(3);
  await expect(selection.locator('[data-selection="item"]')).toHaveCount(3);
  const circle = selection.locator('[data-selection="indicator"][data-selection-shape="circle"] .brick-bottom-navigation__icon').first();
  const circleBox = await circle.boundingBox();
  expect(Math.abs(circleBox!.width - circleBox!.height)).toBeLessThan(1);

  const content = page.getByTestId("bottom-navigation-labels-content");
  const labelGroup = content.locator(".bottom-navigation-group").first();
  for (const policy of ["always", "active", "hidden"]) await expect(labelGroup.locator(`[data-label-visibility="${policy}"]`)).toHaveCount(1);
  await expect(labelGroup.locator('[data-label-visibility="hidden"]').getByRole("link", { name: "Search" })).toBeVisible();
  const countBars = content.locator(".bottom-navigation-group").nth(1).getByRole("navigation");
  await expect(countBars.nth(0).getByRole("link")).toHaveCount(3);
  await expect(countBars.nth(1).getByRole("link")).toHaveCount(4);
  await expect(countBars.nth(2).getByRole("link")).toHaveCount(5);
  await expect(content.locator(".brick-notification-badge__indicator")).toHaveText("4");

  const behavior = page.getByTestId("bottom-navigation-behavior");
  await behavior.getByRole("button", { name: "Search" }).click();
  await expect(behavior.getByTestId("bottom-navigation-value")).toHaveText("Current view: search");
  await expect(behavior.getByRole("button", { name: "Inbox" })).toBeDisabled();
  const composed = behavior.locator('[data-router-link="docs"]');
  await expect(composed).toHaveAttribute("href", "#bottom-navigation-docs");
  await expect(composed).toHaveClass(/brick-bottom-navigation__item/);
});

test("effects, neutral palette, safe area, mobile, RTL, and accessibility hold", async ({ page }) => {
  const effects = page.getByTestId("bottom-navigation-effects");
  await expect(effects.locator("[data-elevated]")).toHaveCSS("box-shadow", /.+/);
  await expect(effects.locator("[data-blurred]")).toHaveCSS("backdrop-filter", /blur/);
  const neutral = page.getByTestId("bottom-navigation-recipes").locator('[data-tone="neutral"][data-variant="outline"]').first();
  expect(await neutral.evaluate((node) => {
    const style = getComputedStyle(node);
    return style.getPropertyValue("--brick-bottom-navigation-item-foreground-active").trim() === style.getPropertyValue("--brick-color-text-primary").trim();
  })).toBe(true);
  const stress = page.getByTestId("bottom-navigation-stress");
  await expect(stress.getByRole("navigation").last()).not.toHaveAttribute("data-safe-area");
  await expect(stress.getByRole("navigation", { name: "التنقل الرئيسي" })).toHaveCSS("direction", "rtl");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("html").evaluate((node) => node.scrollWidth)).toBeLessThanOrEqual(390);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
