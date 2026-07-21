import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("IconButton preserves named action and link semantics", async ({ page }) => {
  await page.goto("/icon-button");
  const action = page.getByRole("button", { name: "Search workspace" });
  await action.click();
  await expect(page.getByText("Activated 1 times")).toBeVisible();
  await action.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText("Activated 2 times")).toBeVisible();

  const link = page.getByRole("link", { name: "Read documentation" });
  await expect(link).toHaveAttribute("href", "#icon-button-docs");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(link).not.toHaveAttribute("role", "button");
});

test("IconButton exposes closed recipes and inactive states", async ({ page }) => {
  await page.goto("/icon-button");
  await expect(page.getByTestId("icon-button-variants").locator(".brick-icon-button")).toHaveCount(4);
  await expect(page.getByTestId("icon-button-tones").locator(".brick-icon-button")).toHaveCount(6);
  await expect(page.getByTestId("icon-button-sizes").locator(".brick-icon-button")).toHaveCount(7);
  await expect(page.getByRole("button", { name: "Disabled search" })).toBeDisabled();
  const loading = page.getByRole("button", { name: "Loading search" });
  await expect(loading).toHaveAttribute("aria-busy", "true");
  const spinner = await loading.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return {
      insetBlockStart: style.insetBlockStart,
      insetInlineStart: style.insetInlineStart,
      transform: style.transform,
      translate: style.translate,
    };
  });
  expect(spinner.insetBlockStart).toBe("21px");
  expect(spinner.insetInlineStart).toBe("21px");
  expect(spinner.transform).not.toBe("none");
  expect(spinner.translate).toBe("none");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("AppBar preserves exact anatomy, density, and structural toolbar semantics", async ({ page }) => {
  await page.goto("/app-bar");
  const bar = page.locator(".brick-app-bar[aria-label='static neutral surface example']").first();
  await expect(bar).toHaveAttribute("data-position", "static");
  await expect(bar).toHaveAttribute("data-tone", "neutral");
  await expect(bar).toHaveAttribute("data-variant", "surface");
  await expect(bar.locator("[data-slot='appbar-toolbar']")).toHaveAttribute("data-density", "comfortable");
  await expect(bar.locator("[data-slot='appbar-toolbar']")).not.toHaveAttribute("role");
  await expect(bar.locator("[data-slot='appbar-start']")).toBeVisible();
  await expect(bar.locator("[data-slot='appbar-center']")).toHaveCount(1);
  await expect(bar.locator("[data-slot='appbar-end']")).toBeVisible();
  const [toolbarBox, centerBox] = await Promise.all([
    bar.locator("[data-slot='appbar-toolbar']").boundingBox(),
    bar.locator("[data-slot='appbar-center']").boundingBox(),
  ]);
  expect(toolbarBox).not.toBeNull();
  expect(centerBox).not.toBeNull();
  expect(centerBox!.x + centerBox!.width / 2).toBeCloseTo(
    toolbarBox!.x + toolbarBox!.width / 2,
    0,
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("AppBar exposes neutral and accent surface recipes", async ({ page }) => {
  await page.goto("/app-bar");
  const recipes = page.getByTestId("app-bar-variants").locator(".brick-app-bar");
  await expect(recipes).toHaveCount(6);
  const neutral = page.locator(".brick-app-bar[data-tone='neutral'][data-variant='solid']").first();
  const accent = page.locator(".brick-app-bar[data-tone='accent'][data-variant='solid']").first();
  await expect(accent).toBeVisible();
  expect(await neutral.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe(await accent.evaluate((element) => getComputedStyle(element).backgroundColor));
  expect(await accent.evaluate((element) => getComputedStyle(element).color))
    .toBe(await accent.locator(".brick-icon-button").first().evaluate((element) => getComputedStyle(element).color));
});

test("AppBar surface options expose distinct, inspectable demonstrations", async ({ page }) => {
  await page.goto("/app-bar");
  const options = page.getByTestId("app-bar-options");
  await expect(options.getByText("Elevated surface", { exact: true })).toBeVisible();
  await expect(options.getByText("Transparent with backdrop blur", { exact: true })).toBeVisible();
  await expect(options.getByText("Surface without separator", { exact: true })).toBeVisible();

  const elevated = options.locator(".brick-app-bar[data-elevated]");
  const blurred = options.locator(".brick-app-bar[data-blurred]");
  const borderless = options.locator(".brick-app-bar:not([data-bordered])");
  expect(await elevated.evaluate((element) => getComputedStyle(element).boxShadow)).not.toBe("none");
  const reducedTransparency = await page.evaluate(() => matchMedia("(prefers-reduced-transparency: reduce)").matches);
  const backdropFilter = await blurred.evaluate((element) => getComputedStyle(element).backdropFilter);
  if (reducedTransparency) expect(backdropFilter).toBe("none");
  else expect(backdropFilter).not.toBe("none");
  await expect(options.locator(".app-bar-surface-stage--blur .app-bar-blur-backdrop")).toBeVisible();
  expect(await borderless.evaluate((element) => getComputedStyle(element).borderBottomWidth)).toBe("0px");
});

test("AppBar uses an opaque fallback when reduced transparency disables blur", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "Reduced-transparency emulation uses Chromium CDP.");
  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
  });
  await page.goto("/app-bar");
  const blurred = page.getByTestId("app-bar-options").locator(".brick-app-bar[data-blurred]");
  await expect(blurred).toHaveCSS("backdrop-filter", "none");
  expect(await blurred.evaluate((element) => getComputedStyle(element).backgroundColor))
    .not.toBe("rgba(0, 0, 0, 0)");
});

