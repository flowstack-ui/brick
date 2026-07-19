import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("IconButton preserves named action and link semantics", async ({ page }) => {
  await page.goto("/icon-button");
  const action = page.getByRole("button", { name: "Search workspace" });
  await action.click();
  await expect(page.getByText("Activated 1 times")).toBeVisible();
  await action.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Activated 2 times")).toBeVisible();

  const link = page.getByRole("link", { name: "Read documentation" });
  await expect(link).toHaveAttribute("href", "#icon-button-docs");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(link).not.toHaveAttribute("role", "button");
});

test("IconButton exposes closed recipes and inactive states", async ({ page }) => {
  await page.goto("/icon-button");
  await expect(page.getByTestId("icon-button-variants").locator(".brick-icon-button")).toHaveCount(4);
  await expect(page.getByTestId("icon-button-tones").locator(".brick-icon-button")).toHaveCount(6);
  await expect(page.getByTestId("icon-button-sizes").locator(".brick-icon-button")).toHaveCount(7);
  await expect(page.getByRole("button", { name: "Disabled search" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Loading search" })).toHaveAttribute("aria-busy", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("AppBar preserves exact anatomy, density, and structural toolbar semantics", async ({ page }) => {
  await page.goto("/app-bar");
  const bar = page.locator(".brick-app-bar[aria-label='static surface example']").first();
  await expect(bar).toHaveAttribute("data-position", "static");
  await expect(bar).toHaveAttribute("data-variant", "surface");
  await expect(bar.locator("[data-slot='appbar-toolbar']")).toHaveAttribute("data-density", "comfortable");
  await expect(bar.locator("[data-slot='appbar-toolbar']")).not.toHaveAttribute("role");
  await expect(bar.locator("[data-slot='appbar-start']")).toBeVisible();
  await expect(bar.locator("[data-slot='appbar-center']")).toHaveCount(1);
  await expect(bar.locator("[data-slot='appbar-end']")).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("AppBar applies every public positioning mode", async ({ page }) => {
  await page.goto("/app-bar");
  for (const position of ["static", "absolute", "sticky", "fixed"] as const) {
    const bar = page.locator(`.brick-app-bar[aria-label='${position} position sample']`);
    await expect(bar).toHaveAttribute("data-position", position);
    expect(await bar.evaluate((element) => getComputedStyle(element).position)).toBe(position);
  }
});

test("IconButton and AppBar stay contained on narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/icon-button");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.goto("/app-bar");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const rtl = page.locator(".brick-app-bar[aria-label='شريط التطبيق']");
  const start = rtl.locator("[data-slot='appbar-start']");
  const end = rtl.locator("[data-slot='appbar-end']");
  const [startBox, endBox] = await Promise.all([start.boundingBox(), end.boundingBox()]);
  expect(startBox).not.toBeNull();
  expect(endBox).not.toBeNull();
  expect(startBox!.x).toBeGreaterThan(endBox!.x);
});

test("IconButton and AppBar keep visible boundaries in forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/icon-button");
  const iconButton = page.getByRole("button", { name: "outline menu" });
  expect(await iconButton.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderTopWidth))).toBeGreaterThanOrEqual(1);
  await page.goto("/app-bar");
  const bar = page.locator(".brick-app-bar[aria-label='static surface example']").first();
  expect(await bar.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderBottomWidth))).toBeGreaterThanOrEqual(1);
});
