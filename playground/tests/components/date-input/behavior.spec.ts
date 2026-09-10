import { test, expect } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test("DateInput aligns shared sizes with Input and preserves editable text", async ({ page }) => {
  await page.goto("/date-input");
  const accessibility = await new AxeBuilder({ page }).include('[data-component-page="date-input"]').analyze();
  expect(accessibility.violations.filter(item => ["serious", "critical"].includes(item.impact!))).toEqual([]);
  for (const size of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]) {
    const root = page.getByTestId("date-sizes").locator(`.brick-date-input[data-size="${size}"]`);
    const control = root.locator('.brick-date-input__control');
    const input = root.locator('..').locator('.brick-input');
    expect((await control.boundingBox())!.height).toBe((await input.boundingBox())!.height);
    const touch = await page.evaluate(() => matchMedia("(any-pointer: coarse)").matches);
    const recipeFont = ["2xs", "xs"].includes(size) ? 12 : ["sm", "md"].includes(size) ? 14 : size === "2xl" ? 18 : 16;
    expect(await root.getByRole("spinbutton").first().evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBe(touch ? Math.max(16, recipeFont) : recipeFont);
    await expect(root.getByRole("group").first()).toHaveCSS("gap", "4px");
  }
  expect(await page.getByRole("group", { name: "outline date" }).locator('..').evaluate(node => getComputedStyle(node).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
});
test("DateInput exposes granularities and controlled clear without hiding capabilities", async ({ page }) => {
  await page.goto("/date-input");
  const count = async (name: string) => page.getByRole("group", { name, exact: true }).getByRole("spinbutton").count();
  expect(await count("hour precision")).toBeGreaterThan(await count("day precision"));
  expect(await count("second precision")).toBeGreaterThan(await count("minute precision"));
  const controlled = page.getByRole("region", { name: "Controlled and clear", exact: true });
  await controlled.getByRole("button", { name: "Clear date" }).click();
  await expect(controlled.getByRole("status")).toHaveText("No review date");
  await controlled.getByRole("button", { name: "Reset review date" }).click();
  await expect(controlled.getByRole("status")).toHaveText("2026-09-05");
});
test("DateInput required validation focuses segments and reset restores a zoned datetime", async ({ page }) => {
  await page.goto("/date-input");
  await page.getByRole("button", { name: "Validate dates" }).click();
  await expect(page.getByRole("group", { name: "Appointment", exact: true }).getByRole("spinbutton").first()).toBeFocused();
  const segment = page.getByRole("group", { name: "Zoned appointment", exact: true }).getByRole("spinbutton").first();
  await segment.focus(); await page.keyboard.press("ArrowUp");
  await page.getByRole("button", { name: "Reset dates" }).click();
  await expect(page.locator('input[name="zoned"]')).toHaveValue("2026-09-05T14:30:00-04:00[America/New_York]");
});
