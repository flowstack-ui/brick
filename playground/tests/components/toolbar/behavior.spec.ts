import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectFocusPaintContained(root: Locator, item: Locator) {
  await item.focus();
  await expect(item).toBeFocused();
  await item.scrollIntoViewIfNeeded();

  const [rootBox, itemBox, focus] = await Promise.all([
    root.boundingBox(),
    item.boundingBox(),
    item.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        isFocusVisible: element.matches(":focus-visible"),
        outlineOffset: Number.parseFloat(style.outlineOffset),
        outlineWidth: Number.parseFloat(style.outlineWidth),
      };
    }),
  ]);

  expect(rootBox).not.toBeNull();
  expect(itemBox).not.toBeNull();
  expect(focus.isFocusVisible).toBe(true);

  const outwardPaint = Math.max(0, focus.outlineWidth + focus.outlineOffset);
  const tolerance = 0.5;

  expect(itemBox!.x - outwardPaint).toBeGreaterThanOrEqual(rootBox!.x - tolerance);
  expect(itemBox!.y - outwardPaint).toBeGreaterThanOrEqual(rootBox!.y - tolerance);
  expect(itemBox!.x + itemBox!.width + outwardPaint).toBeLessThanOrEqual(
    rootBox!.x + rootBox!.width + tolerance,
  );
  expect(itemBox!.y + itemBox!.height + outwardPaint).toBeLessThanOrEqual(
    rootBox!.y + rootBox!.height + tolerance,
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto("/toolbar");
  await expect(page.getByRole("toolbar", { name: "Document tools" }).first()).toBeVisible();
});

test("Toolbar recipes and six parts render", async ({ page }) => {
  const root = page.locator("#scenario-toolbar-overview .brick-toolbar");
  await expect(root).toHaveAttribute("data-variant", "soft");
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root.getByRole("button")).toHaveCount(4);
  await expect(root.getByRole("link")).toHaveCount(1);
  await expect(root.getByRole("separator")).toHaveCount(1);
});

test("Toolbar ToggleGroup applies shared variant and tone without leaving Toolbar behavior", async ({ page }) => {
  const root = page.getByRole("toolbar", { name: "Preview tools" });
  const group = root.getByRole("group", { name: "Preview mode" });
  await expect(group).toHaveAttribute("data-variant", "solid");
  await expect(group).toHaveAttribute("data-tone", "neutral");
  const preview = group.getByRole("button", { name: "Preview" });
  const code = group.getByRole("button", { name: "Code" });
  await expect(preview).toHaveAttribute("aria-pressed", "true");
  const lightPaint = await preview.evaluate((element) => {
    const style = getComputedStyle(element);
    const probe = document.createElement("span");
    probe.style.color = "var(--brick-color-text-primary)";
    document.body.append(probe);
    const primary = getComputedStyle(probe).color;
    probe.style.backgroundColor = "var(--brick-color-surface-raised)";
    const raised = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return {
      background: style.backgroundColor,
      foreground: style.color,
      primary,
      raised,
    };
  });
  expect(lightPaint.background).toBe(lightPaint.raised);
  expect(lightPaint.foreground).toBe(lightPaint.primary);

  await preview.hover();
  const toolbarBackground = await root.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  const hoverBackground = await preview.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(hoverBackground).not.toBe(lightPaint.background);
  expect(hoverBackground).not.toBe(toolbarBackground);

  await page.locator("html").evaluate((element) => {
    element.setAttribute("data-brick-appearance", "dark");
  });
  const darkPaint = await preview.evaluate((element) => {
    const style = getComputedStyle(element);
    const probe = document.createElement("span");
    probe.style.color = "var(--brick-color-text-primary)";
    document.body.append(probe);
    const primary = getComputedStyle(probe).color;
    probe.remove();
    return {
      background: style.backgroundColor,
      foreground: style.color,
      primary,
    };
  });
  expect(darkPaint.background).not.toBe(darkPaint.primary);
  expect(darkPaint.foreground).toBe(darkPaint.primary);

  await preview.focus();
  await page.keyboard.press("ArrowRight");
  await expect(code).toBeFocused();
});

test("Toolbar disabled controls remove enabled selection emphasis and fade", async ({ page }) => {
  const root = page.getByRole("toolbar", { name: "Release tools" });
  const archive = root.getByRole("button", { name: "Archive" });
  const selected = root.getByRole("button", { name: "Preview" });

  await expect(archive).toBeDisabled();
  await expect(selected).toBeDisabled();
  for (const control of [archive, selected]) {
    await expect(control).toHaveCSS("opacity", "0.55");
    await expect(control).toHaveCSS("box-shadow", "none");
  }
  await expect(selected).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(selected).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
});

test("Toolbar uses one tab entry and arrow navigation", async ({ page }) => {
  const root = page.locator("#scenario-toolbar-overview .brick-toolbar");
  await root.getByRole("button", { name: "Undo" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(root.getByRole("button", { name: "Redo" })).toBeFocused();
  await page.keyboard.press("End");
  await expect(root.getByRole("link", { name: "Help" })).toBeFocused();
});

test("Toolbar keeps edge and middle focus rings inside horizontal and vertical scroll boundaries", async ({
  page,
}) => {
  const horizontal = page.locator("#scenario-toolbar-overview .brick-toolbar");
  await expectFocusPaintContained(horizontal, horizontal.getByRole("button", { name: "Undo" }));
  await expectFocusPaintContained(horizontal, horizontal.getByRole("button", { name: "Bold" }));
  await expectFocusPaintContained(horizontal, horizontal.getByRole("link", { name: "Help" }));

  const plain = page.locator('#scenario-toolbar-variants .brick-toolbar[data-variant="plain"]');
  await expectFocusPaintContained(plain, plain.getByRole("button", { name: "Undo" }));
  await expectFocusPaintContained(plain, plain.getByRole("button", { name: "Italic" }));

  const vertical = page.locator(
    '#scenario-toolbar-orientation .brick-toolbar[data-orientation="vertical"]',
  );
  await expectFocusPaintContained(vertical, vertical.getByRole("button", { name: "Top" }));
  await expectFocusPaintContained(vertical, vertical.getByRole("button", { name: "Bottom" }));
});

test("Toolbar contains narrow overflow, aligns RTL evidence, and passes axe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const root = page.locator(".toolbar-narrow .brick-toolbar");
  expect(await root.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);

  await page.setViewportSize({ width: 1120, height: 900 });
  const rtl = page.locator(".toolbar-rtl .brick-toolbar");
  await expect(rtl.getByRole("button", { name: "تراجع" })).toBeVisible();
  const rtlBox = await rtl.boundingBox();
  expect(rtlBox!.x).toBeGreaterThan(500);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
