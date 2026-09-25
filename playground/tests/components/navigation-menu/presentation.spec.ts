import { expect, test } from "../../evidence-test.js";

for (const appearance of ["light", "dark"]) {
  test(`destination rows and coordinated surfaces in ${appearance}`, async ({
    page,
  }) => {
    await page.goto(`/navigation-menu?appearance=${appearance}`);
    for (const tone of ["neutral", "accent", "contrast"]) {
      const root = page.locator(`#tones nav[data-tone="${tone}"]`);
      await root.getByRole("button", { name: tone, exact: true }).click();
      const link = root.getByRole("link", { name: "Getting started" });
      await expect(link).toHaveAttribute("data-variant", "destination");
      await link.hover();
      await expect(link).toHaveCSS("padding-inline-start", "12px");
      await expect(link).toHaveCSS("padding-block-start", "8px");
      const panel = root.locator(".brick-navigation-menu__viewport");
      await expect
        .poll(async () => {
          const p = await panel.boundingBox(),
            l = await link.boundingBox();
          return p && l ? Math.round(p.width - l.width) : -1;
        })
        .toBe(18); // 8px Content inset plus 1px border on each side.
      const state = await root.evaluate((el) => {
        const link = el.querySelector(
          '.brick-navigation-menu__link[data-variant="destination"]',
        )!;
        const css = getComputedStyle(link);
        const row = link.parentElement!;
        const panel = getComputedStyle(
          el.querySelector(".brick-navigation-menu__viewport")!,
        );
        const bar = getComputedStyle(
          el.querySelector(".brick-navigation-menu__list")!,
        );
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d")!;
        const lum = (color: string) => {
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, 1, 1);
          const rgb = [...ctx.getImageData(0, 0, 1, 1).data]
            .slice(0, 3)
            .map((v) => {
              const s = v / 255;
              return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            });
          return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
        };
        const fg = lum(css.color),
          bg = lum(css.backgroundColor);
        return {
          gap: getComputedStyle(row).gap,
          panel: panel.backgroundColor,
          bar: bar.backgroundColor,
          contrast: (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05),
          radius: css.borderRadius,
          coreRadius: css.getPropertyValue("--brick-radius-core-sm").trim(),
        };
      });
      expect(state.panel).toBe(state.bar);
      expect(state.gap).toBe("4px");
      expect(state.contrast).toBeGreaterThanOrEqual(4.5);
      const panelBox = await panel.boundingBox();
      if (!panelBox) throw new Error("Open navigation panel is not measurable");
      // Leave the row without dismissing the panel before its paint is inspected.
      await page.mouse.move(panelBox.x + 2, panelBox.y + panelBox.height - 2);
      await expect(link).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      // Arrow entry is component-owned; native link Tab stops depend on the
      // browser/OS keyboard-navigation preference (notably macOS WebKit).
      const trigger = root.getByRole("button", { name: tone, exact: true });
      await trigger.press("Escape");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await page.mouse.move(0, 0);
      await page.keyboard.press("Tab");
      await trigger.focus();
      await page.keyboard.press("ArrowDown");
      await expect(link).toBeFocused();
      await expect(link).toHaveCSS("outline-style", "solid");
      await page.keyboard.press("Escape");
    }
  });
}

test("header integration remains transparent and rich content keeps explicit padding", async ({
  page,
}) => {
  await page.goto("/navigation-menu");
  const header = page.locator("#header nav");
  await expect(header.locator(".brick-navigation-menu__list")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  await header.getByRole("button", { name: "Resources" }).click();
  await expect(
    header.getByRole("link", { name: "Getting started" }),
  ).toHaveAttribute("data-variant", "destination");
  await page.keyboard.press("Escape");
  const basic = page
    .getByRole("tabpanel", { name: "Preview", exact: true })
    .first();
  await basic.getByRole("button", { name: "Learn", exact: true }).click();
  await expect(
    basic.locator('.brick-navigation-menu__content[data-state="open"]'),
  ).toHaveCSS("padding-top", "16px");
  await expect(
    basic.locator('.brick-navigation-menu__link[data-variant="panel"]'),
  ).toHaveCSS("padding-top", "0px");
});
