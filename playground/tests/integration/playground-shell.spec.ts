import { expect, test } from "@playwright/test";

test("docs preview shares the heading alignment at narrow and wide widths", async ({ page }) => {
  for (const width of [390, 1024, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/aspect-ratio?testMode=1");
    const heading = await page.locator(".evidence-page-heading h1").boundingBox();
    const tabs = await page.locator("[data-example-preview] [role=tablist]").first().boundingBox();
    const canvas = await page.locator("[data-example-canvas]").first().boundingBox();
    expect(Math.abs(tabs!.x - heading!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(canvas!.x - heading!.x)).toBeLessThanOrEqual(1);
  }
});

test("shared page heading uses Brick 30px and 16px typography", async ({ page }) => {
  await page.goto("/aspect-ratio?testMode=1");
  const header = page.locator(".evidence-page-heading");
  await expect(header.getByRole("heading", { level: 1, name: "Aspect Ratio", exact: true })).toHaveCSS("font-size", "30px");
  await expect(header.locator("p")).toHaveCSS("font-size", "16px");
  await expect(header).not.toContainText("@flowstack-ui/brick");
  const source = header.getByRole("link", { name: "Source (opens in a new tab)", exact: true });
  await expect(source).toHaveAttribute("href", "https://github.com/flowstack-ui/brick/tree/main/src/components/aspect-ratio");
  await expect(source).toHaveAttribute("target", "_blank");
  await expect(source.locator('[data-position="end"] svg')).toHaveCount(1);
  const storybook = header.getByRole("link", { name: "Storybook — not available yet", exact: true });
  await expect(storybook).toHaveAttribute("aria-disabled", "true");
  await expect(storybook).not.toHaveAttribute("href");
  await expect(storybook.locator("svg")).toHaveCount(2);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(header.locator("h1")).toHaveCSS("font-size", "30px");
});

test("playground loads the Brick reset and token-driven text selection", async ({ page }) => {
  await page.goto("/button");
  for (const appearance of ["light", "dark"] as const) {
    await page.locator("html").evaluate((root, value) => {
      root.dataset.brickAppearance = value;
    }, appearance);
    const colors = await page.locator("h1").evaluate((heading) => {
      const reference = document.createElement("span");
      reference.style.backgroundColor = "var(--brick-color-selection-background)";
      reference.style.color = "var(--brick-color-selection-foreground)";
      document.body.append(reference);
      const selection = getComputedStyle(heading, "::selection");
      const result = {
        background: selection.backgroundColor,
        color: selection.color,
        expectedBackground: getComputedStyle(reference).backgroundColor,
        expectedColor: getComputedStyle(reference).color,
      };
      reference.remove();
      return result;
    });
    expect(colors.background).toBe(colors.expectedBackground);
    expect(colors.color).toBe(colors.expectedColor);
  }
});

test("shared AI tip is passive, content-sized and contained on narrow screens", async ({ page }) => {
  await page.goto("/aspect-ratio?testMode=1");
  const tip = page.locator("[data-playground-ai-tip]");
  await expect(tip).toContainText("AI Tip");
  await expect(tip).toContainText("Want to skip the docs? Use our Agent Skills");
  await expect(tip.locator('a, button, [tabindex], [role="link"], [role="alert"], [role="status"]')).toHaveCount(0);
  await expect(tip).not.toHaveAttribute("role");
  await expect(tip).toHaveAttribute("data-variant", "surface");
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const box = await tip.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    const geometry = await tip.evaluate(node => ({ scroll: node.scrollWidth, client: node.clientWidth, padding: parseFloat(getComputedStyle(node).paddingInlineStart) }));
    expect(geometry.scroll).toBeLessThanOrEqual(geometry.client);
    expect(geometry.padding).toBeGreaterThan(0);
  }
  await page.goto("/button?testMode=1");
  await expect(tip).toHaveCount(1);
});

test("Button route exposes component and scenario navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/button");

  const componentNavigation = page.getByRole("navigation", {
    name: "Component navigation",
  });
  await expect(componentNavigation).toBeVisible();
  const buttonLink = componentNavigation.getByRole("link", {
    exact: true,
    name: "Button",
  });
  await expect(buttonLink).toHaveAttribute("aria-current", "page");
  await expect(
    componentNavigation.getByText("Reference", { exact: true }),
  ).toHaveCount(0);
  await expect(
    componentNavigation.getByRole("link", {
      exact: true,
      name: "Card",
    }),
  ).toHaveAttribute("href", "/card");
  await expect(
    componentNavigation.getByRole("link", {
      exact: true,
      name: "Icon Button",
    }),
  ).toHaveAttribute("href", "/icon-button");
  await expect(
    componentNavigation.getByRole("link", {
      exact: true,
      name: "Checkbox Group",
    }),
  ).toHaveAttribute("href", "/checkbox-group");
  await expect(
    componentNavigation.getByRole("heading", { name: "Integrations" }),
  ).toHaveCount(0);
  const brand = page.getByRole("link", { name: "Brick playground", exact: true });
  await expect(brand).toHaveAttribute("href", "/aspect-ratio");
  await expect(brand.locator("svg")).toBeVisible();
  await expect(brand.locator("svg")).toHaveAttribute("aria-hidden", "true");

  const navigation = page.getByRole("navigation", { name: "On this page" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "Sizes", exact: true })).toHaveAttribute("href", "#sizes");
  await navigation.getByRole("link", { name: "Links and refs", exact: true }).click();
  await expect(page).toHaveURL(/#links$/);
  await expect(page.locator("#links")).toBeInViewport();
});

