import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.goto("/color-picker"); });

test("popup editor is layered, aligned, and keeps presets synchronized", async ({ page }) => {
  const overview = page.getByTestId("color-picker-overview");
  const input = overview.locator("[data-slot='color-picker-control'] [data-slot='color-picker-input']");
  await overview.locator("[data-slot='color-picker-trigger']").click();
  const editor = overview.locator("[data-slot='color-picker-content']");
  await expect(editor).toBeVisible();

  await editor.getByRole("button", { name: "Use Grass" }).click();
  await expect(input).toHaveValue("#30A46C");
  await expect(editor.getByRole("button", { name: "Use Grass" })).toHaveAttribute("data-state", "checked");
  await expect(editor.getByRole("button", { name: "Use Grass" }).locator("[data-slot='color-picker-swatch-indicator']")).toBeVisible();
  const uncheckedIndicators = editor.locator("[data-state='unchecked'] [data-slot='color-picker-swatch-indicator']");
  await expect(uncheckedIndicators.first()).toBeHidden();

  const zIndex = await editor.locator("xpath=parent::*").evaluate((element) => getComputedStyle(element).zIndex);
  expect(Number(zIndex)).toBeGreaterThan(0);
  const editorBox = await editor.boundingBox();
  expect(editorBox!.x).toBeGreaterThanOrEqual(0);
  expect(editorBox!.x + editorBox!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  expect(editorBox!.width).toBeLessThanOrEqual(240);
  const triggerBox = await overview.locator("[data-slot='color-picker-trigger']").boundingBox();
  expect(editorBox!.x).toBeCloseTo(triggerBox!.x, 0);
  const popupSwatchBoxes = await editor.locator("[data-slot='color-picker-swatch']").evaluateAll((elements) =>
    elements.map((element) => ({ height: element.getBoundingClientRect().height, width: element.getBoundingClientRect().width })),
  );
  expect(popupSwatchBoxes.every((box) => box.width <= 18 && box.height <= 18)).toBe(true);
  const presetRows = await editor.locator("[data-slot='color-picker-swatch-trigger']").evaluateAll((elements) =>
    elements.map((element) => Math.round(element.getBoundingClientRect().y)),
  );
  expect(new Set(presetRows).size).toBe(1);
  for (const slider of await editor.locator("[data-slot='color-picker-channel-slider']").all()) {
    const [trackBox, thumbBox] = await Promise.all([
      slider.locator("[data-slot='color-picker-channel-slider-track']").boundingBox(),
      slider.locator("[data-slot='color-picker-channel-slider-thumb']").boundingBox(),
    ]);
    expect(thumbBox!.y + thumbBox!.height / 2).toBeCloseTo(trackBox!.y + trackBox!.height / 2, 0);
  }

  const inlineEditor = page.locator('[data-scenario="color-picker.inline"]');
  const rowControls = await Promise.all([
    inlineEditor.getByLabel("Color format").boundingBox(),
    inlineEditor.getByLabel("Hex color").boundingBox(),
    inlineEditor.getByLabel("Opacity channel").boundingBox(),
  ]);
  const heights = rowControls.map((box) => box!.height);
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
});

test("finished field, slider, and swatch recipes keep exact geometry", async ({ page }) => {
  const integrated = page.getByTestId("color-picker-input-only").locator("[data-slot='color-picker-control']");
  const geometry = await integrated.evaluate((control) => {
    const style = getComputedStyle(control);
    const children = Array.from(control.children).map((child) => {
      const childStyle = getComputedStyle(child);
      return {
        borderWidth: childStyle.borderTopWidth,
        height: child.getBoundingClientRect().height,
        slot: child.getAttribute("data-slot"),
      };
    });
    return { borderWidth: style.borderTopWidth, height: control.getBoundingClientRect().height, children };
  });
  expect(geometry.borderWidth).toBe("1px");
  expect(geometry.children.filter((child) => child.slot !== "color-picker-value-swatch").every((child) => child.borderWidth === "0px")).toBe(true);
  expect(geometry.children.filter((child) => child.slot !== "color-picker-value-swatch").every((child) => Math.abs(child.height - (geometry.height - 2)) <= 1)).toBe(true);

  const sizeTriggers = page.locator('[data-scenario="color-picker.recipes"] [data-slot="color-picker-trigger"]');
  for (const trigger of await sizeTriggers.all()) {
    const box = await trigger.boundingBox();
    expect(Math.abs(box!.width - box!.height)).toBeLessThanOrEqual(1);
  }

  const formatInputs = page.locator('[data-scenario="color-picker.formats"] [data-slot="color-picker"]').filter({ hasText: "Channel color" }).first();
  const formatControls = formatInputs.locator(':is([data-slot="color-picker-format-trigger"], [data-slot="color-picker-format-select"], [data-slot="color-picker-channel-input"]):visible');
  const formatControlHeights = await formatControls.evaluateAll((elements) => elements.map((element) => element.getBoundingClientRect().height));
  expect(Math.max(...formatControlHeights) - Math.min(...formatControlHeights)).toBeLessThanOrEqual(1);

  const labelledSliders = page.locator("[data-slot='color-picker-channel-slider']").filter({ has: page.locator("[data-slot='color-picker-channel-slider-label']") });
  for (const slider of await labelledSliders.all()) {
    if (!(await slider.isVisible())) continue;
    const [trackBox, thumbBox, stacking, visualTreatment] = await Promise.all([
      slider.locator("[data-slot='color-picker-channel-slider-track']").boundingBox(),
      slider.locator("[data-slot='color-picker-channel-slider-thumb']").boundingBox(),
      slider.evaluate((element) => {
        const track = element.querySelector("[data-slot='color-picker-channel-slider-track']")!;
        const thumb = element.querySelector("[data-slot='color-picker-channel-slider-thumb']")!;
        return {
          thumb: Number(getComputedStyle(thumb).zIndex),
          track: Number(getComputedStyle(track).zIndex),
        };
      }),
      slider.evaluate((element) => {
        const sliderStyle = getComputedStyle(element);
        const trackStyle = getComputedStyle(element.querySelector("[data-slot='color-picker-channel-slider-track']")!);
        const thumbStyle = getComputedStyle(element.querySelector("[data-slot='color-picker-channel-slider-thumb']")!);
        const transparencyGrid = element.querySelector("[data-slot='color-picker-transparency-grid']");
        return {
          checkerRadius: transparencyGrid ? getComputedStyle(transparencyGrid).borderRadius : null,
          sliderRadius: sliderStyle.borderRadius,
          thumbBorderColor: thumbStyle.borderTopColor,
          thumbBorderWidth: thumbStyle.borderTopWidth,
          thumbShadow: thumbStyle.boxShadow,
          trackBorderWidth: trackStyle.borderTopWidth,
          trackRadius: trackStyle.borderRadius,
        };
      }),
    ]);
    expect(thumbBox!.y + thumbBox!.height / 2).toBeCloseTo(trackBox!.y + trackBox!.height / 2, 0);
    expect(stacking.thumb).toBeGreaterThan(stacking.track);
    expect(visualTreatment.trackBorderWidth).toBe("0px");
    expect(visualTreatment.trackRadius).toBe(visualTreatment.sliderRadius);
    if (visualTreatment.checkerRadius) expect(visualTreatment.checkerRadius).toBe(visualTreatment.sliderRadius);
    expect(visualTreatment.thumbBorderWidth).toBe("2px");
    expect(visualTreatment.thumbBorderColor).toBe("rgb(255, 255, 255)");
    expect(visualTreatment.thumbShadow).not.toBe("none");
    expect(visualTreatment.thumbShadow).not.toContain("0px 0px 0px 1px");
  }

  const areaBorderWidth = await page
    .locator('[data-scenario="color-picker.inline"] [data-slot="color-picker-area"]')
    .evaluate((element) => getComputedStyle(element).borderTopWidth);
  expect(areaBorderWidth).toBe("0px");

  const alphaValueSwatch = page.locator('[data-scenario="color-picker.inline"] [data-slot="color-picker-value-swatch"]');
  const valueSwatchPaint = await alphaValueSwatch.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    backgroundImage: getComputedStyle(element).backgroundImage,
    color: getComputedStyle(element).getPropertyValue("--color"),
  }));
  expect(valueSwatchPaint.color).toContain("rgba");
  expect(valueSwatchPaint.backgroundImage).toContain("linear-gradient");
  expect(valueSwatchPaint.backgroundImage).toContain("conic-gradient");

  const alphaSlider = page.locator('[data-scenario="color-picker.inline"] [data-slot="color-picker-channel-slider"]').filter({ hasText: "Opacity" });
  const transparencyLayer = alphaSlider.locator(":scope > [data-slot='color-picker-transparency-grid']");
  const alphaTrack = alphaSlider.locator(":scope > [data-slot='color-picker-channel-slider-track']");
  await expect(transparencyLayer).toHaveCount(1);
  const checkerGeometry = await Promise.all([transparencyLayer.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    backgroundImage: getComputedStyle(element).backgroundImage,
    row: getComputedStyle(element).gridRowStart,
    zIndex: getComputedStyle(element).zIndex,
  })), alphaTrack.evaluate((element) => ({ row: getComputedStyle(element).gridRowStart, zIndex: getComputedStyle(element).zIndex }))]);
  expect(checkerGeometry[0].background).toBe("rgb(255, 255, 255)");
  expect(checkerGeometry[0].backgroundImage).toContain("rgb(238, 238, 238)");
  expect(checkerGeometry[0].row).toBe(checkerGeometry[1].row);
  expect(Number(checkerGeometry[0].zIndex)).toBeLessThan(Number(checkerGeometry[1].zIndex));

  await page.getByRole("button", { name: "dark", exact: true }).click();
  const darkCheckerPaint = await transparencyLayer.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    backgroundImage: getComputedStyle(element).backgroundImage,
  }));
  const darkValueSwatchPaint = await alphaValueSwatch.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    backgroundImage: getComputedStyle(element).backgroundImage,
  }));
  expect(darkCheckerPaint.background).toBe("rgb(255, 255, 255)");
  expect(darkCheckerPaint.backgroundImage).toContain("rgb(238, 238, 238)");
  expect(darkValueSwatchPaint.background).not.toBe(valueSwatchPaint.background);
  expect(darkValueSwatchPaint.backgroundImage).toContain("conic-gradient");
  await page.getByRole("button", { name: "system", exact: true }).click();

  const alphaChannelInput = page.locator('[data-scenario="color-picker.inline"] [data-slot="color-picker-channel-input"]').last();
  await alphaChannelInput.fill("1");
  await alphaChannelInput.press("Tab");
  const endpointThumb = await alphaSlider.evaluate((element) => {
    const root = element.getBoundingClientRect();
    const thumb = element.querySelector("[data-slot='color-picker-channel-slider-thumb']")!;
    const thumbRect = thumb.getBoundingClientRect();
    const thumbStyle = getComputedStyle(thumb);
    return {
      background: thumbStyle.backgroundColor,
      center: thumbRect.left + thumbRect.width / 2,
      rootEnd: root.right,
      width: thumbRect.width,
    };
  });
  expect(Math.abs(endpointThumb.center - endpointThumb.rootEnd)).toBeLessThanOrEqual(1);
  expect(endpointThumb.width).toBeGreaterThan(0);
  expect(endpointThumb.background).toBe("rgb(0, 144, 255)");

  await alphaChannelInput.fill("0");
  await alphaChannelInput.press("Tab");
  const transparentEndpointThumb = await alphaSlider.evaluate((element) => {
    const root = element.getBoundingClientRect();
    const thumb = element.querySelector("[data-slot='color-picker-channel-slider-thumb']")!;
    const thumbRect = thumb.getBoundingClientRect();
    return {
      background: getComputedStyle(thumb).backgroundColor,
      center: thumbRect.left + thumbRect.width / 2,
      rootStart: root.left,
    };
  });
  expect(Math.abs(transparentEndpointThumb.center - transparentEndpointThumb.rootStart)).toBeLessThanOrEqual(1);
  expect(transparentEndpointThumb.background).toBe("rgb(0, 144, 255)");

  const applicationFields = page.locator('[data-scenario="color-picker.presets"] [data-layout="integrated"]');
  await expect(applicationFields).toHaveCount(2);

  const integratedTrigger = page.getByTestId("color-picker-integrated-trigger");
  const integratedControl = integratedTrigger.locator("[data-layout='integrated']");
  const popupAction = integratedTrigger.locator("[data-slot='color-picker-trigger']");
  const controlBackground = await integratedControl.evaluate((element) => getComputedStyle(element).backgroundColor);
  await popupAction.hover();
  await expect.poll(() => popupAction.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
  await expect.poll(() => integratedControl.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe(controlBackground);

  for (const recipe of ["sharp", "rounded", "circle"] as const) {
    const trigger = page.getByTestId(`color-picker-swatches-${recipe}`).locator("[data-slot='color-picker-swatch-trigger']").first();
    const radii = await trigger.evaluate((button) => ({
      frame: getComputedStyle(button).borderRadius,
      swatch: getComputedStyle(button.querySelector("[data-slot='color-picker-swatch']")!).borderRadius,
    }));
    expect(radii.frame).toBe(radii.swatch);
  }
  const frameless = page.getByTestId("color-picker-swatches-frameless").locator("[data-slot='color-picker-swatch-trigger']").first();
  await expect(frameless).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
});

