import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("nested locales preserve translated labels and explicit names win", async ({ page }) => {
  await page.goto("/locale-provider?qualification=1");
  await expect(page.getByText("German amount: 1.234,5")).toBeVisible();
  await expect(page.getByRole("button", { name: "Fermer", exact: true })).toHaveCount(2);
  await expect(page.getByRole("button", { name: "Fermer les paramètres", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Effacer la date", exact: true }).click();
  await expect(page.getByRole("spinbutton").first()).not.toHaveAttribute("aria-valuenow");
});

test("locale and direction are inherited without an extra host", async ({ page }) => {
  await page.goto("/locale-provider?qualification=1");
  const output = page.getByTestId("locale-provider-output");
  await expect(output).toHaveCSS("direction", "rtl");
  await expect(output).toContainText("١٢٣٬٤٥٦٫٧٨");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("locale-provider documentation presents usage, examples and named props", async ({ page }, testInfo) => {
  await page.goto("/locale-provider");
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Examples", exact: true })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Props", exact: true })).toBeAttached();
  await expect(page.locator("table").first()).toBeAttached();
  await expect(page.locator("iframe")).toHaveCount(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(overflow).toBe(false);
  if (testInfo.project.name === "chromium") await page.screenshot({ path: "../../output/playwright/intl-locale-provider.png", fullPage: true });
});
