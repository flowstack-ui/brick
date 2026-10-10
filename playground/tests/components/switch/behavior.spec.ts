import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test("documentation registers examples and every props section in the TOC", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/switch");
  const links = page.locator('aside a[href^="#"]');
  await expect(links).toHaveCount(28);
  for (const href of await links.evaluateAll(nodes => nodes.map(node => node.getAttribute("href")!))) {
    await expect(page.locator(`[id="${href.slice(1)}"]`)).toHaveCount(1);
  }
  await page.locator('aside a[href="#props-control"]').click();
  await expect(page).toHaveURL(/#props-control$/);
});

test.beforeEach(async ({ page }) => {
  await page.goto("/switch?qualification=1");
});

test("defaults, states, and sizes preserve the closed visual contract", async ({
  page,
}) => {
  const overview = page.getByTestId("switch-overview").getByRole("switch");
  await expect(overview).toHaveAttribute("data-size", "md");
  await expect(overview).toHaveAttribute("aria-checked", "false");
  await overview.click();
  await expect(overview).toHaveAttribute("aria-checked", "true");
  const widths: number[] = [];
  const heights: number[] = [];
  for (const size of ["xs", "sm", "md", "lg"]) {
    const root = page
      .getByTestId("switch-sizes")
      .locator(".forms-cell")
      .filter({ hasText: size })
      .getByRole("switch");
    await expect(root).toHaveAttribute("data-size", size);
    const geometry = await root.evaluate((node) => {
      const style = getComputedStyle(node, "::before");
      return {
        height: Number.parseFloat(style.height),
        width: Number.parseFloat(style.width),
      };
    });
    widths.push(geometry.width);
    heights.push(geometry.height);
    expect((await root.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  expect(widths).toEqual([24, 32, 40, 48]);
  expect(heights).toEqual([12, 16, 20, 24]);
  const variants = page.getByTestId("switch-variants");
  const solid = variants.getByRole("switch").nth(0);
  const raised = variants.getByRole("switch").nth(1);
  expect(
    await solid.evaluate(
      (node) => getComputedStyle(node, "::before").borderWidth,
    ),
  ).toBe("0px");
  expect(
    await raised.evaluate((node) =>
      Number.parseFloat(getComputedStyle(node, "::before").height),
    ),
  ).toBe(10);
  expect(
    await raised
      .locator(".brick-switch-thumb")
      .evaluate((node) => Number.parseFloat(getComputedStyle(node).height)),
  ).toBe(20);
});

test("unchecked interaction paint progresses through adaptive neutral roles", async ({
  page,
}) => {
  const root = page.getByTestId("switch-overview").getByRole("switch");
  const paint = () => root.evaluate((node) => {
    const probe = document.createElement("span");
    const styles = getComputedStyle(node);
    probe.style.background = styles.getPropertyValue("--brick-switch-track-background");
    document.body.append(probe);
    const rest = getComputedStyle(probe).backgroundColor;
    probe.style.background = styles.getPropertyValue("--brick-switch-hover-background");
    const hover = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return {
      rest,
      hover,
      rendered: getComputedStyle(node, "::before").backgroundColor,
    };
  });

  const resting = await paint();
  expect(resting.rendered).toBe(resting.rest);
  expect(resting.hover).not.toBe(resting.rest);
  if (!(await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches))) return;
  await root.hover();
  await expect.poll(async () => (await paint()).rendered).toBe(resting.hover);
});

test("keyboard, controlled, read-only, and disabled behavior remain Atom-owned", async ({
  page,
}) => {
  const controlled = page
    .getByTestId("switch-ownership")
    .locator(".forms-cell")
    .nth(1)
    .getByRole("switch");
  await controlled.focus();
  await page.keyboard.press("Space");
  await expect(controlled).toHaveAttribute("aria-checked", "false");
  await page.keyboard.press("Enter");
  await expect(controlled).toHaveAttribute("aria-checked", "true");
  const readOnly = page
    .getByTestId("switch-ownership")
    .locator(".forms-cell")
    .nth(2)
    .getByRole("switch");
  await readOnly.click();
  await expect(readOnly).toHaveAttribute("aria-checked", "true");
  await expect(readOnly).toBeEnabled();
  const disabled = page
    .getByTestId("switch-availability")
    .getByRole("switch")
    .first();
  await expect(disabled).toBeDisabled();
});

test("required form validation, submission, reset, and external ownership work", async ({
  page,
}) => {
  const form = page.getByRole("form", { name: "Report settings" });
  await form.getByRole("button", { name: "Save settings" }).click();
  await expect(
    form.getByRole("switch", { name: "Weekly reports" }),
  ).toBeFocused();
  await form.getByRole("switch", { name: "Weekly reports" }).click();
  await form.getByRole("button", { name: "Save settings" }).click();
  await expect(form.getByRole("status")).toHaveText("Submitted: enabled");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(
    form.getByRole("switch", { name: "Weekly reports" }),
  ).toHaveAttribute("aria-checked", "false");
  expect(
    await form.evaluate((node) =>
      new FormData(node as HTMLFormElement).get("external-reports"),
    ),
  ).toBe("enabled");
});

test("composition, customization, mobile containment, and RTL travel are correct", async ({
  page,
}) => {
  await expect(page.locator('[data-adapter="render-root"]')).toHaveAttribute(
    "role",
    "switch",
  );
  await expect(page.locator('[data-adapter="render-thumb"]')).toHaveAttribute(
    "aria-hidden",
    "true",
  );
  await expect(page.locator('[data-adapter="composed-root"]')).toHaveAttribute(
    "role",
    "switch",
  );
  const custom = page.getByRole("switch", { name: "Customized reports" });
  expect(
    await custom.evaluate((node) =>
      Number.parseFloat(getComputedStyle(node, "::before").width),
    ),
  ).toBeCloseTo(52, 0);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    (await page.getByTestId("switch-stress").boundingBox())!.width,
  ).toBeLessThanOrEqual(390);
  const rtl = page.getByRole("switch", { name: "تلقي التقارير الأسبوعية" });
  const rtlBounds = await rtl.evaluate((node) => {
    const control = node.getBoundingClientRect();
    const thumb = node.querySelector(".brick-switch-thumb")!.getBoundingClientRect();
    return { controlCenter: control.x + control.width / 2, thumbCenter: thumb.x + thumb.width / 2 };
  });
  expect(rtlBounds.thumbCenter).toBeLessThan(rtlBounds.controlCenter);
  await rtl.evaluate((node) => node.setAttribute("dir", "ltr"));
  await expect.poll(() => rtl.evaluate((node) => {
    const control = node.getBoundingClientRect();
    const thumb = node.querySelector(".brick-switch-thumb")!.getBoundingClientRect();
    return thumb.x + thumb.width / 2 > control.x + control.width / 2;
  })).toBe(true);
});

test("compound anatomy owns one input and custom checked interaction stays in-family", async ({ page }) => {
  const overview = page.getByTestId("switch-overview");
  await expect(overview.locator("input[type=checkbox]")).toHaveCount(1);
  await expect(overview.locator(".brick-switch-thumb")).toHaveCount(1);
  const label = overview.locator("label");
  const control = overview.getByRole("switch");
  await expect(label).toHaveAttribute("for", await control.getAttribute("id") ?? "");

  const custom = page.getByRole("switch", { name: "Customized reports" });
  const statePaint = () => custom.evaluate((node) => getComputedStyle(node, "::before").backgroundColor);
  const rest = await statePaint();
  const tokens = await custom.evaluate((node) => {
    const styles = getComputedStyle(node);
    const probe = document.createElement("span");
    document.body.append(probe);
    const resolve = (name: string) => {
      probe.style.background = styles.getPropertyValue(name);
      return getComputedStyle(probe).backgroundColor;
    };
    const result = { hover: resolve("--brick-switch-checked-hover-background"), pressed: resolve("--brick-switch-checked-pressed-background") };
    probe.remove();
    return result;
  });
  expect(tokens.hover).not.toBe(rest);
  expect(tokens.pressed).not.toBe(tokens.hover);
  if (!(await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches))) return;
  await custom.hover();
  await expect.poll(statePaint).not.toBe(rest);
  const hover = await statePaint();
  const box = await custom.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down();
  await expect.poll(statePaint).not.toBe(hover);
  await page.mouse.up();
});

