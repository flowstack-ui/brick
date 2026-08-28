import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/dropdown-menu"); });

test("defaults, size, selection, state, submenu, and composition remain complete", async ({ page }) => {
  await page.getByTestId("dropdown-menu-overview").getByRole("button", { name: "Project actions" }).click();
  const menu = page.getByRole("menu", { name: "Project actions" }).first();
  await expect(menu).toHaveAttribute("data-size", "md");
  await expect(menu.getByRole("menuitem")).toHaveCount(2);
  await expect(menu.getByRole("menuitem").first()).toHaveCSS("min-height", "44px");
  await page.keyboard.press("Escape");
  const sizeTriggers = page.getByTestId("dropdown-menu-density").getByRole("button");
  for (const [index, size] of ["sm", "md", "lg"].entries()) {
    const trigger = sizeTriggers.nth(index); await trigger.click();
    const sizedMenu = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
    await expect(sizedMenu).toHaveAttribute("data-size", size);
    await expect(sizedMenu.getByRole("menuitem").first()).toHaveCSS("min-height", ["32px", "44px", "48px"][index]);
    await page.keyboard.press("Escape");
  }
  await page.getByRole("button", { name: "View options" }).click();
  await expect(page.getByRole("menuitemcheckbox", { name: "Inherited permissions" })).toHaveAttribute("aria-checked", "mixed");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Command states" }).click();
  await expect(page.getByRole("menuitem", { name: "Locked command" })).toHaveAttribute("aria-disabled", "true");
  await expect(page.getByRole("menuitem", { name: "Delete project" })).toHaveAttribute("data-tone", "danger");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Move project" }).click();
  const subTrigger = page.getByRole("menuitem", { name: "Another workspace" });
  await subTrigger.focus(); await subTrigger.press("ArrowRight");
  const inlineSubMenu = page.locator(".brick-dropdown-menu__sub-content[data-state='open']");
  await expect(inlineSubMenu).toBeVisible();
  await expect(inlineSubMenu).toHaveAttribute("data-side", /^(right|top|bottom)$/);
  const inlineMotion = await inlineSubMenu.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      transitionProperty: style.transitionProperty,
    };
  });
  expect(inlineMotion.transitionProperty).toContain("translate");
  await expect(page.locator("[data-adapter='project-actions']")).toHaveAttribute("aria-haspopup", "menu");
});

test("leading normalizes and centers Brick Icon geometry at the active density", async ({ page }) => {
  await page.getByRole("button", { name: "Inspect project menu" }).click();
  const icon = page.getByTestId("dropdown-leading-icon");
  const leading = icon.locator("xpath=..");
  const item = page.getByRole("menuitem", { name: /Rename project/ });
  const [iconBox, leadingBox, itemFirstRowGeometry] = await Promise.all([
    icon.boundingBox(),
    leading.boundingBox(),
    item.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const firstTrackSize = Number.parseFloat(style.gridTemplateRows.split(" ")[0]);
      return {
        centerY: bounds.y + Number.parseFloat(style.paddingTop) + firstTrackSize / 2,
        physicalPixel: 1 / window.devicePixelRatio,
      };
    }),
  ]);
  expect(iconBox).not.toBeNull();
  expect(leadingBox).not.toBeNull();
  expect(Math.abs(iconBox!.width - leadingBox!.width)).toBeLessThanOrEqual(
    itemFirstRowGeometry.physicalPixel,
  );
  expect(Math.abs(iconBox!.height - leadingBox!.height)).toBeLessThanOrEqual(
    itemFirstRowGeometry.physicalPixel,
  );
  const iconCenterX = iconBox!.x + iconBox!.width / 2;
  const leadingCenterX = leadingBox!.x + leadingBox!.width / 2;
  const iconCenterY = iconBox!.y + iconBox!.height / 2;
  const leadingCenterY = leadingBox!.y + leadingBox!.height / 2;
  expect(Math.abs(iconCenterX - leadingCenterX)).toBeLessThanOrEqual(
    itemFirstRowGeometry.physicalPixel,
  );
  expect(Math.abs(iconCenterY - leadingCenterY)).toBeLessThanOrEqual(
    itemFirstRowGeometry.physicalPixel,
  );
  expect(Math.abs(leadingCenterY - itemFirstRowGeometry.centerY)).toBeLessThanOrEqual(
    itemFirstRowGeometry.physicalPixel,
  );
});

