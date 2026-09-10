import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("numbers use platform locale formatting", async ({ page }) => {
  await page.goto("/format-number");
  await expect(page.getByTestId("format-number-output")).toContainText("$2,499.00");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
