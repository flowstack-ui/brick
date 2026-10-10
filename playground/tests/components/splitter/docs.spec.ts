import { expect, test } from "../../evidence-test.js";

test("Splitter docs expose examples, part props and working resize controls", async ({ page }) => {
  await page.goto("/splitter");
  const content = page.locator('[data-component-page="splitter"]');
  await expect(content.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  await expect(content.getByRole("table", { name: "Splitter.Root props" })).toBeAttached();
  await expect(content.getByRole("table", { name: "Splitter.Panel props" })).toBeAttached();
  await expect(content.getByRole("table", { name: "Splitter.ResizeTrigger props" })).toBeAttached();
  const basic = content.locator(".brick-splitter").first();
  const handle = basic.getByRole("separator");
  await handle.focus();
  await page.keyboard.press("End");
  await expect(handle).toHaveAttribute("aria-valuenow", "80");
  await page.locator("#controlled").getByRole("button", { name: "Equal panels" }).click();
  await expect(page.locator("#controlled").getByRole("separator")).toHaveAttribute("aria-valuenow", "50");
  await page.locator("#collapsible").getByRole("button", { name: "Collapse A" }).click();
  await expect(page.locator("#collapsible").getByRole("separator")).toHaveAttribute("aria-valuenow", "5");
  await page.locator("#collapsible").getByRole("button", { name: "Expand A" }).click();
  await expect(page.locator("#collapsible").getByRole("separator")).toHaveAttribute("aria-valuenow", "40");
  await expect(page.locator("#separator .brick-splitter-indicator")).toHaveCount(0);
  await page.locator("#reset").getByRole("separator").focus();
  await page.keyboard.press("End");
  await page.locator("#reset").getByRole("button", { name: "Reset panels" }).click();
  await expect(page.locator("#reset").getByRole("separator")).toHaveAttribute("aria-valuenow", "35");
});

test("Splitter docs fit narrow screens and retain source", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/splitter?appearance=dark&exampleDirection=rtl");
  await expect(page.locator('[data-component-page="splitter"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.locator('[data-component-page="splitter"]').getByRole("tab", { name: "Code", exact: true }).first().click();
  await expect(page.locator('[data-component-page="splitter"]').getByRole("tabpanel").first()).toContainText("SplitterBasic");
});
test("new Splitter store and dynamic examples use the public API", async ({ page }) => {
  await page.goto("/splitter");
  await page.locator("#store").getByRole("button", { name: "Equalize" }).click();
  await expect(page.locator("#store").getByRole("separator")).toHaveAttribute("aria-valuenow", "50");
  await page.locator("#store").getByRole("button", { name: "Reset store" }).click();
  await expect(page.locator("#store").getByRole("separator")).toHaveAttribute("aria-valuenow", "30");
  await page.locator("#dynamic").getByRole("button", { name: "Remove B" }).click();
  await expect(page.locator("#dynamic").getByRole("separator")).toHaveCount(0);
  await page.locator("#dynamic").getByRole("button", { name: "Restore B" }).click();
  await expect(page.locator("#dynamic").getByRole("separator")).toHaveAttribute("aria-valuenow", "50");
  await expect(page.getByRole("table", { name: "Splitter.RootProvider props" })).toBeAttached();
});
test("storage persists completed sizes and responsive orientation follows the viewport", async ({ page }) => {
  await page.goto("/splitter");
  const stored = page.locator("#storage").getByRole("separator");
  await stored.focus();
  await page.keyboard.press("End");
  await expect(stored).toHaveAttribute("aria-valuenow", "80");
  await page.reload();
  await expect(stored).toHaveAttribute("aria-valuenow", "80");
  await page.locator("#storage").getByRole("button", { name: "Clear saved sizes" }).click();
  await expect(stored).toHaveAttribute("aria-valuenow", "50");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#responsive").getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator("#responsive").getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
});
