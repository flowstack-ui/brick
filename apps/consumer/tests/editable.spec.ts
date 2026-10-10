import { expect, test } from "@playwright/test";
test("document rename commits and cancels in a consumer", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Edit title", exact: true }).click();
  const input = page.getByRole("textbox", {
    name: "Document title",
    exact: true,
  });
  await input.fill("Release notes");
  await page.getByRole("button", { name: "Save title", exact: true }).click();
  await expect(
    page.getByText("Saved document: Release notes", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Edit title", exact: true }).click();
  await input.fill("Uncommitted");
  await page
    .getByRole("button", { name: "Cancel rename", exact: true })
    .click();
  await expect(
    page.getByText("Saved document: Release notes", { exact: true }),
  ).toBeVisible();
});
