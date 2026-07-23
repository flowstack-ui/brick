import { expect, test } from "@playwright/test";

test("CheckboxGroup owns parent and item selection behavior", async ({ page }) => {
  await page.goto("/checkbox");
  const stage = page.getByTestId("checkbox-overview");
  const parent = stage.getByRole("checkbox", { name: "All release channels" });
  await parent.click();
  for (const name of ["Email", "SMS", "Push notifications"]) {
    await expect(stage.getByRole("checkbox", { name })).toHaveAttribute("aria-checked", "true");
  }
  await expect(parent).toHaveAttribute("aria-checked", "true");
});
