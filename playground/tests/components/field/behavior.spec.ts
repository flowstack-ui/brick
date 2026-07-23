import { expect, test } from "@playwright/test";

test("Field owns label focus and descriptive relationships", async ({ page }) => {
  await page.goto("/field");
  const overview = page.getByTestId("form-foundation-overview");
  await overview.locator("label").filter({ hasText: "Work email" }).click();
  const input = overview.getByRole("textbox", { name: "Work email" });
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-describedby", /description/);
});