test("keyboard, RTL, mobile geometry, and accessibility work", async ({ page }) => {
  const trigger = page.getByTestId("dropdown-menu-overview").getByRole("button", { name: "Project actions" });
  await trigger.focus(); await trigger.press("Enter");
  await expect(page.getByRole("menu", { name: "Project actions" }).getByRole("menuitem").first()).toBeFocused();
  await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "إجراءات المشروع" }).click();
  const rtl = page.getByRole("menu", { name: "إجراءات المشروع" });
  const box = await rtl.boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await expect(rtl).toHaveCSS("direction", "rtl");
  const rtlSubTrigger = rtl.getByRole("menuitem", { name: "نقل إلى مساحة عمل" });
  const rtlChevron = await rtlSubTrigger.evaluate((element) => {
    const style = getComputedStyle(element, "::after");
    return {
      borderLeftWidth: style.borderLeftWidth,
      borderRightWidth: style.borderRightWidth,
      direction: style.direction,
      transform: style.transform,
    };
  });
  expect(rtlChevron.borderLeftWidth).toBe("0px");
  expect(rtlChevron.borderRightWidth).toBe("2px");
  expect(rtlChevron.direction).toBe("ltr");
  expect(rtlChevron.transform).toBe("matrix(-0.707107, 0.707107, -0.707107, -0.707107, 0, 0)");
  await page.waitForTimeout(150);
  await expect(page.locator(".brick-dropdown-menu__sub-content[data-state='open']")).toHaveCount(0);
  await rtlSubTrigger.click();
  const rtlSubMenu = page.locator(".brick-dropdown-menu__sub-content[data-state='open']");
  await expect(rtlSubMenu).toHaveAttribute("data-side", /^(top|bottom)$/);
  const subMenuBox = await rtlSubMenu.boundingBox();
  expect(subMenuBox).not.toBeNull();
  expect(subMenuBox!.x).toBeGreaterThanOrEqual(0);
  expect(subMenuBox!.x + subMenuBox!.width).toBeLessThanOrEqual(390);
  const submenuMotion = await rtlSubMenu.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      side: element.getAttribute("data-side"),
      transitionProperty: style.transitionProperty,
    };
  });
  expect(submenuMotion.transitionProperty).not.toContain("scale");
  expect(submenuMotion.transitionProperty).toContain("translate");
  expect(submenuMotion.side).toMatch(/^(top|bottom)$/);
  await page.keyboard.press("Escape");
  expect((await new AxeBuilder({ page }).include('[data-testid="dropdown-menu-overview"]').analyze()).violations).toEqual([]);
});

test("portalled menus use the playground layer below sticky review chrome", async ({ page }) => {
  const trigger = page
    .getByTestId("dropdown-menu-overview")
    .getByRole("button", { name: "Project actions" });
  await trigger.click();
  const menu = page.getByRole("menu", { name: "Project actions" }).first();
  const header = page.locator(".evidence-review-header");

  const [menuZIndex, headerZIndex] = await Promise.all([
    menu.evaluate((element) => Number(getComputedStyle(element).zIndex)),
    header.evaluate((element) => Number(getComputedStyle(element).zIndex)),
  ]);
  expect(menuZIndex).toBeLessThan(headerZIndex);
});

test("playground evidence uses separate cards, compact appearance badges, and responsive output", async ({ page }) => {
  const density = page.getByTestId("dropdown-menu-density");
  await expect(density).toHaveCSS("border-top-width", "0px");
  expect(Number.parseFloat(await density.evaluate((element) => getComputedStyle(element).columnGap))).toBeGreaterThan(1);
  const densityCards = density.locator(".menu-cell");
  await expect(densityCards).toHaveCount(3);
  await expect(densityCards.first()).not.toHaveCSS("border-top-width", "0px");

  if ((await page.viewportSize())!.width > 760) {
    const heights = await densityCards.evaluateAll((nodes) =>
      nodes.map((node) => node.getBoundingClientRect().height),
    );
    expect(heights[0]).toBeCloseTo(heights[1], 1);
    expect(heights[1]).toBeCloseTo(heights[2], 1);
  }

  const appearance = page.getByTestId("dropdown-menu-appearance");
  for (const label of ["Light", "Dark", "Customized"]) {
    const badge = appearance.getByText(label, { exact: true });
    await expect(badge).toBeVisible();
    await expect(badge).toHaveAttribute("data-size", "sm");
  }
  const lightPanel = appearance.locator("[data-brick-appearance='light']");
  const [badgeBox, triggerBox] = await Promise.all([
    lightPanel.getByText("Light", { exact: true }).boundingBox(),
    lightPanel.getByRole("button", { name: "Light project actions" }).boundingBox(),
  ]);
  expect(badgeBox!.y + badgeBox!.height).toBeLessThan(triggerBox!.y);

  const output = page.getByTestId("dropdown-menu-composition").locator(".playground-output-evidence");
  const renderedMarkup = await output.locator("[data-rendered-output]").textContent();
  expect(renderedMarkup).toContain('data-adapter="project-actions"');
  expect(renderedMarkup).toContain('aria-haspopup="menu"');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await output.locator("[data-rendered-output]").textContent()).toBe(renderedMarkup);
  await expect(output.locator(".playground-output-evidence__layout")).toHaveCSS(
    "grid-template-columns",
    /^\d+(?:\.\d+)?px$/,
  );
});
