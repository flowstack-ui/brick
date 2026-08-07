import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectRootDefaults(root: Locator) {
  await expect(root).toHaveAttribute("data-position", "static");
  await expect(root).toHaveAttribute("data-tone", "neutral");
  await expect(root).toHaveAttribute("data-variant", "surface");
  await expect(root).toHaveAttribute("data-bordered", "");
  await expect(root).not.toHaveAttribute("data-elevated");
  await expect(root).not.toHaveAttribute("data-blurred");
  await expect(root.locator("[data-slot='appbar-toolbar']")).toHaveAttribute(
    "data-density",
    "comfortable",
  );
}

test("AppBar exposes its default landmark, anatomy, and geometric center", async ({
  page,
}) => {
  await page.goto("/app-bar");
  const root = page
    .getByTestId("app-bar-overview")
    .locator('.brick-app-bar[aria-label="Default AppBar"]');
  await expectRootDefaults(root);
  await expect(root).toHaveJSProperty("tagName", "HEADER");

  const toolbar = root.locator("[data-slot='appbar-toolbar']");
  const start = root.locator("[data-slot='appbar-start']");
  const center = root.locator("[data-slot='appbar-center']");
  const end = root.locator("[data-slot='appbar-end']");
  await expect(toolbar).not.toHaveAttribute("role");
  await expect(start).toBeVisible();
  await expect(center).toBeVisible();
  await expect(end).toBeVisible();

  const [toolbarBox, centerBox] = await Promise.all([
    toolbar.boundingBox(),
    center.boundingBox(),
  ]);
  expect(toolbarBox).not.toBeNull();
  expect(centerBox).not.toBeNull();
  expect(centerBox!.x + centerBox!.width / 2).toBeCloseTo(
    toolbarBox!.x + toolbarBox!.width / 2,
    0,
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("AppBar variants change only the default neutral surface treatment", async ({
  page,
}) => {
  await page.goto("/app-bar");
  const roots = page.getByTestId("app-bar-variants").locator(".brick-app-bar");
  await expect(roots).toHaveCount(3);

  for (const variant of ["solid", "surface", "transparent"] as const) {
    const root = page
      .getByTestId("app-bar-variants")
      .locator(`.brick-app-bar[data-variant="${variant}"]`);
    await expect(root).toHaveCount(1);
    await expect(root).toHaveAttribute("data-variant", variant);
    await expect(root).toHaveAttribute("data-tone", "neutral");
    await expect(root).toHaveAttribute("data-position", "static");
    await expect(root).toHaveAttribute("data-bordered", "");
    await expect(root).not.toHaveAttribute("data-elevated");
    await expect(root).not.toHaveAttribute("data-blurred");
    await expect(root.locator("[data-slot='appbar-toolbar']")).toHaveAttribute(
      "data-density",
      "comfortable",
    );
    await expect(root.getByText("Brick", { exact: true })).toBeVisible();
    await expect(root.getByRole("link", { name: "Projects" })).toBeVisible();
  }
});

test("AppBar exposes the complete tone by variant matrix", async ({ page }) => {
  await page.goto("/app-bar");
  const matrix = page.getByTestId("app-bar-tones");
  await expect(matrix.locator(".brick-app-bar")).toHaveCount(6);

  for (const variant of ["solid", "surface", "transparent"] as const) {
    for (const tone of ["neutral", "accent"] as const) {
      const root = matrix.locator(
        `.brick-app-bar[data-variant="${variant}"][data-tone="${tone}"]`,
      );
      await expect(root).toHaveCount(1);
      await expect(root).toHaveAttribute("data-position", "static");
      await expect(root).toHaveAttribute("data-bordered", "");
      await expect(root.locator("[data-slot='appbar-toolbar']")).toHaveAttribute(
        "data-density",
        "comfortable",
      );
    }
  }

  const neutralSolid = matrix.locator(
    '.brick-app-bar[data-variant="solid"][data-tone="neutral"]',
  );
  const accentSolid = matrix.locator(
    '.brick-app-bar[data-variant="solid"][data-tone="accent"]',
  );
  expect(
    await neutralSolid.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
  ).not.toBe(
    await accentSolid.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
  );
});

test("AppBar density changes only Toolbar geometry", async ({ page }) => {
  await page.goto("/app-bar");
  const density = page.getByTestId("app-bar-density");
  const comfortable = density.locator(
    '.brick-app-bar[aria-label="comfortable density AppBar"]',
  );
  const compact = density.locator(
    '.brick-app-bar[aria-label="compact density AppBar"]',
  );

  for (const root of [comfortable, compact]) {
    await expect(root).toHaveAttribute("data-position", "static");
    await expect(root).toHaveAttribute("data-tone", "neutral");
    await expect(root).toHaveAttribute("data-variant", "surface");
    await expect(root).toHaveAttribute("data-bordered", "");
    await expect(root.getByText("Brick", { exact: true })).toBeVisible();
    await expect(root.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(root.getByRole("img", { name: "Alex Lee" })).toBeVisible();
  }

  const comfortableToolbar = comfortable.locator(
    "[data-slot='appbar-toolbar']",
  );
  const compactToolbar = compact.locator("[data-slot='appbar-toolbar']");
  await expect(comfortableToolbar).toHaveAttribute(
    "data-density",
    "comfortable",
  );
  await expect(compactToolbar).toHaveAttribute("data-density", "compact");
  await expect(comfortableToolbar).not.toHaveAttribute("role");
  await expect(compactToolbar).not.toHaveAttribute("role");
  expect(
    await comfortableToolbar.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue("--brick-app-bar-toolbar-min-block-size-comfortable")
        .trim(),
    ),
  ).toBe("4rem");
  expect(
    await compactToolbar.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue("--brick-app-bar-toolbar-min-block-size-compact")
        .trim(),
    ),
  ).toBe("3rem");
  expect(
    await comfortableToolbar.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue("--brick-app-bar-toolbar-min-block-size")
        .trim(),
    ),
  ).toBe("4rem");
  expect(
    await compactToolbar.evaluate((element) =>
      getComputedStyle(element)
        .getPropertyValue("--brick-app-bar-toolbar-min-block-size")
        .trim(),
    ),
  ).toBe("3rem");
  expect((await comfortableToolbar.boundingBox())!.height).toBe(64);
  expect((await compactToolbar.boundingBox())!.height).toBe(48);

  await comfortable.evaluate((element) => {
    element.style.setProperty(
      "--brick-app-bar-toolbar-min-block-size-comfortable",
      "5rem",
    );
  });
  expect((await comfortableToolbar.boundingBox())!.height).toBe(80);
});

test("AppBar surface options remain independent", async ({ page }) => {
  await page.goto("/app-bar");
  const options = page.getByTestId("app-bar-options");
  const elevated = options.locator(
    '.brick-app-bar[aria-label="Elevated AppBar"]',
  );
  const blurred = options.locator(
    '.brick-app-bar[aria-label="Blurred AppBar"]',
  );
  const borderless = options.locator(
    '.brick-app-bar[aria-label="Borderless AppBar"]',
  );

  await expect(elevated).toHaveAttribute("data-elevated", "");
  await expect(elevated).not.toHaveAttribute("data-blurred");
  await expect(elevated).toHaveAttribute("data-bordered", "");
  expect(
    await elevated.evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");

  await expect(blurred).toHaveAttribute("data-blurred", "");
  await expect(blurred).not.toHaveAttribute("data-elevated");
  await expect(blurred).toHaveAttribute("data-bordered", "");
  expect(
    await blurred.evaluate(
      (element) => getComputedStyle(element).backdropFilter,
    ),
  ).not.toBe("none");
  await expect(options.locator(".app-bar-blur-backdrop")).toBeVisible();

  await expect(borderless).not.toHaveAttribute("data-bordered");
  await expect(borderless).not.toHaveAttribute("data-elevated");
  await expect(borderless).not.toHaveAttribute("data-blurred");
  await expect(borderless).toHaveCSS("border-bottom-width", "0px");

  for (const root of [elevated, blurred, borderless]) {
    await expect(root).toHaveAttribute("data-position", "static");
    await expect(root).toHaveAttribute("data-tone", "neutral");
    await expect(root).toHaveAttribute("data-variant", "surface");
    await expect(root.locator("[data-slot='appbar-toolbar']")).toHaveAttribute(
      "data-density",
      "comfortable",
    );
  }
});

test("AppBar applies every position without changing unrelated defaults", async ({
  page,
}) => {
  await page.goto("/app-bar");
  const samples = page.getByTestId("app-bar-positions");
  for (const position of ["static", "absolute", "sticky", "fixed"] as const) {
    const root = samples.locator(
      `.brick-app-bar[aria-label="${position} position AppBar"]`,
    );
    await expect(root).toHaveAttribute("data-position", position);
    await expect(root).toHaveAttribute("data-tone", "neutral");
    await expect(root).toHaveAttribute("data-variant", "surface");
    await expect(root).toHaveAttribute("data-bordered", "");
    await expect(root.locator("[data-slot='appbar-toolbar']")).toHaveAttribute(
      "data-density",
      "comfortable",
    );
    await expect(root).toHaveCSS("position", position);
  }
});

test("AppBar preserves anatomy through every Root composition path", async ({
  page,
}) => {
  await page.goto("/app-bar");
  const composition = page.getByTestId("app-bar-composition");

  for (const testId of [
    "app-bar-composition-default",
    "app-bar-composition-render",
    "app-bar-composition-as-child",
  ]) {
    const root = composition.getByTestId(testId);
    await expect(root).toHaveJSProperty("tagName", "HEADER");
    await expect(root).toHaveClass(/brick-app-bar/);
    await expect(root.locator("[data-slot='appbar-toolbar']")).toHaveCount(1);
    await expect(root.locator("[data-slot='appbar-start']")).toHaveCount(1);
    await expect(root.locator("[data-slot='appbar-center']")).toHaveCount(1);
    await expect(root.locator("[data-slot='appbar-end']")).toHaveCount(1);
  }
  const output = composition.locator("[data-rendered-output]");
  await expect(output).toHaveCount(3);
  await expect(output.first()).toContainText('data-slot="appbar"');
});

test("AppBar supports scoped appearance and exact customization hooks", async ({
  page,
}) => {
  await page.goto("/app-bar");
  const light = page.locator(
    '.brick-app-bar[aria-label="Light appearance AppBar"]',
  );
  const dark = page.locator(
    '.brick-app-bar[aria-label="Dark appearance AppBar"]',
  );
  expect(
    await light.evaluate((element) => getComputedStyle(element).backgroundColor),
  ).not.toBe(
    await dark.evaluate((element) => getComputedStyle(element).backgroundColor),
  );
  await expectRootDefaults(light);
  await expectRootDefaults(dark);

  const token = page.locator(
    '.brick-app-bar[aria-label="Token customized AppBar"]',
  );
  await expect(token).toHaveCSS("background-color", "rgb(18, 78, 120)");
  await expect(token).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(token).toHaveCSS("border-bottom-color", "rgb(13, 59, 92)");

  const hook = page.locator(
    '.brick-app-bar[aria-label="Customized AppBar"]',
  );
  await expect(hook).toHaveClass(/dashed-app-bar/);
  await expect(hook).toHaveAttribute("data-slot", "custom-app-bar");
  await expect(hook).toHaveCSS("border-bottom-style", "dashed");
  await expect(hook).toHaveCSS("border-bottom-width", "2px");

  const tokenCode = page
    .getByRole("heading", { name: "Component CSS properties" })
    .locator("..")
    .locator("code");
  await expect(tokenCode).toContainText("--brick-app-bar-background");
  await expect(tokenCode).toContainText("--brick-app-bar-foreground");
  await expect(tokenCode).toContainText("--brick-app-bar-border-color");
});

test("AppBar stays contained and preserves logical RTL placement", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/app-bar");
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);

  const constrained = page.locator(
    '.brick-app-bar[aria-label="Constrained AppBar"]',
  );
  await expectRootDefaults(constrained);
  const label = constrained.locator(".app-bar-stress-label");
  await expect(label).toHaveCSS("text-overflow", "ellipsis");
  await expect(label).toHaveCSS("white-space", "nowrap");
  expect(
    await label.evaluate(
      (element) => element.scrollWidth > element.clientWidth,
    ),
  ).toBe(true);

  const rtl = page.locator('.brick-app-bar[aria-label="شريط التطبيق"]');
  await expectRootDefaults(rtl);
  const start = rtl.locator("[data-slot='appbar-start']");
  const center = rtl.locator("[data-slot='appbar-center']");
  const end = rtl.locator("[data-slot='appbar-end']");
  const [rootBox, startBox, centerBox, endBox] = await Promise.all([
    rtl.boundingBox(),
    start.boundingBox(),
    center.boundingBox(),
    end.boundingBox(),
  ]);
  expect(rootBox).not.toBeNull();
  expect(startBox).not.toBeNull();
  expect(centerBox).not.toBeNull();
  expect(endBox).not.toBeNull();
  expect(startBox!.x).toBeGreaterThan(endBox!.x);
  expect(centerBox!.x + centerBox!.width / 2).toBeCloseTo(
    rootBox!.x + rootBox!.width / 2,
    0,
  );
});

test("AppBar restores opaque and system-safe surfaces for preferences", async ({
  page,
  browserName,
}, testInfo) => {
  test.skip(browserName !== "chromium", "Preference emulation uses Chromium.");
  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-transparency", value: "reduce" }],
  });
  await page.goto("/app-bar");
  const blurred = page.locator(
    '.brick-app-bar[aria-label="Blurred AppBar"]',
  );
  await expect(blurred).toHaveCSS("backdrop-filter", "none");
  expect(
    await blurred.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    ),
  ).not.toBe("rgba(0, 0, 0, 0)");

  test.skip(
    testInfo.project.name !== "chromium",
    "Forced colors is a Chromium release check.",
  );
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  const overview = page.locator(
    '.brick-app-bar[aria-label="Default AppBar"]',
  );
  expect(
    await overview.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).borderBottomWidth),
    ),
  ).toBeGreaterThanOrEqual(1);
  await expect(overview).toHaveCSS("box-shadow", "none");
});
