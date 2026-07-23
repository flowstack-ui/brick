import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Tooltip opens from focus and closes with Escape without moving focus", async ({ page }) => {
  await page.goto("/tooltip");
  const trigger = page.getByRole("button", { name: "Search workspace" });
  await trigger.focus();
  await expect(page.getByRole("tooltip")).toContainText("Search workspace");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("Tooltip exposes plain and rich recipes with shared arrows", async ({ page }) => {
  await page.goto("/tooltip");
  const richTrigger = page.getByRole("button", { name: "Project status" });
  await richTrigger.focus();
  const rich = page.getByRole("tooltip");
  await expect(rich).toHaveAttribute("data-variant", "rich");
  await expect(rich.locator("[data-slot='tooltip-title']")).toHaveText("Ready for review");
  await expect(rich.locator("[data-slot='tooltip-description']")).toBeVisible();
  await expect(rich.locator("[data-slot='tooltip-arrow']")).toBeVisible();
  await expect(rich.locator("a,button,input,select,textarea,[tabindex]")).toHaveCount(0);
  // Portalled tooltip content is intentionally outside the page landmarks.
  expect((await new AxeBuilder({ page }).disableRules(["region"]).analyze()).violations).toEqual([]);
});

test("Plain Tooltip preserves positioning and remains open across its hover bridge", async ({ page }) => {
  await page.goto("/tooltip");
  const trigger = page.getByRole("button", { name: "Search workspace" });
  await trigger.hover();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toBeVisible();
  expect(await tooltip.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
  await tooltip.hover();
  await expect(tooltip).toBeVisible();
  await page.locator("h1").hover();
  await expect(tooltip).toBeHidden();
});

test("Tooltip exposes rounded and pill shapes", async ({ page }) => {
  await page.goto("/tooltip");
  const roundedTrigger = page.getByRole("button", { name: "Rounded tooltip" });
  await roundedTrigger.focus();
  await expect(page.getByRole("tooltip", { name: "Rounded tooltip" })).toHaveAttribute("data-shape", "rounded");
  await page.keyboard.press("Escape");
  const pillTrigger = page.getByRole("button", { name: "Pill tooltip" });
  await pillTrigger.focus();
  await expect(page.getByRole("tooltip", { name: "Pill tooltip" })).toHaveAttribute("data-shape", "pill");
});

test("Tooltip arrows overlap the surface border on every side", async ({ page }) => {
  await page.goto("/tooltip");
  for (const name of ["Above", "To the right", "Below", "To the left"]) {
    const trigger = page.getByRole("button", { name });
    await trigger.focus();
    const tooltip = page.getByRole("tooltip", { name });
    const arrow = tooltip.locator("[data-slot='tooltip-arrow']");
    const [surfaceBox, arrowBox, side] = await Promise.all([
      tooltip.boundingBox(),
      arrow.boundingBox(),
      tooltip.getAttribute("data-side"),
    ]);
    expect(surfaceBox).not.toBeNull();
    expect(arrowBox).not.toBeNull();
    if (side === "top") expect(arrowBox!.y).toBeLessThan(surfaceBox!.y + surfaceBox!.height);
    if (side === "right") expect(arrowBox!.x + arrowBox!.width).toBeGreaterThan(surfaceBox!.x);
    if (side === "bottom") expect(arrowBox!.y + arrowBox!.height).toBeGreaterThan(surfaceBox!.y);
    if (side === "left") expect(arrowBox!.x).toBeLessThan(surfaceBox!.x + surfaceBox!.width);
    await page.keyboard.press("Escape");
  }
});

test("Tooltip remains contained in narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/tooltip");
  const rtlTrigger = page.getByRole("button", { name: "البحث في المشاريع والملفات" });
  await rtlTrigger.focus();
  await expect(page.getByRole("tooltip")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const box = await page.getByRole("tooltip").boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(256);
});
