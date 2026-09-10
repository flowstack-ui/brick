import { expect, test } from "@playwright/test";

test("workspace metrics, action chips and chronology compose through public imports", async ({ page }) => {
  await page.goto("/");
  const region = page.getByRole("region", { name: "Workspace usage and activity" });
  await expect(region.getByText("$12,450", { exact: true })).toBeVisible();
  await expect(region.getByText("1.25 GB", { exact: true })).toBeVisible();
  await region.getByRole("button", { name: "Pause partner strip", exact: true }).click();
  await expect(region.getByRole("region", { name: "Workspace partners" })).toHaveAttribute("data-state", "paused");
  await region.getByRole("button", { name: "Design", exact: true }).click();
  await expect(region.getByRole("status")).toHaveText("Reviewing design.");
  await region.getByRole("button", { name: "Remove Design discipline" }).click();
  await expect(region.getByRole("button", { name: "Design", exact: true })).toHaveCount(0);
  await expect(region.getByRole("button", { name: "Restore disciplines" })).toBeFocused();
  await region.getByRole("button", { name: "Restore disciplines" }).click();
  await expect(region.getByRole("button", { name: "Design", exact: true })).toBeVisible();
  const events = region.getByRole("list", { name: "Project milestones" });
  await expect(events.getByRole("listitem")).toHaveCount(2);
  await expect(events.locator("time").first()).toHaveText("Sep 1, 2026");
  await expect(events.locator(".brick-timeline-separator").last()).toHaveCSS("visibility", "hidden");
});
