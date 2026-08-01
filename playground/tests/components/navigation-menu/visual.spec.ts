import { expect, installVisualDefaults, setAppearance, test, useForcedColors } from "../../visual-harness.js";
installVisualDefaults("/navigation-menu");

test("navigation-menu defaults and complete recipes", async ({ page }) => {
  await page.mouse.move(0, 0);
  const overview = page.getByTestId("navigation-menu-overview");
  const overviewProducts = overview.getByRole("button", { name: "Products" });
  await expect(overviewProducts).toHaveAttribute("aria-expanded", "false");
  await overviewProducts.click();
  await expect(overviewProducts).toHaveAttribute("aria-expanded", "true");
  const openRoot = overview.getByRole("navigation", { name: "Primary navigation" });
  const openViewport = openRoot.locator(".brick-navigation-menu__viewport");
  const [rootBox, viewportBox] = await Promise.all([openRoot.boundingBox(), openViewport.boundingBox()]);
  if (!rootBox || !viewportBox) throw new Error("Open Navigation Menu evidence is not measurable.");
  const clipX = Math.max(0, Math.min(rootBox.x, viewportBox.x) - 16);
  const clipY = Math.max(0, Math.min(rootBox.y, viewportBox.y) - 16);
  await expect(page).toHaveScreenshot("overview-open-light.png", { clip: { x: clipX, y: clipY, width: Math.ceil(Math.max(rootBox.x + rootBox.width, viewportBox.x + viewportBox.width) - clipX + 16), height: Math.ceil(Math.max(rootBox.y + rootBox.height, viewportBox.y + viewportBox.height) - clipY + 16) } });
  await page.keyboard.press("Escape");
  await expect(overviewProducts).toHaveAttribute("aria-expanded", "false");
  const verticalRoot = page.getByTestId("navigation-menu-orientation").locator(".brick-navigation-menu[data-orientation='vertical']");
  const verticalProducts = verticalRoot.getByRole("button", { name: "Products" });
  await verticalProducts.click();
  await expect(verticalProducts).toHaveAttribute("aria-expanded", "true");
  const verticalViewport = verticalRoot.locator(".brick-navigation-menu__viewport");
  const [verticalRootBox, verticalViewportBox] = await Promise.all([verticalRoot.boundingBox(), verticalViewport.boundingBox()]);
  if (!verticalRootBox || !verticalViewportBox) throw new Error("Open vertical Navigation Menu evidence is not measurable.");
  const verticalClipX = Math.max(0, Math.min(verticalRootBox.x, verticalViewportBox.x) - 16);
  const verticalClipY = Math.max(0, Math.min(verticalRootBox.y, verticalViewportBox.y) - 16);
  await expect(page).toHaveScreenshot("orientation-vertical-open-light.png", { clip: { x: verticalClipX, y: verticalClipY, width: Math.ceil(Math.max(verticalRootBox.x + verticalRootBox.width, verticalViewportBox.x + verticalViewportBox.width) - verticalClipX + 16), height: Math.ceil(Math.max(verticalRootBox.y + verticalRootBox.height, verticalViewportBox.y + verticalViewportBox.height) - verticalClipY + 16) } });
  const verticalSolutions = verticalRoot.getByRole("button", { name: "Solutions" });
  await verticalSolutions.click();
  await expect(verticalSolutions).toHaveAttribute("aria-expanded", "true");
  await expect(page).toHaveScreenshot("orientation-vertical-solutions-open-light.png", { clip: { x: verticalClipX, y: verticalClipY, width: Math.ceil(Math.max(verticalRootBox.x + verticalRootBox.width, verticalViewportBox.x + verticalViewportBox.width) - verticalClipX + 16), height: Math.ceil(Math.max(verticalRootBox.y + verticalRootBox.height, verticalViewportBox.y + verticalViewportBox.height) - verticalClipY + 16) } });
  await page.keyboard.press("Escape");
  await expect(verticalSolutions).toHaveAttribute("aria-expanded", "false");
  await verticalSolutions.evaluate((element) => element.blur());

  const appearance = page.getByTestId("navigation-menu-appearance");
  const appearancePanels = appearance.locator(".menu-scoped-panel");
  for (const [index, snapshot] of ["appearance-light-open.png", "appearance-dark-open.png"].entries()) {
    const panel = appearancePanels.nth(index);
    const trigger = panel.getByRole("button", { name: "Products" });
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const viewport = panel.locator(".brick-navigation-menu__viewport");
    const [panelBox, appearanceViewportBox] = await Promise.all([panel.boundingBox(), viewport.boundingBox()]);
    if (!panelBox || !appearanceViewportBox) throw new Error("Open appearance evidence is not measurable.");
    expect(appearanceViewportBox.x).toBeGreaterThanOrEqual(panelBox.x);
    expect(appearanceViewportBox.x + appearanceViewportBox.width).toBeLessThanOrEqual(panelBox.x + panelBox.width);
    await expect(panel).toHaveScreenshot(snapshot);
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.evaluate((element) => element.blur());
  }

  await page.addStyleTag({ content: "[data-component-page='navigation-menu'] .brick-navigation-menu { pointer-events: none !important; }" });
  await expect(overview).toHaveScreenshot("overview-light.png");
  await expect(page.getByTestId("navigation-menu-links")).toHaveScreenshot("links-light.png");
  await expect(page.getByTestId("navigation-menu-size")).toHaveScreenshot("size-light.png");
  await expect(page.getByTestId("navigation-menu-orientation")).toHaveScreenshot("orientation-light.png");
  const content = page.getByTestId("navigation-menu-content");
  await expect(content.getByRole("button", { name: "Products" })).toHaveAttribute("aria-expanded", "false");
  await expect(content).toHaveScreenshot("content-light.png");
  const states = page.getByTestId("navigation-menu-states");
  const stateTriggers = states.getByRole("button", { name: "Products" });
  await expect(stateTriggers).toHaveCount(2);
  await expect(stateTriggers.first()).toHaveAttribute("aria-expanded", "false");
  await expect(stateTriggers.last()).toHaveAttribute("aria-expanded", "false");
  await expect(states).toHaveScreenshot("states-light.png");
  await setAppearance(page, "dark");
  await expect(appearancePanels.first()).toHaveScreenshot("appearance-light.png");
  await expect(appearancePanels.last()).toHaveScreenshot("appearance-dark.png");
  await setAppearance(page, "light");
  const customization = page.locator(".playground-customization-evidence");
  await customization.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await page.mouse.move(0, 0);
  await expect(customization.getByRole("button", { name: "Products" })).toHaveAttribute("aria-expanded", "false");
  await expect(customization).toHaveScreenshot("customization-light.png");
});

test("navigation-menu responsive and forced colors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByTestId("navigation-menu-stress")).toHaveScreenshot("stress-mobile.png");
  await page.setViewportSize({ width: 1120, height: 900 });
  await useForcedColors(page);
  await expect(page.getByTestId("navigation-menu-overview")).toHaveScreenshot("overview-forced-colors.png");
});
