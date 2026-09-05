import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("locale and direction are inherited without an extra host", async ({ page }) => {
  await page.goto("/locale-provider");
  const output = page.getByTestId("locale-provider-output");
  await expect(output).toHaveCSS("direction", "rtl");
  await expect(output).toContainText("١٢٣٬٤٥٦٫٧٨");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
