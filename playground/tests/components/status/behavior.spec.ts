import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/status");
});

test("keeps passive state text and decorative indicator semantics", async ({
  page,
}) => {
  const status = page.getByTestId("status-overview");
  await expect(status).toContainText("Available");
  await expect(status).not.toHaveAttribute("role");
  await expect(status).not.toHaveAttribute("aria-live");
  await expect(
    status.locator("[data-slot='status-indicator']"),
  ).toHaveAttribute("aria-hidden", "true");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
