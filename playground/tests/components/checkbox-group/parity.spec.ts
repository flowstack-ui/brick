import { expect, test } from "../../evidence-test.js";

test("Group docs enforce limits while preserving linked-label independence", async ({ page }) => {
  await page.goto("/checkbox-group");
  const limit = page.locator("#limit").getByRole("group");
  await limit.getByRole("checkbox", { name: "Email", exact: true }).click();
  await limit.getByRole("checkbox", { name: "SMS", exact: true }).click();
  await expect(limit.getByRole("checkbox", { name: "Push notifications" })).toBeDisabled();
  await limit.getByRole("checkbox", { name: "Email", exact: true }).click();
  await expect(limit.getByRole("checkbox", { name: "Push notifications" })).toBeEnabled();
  const linked = page.locator("#linked-label");
  const checkbox = linked.getByRole("checkbox");
  await expect(checkbox.locator("a")).toHaveCount(0);
  await linked.getByRole("link", { name: "terms", exact: true }).click();
  await expect(checkbox).toHaveAttribute("aria-checked", "false");
  await checkbox.click();
  await expect(checkbox).toHaveAttribute("aria-checked", "true");
});

test("Group density remains overridable by a comfortable item", async ({ page }) => {
  await page.goto("/checkbox-group");
  const group = page.locator("#recipes").getByRole("group");
  const items = group.getByRole("checkbox");
  // Exercise the public data-attribute recipe independently from controller state.
  await group.evaluate(node => node.setAttribute("data-density", "compact"));
  await items.nth(0).evaluate(node => node.setAttribute("data-density", "compact"));
  await items.nth(1).evaluate(node => node.setAttribute("data-density", "comfortable"));
  await expect(items.nth(0)).toHaveCSS("min-height", "24px");
  await expect(items.nth(1)).toHaveCSS("min-height", "44px");
});
