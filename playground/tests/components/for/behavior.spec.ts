import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("For preserves keyed child state when a collection reorders", async ({ page }) => {
  await page.goto("/for?qualification=1");
  const input = page.getByRole("textbox", { name: "Note for First item" });
  await input.fill("Keep this note");
  await page.getByRole("button", { name: "Reverse items" }).click();
  await expect(input).toHaveValue("Keep this note");
  await expect(page.getByTestId("for-keyed").locator(":scope > li").first()).toContainText("Second item");
  await expect(page.getByText("No results loaded", { exact: true })).toBeVisible();
});

test("collection and fallback render without wrappers", async ({ page }) => {
  await page.goto("/for?qualification=1");
  await expect(page.getByTestId("for-output").locator("li")).toHaveCount(2);
  await expect(page.getByTestId("for-fallback")).toHaveText("No items");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
