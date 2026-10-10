import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/menubar");
});

test("pointer highlight clears while the owning strip remains open", async ({
  page,
}) => {
  const bar = page.locator("#controlled").getByRole("menubar");
  const trigger = bar.getByRole("menuitem", { name: "Actions", exact: true });
  await trigger.click();
  const menu = page.getByRole("menu").last();
  await expect(menu).toHaveAttribute("data-positioned", "");
  await menu.evaluate(async (el) => {
    await Promise.all(el.getAnimations().map((a) => a.finished));
  });
  await expect(menu.locator("[data-highlighted]")).toHaveCount(0);
  await expect(menu).toBeFocused();
  await menu.getByRole("menuitem").first().hover();
  await expect(menu.locator("[data-highlighted]")).toHaveCount(1);
  await page.mouse.move(0, 0);
  await expect(menu.locator("[data-highlighted]")).toHaveCount(0);
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(menu).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(menu.getByRole("menuitem").first()).toBeFocused();
  await bar.getByRole("menuitem", { name: "Edit", exact: true }).hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("menuitem", { name: "Undo", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("menu").locator("[data-highlighted]"),
  ).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(
    bar.getByRole("menuitem", { name: "Edit", exact: true }),
  ).toBeFocused();
  await expect(page.getByRole("menu")).toHaveCount(0);
  await page.mouse.move(0, 0);
  await bar.getByRole("menuitem", { name: "Edit", exact: true }).click();
  await expect(
    page.getByRole("menuitem", { name: "Undo", exact: true }),
  ).toBeVisible();
  await page.getByRole("heading", { name: "Menubar", exact: true }).click();
  await expect(page.getByRole("menu")).toHaveCount(0);
});

test("keyboard opening keeps first and last command entry", async ({
  page,
}) => {
  const trigger = page
    .locator("#controlled")
    .getByRole("menuitem", { name: "Actions", exact: true });
  for (const key of ["Enter", "Space", "ArrowDown", "ArrowUp"]) {
    await trigger.scrollIntoViewIfNeeded();
    await trigger.focus();
    await trigger.press(key);
    const item = page.getByRole("menuitem", {
      name: key === "ArrowUp" ? "Delete file" : "New file",
      exact: true,
    });
    await expect(item).toBeFocused();
    await expect(item).toHaveAttribute("data-highlighted");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toHaveCount(0);
    await expect(page.locator(".brick-menubar__content")).toHaveCount(0);
  }
});

test("nested dialog menu accepts pointer actions without dismissing its dialog", async ({
  page,
}) => {
  await page
    .locator("#dialog")
    .getByRole("button", { name: "Open dialog" })
    .click();
  const dialog = page.getByRole("dialog");
  const trigger = dialog
    .getByRole("menubar")
    .getByRole("menuitem", { name: "Actions", exact: true });
  await trigger.click();
  await page.getByRole("menuitem", { name: "New file", exact: true }).click();
  await expect(page.getByRole("menu")).toHaveCount(0);
  await expect(dialog).toBeVisible();
  await expect(trigger).toBeFocused();
});

test("links keep native destinations without typography underlines", async ({
  page,
}) => {
  await page
    .locator("#links")
    .getByRole("menuitem", { name: "Actions", exact: true })
    .click();
  const link = page.getByRole("menuitem", { name: "Source repository" });
  await expect(link).toHaveAttribute(
    "href",
    "https://github.com/flowstack-ui/brick",
  );
  await expect(link).toHaveCSS("text-decoration-line", "none");
  await link.hover();
  await expect(link).toHaveCSS("text-decoration-line", "none");
});

test("rich artwork follows row size and label alignment", async ({ page }) => {
  await page
    .locator("#anatomy")
    .getByRole("menuitem", { name: "Actions", exact: true })
    .click();
  const row = page.getByRole("menuitem", { name: /New workspace/ });
  const bounds = await row.evaluate((el) => {
    const box = (selector: string) =>
      el.querySelector(selector)!.getBoundingClientRect();
    const icon = box(".brick-icon"),
      leading = box(".brick-action-menu__leading"),
      label = box(".brick-action-menu__item-label");
    return {
      width: icon.width,
      available: leading.width,
      iconY: icon.y + icon.height / 2,
      labelY: label.y + label.height / 2,
    };
  });
  expect(bounds.width).toBeLessThanOrEqual(bounds.available);
  expect(Math.abs(bounds.iconY - bounds.labelY)).toBeLessThanOrEqual(1);
});

test("mixed commands fit labels at narrow widths", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .locator("#mixed")
    .getByRole("menuitem", { name: "Actions", exact: true })
    .click();
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

test("checkbox and radio selection survive pointer departure", async ({
  page,
}) => {
  for (const [id, role, name] of [
    ["choices", "menuitemcheckbox", "Notifications"],
    ["radio", "menuitemradio", "comfortable"],
  ] as const) {
    await page
      .locator("#" + id)
      .getByRole("menuitem", { name: "Actions", exact: true })
      .click();
    const item = page.getByRole(role, { name, exact: true });
    await item.hover();
    await page.mouse.move(0, 0);
    await expect(item).not.toHaveAttribute("data-highlighted");
    await expect(item).toHaveAttribute("aria-checked", "true");
    await page.keyboard.press("Escape");
  }
});

test("optional arrow shares the popup edge and placement is arrow-free", async ({
  page,
}) => {
  await page
    .locator("#placement")
    .getByRole("menuitem", { name: "File", exact: true })
    .click();
  await expect(page.locator(".brick-menubar__arrow")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await page
    .locator("#arrow")
    .getByRole("menuitem", { name: "File", exact: true })
    .click();
  const arrow = page.locator(".brick-menubar__arrow");
  await expect(arrow).toBeVisible();
  await expect
    .poll(async () =>
      arrow.evaluate((el) => {
        const a = el.getBoundingClientRect();
        const p = document
          .querySelector('.brick-menubar__content[data-state="open"]')!
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