test("app-bar settings replace the toolbar and keep the docs direction stable", async ({ page }) => {
  await page.goto("/button?testMode=1");
  await expect(page.getByRole("toolbar", { name: "Review controls" })).toHaveCount(0);
  const trigger = page.getByRole("button", { name: "Preview settings", exact: true });
  await trigger.click();
  await page.getByLabel("Appearance", { exact: true }).selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-brick-appearance", "dark");
  await expect(page.getByLabel("Example direction", { exact: true })).toBeEnabled();
  await page.getByLabel("Example direction", { exact: true }).selectOption("rtl");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await page.getByRole("button", { name: "Reset preferences", exact: true }).click();
  await expect(page.getByLabel("Appearance", { exact: true })).toHaveValue("system");
  await expect(page.locator("html")).not.toHaveAttribute("data-brick-appearance");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("wide documentation navigation stays beside content while the heading scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/button");
  const navigation = page.getByRole("navigation", { name: "On this page" });
  await expect(navigation).toBeVisible();
  const content = page.locator('[data-component-page="button"]');
  const navBox = await navigation.boundingBox();
  const contentBox = await content.boundingBox();
  expect(navBox!.x).toBeGreaterThanOrEqual(contentBox!.x + contentBox!.width);
  expect(navBox!.x + navBox!.width).toBeLessThanOrEqual(1440);
  await navigation.getByRole("link", { name: "Links and refs", exact: true }).click();
  await expect(page.locator("#links")).toBeInViewport();
  await expect(navigation).toBeVisible();
  const banner = await page.getByRole("banner", { name: "Brick playground" }).boundingBox();
  expect(banner!.y).toBe(0);
  const section = await page.locator("#links").boundingBox();
  expect(section!.y).toBeGreaterThanOrEqual(banner!.height);
});

test("narrow layouts keep the app bar sticky and release secondary chrome", async ({
  page,
}) => {
  await page.setViewportSize({ width: 960, height: 540 });
  await page.goto("/button");

  const appBar = page.getByRole("banner", { name: "Brick playground" });
  const reviewHeader = page.locator(".evidence-review-header");
  await expect(appBar).toHaveCSS("position", "sticky");
  await expect(reviewHeader).toHaveCSS("position", "static");

  await expect(page.getByRole("navigation", { name: "On this page" })).toBeHidden();
  await page.goto("/button#links");
  const target = page.locator("#links");
  // Check native fragment placement itself, not a test-induced second scroll.
  await expect(target).toBeInViewport();
  const scrollMargin = await target.evaluate((element) =>
    parseFloat(getComputedStyle(element).scrollMarginBlockStart),
  );
  const [appBarBox, targetBox] = await Promise.all([
    appBar.boundingBox(),
    target.boundingBox(),
  ]);
  expect(targetBox!.y).toBeGreaterThanOrEqual(appBarBox!.height);
  expect(scrollMargin).toBeGreaterThan(appBarBox!.height);

  await page.setViewportSize({ width: 480, height: 270 });
  await page.reload();
  await expect(appBar).toHaveCSS("position", "sticky");
  await expect(reviewHeader).toHaveCSS("position", "static");
  await page.evaluate(() => window.scrollTo(0, 1200));
  const scrolledAppBarBox = await appBar.boundingBox();
  expect(scrolledAppBarBox!.y).toBe(0);
});

