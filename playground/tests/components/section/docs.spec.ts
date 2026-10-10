import { expect, test } from "../../evidence-test.js";

test("docs expose exact-source examples and sparse logical spacing", async ({ page }) => {
  await page.goto("/section");
  const sample = page.locator('#responsive .brick-section');
  for (const [width, start, end] of [[390, 48, 48], [800, 0, 48], [1100, 0, 110], [1400, 0, 140]]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(sample).toHaveCSS("padding-block-start", `${start}px`);
    await expect(sample).toHaveCSS("padding-block-end", `${end}px`);
  }
  await expect(page.getByRole("table", { name: "Section props", exact: true })).toBeVisible();
  await page.locator('#responsive').getByRole('tab', { name: 'Code', exact: true }).click();
  await expect(page.locator('#responsive')).toContainText('spacing={{ lg: "xl" }}');
});
