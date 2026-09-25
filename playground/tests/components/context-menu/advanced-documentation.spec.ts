import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/context-menu");
});

test("retained content reports completed exits and restores the target", async ({
  page,
}) => {
  const section = page.locator("#lifecycle");
  const target = section.locator(".brick-context-menu__trigger");
  await target.focus();
  await target.press("Shift+F10");
  const menu = page.locator(".brick-context-menu__content").last();
  await expect(menu).toBeVisible();
  await page.getByRole("menuitem", { name: "Finish and close" }).click();
  await expect(menu).toBeHidden();
  await expect(menu).toBeAttached();
  await expect(section.getByRole("status")).toHaveText("Completed exits: 1");
  await expect(target).toBeFocused();
});

test("cancellation keeps the menu open without disabling normal commands", async ({
  page,
}) => {
  await page
    .locator("#cancellation .brick-context-menu__trigger")
    .click({ button: "right" });
  await page.getByRole("menuitem", { name: "Keep open", exact: true }).click();
  await expect(page.getByRole("menu").last()).toBeVisible();
  await page.getByRole("menuitem", { name: "Finish and close" }).click();
  await expect(page.getByRole("menu")).toHaveCount(0);
});

test("controlled highlight clears pointer-only state and preserves keyboard entry", async ({
  page,
}) => {
  const section = page.locator("#highlight");
  await section
    .locator(".brick-context-menu__trigger")
    .click({ button: "right" });
  const menu = page.getByRole("menu").last();
  await expect(menu).toHaveAttribute("data-positioned", "");
  await menu.evaluate(async (element) => {
    await Promise.all(
      element.getAnimations().map((animation) => animation.finished),
    );
  });
  await page.mouse.move(0, 0);
  await menu.getByRole("menuitem").first().hover();
  await expect(section.getByRole("status")).toHaveText("Highlighted: edit");
  await page.mouse.move(0, 0);
  await expect(section.getByRole("status")).toHaveText("Highlighted: none");
  await expect(menu.locator("[data-highlighted]")).toHaveCount(0);
  await expect(menu).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(menu.getByRole("menuitem").first()).toBeFocused();
  await page.keyboard.press("d");
  await expect(menu.getByRole("menuitem").last()).toBeFocused();
});

