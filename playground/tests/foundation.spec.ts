import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("foundation loads public CSS and switches appearance", async ({ page }) => {
  await page.goto("/");

  const canvas = page.getByTestId("foundation-canvas");
  await expect(canvas).toBeVisible();
  await expect(page.getByRole("heading", { name: "The public package is ready for component design." })).toBeVisible();

  const accent = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--brick-color-accent-solid").trim(),
  );
  expect(accent).not.toBe("");

  await page.getByRole("button", { name: "dark" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-brick-appearance", "dark");
});

test("foundation canonical state has no detectable axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
