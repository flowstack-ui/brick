import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("HoverCard opens from keyboard focus, closes with Escape, and keeps link focus", async ({ page }) => {
  await page.goto("/hover-card");
  const trigger = page.getByRole("link", { name: "Ada Lovelace" });
  await trigger.focus();
  const content = page.locator("[data-slot='hover-card']").filter({ hasText: "Mathematician" });
  await expect(content).toBeVisible();
  await expect(content).not.toHaveAttribute("role");
  await expect(trigger).not.toHaveAttribute("aria-expanded");
  await expect(trigger).not.toHaveAttribute("aria-haspopup");
  await page.keyboard.press("Escape");
  await expect(content).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("HoverCard remains open across the pointer bridge and contains no interactive descendants", async ({ page }) => {
  await page.goto("/hover-card");
  const trigger = page.getByRole("link", { name: "Grace Hopper" });
  await trigger.hover();
  const content = page.locator("[data-slot='hover-card']").filter({ hasText: "compiler pioneer" });
  await expect(content).toBeVisible();
  await content.hover();
  await page.waitForTimeout(150);
  await expect(content).toBeVisible();
  await expect(content.locator("a,button,input,select,textarea,[tabindex]" )).toHaveCount(0);
});

test("HoverCard exposes the three bounded sizes, optional shared Arrow, and disabled state", async ({ page }) => {
  await page.goto("/hover-card");
  for (const size of ["sm", "md", "lg"] as const) {
    await page.getByRole("link", { name: `${size} preview` }).focus();
    const content = page.locator(`[data-slot='hover-card'][data-size='${size}']`);
    await expect(content).toBeVisible();
    await expect(content.locator("[data-slot='hover-card-arrow']")).toBeVisible();
    await page.keyboard.press("Escape");
  }

  await page.getByRole("link", { name: "Left, no arrow" }).focus();
  const noArrow = page.locator("[data-slot='hover-card']").filter({ hasText: "early computing" });
  await expect(noArrow).toBeVisible();
  await expect(noArrow.locator("[data-slot='hover-card-arrow']")).toHaveCount(0);
  await page.keyboard.press("Escape");

  await page.getByRole("link", { name: "Disabled preview" }).focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "must not open" })).toHaveCount(0);
});

test("HoverCard keeps its genuine link contract and passes the focused accessibility audit", async ({ page }) => {
  await page.goto("/hover-card");
  const link = page.getByRole("link", { name: "Compiler project notes" });
  await expect(link).toHaveAttribute("href", "#scenario-composition");
  await link.focus();
  await expect(page.locator("[data-slot='hover-card']").filter({ hasText: "12 minute read" })).toBeVisible();
  // Portalled preview content is intentionally generic and outside landmarks.
  expect((await new AxeBuilder({ page }).disableRules(["region"]).analyze()).violations).toEqual([]);
});

test("HoverCard remains contained at 256 px and supports RTL logical layout", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/hover-card");
  await page.getByRole("link", { name: "ملف آدا لوفلايس" }).focus();
  const content = page.locator("[data-slot='hover-card']").filter({ hasText: "عالمة رياضيات" });
  await expect(content).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const box = await content.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(256);
});
