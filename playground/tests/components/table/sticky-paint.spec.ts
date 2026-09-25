import { expect, test } from "@playwright/test";

test("fractional sticky viewport edge contains no body ink", async ({ browser }, info) => {
  test.skip(info.project.name.startsWith("mobile-"), "Explicit HiDPI viewport covers each browser engine once.");
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  try {
    for (const appearance of ["light", "dark"]) {
      await page.goto(`http://127.0.0.1:4010/table?appearance=${appearance}#sticky`);
      const box = page.locator("#sticky .brick-table-container");
      await box.scrollIntoViewIfNeeded();
      const height = await box.evaluate(el => el.getBoundingClientRect().height);
      for (const fraction of [0, 0.25, 0.5, 0.75]) {
        // Model fractional ancestor coordinates without changing table anatomy.
        await box.evaluate((el, value) => {
          el.style.transform = `translateY(${value}px)`;
          el.scrollTop = 120;
        }, fraction);
        const rect = (await box.boundingBox())!;
        const clip = { x: Math.floor(rect.x) + 20, y: Math.floor(rect.y) - 1, width: 200, height: 5 };
        const before = await page.screenshot({ clip, animations: "disabled" });
        const hideInk = await page.addStyleTag({ content: "#sticky tbody * { color: transparent !important; text-shadow: none !important; }" });
        const withoutBodyInk = await page.screenshot({ clip, animations: "disabled" });
        await hideInk.evaluate(el => el.parentNode?.removeChild(el));
        // Geometry assertions alone missed this raster leak. The top edge must
        // be identical whether text underneath the header is painted or not.
        expect(before.equals(withoutBodyInk), `${appearance}, fractional offset ${fraction}`).toBe(true);
        expect(rect.height).toBe(height);
      }
      await box.evaluate(el => { el.tabIndex = 0; });
      await box.focus();
      await expect(box).toBeFocused();
      const focus = await box.evaluate(el => {
        const style = getComputedStyle(el);
        return { width: parseFloat(style.outlineWidth), offset: parseFloat(style.outlineOffset), visible: el.matches(":focus-visible") };
      });
      expect(focus.visible).toBe(true);
      expect(focus.width).toBeGreaterThan(0);
      expect(focus.offset).toBeLessThanOrEqual(-focus.width - 1);
    }
  } finally {
    await context.close();
  }
});