test("track and thumb indicators stay centered inside their owning geometry", async ({
  page,
}) => {
  await page.goto("/switch");
  const controls = page.locator("#indicators").getByRole("switch");
  const trackControl = controls.nth(0);
  const thumbControl = controls.nth(1);

  const trackIndicatorIsPlaced = () =>
    trackControl.evaluate((node) => {
      const indicator = node.querySelector(".brick-switch-indicator")!;
      const thumb = node.querySelector(".brick-switch-thumb")!;
      const controlRect = node.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const trackStyles = getComputedStyle(node, "::before");
      const trackWidth = Number.parseFloat(trackStyles.width);
      const trackHeight = Number.parseFloat(trackStyles.height);
      const track = {
        left: controlRect.left + (controlRect.width - trackWidth) / 2,
        right: controlRect.left + (controlRect.width + trackWidth) / 2,
        top: controlRect.top + (controlRect.height - trackHeight) / 2,
        bottom: controlRect.top + (controlRect.height + trackHeight) / 2,
      };
      const centered =
        Math.abs(
          (indicatorRect.top + indicatorRect.bottom) / 2 -
            (track.top + track.bottom) / 2,
        ) <= 0.5;
      const contained =
        indicatorRect.left >= track.left - 0.5 &&
        indicatorRect.right <= track.right + 0.5 &&
        indicatorRect.top >= track.top - 0.5 &&
        indicatorRect.bottom <= track.bottom + 0.5;
      const oppositeThumb =
        node.getAttribute("data-state") === "checked"
          ? indicatorRect.right <= thumbRect.left + 0.5
          : thumbRect.right <= indicatorRect.left + 0.5;
      return centered && contained && oppositeThumb;
    });

  const thumbIndicatorIsPlaced = () =>
    thumbControl.evaluate((node) => {
      const thumb = node.querySelector(".brick-switch-thumb")!;
      const indicator = node.querySelector(".brick-switch-thumb-indicator")!;
      const thumbRect = thumb.getBoundingClientRect();
      const indicatorRect = indicator.getBoundingClientRect();
      const contained =
        indicatorRect.left >= thumbRect.left - 0.5 &&
        indicatorRect.right <= thumbRect.right + 0.5 &&
        indicatorRect.top >= thumbRect.top - 0.5 &&
        indicatorRect.bottom <= thumbRect.bottom + 0.5;
      const centered =
        Math.abs(
          (indicatorRect.left + indicatorRect.right) / 2 -
            (thumbRect.left + thumbRect.right) / 2,
        ) <= 0.5 &&
        Math.abs(
          (indicatorRect.top + indicatorRect.bottom) / 2 -
            (thumbRect.top + thumbRect.bottom) / 2,
        ) <= 0.5;
      return contained && centered;
    });

  await expect.poll(trackIndicatorIsPlaced).toBe(true);
  await expect.poll(thumbIndicatorIsPlaced).toBe(true);
  await trackControl.click();
  await thumbControl.click();
  await expect(trackControl).toHaveAttribute("data-state", "unchecked");
  await expect(thumbControl).toHaveAttribute("data-state", "unchecked");
  await expect.poll(trackIndicatorIsPlaced).toBe(true);
  await expect.poll(thumbIndicatorIsPlaced).toBe(true);
});

