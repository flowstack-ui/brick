import { expect, test } from "@playwright/test";

test("Fieldset owns native group and description relationships", async ({ page }) => {
  await page.goto("/fieldset");
  const fieldset = page.getByTestId("fieldset-groups").locator("#notification-methods");
  await expect(fieldset).toHaveAttribute(
    "aria-describedby",
    "notification-methods-description notification-methods-error",
  );
  await expect(fieldset.locator('[data-slot="checkbox-group"]')).toHaveAttribute(
    "aria-labelledby",
    "notification-methods-legend",
  );
});
