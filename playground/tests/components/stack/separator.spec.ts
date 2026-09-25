import { expect, test } from "../../evidence-test.js";
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
import { Stack } from "../../../../dist/stack.js";

test("separator gap longhands and nested axes reset at every boundary", async ({ page }) => {
  const content = renderToString(h(Stack, {
    direction: { initial: "row", sm: "column", md: "row-reverse", lg: "column-reverse", xl: "row" },
    gap: 1, rowGap: 2, columnGap: 3, separator: h(Stack.Separator),
  }, h("span", null, "First"), h(Stack, { separator: h(Stack.Separator) }, h("span", null, "Inner A"), h("span", null, "Inner B"))));
  await page.setContent(content);
  await page.addStyleTag({ content: readFileSync("dist/styles.css", "utf8") });
  for (const width of [479,480,767,768,1023,1024,1279,1280]) {
    await page.setViewportSize({ width, height: 900 });
    const horizontal = width < 480 || (width >= 768 && width < 1024) || width >= 1280;
    const root = page.locator(".brick-stack").first();
    const sep = root.locator(":scope > .brick-stack-separator");
    await expect(sep).toHaveCSS(horizontal ? "margin-inline-start" : "margin-block-start", horizontal ? "12px" : "8px");
    await expect(root).toHaveCSS(horizontal ? "column-gap" : "row-gap", "0px");
    const inner = page.locator(".brick-stack .brick-stack");
    await expect(inner).toHaveCSS("flex-direction", "column");
    await expect(inner.locator(".brick-stack-separator")).toHaveCSS("border-inline-start-width", "0px");
  }
});

for (const appearance of ["light", "dark"] as const) {
  test(`separator documentation appearance ${appearance}`, async ({ page }, testInfo) => {
    await page.goto(`/stack?appearance=${appearance}`);
    const preview = page.locator("#separator [data-example-preview]");
    await expect(preview).toBeVisible();
    await preview.screenshot({ path: testInfo.outputPath(`separator-${appearance}.png`) });
  });
}

test("separators follow responsive axes and preserve exact gap geometry", async ({ page }) => {
  await page.goto("/stack");
  const section = page.locator("#separator");
  const stacks = section.locator(".brick-stack[data-stack-separated]");
  await expect(stacks).toHaveCount(4);
  for (const [width, axis] of [[390,"column"],[800,"row"],[1100,"row-reverse"],[1400,"column-reverse"]] as const) {
    await page.setViewportSize({ width, height: 900 });
    const responsive = stacks.nth(2);
    await expect(responsive).toHaveCSS("flex-direction", axis);
    const geometry = await responsive.evaluate((root) => {
      const [a, sep, b] = Array.from(root.children);
      const style = getComputedStyle(sep);
      const horizontal = getComputedStyle(root).flexDirection.startsWith("row");
      const x = a.getBoundingClientRect(), y = b.getBoundingClientRect();
      return { gap: horizontal ? Math.max(x.left,y.left)-Math.min(x.right,y.right) : Math.max(x.top,y.top)-Math.min(x.bottom,y.bottom),
        thickness: parseFloat(horizontal ? style.borderInlineStartWidth : style.borderBlockStartWidth),
        margin: parseFloat(horizontal ? style.marginInlineStart : style.marginBlockStart) };
    });
    expect(geometry.thickness).toBeGreaterThan(0);
    expect(geometry.gap).toBeCloseTo(geometry.margin * 2 + geometry.thickness, 0);
  }
  const short = stacks.nth(1).locator(".brick-stack-separator").first();
  await expect(short).toHaveCSS("height", "20px");
  await expect(short).toHaveAttribute("aria-hidden", "true");
  await page.goto("/stack?appearance=dark&exampleDirection=rtl");
  await expect(page.locator("#separator .brick-stack[data-stack-separated]").nth(1)).toHaveCSS("direction", "rtl");
});
