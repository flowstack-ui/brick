import { expect, test } from "../../evidence-test.js";

test("Checkbox docs expose coordinated recipes and sparse responsive sizes", async ({ page }) => {
  await page.goto("/checkbox");
  await expect(page.getByRole("heading", { name: "Usage", exact: true })).toBeVisible();
  for (const [size, pixels] of [["xs", 12], ["sm", 16], ["md", 20], ["lg", 24]] as const) {
    const square = page.locator("#sizes").getByRole("checkbox", { name: size, exact: true }).locator(".brick-checkbox-control");
    expect((await square.boundingBox())!.width).toBe(pixels);
  }
  const outline = page.locator("#variants").getByRole("checkbox", { name: "outline", exact: true }).locator(".brick-checkbox-control");
  await expect(outline).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  const responsive = page.locator("#responsive").getByRole("checkbox").locator(".brick-checkbox-control");
  await page.setViewportSize({ width: 390, height: 844 });
  expect((await responsive.boundingBox())!.width).toBe(16);
  await page.setViewportSize({ width: 1280, height: 900 });
  expect((await responsive.boundingBox())!.width).toBe(24);
});