test("context command opens a managed dialog", async ({ page }) => {
  const target = page.locator("#dialog-chain .brick-context-menu__trigger");
  await target.focus();
  await target.press("Shift+F10");
  await page
    .getByRole("menuitem", { name: "Open details dialog", exact: true })
    .click();
  await expect(
    page.getByRole("dialog", { name: "Record details" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("nested dialog menu accepts pointer selection and restores focus", async ({
  page,
}) => {
  await page
    .locator("#dialog")
    .getByRole("button", { name: "Open dialog" })
    .click();
  const dialog = page.getByRole("dialog");
  const target = dialog.locator(".brick-context-menu__trigger");
  await target.click({ button: "right" });
  const item = page.getByRole("menuitem", { name: "New file", exact: true });
  await expect(item).toBeVisible();
  await item.click();
  await expect(item).toBeHidden();
  await expect(dialog).toBeVisible();
  await expect(target).toBeFocused();
});

test("link commands have no underline and rich icons inherit row geometry", async ({
  page,
}) => {
  await page
    .locator("#links .brick-context-menu__trigger")
    .click({ button: "right" });
  const link = page.getByRole("menuitem", { name: "Source repository" });
  await expect(link).toHaveCSS("text-decoration-line", "none");
  await expect(link).toHaveAttribute(
    "href",
    "https://github.com/flowstack-ui/brick",
  );
  await link.hover();
  await expect(link).toHaveCSS("text-decoration-line", "none");
  await page.keyboard.press("Escape");
  await page
    .locator("#anatomy .brick-context-menu__trigger")
    .click({ button: "right" });
  const row = page.getByRole("menuitem", { name: /New workspace/ });
  const geometry = await row.evaluate((element) => {
    const bounds = (selector: string) =>
      element.querySelector(selector)!.getBoundingClientRect();
    const icon = bounds(".brick-icon");
    const leading = bounds(".brick-action-menu__leading");
    const label = bounds(".brick-action-menu__item-label");
    return {
      iconWidth: icon.width,
      leadingWidth: leading.width,
      iconY: icon.y + icon.height / 2,
      labelY: label.y + label.height / 2,
    };
  });
  expect(geometry.iconWidth).toBeLessThanOrEqual(geometry.leadingWidth);
  expect(Math.abs(geometry.iconY - geometry.labelY)).toBeLessThanOrEqual(1);
});

test("selected choice rows lose hover without losing their selection", async ({
  page,
}) => {
  for (const [section, role, name] of [
    ["choices", "menuitemcheckbox", "Notifications"],
    ["radio", "menuitemradio", "comfortable"],
  ] as const) {
    await page
      .locator(`#${section} .brick-context-menu__trigger`)
      .click({ button: "right" });
    const item = page.getByRole(role, { name, exact: true });
    await item.hover();
    await expect(item).toHaveAttribute("data-highlighted", "");
    await page.mouse.move(0, 0);
    await expect(item).not.toHaveAttribute("data-highlighted");
    await expect(item).toHaveAttribute("aria-checked", "true");
    await page.keyboard.press("Escape");
  }
});

test("arrow is optional, sized by shared geometry and joined to the popup", async ({
  page,
}) => {
  await page
    .locator("#placement .brick-context-menu__trigger")
    .click({ button: "right" });
  await expect(page.locator(".brick-context-menu__arrow")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await page
    .locator("#arrow .brick-context-menu__trigger")
    .click({ button: "right" });
  const arrow = page.locator(".brick-context-menu__arrow");
  await expect(arrow).toBeVisible();
  await expect
    .poll(async () =>
      arrow.evaluate((element) => {
        const a = element.getBoundingClientRect();
        const p = document
          .querySelector(
            '.brick-context-menu__content[role="menu"][data-state="open"]',
          )!
          .getBoundingClientRect();
        return Math.min(
          Math.abs(a.bottom - p.top),
          Math.abs(a.top - p.bottom),
          Math.abs(a.right - p.left),
          Math.abs(a.left - p.right),
        );
      }),
    )
    .toBeLessThanOrEqual(2);
  const box = await arrow.boundingBox();
  expect(Math.max(box!.width, box!.height)).toBeGreaterThan(16);
});

test("mixed commands fit labels and include ordinary rows at narrow width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator("#mixed .brick-context-menu__trigger")
    .click({ button: "right" });
  const menu = page.getByRole("menu").last();
  await expect(menu.getByRole("menuitem")).toHaveCount(6);
  for (const label of await menu
    .locator(".brick-action-menu__item-label")
    .all()) {
    const size = await label.evaluate((el) => ({
      height: el.getBoundingClientRect().height,
      line: parseFloat(getComputedStyle(el).lineHeight),
    }));
    expect(size.height).toBeLessThanOrEqual(size.line + 1);
  }
  const box = await menu.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
});

test("submenu artwork is replaced or suppressed without duplicate indicators", async ({ page }) => {
  await page.locator("#submenus .brick-context-menu__trigger").click({ button: "right" });
  for (const [name, count] of [["default", 1], ["custom", 1], ["none", 0]] as const) {
    const trigger = page.getByRole("menuitem", { name, exact: true });
    await expect(trigger.locator("svg")).toHaveCount(count);
    await trigger.focus();
    await trigger.press("ArrowRight");
    await expect(page.getByRole("menuitem", { name: "Design", exact: true })).toBeVisible();
    await page.keyboard.press("ArrowLeft");
    await expect(trigger).toBeFocused();
  }
});
