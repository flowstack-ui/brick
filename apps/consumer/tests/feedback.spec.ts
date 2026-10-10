import { expect, test } from "@playwright/test";
test("search composes loading, empty and error feedback through public subpaths", async ({ page }) => {
  await page.goto("/");
  const region = page.getByRole("region", { name: "Project search feedback" });
  await expect(region.getByRole("heading", { name: "No matching projects" })).toBeVisible();
  await region.getByRole("button", { name: "Search projects", exact: true }).click();
  await expect(region.locator(".brick-spinner")).toHaveAttribute("aria-hidden", "true");
  await expect(region.getByRole("status")).toHaveText("Searching projects…");
  await region.getByRole("button", { name: "Simulate search failure" }).click();
  await expect(region.locator(".brick-alert")).not.toHaveAttribute("role");
  await expect(region.getByRole("textbox", { name: "Project query" })).toHaveValue("archived");
  await region.getByRole("button", { name: "Retry project search" }).click();
  await expect(region.getByRole("status")).toHaveText("One project found.");
  await region.getByRole("button", { name: "Search projects", exact: true }).click();
  await region.getByRole("button", { name: "Complete with no results" }).click();
  await region.getByRole("button", { name: "Reset project filters" }).click();
  await expect(region.getByRole("textbox", { name: "Project query" })).toHaveValue("");
});
