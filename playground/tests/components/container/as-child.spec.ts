import { expect, test } from "../../evidence-test.js";
import { readFileSync } from "node:fs";

test("Container adopts Surface without another host or a geometry change", async ({
  page,
}) => {
  await page.goto("/container");
  const canvas = page.locator("#as-child [data-example-canvas]");
  const host = canvas.locator(":scope > article");
  await expect(host).toHaveCount(1);
  await expect(host).toHaveClass(/brick-container/);
  await expect(host).toHaveClass(/brick-surface/);
  await expect(host).toHaveAttribute("data-measure", "wide");
  await expect(host).toHaveAttribute("data-gutter", "md");
  // Qualify the consumer entrypoints, with their transitive imports bundled.
  // Raw Surface source has a relative @import that cannot resolve in this page.
  const containerCss = readFileSync("dist/styles/container.css", "utf8");
  const surfaceCss = readFileSync("dist/styles/surface.css", "utf8");
  for (const css of [containerCss + surfaceCss, surfaceCss + containerCss]) {
    const sheet = await page.addStyleTag({ content: css });
    await expect(host).toHaveCSS("max-inline-size", "1152px");
    expect(
      await host.evaluate((el) =>
        parseFloat(getComputedStyle(el).paddingInlineStart),
      ),
    ).toBeGreaterThan(0);
    await sheet.evaluate((el) => el.parentNode?.removeChild(el));
  }
  for (const width of [320, 768, 1600]) {
    await page.setViewportSize({ width, height: 900 });
    for (const direction of ["ltr", "rtl"]) {
      await canvas.evaluate(
        (el, dir) => el.setAttribute("dir", dir),
        direction,
      );
      const padding = await host.evaluate((el) => {
        const style = getComputedStyle(el);
        return [
          parseFloat(style.paddingInlineStart),
          parseFloat(style.paddingInlineEnd),
        ];
      });
      const expected = Math.min(32, Math.max(16, width * 0.03));
      expect(Math.abs(padding[0] - expected)).toBeLessThan(0.05);
      expect(padding[0]).toBe(padding[1]);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
  }
  await page
    .getByRole("tablist", { name: "Composition view", exact: true })
    .getByRole("tab", { name: "Code", exact: true })
    .click();
  await expect(
    page
      .getByRole("tabpanel")
      .filter({ hasText: "export function ContainerAsChild" }),
  ).toContainText("<Container asChild>");
});
