import { expect, test } from "@playwright/test";

test("Button preserves system-color boundaries and focus in forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");

  await page.emulateMedia({ colorScheme: "light", forcedColors: "active" });
  await page.goto("/button");
  expect(await page.evaluate(() => matchMedia("(forced-colors: active)").matches)).toBe(true);

  const primary = page.getByRole("button", { name: "Publish project" });
  await primary.focus();
  const primaryStyle = await primary.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      background: style.backgroundColor,
      border: style.borderTopColor,
      color: style.color,
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });
  expect(primaryStyle.background).not.toBe("rgba(0, 0, 0, 0)");
  expect(primaryStyle.border).toBe(primaryStyle.color);
  expect(primaryStyle.outlineStyle).toBe("solid");
  expect(primaryStyle.outlineWidth).toBeGreaterThanOrEqual(2);

  const disabled = page.getByRole("button", { name: "Disabled" });
  await expect(disabled).toHaveCSS("opacity", "1");

  const loading = page.getByRole("button", { name: "Saving changes" });
  const spinner = await loading.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return [style.borderTopColor, style.borderRightColor];
  });
  expect(spinner.every((color) => color !== "rgba(0, 0, 0, 0)")).toBe(true);
});

test("Button honors reduced motion without hiding loading status", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/button");

  const primary = page.getByRole("button", { name: "Publish project" });
  await expect(primary).toHaveCSS("transition-duration", "0s");

  const loading = page.getByRole("button", { name: "Saving changes" });
  const spinnerStyle = await loading.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return { animationDuration: style.animationDuration, display: style.display };
  });
  expect(spinnerStyle.animationDuration).toBe("1.4s");
  expect(spinnerStyle.display).not.toBe("none");
});
