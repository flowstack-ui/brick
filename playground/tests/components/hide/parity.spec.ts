import { expect, test } from "../../evidence-test.js";
test("projected Hide preserves flex display and mounted children", async ({ page }) => {
  await page.goto("/hide");
  const host = page.locator("#projection [data-hide-from]");
  await page.setViewportSize({ width: 900, height: 800 });
  await expect(host).toHaveCSS("display", "flex");
  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(host).toHaveCSS("display", "none");
  await expect(host).toBeAttached();
  await page.setViewportSize({ width: 1023, height: 800 });
  await expect(host).toHaveCSS("display", "flex");
});
