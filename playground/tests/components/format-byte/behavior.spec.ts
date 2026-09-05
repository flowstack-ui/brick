import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("quantities use localized units", async ({ page }) => {
  await page.goto("/format-byte");
  await expect(page.getByTestId("format-byte-output")).toContainText("1.45 kB");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