test("area, sliders, and integrated popup trigger change the real picker machine", async ({ page }) => {
  const inline = page.locator('[data-scenario="color-picker.inline"]');
  const valueInput = inline.getByLabel("Hex color");
  const beforeArea = await valueInput.inputValue();
  const area = inline.locator("[data-slot='color-picker-area']");
  await area.click({ position: { x: 80, y: 80 } });
  await expect(valueInput).not.toHaveValue(beforeArea);

  const beforeHue = await valueInput.inputValue();
  const hueSlider = inline.locator("[data-slot='color-picker-channel-slider']").filter({ hasText: "Hue" });
  await hueSlider.click({ position: { x: 32, y: 30 } });
  await expect(valueInput).not.toHaveValue(beforeHue);

  const integratedTrigger = page.getByTestId("color-picker-integrated-trigger");
  await integratedTrigger.locator("[data-slot='color-picker-trigger']").click();
  await expect(integratedTrigger.locator("[data-slot='color-picker-content']")).toBeVisible();
});

test("EyeDropper reports platform availability instead of presenting a broken action", async ({ page }) => {
  const scenario = page.locator('[data-scenario="color-picker.platform"]');
  const trigger = scenario.locator("[data-slot='color-picker-eye-dropper-trigger']");
  const supported = await page.evaluate(() => window.isSecureContext !== false && "EyeDropper" in window);
  if (supported) await expect(trigger).toBeEnabled();
  else await expect(trigger).toBeDisabled();
  await expect(scenario).toContainText(supported ? "Available in this browser" : "Unavailable in this browser");
});

