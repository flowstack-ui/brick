import { expect, test } from "@playwright/test";

test("footer follows sidebar order and stays within the article column", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/aspect-ratio?testMode=1");
  const destinations = await page.locator(".evidence-sidebar .brick-nav-list__link").evaluateAll(links =>
    links.map(link => ({ href: link.getAttribute("href"), title: link.textContent?.trim() })));
  const index = destinations.findIndex(entry => entry.href === "/aspect-ratio");
  const footer = page.getByRole("navigation", { name: "Adjacent component pages" });
  await expect(footer.locator('[rel="prev"]')).toHaveAttribute("href", destinations[index - 1].href!);
  await expect(footer.locator('[rel="next"]')).toHaveAttribute("href", destinations[index + 1].href!);
  await expect(page.getByText("This route is deterministic evidence.", { exact: false })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Back to top", exact: true })).toHaveCount(0);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    const content = (await page.locator("[data-playground-content]").boundingBox())!;
    const box = (await footer.boundingBox())!;
    expect(box.x).toBeCloseTo(content.x, 0);
    expect(box.width).toBeCloseTo(content.width, 0);
    expect(await footer.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    const next = footer.locator('[rel="next"]');
    const geometry = await next.evaluate(el => {
      const box = el.getBoundingClientRect();
      const label = el.querySelector(".brick-text")!.getBoundingClientRect();
      const css = getComputedStyle(el);
      return { inset: box.right - label.right, expected: parseFloat(css.paddingRight) + parseFloat(css.borderRightWidth), background: css.backgroundColor };
    });
    expect(geometry.inset).toBeCloseTo(geometry.expected, 0);
    await expect(next).toHaveAttribute("data-level", "canvas");
  }
  await footer.locator('[rel="next"]').click();
  await expect(page).toHaveURL(url => url.pathname === destinations[index + 1].href);
  for (const [entry, missing] of [[destinations[0], "prev"], [destinations[destinations.length - 1], "next"]] as const) {
    await page.goto(entry.href!);
    await expect(footer.locator(`[rel="${missing}"]`)).toHaveCount(0);
    await expect(footer.getByRole("link")).toHaveCount(1);
  }
});

