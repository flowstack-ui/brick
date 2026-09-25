import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/dropdown-menu");
});

test("pointer departure clears highlight without closing or breaking keyboard entry", async ({
  page,
}) => {
  await page
    .locator('[data-component-page="dropdown-menu"]')
    .getByRole("button", { name: "Actions", exact: true })
    .first()
    .click();
  const popup = page.getByRole("menu").last();
  await popup.getByRole("menuitem").first().hover();
  await expect(popup.locator("[data-highlighted]")).toHaveCount(1);
  await page.mouse.move(0, 0);
  await expect(popup.locator("[data-highlighted]")).toHaveCount(0);
  await expect(popup).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(popup.getByRole("menuitem").first()).toBeFocused();
});

test("dialog menu is above its dialog and accepts pointer selection", async ({
  page,
}) => {
  await page
    .locator("#dialog")
    .getByRole("button", { name: "Open dialog", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  const trigger = dialog.getByRole("button", { name: "Actions", exact: true });
  await trigger.click();
  const item = page.getByRole("menuitem", { name: "New file", exact: true });
  await expect(item).toBeVisible();
  await item.click();
  await expect(item).toBeHidden();
  await expect(dialog).toBeVisible();
  await expect(trigger).toBeFocused();
});

test("avatar trigger has no finished Button padding", async ({ page }) => {
  const trigger = page
    .locator("#avatar")
    .getByRole("button", { name: "Account actions" });
  await expect(trigger).toHaveAttribute("data-native-trigger", "");
  await expect(trigger).toHaveCSS("padding", "0px");
  await trigger.click();
  await expect(
    page.getByRole("menuitem", { name: "Profile", exact: true }),
  ).toBeVisible();
});

test("choice rows clear pointer highlight but retain their selection", async ({
  page,
}) => {
  for (const [section, name, role, itemName] of [
    ["#choices", "Preferences", "menuitemcheckbox", "Notifications"],
    ["#radio-items", "Density", "menuitemradio", "Comfortable"],
  ] as const) {
    const trigger = page
      .locator(section)
      .getByRole("button", { name, exact: true });
    // Keep room for the popup before opening. Hover's automatic page scroll
    // otherwise races floating-position updates when this trigger is at an edge.
    await trigger.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await trigger.click();
    const item = page.getByRole(role, { name: itemName, exact: true });
    await item.hover();
    await expect(item).toHaveAttribute("data-highlighted", "");
    await page.mouse.move(0, 0);
    await expect(item).not.toHaveAttribute("data-highlighted");
    await expect(item).toHaveAttribute("aria-checked", "true");
    await page.keyboard.press("Escape");
  }
});

test("mixed commands fit their labels and include ordinary rows", async ({
  page,
}) => {
  await page
    .locator("#mixed")
    .getByRole("button", { name: "Actions", exact: true })
    .click();
  const menu = page.getByRole("menu").last();
  await expect(menu.getByRole("menuitem")).toHaveCount(6);
  const labels = menu.locator('[data-slot="dropdown-menu-item-label"]');
  for (const label of await labels.all()) {
    const metrics = await label.evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      line: parseFloat(getComputedStyle(element).lineHeight),
    }));
    expect(metrics.height).toBeLessThanOrEqual(metrics.line + 1);
  }
});

test("same-width example matches the trigger without changing placement examples", async ({
  page,
}) => {
  const trigger = page
    .locator("#same-width")
    .getByRole("button", { name: "Workspace actions" });
  await trigger.click();
  const anchor = await trigger.boundingBox();
  const content = await page.getByRole("menu").last().boundingBox();
  expect(Math.abs(anchor!.width - content!.width)).toBeLessThanOrEqual(1);
});

