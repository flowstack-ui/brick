import { expect, test } from "@playwright/test";

test("Button preserves system-color boundaries and focus in forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");

  await page.emulateMedia({ colorScheme: "light", forcedColors: "active" });
  await page.goto("/button?qualification=1");
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

  const disabled = page.getByTestId("button-disabled");
  await expect(disabled).toHaveCSS("opacity", "1");

  const loading = page.getByTestId("button-loading");
  const spinner = await loading.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return [style.borderTopColor, style.borderRightColor];
  });
  expect(spinner.every((color) => color !== "rgba(0, 0, 0, 0)")).toBe(true);
});

test("Button honors reduced motion without hiding loading status", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/button?qualification=1");

  const primary = page.getByRole("button", { name: "Publish project" });
  await expect(primary).toHaveCSS("transition-duration", "0s");

  const loading = page.getByTestId("button-loading");
  const spinnerStyle = await loading.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return { animationName: style.animationName, display: style.display, content: style.content };
  });
  expect(spinnerStyle.animationName).toBe("none");
  expect(spinnerStyle.display).not.toBe("none");
  expect(spinnerStyle.content).not.toBe("none");
  await expect(loading).toHaveAttribute("aria-busy", "true");
});

test("Card keeps visible static boundaries in forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");
  await page.emulateMedia({ colorScheme: "light", forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/card?qualification=1");

  const cards = page.getByTestId("card-variants").locator(".brick-card");
  await expect(cards).toHaveCount(3);
  for (const card of await cards.all()) {
    const style = await card.evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        borderStyle: computed.borderTopStyle,
        borderWidth: Number.parseFloat(computed.borderTopWidth),
        boxShadow: computed.boxShadow,
      };
    });
    expect(style.borderStyle).toBe("solid");
    expect(style.borderWidth).toBeGreaterThanOrEqual(1);
    expect(style.boxShadow).toBe("none");
  }
});
