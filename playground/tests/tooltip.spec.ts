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