test("virtual positioning retains the real trigger's focus restoration", async ({
  page,
}) => {
  const section = page.locator("#virtual-anchor");
  const trigger = section.getByRole("button", { name: "Open at target" });
  await trigger.click();
  const target = await section
    .getByText("Virtual anchor target", { exact: true })
    .locator("..")
    .boundingBox();
  const popup = page.getByRole("menu").last();
  await expect(popup).toBeVisible();
  const content = await popup.boundingBox();
  expect(target && content).toBeTruthy();
  expect(Math.abs(content!.x - target!.x)).toBeLessThanOrEqual(1);
  expect(content!.y).toBeGreaterThanOrEqual(target!.y + target!.height);
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("detached anchor hides and restores its open popup while scrolling", async ({
  page,
}) => {
  const section = page.locator("#detached-anchor");
  const trigger = section.getByRole("button", { name: "Scrollable anchor" });
  await trigger.click();
  const popup = page.getByRole("menu").last();
  await expect(popup).toBeVisible();
  const viewport = section.getByLabel("Detached anchor demonstration");
  await viewport.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await expect(popup).toBeHidden();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await viewport.evaluate((element) => {
    element.scrollTop = 0;
  });
  await expect(popup).toBeVisible();
  await page.keyboard.press("Escape");
});

test("pointer opening and keyboard opening have distinct focus entry", async ({
  page,
}) => {
  const trigger = page
    .locator('[data-component-page="dropdown-menu"]')
    .getByRole("button", { name: "Actions", exact: true })
    .first();
  await trigger.click();
  const popup = page.getByRole("menu").last();
  await expect(popup).toBeFocused();
  await expect(popup.locator("[data-highlighted]")).toHaveCount(0);
  await page.keyboard.press("ArrowDown");
  await expect(popup.getByRole("menuitem").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.press("ArrowUp");
  await expect(
    page.getByRole("menu").last().getByRole("menuitem").last(),
  ).toBeFocused();
});

test("shared popup follows the actual trigger and restores its focus", async ({
  page,
}) => {
  for (const name of ["Draft", "Published"]) {
    const trigger = page
      .locator("#multiple")
      .getByRole("button", { name, exact: true });
    await trigger.click();
    await expect(page.locator("#multiple")).toContainText(
      `Last target: ${name}`,
    );
    await expect(page.getByRole("menu").last()).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
});

test("controller works outside provider and keeps the finished plain recipe", async ({
  page,
}) => {
  await page
    .locator("#store")
    .getByRole("button", { name: "Open externally" })
    .click();
  await expect(page.getByRole("menu").last()).toHaveAttribute(
    "data-variant",
    "plain",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.locator("#store").getByRole("button", { name: "Menu anchor" }),
  ).toBeFocused();
});

test("retained content preserves child state and cancellation keeps the popup open", async ({
  page,
}) => {
  const trigger = page
    .locator("#lifecycle")
    .getByRole("button", { name: "Retained content" });
  await trigger.click();
  await page.getByRole("menuitemcheckbox", { name: "Notifications" }).click();
  await page.getByRole("menuitem", { name: "Done", exact: true }).click();
  await expect(page.getByRole("menu")).toHaveCount(0);
  await trigger.click();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "Notifications" }),
  ).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("Escape");
  await page
    .locator("#cancellation")
    .getByRole("button", { name: "Selection cancellation" })
    .click();
  await page.getByRole("menuitem", { name: "Preview without closing" }).click();
  await expect(page.getByRole("menu")).toBeVisible();
});

test("positioned arrow remains outside the scrolling semantic content", async ({
  page,
}) => {
  const trigger = page
    .locator("#arrow")
    .getByRole("button", { name: "Actions with arrow", exact: true });
  await trigger.click();
  const popup = page.getByRole("menu").last();
  const arrow = page
    .locator(".brick-dropdown-menu__arrow")
    .filter({ visible: true })
    .last();
  await expect(arrow).toBeVisible();
  const popupBackground = await popup.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await expect(arrow).toHaveCSS("fill", popupBackground);
  const popupBorder = await popup.evaluate(
    (element) => getComputedStyle(element).borderTopColor,
  );
  await expect(arrow).toHaveCSS("stroke", popupBorder);
  const [anchor, content, artwork] = await Promise.all([
    trigger.boundingBox(),
    popup.boundingBox(),
    arrow.boundingBox(),
  ]);
  expect(anchor).not.toBeNull();
  expect(content).not.toBeNull();
  expect(artwork).not.toBeNull();
  expect(content!.width).toBeGreaterThan(0);
  expect(artwork!.width).toBeCloseTo(12 * Math.SQRT2, 1);
  expect(artwork!.height).toBeCloseTo(6 * Math.SQRT2, 1);
  const visibleArtwork = arrow.locator('[data-arrow-artwork="bottom"]');
  await expect(visibleArtwork).toBeVisible();
  await expect(visibleArtwork.locator("polygon")).toHaveAttribute("stroke", "none");
  await expect(visibleArtwork.locator(".brick-floating-arrow__join")).toHaveCSS("stroke", popupBackground);
  await expect(visibleArtwork.locator(".brick-floating-arrow__edge")).toHaveCSS("vector-effect", "non-scaling-stroke");
  expect(artwork!.y).toBeLessThan(content!.y + 1);
  expect(artwork!.y).toBeGreaterThan(anchor!.y + anchor!.height);
  expect(
    await arrow.evaluate((element) => getComputedStyle(element).zIndex),
  ).not.toBe("auto");
  expect(artwork!.y + artwork!.height).toBeGreaterThanOrEqual(content!.y - 1);
  expect(
    await arrow.evaluate((element) => {
      let parent = element.parentElement;
      while (parent) {
        if (
          parent.getAttribute("role") === "menu" &&
          getComputedStyle(parent).overflowY !== "visible"
        )
          return false;
        parent = parent.parentElement;
      }
      return true;
    }),
  ).toBe(true);
});
