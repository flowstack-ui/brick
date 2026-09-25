import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("Button workbench loads public CSS and switches appearance", async ({ page }) => {
  await page.goto("/button?qualification=1");

  await expect(page.getByTestId("button-workbench")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Button", exact: true })).toBeVisible();

  const accent = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--brick-color-accent-solid").trim(),
  );
  expect(accent).not.toBe("");

  await page.getByRole("button", { name: "Preview settings", exact: true }).click();
  await page.getByLabel("Appearance", { exact: true }).selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-brick-appearance", "dark");
});

test("Button canonical state has no detectable axe violations", async ({ page }) => {
  await page.goto("/button?qualification=1");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("Card canonical state has no detectable axe violations", async ({ page }) => {
  await page.goto("/card");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
