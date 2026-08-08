import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/carousel"); await expect(page.getByRole("group", { name: "Flowstack story" }).first()).toBeVisible(); });

test("Carousel navigates with arrows and picker dots", async ({ page }) => {
  const root = page.locator("#scenario-carousel-overview .brick-carousel");
  await root.hover();
  await root.getByRole("button", { name: "Next slide" }).click();
  await expect(root.getByRole("button", { name: "Launch faster" })).toHaveAttribute("data-state", "active");
  await root.getByRole("button", { name: "Grow without rewrites" }).click();
  await expect(root.getByText("A foundation that scales.")).toBeVisible();
});

test("Carousel permits control-free and picker-only composition", async ({ page }) => {
  const scenario = page.locator("#scenario-carousel-controls");
  await expect(scenario.getByRole("group", { name: "Manual story" }).getByRole("button")).toHaveCount(0);
  await expect(scenario.getByRole("group", { name: "Picker story" }).getByRole("button")).toHaveCount(3);
});

test("Carousel exposes rotation control, mobile containment, and no axe violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const root = page.locator("#scenario-carousel-rotation .brick-carousel");
  await expect(root.getByRole("button", { name: "Stop slide rotation" })).toBeVisible();
  await root.getByRole("button", { name: "Stop slide rotation" }).click();
  await expect(root.getByRole("button", { name: "Start slide rotation" })).toBeVisible();
  expect((await new AxeBuilder({ page }).include("#scenario-carousel-rotation").analyze()).violations).toEqual([]);
  expect(await root.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
});

test("Carousel keeps interaction arrows keyboard reachable and picker treatment independent", async ({ page }) => {
  const root = page.locator("#scenario-carousel-rotation .brick-carousel");
  const navigation = root.locator(".brick-carousel__navigation");
  const picker = root.locator(".brick-carousel__picker");
  await expect(navigation).toHaveAttribute("data-visibility", "interaction");
  await expect(picker).toHaveAttribute("data-variant", "bare");
  await expect(root.getByRole("button", { name: "Stop slide rotation" })).toHaveAttribute("data-size", "xs");
  await expect(navigation).toHaveCSS("opacity", "0");
  await root.getByRole("button", { name: "Previous slide" }).focus();
  await expect(navigation).toHaveCSS("opacity", "1");
  await expect(root.getByRole("button", { name: "Previous slide" })).toBeFocused();
});

test("Carousel loop preserves forward direction across the last boundary", async ({ page }) => {
  const root = page.locator("#scenario-carousel-overview .brick-carousel");
  const next = root.getByRole("button", { name: "Next slide" });
  await root.hover();
  await next.click();
  await next.click();
  await next.click();
  await expect(root.locator('[data-slot="carousel-slide"][data-value="build"]')).toHaveAttribute("data-state", "active");
  await expect(root.locator('[data-slot="carousel-slide"][data-value="build"]')).not.toHaveAttribute("data-loop-position", "before");
});
