import { expect, test } from "@playwright/test";
test("project labels submit only committed JSON values", async ({ page }) => {
  await page.goto("/");
  const input = page.getByRole("textbox", {
    name: "Project labels",
    exact: true,
  });
  await input.fill("Design");
  await input.press("Enter");
  await input.fill("Uncommitted");
  await page.getByRole("button", { name: "Save labels", exact: true }).click();
  await expect(
    page.getByText('Saved labels: ["Research","Design"]', { exact: true }),
  ).toBeVisible();
});
