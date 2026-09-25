import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("numbers use platform locale formatting", async ({ page }) => {
  await page.goto("/format-number?qualification=1");
  await expect(page.getByTestId("format-number-output")).toContainText("$2,499.00");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("format-number documentation presents usage, examples and named props", async ({ page }, testInfo) => {
  await page.goto("/format-number");
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Examples", exact: true })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Props", exact: true })).toBeAttached();
  await expect(page.locator("table").first()).toBeAttached();
  await expect(page.locator("iframe")).toHaveCount(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflow).toBe(false);
  if (testInfo.project.name === "chromium") await page.screenshot({ path: "../../output/playwright/intl-format-number.png", fullPage: true });
});