test("docs rails hide independently and mobile navigation closes at the sidebar breakpoint", async ({ page }) => {
  await page.goto("/aspect-ratio?testMode=1");
  const sidebar = page.locator(".evidence-sidebar");
  const rail = page.locator(".docs-table-of-contents-rail");
  const trigger = page.getByRole("button", { name: "Open component navigation", exact: true });
  for (const width of [1440, 1280, 1279, 1024, 768, 767, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(sidebar).toBeVisible({ visible: width >= 768 });
    await expect(rail).toBeVisible({ visible: width >= 1280 });
    await expect(trigger).toBeVisible({ visible: width < 768 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Brick components" });
  await expect(drawer).toBeVisible();
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(drawer).not.toBeVisible();
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(drawer).not.toBeVisible();
  await trigger.click();
  await expect(drawer).toBeVisible();
  await page.getByRole("button", { name: "Close component navigation", exact: true }).click();
  await expect(trigger).toBeFocused();
});

test("sidebar titles and items align without redundant viewport inset", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/button?testMode=1");
  const viewport = page.locator(".evidence-sidebar-scroll > .brick-scroll-area-viewport");
  await expect(viewport).toHaveCSS("padding-left", "0px");
  await expect(page.locator(".evidence-sidebar > .brick-sidebar__content")).toHaveAttribute("data-inset", "none");
  const groups = page.locator(".evidence-sidebar .evidence-navigation__group");
  await expect(page.locator(".evidence-sidebar .evidence-navigation")).toHaveCSS("row-gap", "32px");
  await expect(groups.first()).toHaveCSS("row-gap", "8px");
  for (const group of await groups.all()) {
    const label = (await group.locator(".brick-nav-list__section-label").boundingBox())!;
    const link = group.locator(".brick-nav-list__link").first();
    const text = (await link.locator(".brick-nav-list__link-label").boundingBox())!;
    const padding = await link.evaluate(el => parseFloat(getComputedStyle(el).paddingInlineStart));
    expect(text.x - label.x).toBeCloseTo(padding + 1, 0);
    await expect(group.locator(".brick-nav-list__section-content")).toHaveCSS("padding-inline-start", "0px");
  }
  await page.locator(".evidence-sidebar .brick-nav-list__link").last().scrollIntoViewIfNeeded();
  expect(await viewport.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  await page.locator(".evidence-sidebar .brick-nav-list__link").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".evidence-sidebar .brick-nav-list__link").first()).toBeInViewport();
});

test("app bar and shell share centered responsive gutters", async ({ page }) => {
  for (const width of [390, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/button?testMode=1");
    const header = page.locator("[data-playground-app-bar] > .brick-container");
    const shell = page.locator(".evidence-layout").locator("..");
    const a = (await header.boundingBox())!;
    const b = (await shell.boundingBox())!;
    expect(a.x).toBeCloseTo(b.x, 0);
    expect(a.width).toBeCloseTo(b.width, 0);
    expect(b.width).toBeLessThanOrEqual(1440);
    expect(b.x).toBeCloseTo((width - b.width) / 2, 0);
    const gutter = await shell.evaluate(el => parseFloat(getComputedStyle(el).paddingInlineStart));
    expect(gutter).toBeGreaterThanOrEqual(16);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test("desktop navigation is compact while mobile navigation stays comfortable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/button?testMode=1");
  await expect(page.locator(".evidence-sidebar .evidence-navigation")).toHaveAttribute("data-density", "compact");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open component navigation" }).click();
  await expect(page.getByRole("dialog").locator(".evidence-navigation")).toHaveAttribute("data-density", "comfortable");
});

test("sticky app bar matches canvas while sidebar stays transparent and borderless", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/button?testMode=1");
  for (const appearance of ["light", "dark"]) {
    await page.getByRole("button", { name: "Preview settings", exact: true }).click();
    await page.getByLabel("Appearance", { exact: true }).selectOption(appearance);
    await page.keyboard.press("Escape");
    const canvas = await page.locator(".evidence-app").evaluate(el => getComputedStyle(el).backgroundColor);
    const bar = page.locator("[data-playground-app-bar]");
    expect(canvas).not.toBe("rgba(0, 0, 0, 0)");
    await expect(bar).toHaveCSS("background-color", canvas);
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    await expect(bar).toHaveCSS("background-color", canvas);
    expect((await bar.boundingBox())!.y).toBeCloseTo(0, 0);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator(".evidence-sidebar")).toBeVisible();
    await expect(page.locator(".evidence-sidebar")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await expect(page.locator(".evidence-sidebar")).toHaveCSS("border-right-color", "rgba(0, 0, 0, 0)");
  }
});

test("component routes retain inline examples and app-bar-only settings", async ({ page }) => {
  await page.route(/https:\/\/(www.youtube.com|www.google.com)\//, route => route.fulfill({ contentType: "text/html", body: "<!doctype html><title>Embed fixture</title>" }));
  for (const route of ["aspect-ratio", "button", "visually-hidden"]) {
    await page.goto(`/${route}?qualification=1&testMode=1&isolated=1`);
    await expect(page.locator("[data-scenario]").first()).toBeVisible();
    await expect(page.locator('iframe[src*="preview.html"]')).toHaveCount(0);
    if (route === "aspect-ratio") {
      await expect(page.locator('iframe[title="Big Buck Bunny — Blender animated short"]')).toHaveCount(1);
      await expect(page.locator('iframe[title="Map of Lagos, Nigeria"]')).toHaveCount(1);
    }
    await expect(page.locator("[data-preview-example], .preview-viewport-scroll")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "View page source", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Reset example", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Preview settings", exact: true })).toHaveCount(1);
  }
});

test("app-bar preferences work without changing example presentation", async ({ page }) => {
  await page.goto("/button?testMode=1");
  await page.getByRole("button", { name: "Preview settings", exact: true }).click();
  await page.getByLabel("Appearance", { exact: true }).selectOption("dark");
  await page.getByLabel("Example direction", { exact: true }).selectOption("rtl");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator("[data-playground-examples]")).toHaveAttribute("dir", "rtl");
  await page.getByLabel("Font", { exact: true }).selectOption("inter");
  await page.getByLabel("Radius", { exact: true }).selectOption("square");
  await expect(page.locator("html")).toHaveAttribute("data-preview-font", "inter");
  await page.getByLabel("Theme", { exact: true }).selectOption("qualification");
  await expect(page.getByLabel("Radius", { exact: true })).toBeDisabled();
  await expect(page.locator("html")).toHaveAttribute("data-flowstack-theme", "qualification");
  await page.getByLabel("Theme", { exact: true }).selectOption("brick");
  await expect(page.locator("html")).toHaveAttribute("data-preview-radius", "square");
  await page.keyboard.press("Escape");
  await expect(page.locator('iframe[src*="preview.html"]')).toHaveCount(0);
  await page.reload();
  await expect(page.locator("[data-playground-examples]")).toHaveAttribute("dir", "rtl");
});

test("settings retain padded anatomy, scrolling and focus return on a short screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 500 });
  await page.goto("/aspect-ratio?testMode=1");
  const trigger = page.getByRole("button", { name: "Preview settings", exact: true });
  await trigger.click();
  const popover = page.locator('[data-slot="popover"]');
  await expect(popover).toBeVisible();
  const inset = await popover.evaluate(root => {
    const title = root.querySelector('[data-slot="popover-title"]')!.getBoundingClientRect();
    const box = root.getBoundingClientRect();
    return { left: title.left - box.left, top: title.top - box.top };
  });
  expect(inset.left).toBeGreaterThanOrEqual(12);
  expect(inset.top).toBeGreaterThanOrEqual(12);
  const reset = popover.getByRole("button", { name: "Reset preferences", exact: true });
  await reset.scrollIntoViewIfNeeded();
  await expect(reset).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("denied storage does not prevent inline rendering", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Denied", "SecurityError"); } }));
  await page.goto("/aspect-ratio?appearance=light");
  await expect(page.locator("[data-scenario]").first()).toBeVisible();
  await expect(page.locator('iframe[src*="preview.html"]')).toHaveCount(0);
});
