import { expect, test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("alert recipes preserve border geometry and explicit semantics", async ({ page }) => {
  await page.goto("/alert");
  const roots = page.locator('[data-scenario="alert.variants"] .brick-alert');
  const heights = await roots.evaluateAll(elements => elements.map(el => el.getBoundingClientRect().height));
  expect(new Set(heights).size).toBe(1);
  const sizes = page.locator('[data-scenario="alert.sizes"] .brick-alert');
  expect(await sizes.evaluateAll(elements => elements.map(el => getComputedStyle(el).fontSize))).toEqual(["12px", "14px", "16px"]);
  await expect(page.locator('[data-scenario="alert.basic"] .brick-alert')).not.toHaveAttribute("role");
  await expect(page.locator('[data-scenario="alert.loading"] .brick-spinner')).toHaveAttribute("aria-hidden", "true");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("alert composed dismissal restores focus and status remains application owned", async ({ page }) => {
  await page.goto("/alert");
  await page.getByRole("button", { name: "Dismiss notice", exact: true }).click();
  await expect(page.getByRole("button", { name: "Restore notice" })).toBeFocused();
  await expect(page.locator('[data-scenario="alert.close"] .brick-alert')).toHaveCount(0);
  await page.getByRole("button", { name: "Restore notice" }).click();
  await expect(page.locator('[data-scenario="alert.close"] .brick-alert')).toHaveCount(1);
  await page.getByRole("button", { name: "Complete export" }).click();
  await expect(page.getByRole("status")).toContainText("Your export is ready.");
});
test("alert keeps indicators square in narrow RTL and system colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/alert");
  const indicator = page.locator('[data-scenario="alert.narrow"] .brick-alert-indicator');
  const box = await indicator.boundingBox();
  expect(box!.width).toBe(box!.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.emulateMedia({ forcedColors: "active" });
  await expect(page.locator('.brick-alert').first()).toHaveCSS("border-top-style", "solid");
});
