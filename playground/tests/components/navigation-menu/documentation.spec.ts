import { expect, test } from "../../evidence-test.js";

for (const dir of ["ltr", "rtl"] as const) {
  test(`NavigationMenu vertical ${dir} edge placement flips without losing its arrow`, async ({ page }) => {
    await page.setViewportSize({ width: 1120, height: 900 });
    await page.goto("/navigation-menu");
    const root = page.locator('#vertical nav');
    await root.evaluate((element, direction) => {
      element.setAttribute("dir", direction);
      Object.assign(element.style, { position: "fixed", top: "250px", left: direction === "ltr" ? "970px" : "20px", zIndex: "1000" });
    }, dir);
    await root.getByRole("button", { name: "Learn", exact: true }).click();
    const viewport = root.locator(".brick-navigation-menu__viewport");
    const indicator = root.locator(".brick-navigation-menu__indicator");
    const side = dir === "ltr" ? "left" : "right";
    await expect(viewport).toHaveAttribute("data-side", side);
    await expect(indicator).toHaveAttribute("data-side", side);
    await expect.poll(async () => {
      const panel = await viewport.boundingBox();
      const arrow = await indicator.boundingBox();
      if (!panel || !arrow) return false;
      const seam = side === "left" ? Math.abs(panel.x + panel.width - arrow.x) : Math.abs(panel.x - arrow.x - arrow.width);
      return panel.x >= 7 && panel.x + panel.width <= 1113 && seam < 1;
    }).toBe(true);
    await expect(root.getByRole("link", { name: "API reference" })).toBeVisible();
  });
}

test("NavigationMenu documentation has named parts and executable example source", async ({ page }) => {
  await page.goto("/navigation-menu");
  await expect(page.locator("section#appearance")).toHaveCount(0);
  for (const id of ["sizes", "variants", "tones", "controlled", "insets", "overflow", "dialog", "composition", "rtl", "responsive"]) {
    const section = page.locator(`section#${id}`);
    await expect(section.getByRole("tab", { name: "Preview", exact: true })).toHaveCount(1);
    await section.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(section.locator("pre")).toContainText("@flowstack-ui/brick");
  }
  for (const part of ["root", "list", "content", "link", "root-provider", "context", "item-indicator"]) {
    const section = page.locator(`#props-${part}`);
    await expect(section.getByRole("heading", { level: 3 })).toHaveCount(1);
    await expect(section.getByRole("table")).toHaveCount(1);
    await expect(page.locator(`a[href="#props-${part}"]`).first()).toBeAttached();
  }
  await expect(page.locator("iframe")).toHaveCount(0);
});

test("NavigationMenu native composition and RTL stay coherent", async ({ page }) => {
  await page.goto("/navigation-menu");
  const composed = page.locator("#composition");
  await composed.getByRole("button", { name: "Learn", exact: true }).focus();
  await expect(composed.getByRole("button", { name: "Learn", exact: true })).toBeFocused();
  await expect(composed.getByRole("button", { name: "Coming soon" })).toBeDisabled();
  await composed.getByRole("button", { name: "Learn", exact: true }).press("Enter");
  await expect(composed.getByRole("link", { name: "Getting started" })).toHaveAttribute("href", "#usage");
  const rtl = page.locator("#rtl").getByRole("navigation");
  await expect(rtl).toHaveAttribute("dir", "rtl");
  await rtl.getByRole("button").click();
  await expect(rtl.getByRole("link", { name: "ابدأ هنا" })).toBeVisible();
});

test("NavigationMenu narrow alternative uses a real Drawer and native destination list", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/navigation-menu");
  const section = page.locator("#responsive");
  await expect(section.getByRole("navigation", { name: "Desktop destinations" })).toBeHidden();
  await section.getByRole("button", { name: "Open navigation" }).click();
  const dialog = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Getting started" })).toHaveAttribute("href", "#usage");
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Close navigation" }).click();
  await expect(dialog).toBeHidden();
  await expect(section.getByRole("navigation", { name: "Desktop destinations" }).getByRole("button", { name: "Learn" })).toBeFocused();
});

test("NavigationMenu control sizes have distinct typography and plain stays paintless", async ({ page }) => {
  await page.goto("/navigation-menu");
  const sizes = page.locator("#sizes .brick-navigation-menu__trigger");
  for (const [index, height] of [[0, 36], [2, 40], [4, 44]]) {
    await expect.poll(async () => (await sizes.nth(index).boundingBox())?.height).toBe(height);
  }
  for (const [index, size] of [[0, 12], [2, 14], [4, 16]]) {
    await expect(sizes.nth(index)).toHaveCSS("font-size", `${size}px`);
  }
  const plain = page.locator('#variants .brick-navigation-menu[data-variant="plain"] .brick-navigation-menu__trigger').first();
  await plain.hover();
  await expect(plain).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await plain.click();
  await expect(plain).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
});