test("AppBar applies every public positioning mode", async ({ page }) => {
  await page.goto("/app-bar");
  for (const position of ["static", "absolute", "sticky", "fixed"] as const) {
    const bar = page.locator(`.brick-app-bar[aria-label='${position} position sample']`);
    await expect(bar).toHaveAttribute("data-position", position);
    expect(await bar.evaluate((element) => getComputedStyle(element).position)).toBe(position);
  }
});

test("IconButton and AppBar stay contained on narrow RTL layouts", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/icon-button");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.goto("/app-bar");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const rtl = page.locator(".brick-app-bar[aria-label='شريط التطبيق']");
  const start = rtl.locator("[data-slot='appbar-start']");
  const end = rtl.locator("[data-slot='appbar-end']");
  const [startBox, endBox] = await Promise.all([start.boundingBox(), end.boundingBox()]);
  expect(startBox).not.toBeNull();
  expect(endBox).not.toBeNull();
  expect(startBox!.x).toBeGreaterThan(endBox!.x);
});

test("AppBar consumer labels stay on one line at 256 CSS pixels", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 720 });
  await page.goto("/app-bar");
  const label = page.getByTestId("app-bar-overview").locator(".brick-app-bar-start strong");
  await expect(label).toHaveCSS("text-overflow", "ellipsis");
  await expect(label).toHaveCSS("white-space", "nowrap");
  expect(await label.evaluate((element) => element.scrollHeight <= element.clientHeight)).toBe(true);
});

test("IconButton remains square when its flex container is constrained", async ({ page }) => {
  await page.setViewportSize({ width: 160, height: 720 });
  await page.goto("/icon-button");
  const overview = page.getByTestId("icon-button-overview");
  const button = overview.locator(".brick-icon-button");
  const box = await button.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBe(box!.height);
  expect(
    await overview.evaluate((element) => element.scrollWidth <= element.clientWidth),
  ).toBe(true);
});

test("IconButton and AppBar keep visible boundaries in forced colors", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Forced-colors emulation is a Chromium release check.");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.goto("/icon-button");
  const iconButton = page.getByRole("button", { name: "outline menu" });
  expect(await iconButton.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderTopWidth))).toBeGreaterThanOrEqual(1);
  await page.goto("/app-bar");
  const bar = page.locator(".brick-app-bar[aria-label='static neutral surface example']").first();
  expect(await bar.evaluate((element) => Number.parseFloat(getComputedStyle(element).borderBottomWidth))).toBeGreaterThanOrEqual(1);
});