test("format views expose the correct channels without changing the represented color", async ({ page }) => {
  const scenario = page.locator('[data-scenario="color-picker.formats"]');
  const picker = scenario.getByText("Channel color").locator("xpath=ancestor::*[@data-slot='color-picker']");
  const select = picker.getByLabel("Channel format");
  await expect(picker.getByLabel("red")).toBeVisible();
  await select.selectOption("hsla");
  await expect(picker.getByLabel("lightness")).toBeVisible();
  await expect(picker.getByLabel("red")).toBeHidden();
  await select.selectOption("hsba");
  await expect(picker.getByLabel("brightness")).toBeVisible();
  await expect(picker.locator("[data-slot='color-picker-value-text']")).toContainText(/hsba|hsb|rgba|#/i);
});

test("production compositions remain functional rather than decorative examples", async ({ page }) => {
  const events = page.locator('[data-scenario="color-picker.events"]');
  await events.getByRole("button", { name: "Set grass" }).click();
  await expect(events.getByText("#30a46c")).toBeVisible();

  const closePicker = events.locator("[data-slot='color-picker']").filter({ hasText: "Quick preset" });
  await closePicker.getByRole("button", { name: "Quick preset" }).click();
  await closePicker.getByRole("button", { name: "Use Grass" }).click();
  await expect(closePicker.locator("[data-slot='color-picker-content']")).toBeHidden();

  const formats = page.locator('[data-scenario="color-picker.formats"]');
  const sliderFormat = formats.getByLabel("Slider format");
  await sliderFormat.selectOption("hsla");
  await expect(formats.getByRole("slider", { name: "lightness" })).toBeVisible();

  const swatches = page.locator('[data-scenario="color-picker.presets"]');
  await swatches.getByRole("button", { name: "Save current color" }).click();
  await expect(swatches.getByRole("button", { name: "Use Saved 1" })).toBeVisible();

  await page.locator('[data-scenario="color-picker.integration"]').getByRole("button", { name: "Open color editor" }).click();
  await expect(page.getByRole("dialog", { name: "Brand color" })).toContainText("Accent color");
});

test("native chooser, form submission, reset, and state guards remain Atom-owned", async ({ page }) => {
  const nativeInput = page.getByLabel("Open native color chooser").first();
  await nativeInput.evaluate((element) => {
    const input = element as HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, "#e5484d");
    input.dispatchEvent(new InputEvent("input", { bubbles: true }));
  });
  await expect(nativeInput).toHaveValue("#e5484d");

  const form = page.getByRole("form", { name: "Brand color form" });
  await form.getByRole("button", { name: "Use Sky" }).click();
  await form.getByRole("button", { name: "Save color" }).click();
  await expect(page.getByTestId("color-picker-form-status")).toContainText("0, 144, 255");
  await expect(form.locator("[data-slot='color-picker-hidden-input']")).toHaveCount(1);
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(form.locator("[data-slot='color-picker-input']")).toHaveValue("#5B5BD6");

  const disabledRoot = page.locator("[data-slot='color-picker']").filter({ hasText: "Disabled color" }).first();
  await expect(disabledRoot.locator("[data-slot='color-picker-control'] [data-slot='color-picker-input']")).toBeDisabled();
  await expect(disabledRoot.locator("[data-slot='color-picker-trigger']")).toBeDisabled();
  const readOnlyRoot = page.locator("[data-slot='color-picker']").filter({ hasText: "Read-only color" }).first();
  await readOnlyRoot.locator("[data-slot='color-picker-trigger']").click();
  await expect(readOnlyRoot.locator("[data-slot='color-picker-content']")).toBeHidden();
  await expect(readOnlyRoot.locator("[data-slot='color-picker-input']").first()).toHaveAttribute("readonly", "");
});

test("popup restores focus and the complete narrow RTL page stays accessible", async ({ page }) => {
  const overview = page.getByTestId("color-picker-overview");
  const trigger = overview.locator("[data-slot='color-picker-trigger']");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(overview.locator("[data-slot='color-picker-content']")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();

  await page.setViewportSize({ width: 320, height: 720 });
  const rtlPicker = page.locator("[dir='rtl'] [data-slot='color-picker-input']").last();
  await rtlPicker.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(results.violations).toEqual([]);
});
