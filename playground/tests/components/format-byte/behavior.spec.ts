import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("quantities use localized units", async ({ page }) => {
  await page.goto("/format-byte?qualification=1");
  await expect(page.getByTestId("format-byte-output")).toContainText("1.45 kB");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("format-byte documentation presents usage, examples and named props", async ({ page }, testInfo) => {
  await page.goto("/format-byte");
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Examples", exact: true })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Props", exact: true })).toBeAttached();
  await expect(page.locator("table").first()).toBeAttached();
  await expect(page.locator("iframe")).toHaveCount(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflow).toBe(false);
  if (testInfo.project.name === "chromium") await page.screenshot({ path: "../../output/playwright/intl-format-byte.png", fullPage: true });
});
