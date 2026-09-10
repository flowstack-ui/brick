import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("nested locales preserve translated labels and explicit names win", async ({ page }) => {
  await page.goto("/locale-provider");
  await expect(page.getByText("German amount: 1.234,5")).toBeVisible();
  await expect(page.getByRole("button", { name: "Fermer", exact: true })).toHaveCount(2);
  await expect(page.getByRole("button", { name: "Fermer les paramètres", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Effacer la date", exact: true }).click();
  await expect(page.getByRole("spinbutton").first()).not.toHaveAttribute("aria-valuenow");
});

test("locale and direction are inherited without an extra host", async ({ page }) => {
  await page.goto("/locale-provider");
  const output = page.getByTestId("locale-provider-output");
  await expect(output).toHaveCSS("direction", "rtl");
  await expect(output).toContainText("١٢٣٬٤٥٦٫٧٨");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