test("NavigationMenu inline, custom artwork and retained draft use the public composition", async ({ page }) => {
  await page.goto("/navigation-menu");
  const inline = page.locator("#inline .brick-navigation-menu");
  await inline.scrollIntoViewIfNeeded();
  const peer = inline.getByRole("button", { name: "Community", exact: true });
  const before = await peer.boundingBox();
  await inline.getByRole("button", { name: "Learn", exact: true }).click();
  await expect(inline.locator(".brick-navigation-menu__item > .brick-navigation-menu__content")).toBeVisible();
  await expect(inline.locator(".brick-navigation-menu__viewport")).toHaveCount(0);
  await expect(inline.locator(".brick-navigation-menu__indicator")).toHaveCount(0);
  const after = await peer.boundingBox();
  expect(after?.x).toBeCloseTo(before!.x, 0);
  expect(after?.y).toBeCloseTo(before!.y, 0);
  const panel = inline.locator(".brick-navigation-menu__content");
  await expect(panel).toHaveCSS("position", "absolute");
  const link = inline.getByRole("link", { name: "Getting started" });
  await expect(link).toBeVisible();
  expect((await link.boundingBox())!.width).toBeGreaterThan(90);
  const indicators = page.locator("#indicators");
  await expect(indicators.getByRole("button", { name: "Custom indicator" }).locator(".brick-navigation-menu__chevron")).toHaveCount(0);
  await expect(indicators.getByRole("button", { name: "No indicator" }).locator(".brick-navigation-menu__adornment")).toHaveCount(0);
  const retained = page.locator("#retained");
  const trigger = retained.getByRole("button", { name: "Learn", exact: true });
  await trigger.click();
  await retained.getByRole("textbox", { name: "Retained draft" }).fill("Keep my draft");
  await trigger.click();
  await expect(retained.getByRole("textbox", { name: "Retained draft" })).not.toBeVisible();
  await trigger.click();
  await expect(retained.getByRole("textbox", { name: "Retained draft" })).toHaveValue("Keep my draft");
});

test("NavigationMenu large content has one bounded scroll region", async ({ page }) => {
  await page.goto("/navigation-menu");
  const section = page.locator("#overflow");
  await section.getByRole("button", { name: "Learn", exact: true }).click();
  const scroll = section.locator(".brick-scroll-area-viewport");
  await expect(scroll).toBeVisible();
  const sizes = await scroll.evaluate(node => ({ height: node.clientHeight, scroll: node.scrollHeight }));
  expect(sizes.height).toBeLessThanOrEqual(192);
  expect(sizes.scroll).toBeGreaterThan(sizes.height);
  await scroll.evaluate(node => { node.scrollTop = node.scrollHeight; });
  await expect(section.getByRole("link", { name: "Guide 20", exact: true })).toBeInViewport();
});

test("NavigationMenu retains independent qualification evidence", async ({ page }) => {
  await page.goto("/navigation-menu?qualification=1");
  await expect(page.getByTestId("navigation-menu-overview")).toBeVisible();
});

test("Navigation palettes match inner links and nested disclosure stays contained", async ({ page }) => {
  await page.goto("/navigation-menu");
  for (const tone of ["neutral", "accent", "contrast"]) {
    const root = page.locator(`#tones nav[data-tone="${tone}"]`);
    const trigger = root.getByRole("button", { name: tone, exact: true });
    await trigger.click();
    const link = root.getByRole("link", { name: "Getting started" });
    await link.hover();
    const paint = async (node: typeof trigger) => node.evaluate(el => ({
      bg: getComputedStyle(el).backgroundColor, color: getComputedStyle(el).color,
    }));
    expect(await paint(link)).toEqual(await paint(trigger));
    await page.keyboard.press("Escape");
  }
  const nested = page.locator("#nested");
  await nested.getByRole("button", { name: "Learn", exact: true }).click();
  await nested.getByRole("button", { name: "Layout", exact: true }).click();
  await expect.poll(async () => {
    const panel = await nested.locator(".brick-navigation-menu__viewport").boundingBox();
    const link = await nested.getByRole("link", { name: "API reference" }).boundingBox();
    return !!panel && !!link && link.y + link.height <= panel.y + panel.height;
  }).toBe(true);
});
