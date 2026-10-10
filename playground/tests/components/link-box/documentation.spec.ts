import { expect, test } from "../../evidence-test.js";

test("LinkBox documents parts and keeps independent actions", async ({ page }) => {
  await page.goto("/link-box");
  for (const part of ["Root", "Link", "Action"]) {
    await expect(page.locator(`#props-${part.toLowerCase()}`).getByRole("heading", { name: part, exact: true })).toHaveCount(1);
  }
  const primary = page.getByRole("link", { name: "Build a better workspace", exact: true });
  const typography = await primary.evaluate(element => ({ weight: getComputedStyle(element).fontWeight, parent: getComputedStyle(element.parentElement!).fontWeight, position: getComputedStyle(element).position }));
  expect(typography.position).toBe("static");
  expect(typography.weight).toBe(typography.parent);
  const before = page.url();
  await page.locator("#actions").getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.locator("#actions").getByRole("button", { name: "Saved", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(page.url()).toBe(before);
  const none = page.locator('#radius .brick-link-box[data-radius="none"]');
  await expect(none).toHaveCSS("border-radius", "0px");
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.locator("main").evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
});
