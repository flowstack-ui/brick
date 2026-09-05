import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("collection and fallback render without wrappers", async ({ page }) => {
  await page.goto("/for");
  await expect(page.getByTestId("for-output").locator("li")).toHaveCount(2);
  await expect(page.getByTestId("for-fallback")).toHaveText("No items");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
