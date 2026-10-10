import { expect, test } from "../../evidence-test.js";

test("inline second disclosure stays with its item, composed links retain destination styling", async ({
  page,
}, testInfo) => {
  await page.goto("/navigation-menu?appearance=dark");
  const inline = page.locator("#inline");
  const trigger = inline.getByRole("button", {
    name: "Community",
    exact: true,
  });
  await trigger.click();
  const panel = inline.locator(
    '.brick-navigation-menu__content[data-state="open"]',
  );
  await expect
    .poll(async () => {
      const a = await trigger.boundingBox(),
        b = await panel.boundingBox();
      return a && b ? Math.abs(a.x - b.x) : 999;
    })
    .toBeLessThan(2);
  if (testInfo.project.name === "chromium") await inline.screenshot({ path: testInfo.outputPath("inline-fixed.png") });
  await page.keyboard.press("Escape");
  const composition = page.locator("#composition");
  await composition.getByRole("button", { name: "Learn", exact: true }).click();
  const link = composition.getByRole("link", { name: "Getting started" });
  await expect(link).toHaveAttribute("data-variant", "destination");
  await expect(link).toHaveAttribute("data-tone", "neutral");
  await expect(link).not.toHaveClass(/brick-link/);
  if (testInfo.project.name === "chromium") await composition.screenshot({ path: testInfo.outputPath("composition-fixed.png") });
});

test("header panel and arrow center on Resources", async ({
  page,
}, testInfo) => {
  await page.goto("/navigation-menu?appearance=dark");
  const section = page.locator("#header");
  const trigger = section.getByRole("button", { name: "Resources" });
  await trigger.click();
  await expect
    .poll(async () => {
      const a = await section
        .locator(".brick-navigation-menu__indicator-arrow")
        .boundingBox();
      const p = await section
        .locator(".brick-navigation-menu__viewport")
        .boundingBox();
      const t = await trigger.boundingBox();
      return !!a && !!p && !!t
        && a.x >= p.x + 2 && a.x + a.width <= p.x + p.width - 2
        && Math.abs(a.x + a.width / 2 - (t.x + t.width / 2)) < 2
        && Math.abs(p.x + p.width / 2 - (t.x + t.width / 2)) < 2;
    })
    .toBe(true);
  if (testInfo.project.name === "chromium") await section.screenshot({ path: testInfo.outputPath("header-fixed.png") });
});

test("horizontal RTL chevron points down then up, never sideways", async ({
  page,
}, testInfo) => {
  await page.goto("/navigation-menu");
  const section = page.locator("#rtl");
  const trigger = section.getByRole("navigation").getByRole("button");
  const icon = trigger.locator(".brick-navigation-menu__chevron");
  await expect(icon).toHaveCSS("border-right-style", "solid");
  await expect(icon).toHaveCSS("border-left-style", "none");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  if (testInfo.project.name === "chromium") await section.screenshot({ path: testInfo.outputPath("rtl-fixed.png") });
  await expect(icon).toHaveCSS("border-right-style", "solid");
  await expect(icon).toHaveCSS("border-left-style", "none");
});
