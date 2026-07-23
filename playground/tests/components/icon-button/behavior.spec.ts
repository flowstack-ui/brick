import { expect, test } from "@playwright/test";

test("IconButton owns named action and link behavior", async ({ page }) => {
  await page.goto("/icon-button");
  const action = page.getByRole("button", { name: "Search workspace" });
  await action.click();
  await expect(page.getByText("Activated 1 times")).toBeVisible();
  const link = page.getByRole("link", { name: "Read documentation" });
  await expect(link).toHaveAttribute("href", "#icon-button-docs");
  await expect(link).not.toHaveAttribute("role", "button");
});
