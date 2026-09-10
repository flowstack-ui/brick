import { expect, type Locator, type Page } from "@playwright/test";

/** Exercise the public paint matrix on a real prop-rendered host. */
export async function verifyActionFocus(page: Page, host: Locator) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await host.scrollIntoViewIfNeeded();
  await host.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(host).toBeFocused();
  for (const appearance of ["light", "dark"]) {
    await host.evaluate((node, value) => node.setAttribute("data-brick-appearance", value), appearance);
    for (const variant of ["solid", "soft", "outline", "ghost"]) {
      for (const tone of ["neutral", "contrast", "accent", "info", "success", "warning", "danger"]) {
        await host.evaluate((node, values) => {
          node.setAttribute("data-variant", values.variant);
          node.setAttribute("data-tone", values.tone);
        }, { variant, tone });
        for (const state of ["rest", "hover", "pressed"] as const) {
        if (state === "rest") await page.mouse.move(0, 0);
        else await host.hover();
        if (state === "pressed") await page.keyboard.down("Space");
        await expect(host).toHaveCSS("outline-offset", "-2px");
        await expect(host).toHaveCSS("outline-width", "2px");
        const paint = await host.evaluate(node => {
          const style = getComputedStyle(node);
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = 1;
          const context = canvas.getContext("2d")!;
          const rgb = (color: string) => {
            context.clearRect(0, 0, 1, 1);
            context.fillStyle = color;
            context.fillRect(0, 0, 1, 1);
            return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
          };
          return { ring: style.outlineColor, foreground: style.color, ringRgb: rgb(style.outlineColor), backgroundRgb: rgb(style.backgroundColor) };
        });
        expect(paint.ring).toBe(paint.foreground);
        if (variant === "solid" || variant === "soft") {
          const luminance = (color: number[]) => {
            const values = color.map(v => {
              const s = v / 255;
              return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            });
            return values[0]! * 0.2126 + values[1]! * 0.7152 + values[2]! * 0.0722;
          };
          const a = luminance(paint.ringRgb), b = luminance(paint.backgroundRgb);
          expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), `${appearance}/${variant}/${tone}/${state}`).toBeGreaterThanOrEqual(3);
        }
        if (state === "pressed") await page.keyboard.up("Space");
        }
      }
    }
  }
  await page.emulateMedia({ forcedColors: "active" });
  await expect(host).toHaveCSS("outline-style", "solid");
  await expect(host).toHaveCSS("outline-offset", "-2px");
}
