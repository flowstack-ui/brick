import { expect, test } from "../../evidence-test.js";

test("compact recipes keep plain padding, transparent paint and selectable text", async ({ page }) => {
  await page.goto("/kbd?qualification=1");
  const keys = page.getByTestId("kbd-matrix").locator(".brick-kbd");
  await expect(keys).toHaveCount(72);
  const values = await keys.evaluateAll(nodes => nodes.map(node => {
    const s = getComputedStyle(node);
    return { size: node.getAttribute("data-size"), variant: node.getAttribute("data-variant"),
      height: node.getBoundingClientRect().height, font: parseFloat(s.fontSize),
      padding: s.paddingInlineStart, bg: s.backgroundColor, shadow: s.boxShadow,
      bottom: s.borderBottomWidth, select: s.userSelect, shrink: s.flexShrink };
  }));
  for (const value of values) {
    const expected = { sm: [18,12], md: [20,14], lg: [24,16] }[value.size!];
    expect(value.height).toBe(expected![0]);
    expect(value.font).toBe(expected![1]);
    expect(value.shadow).toBe("none");
    expect(value.select).not.toBe("none");
    expect(value.shrink).toBe("0");
    if (value.variant === "plain") expect(value.padding).toBe("0px");
    if (value.variant === "plain" || value.variant === "outline") expect(value.bg).toBe("rgba(0, 0, 0, 0)");
    if (value.variant === "raised") expect(value.bottom).toBe("2px");
  }
  await page.emulateMedia({ forcedColors: "active" });
  const colors = await keys.evaluateAll(nodes => nodes.map(node => {
    const s = getComputedStyle(node); return [s.color, s.backgroundColor, s.borderBottomColor];
  }));
  for (const [fg,bg,border] of colors) {
    expect(fg).not.toBe(bg);
    expect(border).not.toBe("rgba(0, 0, 0, 0)");
  }
});

test("documentation examples and props remain separate from qualification", async ({ page }) => {
  await page.goto("/kbd");
  await expect(page.locator('[data-scenario="kbd.recipes"]')).toHaveCount(0);
  for (const id of ["usage","combinations","modifier-keys","variants","sizes","within-text","tones","composition","props"]) {
    await expect(page.locator("#"+id)).toHaveCount(1);
  }
  await expect(page.locator("#composition .brick-kbd")).toHaveCount(1);
  await expect(page.getByRole("table", { name: "Kbd props" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