test("public examples render with matching multipart anatomy", async ({ page }) => {
  await page.goto("/switch");
  await expect(page.getByRole("heading", { name: "Usage" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Props" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "HiddenInput" })).toBeVisible();
  const basic = page.getByRole("switch", { name: "Weekly activity reports" }).first();
  await basic.click();
  await expect(basic).toHaveAttribute("aria-checked", "true");
});

test("every public example has accurate source and interactive Switch output", async ({ page }) => {
  await page.goto("/switch");
  const sectionIds = [
    "sizes",
    "variants",
    "tones",
    "controlled",
    "controller",
    "states",
    "indicators",
    "label-placement",
    "tooltip",
    "hook-form",
    "native-form",
    "responsive",
    "custom-colors",
    "rtl-composition",
  ];

  const basic = page.locator('[data-component-page="switch"] > [data-example-preview]');
  await expect(basic.getByRole("switch", { name: "Weekly activity reports" })).toBeVisible();
  await basic.getByRole("tab", { name: "Code" }).click();
  await expect(basic.getByLabel("Switch basic source")).toContainText("Switch.Field");

  for (const id of sectionIds) {
    const section = page.locator(`#${id}`);
    await expect(section.locator("[data-example-preview]")).toHaveCount(1);
    const switches = section.getByRole("switch");
    expect(await switches.count()).toBeGreaterThan(0);
    for (const control of await switches.all()) {
      if (await control.isDisabled() || await control.getAttribute("data-readonly") !== null) continue;
      const before = await control.getAttribute("aria-checked");
      await control.click();
      await expect(control).toHaveAttribute("aria-checked", before === "true" ? "false" : "true");
    }
    await section.getByRole("tab", { name: "Code" }).click();
    await expect(section.locator("[data-example-source]")).toBeVisible();
    await expect(section.getByLabel(/ source$/)).toContainText("Switch");
  }
});

test("form, controller, and tooltip examples complete their authored flows", async ({ page }) => {
  await page.goto("/switch");

  const hookForm = page.locator("#hook-form");
  await hookForm.getByRole("button", { name: "Save" }).click();
  await expect(hookForm.getByText("Turn on critical alerts.")).toBeVisible();
  await hookForm.getByRole("switch", { name: "Critical service alerts" }).click();
  await hookForm.getByRole("button", { name: "Save" }).click();
  await expect(hookForm.getByText("Turn on critical alerts.")).toHaveCount(0);
  await hookForm.getByRole("button", { name: "Reset" }).click();
  await expect(hookForm.getByRole("switch", { name: "Critical service alerts" })).toHaveAttribute("aria-checked", "false");

  const nativeForm = page.locator("#native-form");
  await nativeForm.getByRole("button", { name: "Submit" }).click();
  await expect(nativeForm.getByRole("status")).toHaveText("Submitted: daily");
  await nativeForm.getByRole("switch", { name: "Daily digest" }).click();
  await nativeForm.getByRole("button", { name: "Submit" }).click();
  await expect(nativeForm.getByRole("status")).toHaveText("Submitted: off");
  await nativeForm.getByRole("button", { name: "Reset" }).click();
  await expect(nativeForm.getByRole("switch", { name: "Daily digest" })).toHaveAttribute("aria-checked", "true");

  const controller = page.locator("#controller");
  await controller.getByRole("button", { name: "Turn off" }).click();
  await expect(controller.getByRole("switch", { name: "Product announcements" })).toHaveAttribute("aria-checked", "false");

  if (
    !(await page.evaluate(() =>
      matchMedia("(hover: hover) and (pointer: fine)").matches,
    ))
  )
    return;
  await page
    .locator("#tooltip")
    .getByRole("switch", { name: "Mute workspace alerts" })
    .hover();
  await expect(page.getByRole("tooltip", { name: "Mute workspace alerts" })).toBeVisible();
});

test("responsive geometry and reduced motion resolve without changing the target", async ({ page }) => {
  await page.goto("/switch");
  const responsive = page.getByRole("switch", { name: "Responsive preview controls" });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveAttribute("data-size", "sm");
  const narrow = await responsive.evaluate((node) => ({
    target: node.getBoundingClientRect().height,
    track: Number.parseFloat(getComputedStyle(node, "::before").width),
  }));
  expect(narrow.target).toBeGreaterThanOrEqual(44);
  expect(narrow.track).toBe(32);
  await page.setViewportSize({ width: 900, height: 900 });
  await expect.poll(() => responsive.evaluate((node) => Number.parseFloat(getComputedStyle(node, "::before").width))).toBe(48);
  expect(await responsive.evaluate((node) => node.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await responsive.locator(".brick-switch-thumb").evaluate((node) => getComputedStyle(node).transitionDuration)).toBe("0s");
  await responsive.click();
  await responsive.click();
  await responsive.click();
  await expect(responsive).toHaveAttribute("aria-checked", "false");
});

test("Switch page has no automatically detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
