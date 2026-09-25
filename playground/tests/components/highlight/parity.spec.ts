import { expect, test } from "../../evidence-test.js";

test("documentation exposes matching, custom composition and real source", async ({ page }) => {
  await page.goto("/highlight");
  await expect(page.locator('[data-scenario]')).toHaveCount(0);
  await expect(page.getByRole("table", { name: "Highlight props" })).toBeVisible();
  const search = page.locator("#search");
  await search.getByRole("textbox", { name: "Highlight search query" }).fill("component");
  await expect(search.locator("mark")).toHaveText("Component");
  await search.getByRole("textbox").fill("");
  await expect(search.locator("mark")).toHaveCount(0);
  await expect(page.locator("#composition mark")).toHaveText(["durable", "clear"]);
  await page.locator("#composition").getByRole("tab", { name: "Code", exact: true }).click();
  await expect(page.locator("#composition").getByRole("tabpanel")).toContainText("findHighlightSegments");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("all compatible recipes match Mark in both appearances", async ({ page }) => {
  await page.goto("/highlight?qualification=1");
  for (const appearance of ["light", "dark"]) {
    await page.getByTestId("highlight-matrix").evaluate((node, value) => node.setAttribute("data-brick-appearance", value), appearance);
    const pairs = await page.locator("[data-pair]").evaluateAll((nodes) => nodes.flatMap((node) => {
      const highlight = node.querySelector(".brick-highlight mark");
      const mark = node.querySelector(".brick-mark");
      if (!highlight || !mark) return [];
      const a = getComputedStyle(highlight), b = getComputedStyle(mark);
      return [{ id: node.getAttribute("data-pair"), a: [a.color,a.backgroundColor,a.fontSize,a.fontWeight,a.paddingInline,a.borderRadius], b: [b.color,b.backgroundColor,b.fontSize,b.fontWeight,b.paddingInline,b.borderRadius] }];
    }));
    expect(pairs).toHaveLength(24);
    for (const pair of pairs) expect(pair.a, pair.id!).toEqual(pair.b);
  }
});

test("forced colors replaces every filled recipe and preserves unfilled marks", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Forced-color emulation is qualified in Chromium.");
  await page.goto("/highlight?qualification=1");
  await page.emulateMedia({ forcedColors: "active" });
  const values = await page.getByTestId("highlight-matrix").locator(".brick-highlight").evaluateAll((nodes) => nodes.map((node) => {
    const mark = node.querySelector("mark")!;
    const root = getComputedStyle(node), style = getComputedStyle(mark);
    return {variant: node.getAttribute("data-variant"),background: root.getPropertyValue("--brick-highlight-background").trim(), foreground: root.getPropertyValue("--brick-highlight-foreground").trim(), decoration: style.textDecorationLine, paint: style.backgroundColor};
  }));
  expect(values).toHaveLength(30);
  for (const value of values) {
    expect(value.background).toBe("Highlight");
    expect(value.foreground).toBe("HighlightText");
    if (["plain", "text", "underline"].includes(value.variant!)) {
      expect(value.decoration).toContain("underline");
      // Forced colors can retain the system RGB channels at zero alpha.
      expect(value.paint).toMatch(/^rgba\([\d ,]+, 0\)$/);
    }
  }
});
