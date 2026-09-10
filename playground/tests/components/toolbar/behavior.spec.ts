import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { expect, test, type Locator } from "../../evidence-test.js";

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

test("Toolbar modular stylesheet includes the shared recipe without aggregate CSS", async ({page}) => {
  await page.emulateMedia({reducedMotion:"reduce"});
  const root=page.getByRole("toolbar",{name:"accent soft toolbar",exact:true});
  const item=root.getByRole("button",{name:"Bold",exact:true});
  const expected=await item.evaluate(el=>{
    const s=getComputedStyle(el); return [s.backgroundColor,s.color,s.borderTopColor,s.boxShadow];
  });
  const markup=await root.evaluate(el=>el.outerHTML);
  const [core, toolbar]=await Promise.all([
    readFile(new URL("../../../../dist/styles/core.css",import.meta.url),"utf8"),
    readFile(new URL("../../../../dist/styles/toolbar.css",import.meta.url),"utf8"),
  ]);
  await page.setContent(`<style>${core}\n${toolbar}</style>${markup}`);
  expect(await page.getByRole("button",{name:"Bold"}).evaluate(el=>{
    const s=getComputedStyle(el);return [s.backgroundColor,s.color,s.borderTopColor,s.boxShadow];
  })).toEqual(expected);
});

for (const appearance of ["light", "dark"]) {
  test(`Toolbar shares toggle recipe paint in ${appearance}`, async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator("html").evaluate((el, value) => { el.dataset.brickAppearance = value; }, appearance);
    const paint = (item: Locator) => item.evaluate(el => {
      const s=getComputedStyle(el);
      return [s.backgroundColor,s.color,s.borderTopColor,s.boxShadow];
    });
    for (const tone of ["neutral", "accent"]) {
      for (const variant of ["ghost", "soft", "outline", "solid"]) {
        const items=page.getByTestId(`toggle-parity-${tone}-${variant}`).getByRole("button", {name:"Bold",exact:true});
        await expect(items).toHaveCount(3);
        for (const pressed of [true,false]) {
          if(!pressed) for(const item of await items.all()) await item.click();
          await page.mouse.move(0,0);
          const expected=await paint(items.nth(0));
          expect(await paint(items.nth(1))).toEqual(expected);
          expect(await paint(items.nth(2))).toEqual(expected);
          if(!isMobile) {
            const hoverPaint=[];
            const activePaint=[];
            for(const item of await items.all()) {
              await item.hover(); hoverPaint.push(await paint(item));
              await page.mouse.down(); activePaint.push(await paint(item));
              await page.mouse.move(0,0); await page.mouse.up();
            }
            expect(hoverPaint[1]).toEqual(hoverPaint[0]);
            expect(hoverPaint[2]).toEqual(hoverPaint[0]);
            expect(activePaint[1]).toEqual(activePaint[0]);
            expect(activePaint[2]).toEqual(activePaint[0]);
          }
        }
      }
    }
    const controls=page.getByRole("toolbar", {name:"Review controls"});
    const appearanceGroup=controls.getByRole("group", {name:"Appearance"});
    await expect(appearanceGroup).toHaveAttribute("data-variant","ghost");
    await expect(appearanceGroup).toHaveAttribute("data-tone","neutral");
  });
}

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
    probe.style.backgroundColor = "color-mix(in srgb, var(--brick-color-surface-subtle), var(--brick-color-text-primary) 16%)";
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

  const supportsHover = await page.evaluate(() =>
    matchMedia("(hover: hover) and (pointer: fine)").matches
  );
  if (supportsHover) {
    await preview.hover();
    const toolbarBackground = await root.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    const hoverBackground = await preview.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    expect(hoverBackground).not.toBe(lightPaint.background);
    expect(hoverBackground).not.toBe(toolbarBackground);
  }

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
  await expect(preview).toHaveCSS("color", darkPaint.primary);

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
  await expect(selected).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(selected).not.toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
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