test("mobile component navigation opens, closes, and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/button");

  const trigger = page.getByRole("button", {
    name: "Open component navigation",
  });
  await expect(
    page.locator(".brick-app-bar-end").getByRole("button", {
      name: "Open component navigation",
    }),
  ).toBeVisible();
  await trigger.click();

  const drawer = page.getByRole("dialog", { name: "Brick components" });
  await expect(drawer).toBeVisible();
  await expect(drawer).toHaveAttribute("data-size", "full");
  await expect(drawer).toHaveCSS("width", "390px");
  await expect(drawer.locator(".brick-nav-list__link").first()).toHaveCSS(
    "font-size",
    "14px",
  );
  await expect(drawer.locator(".brick-nav-list__link").first()).toHaveCSS(
    "min-height",
    "44px",
  );
  await page
    .getByRole("button", {
      name: "Close component navigation",
    })
    .click();
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth", 390);
});

test("component navigation uses responsive visibility and alphabetical ordering", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/button");

  const compactNavigation = page.locator('[data-slot="hide"]');
  const desktopNavigation = page.locator(".evidence-sidebar");
  await expect(compactNavigation).toBeVisible();
  await expect(desktopNavigation).toBeHidden();

  await page.getByRole("button", { name: "Open component navigation" }).click();
  const drawer = page.getByRole("dialog", { name: "Brick components" });
  const sectionLabels = await drawer
    .locator(".brick-nav-list__section-label")
    .allTextContents();
  expect(sectionLabels).toEqual(
    [...sectionLabels].sort((left, right) => left.localeCompare(right)),
  );
  for (const section of await drawer
    .locator(".brick-nav-list__section")
    .all()) {
    const labels = await section
      .locator(".brick-nav-list__link")
      .allTextContents();
    expect(labels).toEqual(
      [...labels].sort((left, right) => left.localeCompare(right)),
    );
  }

  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(drawer).toBeHidden();
  await expect(compactNavigation).toBeHidden();
  await expect(desktopNavigation).toBeVisible();
  await expect(
    page.locator('button[aria-label="Open component navigation"]'),
  ).not.toBeFocused();
});

test("component navigation keeps the shell and sidebar mounted while starting the page at the top", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/button");

  const sidebarViewport = page.locator(
    ".evidence-sidebar-scroll > .brick-scroll-area-viewport",
  );
  const sidebarGeometry = await sidebarViewport.evaluate((viewport) => ({
    clientHeight: viewport.clientHeight,
    scrollHeight: viewport.scrollHeight,
  }));
  expect(sidebarGeometry.scrollHeight).toBeGreaterThan(
    sidebarGeometry.clientHeight,
  );
  await sidebarViewport.evaluate((viewport) => {
    viewport.scrollTop = 480;
  });
  await page.evaluate(() => {
    window.scrollTo(0, 700);
    (
      window as typeof window & { playgroundShellMarker?: string }
    ).playgroundShellMarker = "preserved";
  });
  const sidebarScrollTop = await sidebarViewport.evaluate(
    (viewport) => viewport.scrollTop,
  );
  expect(sidebarScrollTop).toBeGreaterThan(0);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page
    .getByRole("navigation", { name: "Component navigation" })
    .getByRole("link", { exact: true, name: "Icon" })
    .evaluate((link) => (link as HTMLAnchorElement).click());

  await expect(page).toHaveURL(/\/icon\?/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Icon" }),
  ).toBeVisible();
  await expect
    .poll(() => sidebarViewport.evaluate((viewport) => viewport.scrollTop))
    .toBe(sidebarScrollTop);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  expect(
    await page.evaluate(
      () =>
        (window as typeof window & { playgroundShellMarker?: string })
          .playgroundShellMarker,
    ),
  ).toBe("preserved");
});
