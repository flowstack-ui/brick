import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/checkbox");
});

test("Checkbox pointer and keyboard activation expose checked and mixed state", async ({ page }) => {
  const ready = page.getByRole("checkbox", { name: "Ready to publish" });
  const controlled = page.getByRole("checkbox", { name: "Controlled tri-state" });
  await expect(ready).toHaveAttribute("aria-checked", "true");
  await ready.click();
  await expect(ready).toHaveAttribute("aria-checked", "false");
  await controlled.focus();
  await expect(controlled).toHaveAttribute("aria-checked", "mixed");
  await page.keyboard.press("Space");
  await expect(controlled).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("Enter");
  await expect(controlled).toHaveAttribute("aria-checked", "false");
});

test("CheckboxGroup Parent moves through none, some, and all without losing outside behavior", async ({ page }) => {
  const stage = page.getByTestId("checkbox-overview");
  const parent = stage.getByRole("checkbox", { name: "All release channels" });
  const email = stage.getByRole("checkbox", { name: "Email" });
  const sms = stage.getByRole("checkbox", { name: "SMS" });
  const push = stage.getByRole("checkbox", { name: "Push notifications" });
  await expect(parent).toHaveAttribute("aria-checked", "mixed");
  await parent.click();
  for (const item of [email, sms, push]) await expect(item).toHaveAttribute("aria-checked", "true");
  await expect(parent).toHaveAttribute("aria-checked", "true");
  await sms.click();
  await expect(parent).toHaveAttribute("aria-checked", "mixed");
  await parent.click();
  for (const item of [email, sms, push]) await expect(item).toHaveAttribute("aria-checked", "true");
});

test("structured item name and description relationships are complete before interaction", async ({ page }) => {
  const item = page.getByRole("checkbox", { name: "Email" }).first();
  const labelId = await item.getAttribute("aria-labelledby");
  const descriptionId = await item.getAttribute("aria-describedby");
  expect(labelId).toBeTruthy();
  expect(descriptionId).toBeTruthy();
  await expect(page.locator(`#${labelId}`)).toHaveText("Email");
  await expect(page.locator(`#${descriptionId}`)).toContainText("Delivery and account notices");
});

test("Field Label and Fieldset Legend share question typography and initial rhythm", async ({ page }) => {
  const form = page.getByRole("form", { name: "Publishing preferences" });
  const label = form.locator(".brick-field-label").filter({
    hasText: "Release acknowledgement",
  });
  const checkbox = form.getByRole("checkbox", { name: "Release acknowledgement" });
  const legend = form.locator(".brick-fieldset-legend");
  const description = form.locator(".brick-fieldset-description");

  const presentation = await form.evaluate((element) => {
    const label = element.querySelector<HTMLElement>(".brick-field-label")!;
    const checkbox = element.querySelector<HTMLElement>(".brick-checkbox")!;
    const legend = element.querySelector<HTMLElement>(".brick-fieldset-legend")!;
    const description = element.querySelector<HTMLElement>(
      ".brick-fieldset-description",
    )!;
    const typography = (target: HTMLElement) => {
      const style = getComputedStyle(target);
      return {
        family: style.fontFamily,
        lineHeight: style.lineHeight,
        size: style.fontSize,
        weight: style.fontWeight,
      };
    };
    return {
      fieldGap: checkbox.getBoundingClientRect().top - label.getBoundingClientRect().bottom,
      fieldsetGap:
        description.getBoundingClientRect().top - legend.getBoundingClientRect().bottom,
      label: typography(label),
      legend: typography(legend),
    };
  });

  expect(presentation.legend).toEqual(presentation.label);
  expect(presentation.fieldsetGap).toBeCloseTo(presentation.fieldGap, 0);
  await expect(label).toBeVisible();
  await expect(checkbox).toBeVisible();
  await expect(legend).toBeVisible();
  await expect(description).toBeVisible();
});

test("inline required validation, FormData, external ownership, and reset work", async ({ page }) => {
  const form = page.getByRole("form", { name: "Publishing preferences" });
  const acknowledgement = form.getByRole("checkbox", { name: "Release acknowledgement" });
  const email = form.getByRole("checkbox", { name: "Email report" });
  const acknowledgementField = acknowledgement.locator("xpath=ancestor::*[contains(@class, 'brick-field')]");
  const deliveryFieldset = email.locator("xpath=ancestor::*[contains(@class, 'brick-fieldset')]");
  const deliveryGroup = email.locator("xpath=ancestor::*[contains(@class, 'brick-checkbox-group')]");
  const acknowledgementError = form.getByText("Review is required.");
  const deliveryError = form.getByText("Choose at least one delivery method.");
  const external = page.getByRole("checkbox", { name: "Externally owned preference" });
  const status = page.locator(".form-foundation-status");
  const requiredInputs = form.locator('input[type="checkbox"][required]');
  await expect(requiredInputs).toHaveCount(2);
  const visibleValidityOwners = [acknowledgement, email];
  for (const [index, input] of (await requiredInputs.all()).entries()) {
    expect(await input.evaluate((element: HTMLInputElement) => element.willValidate)).toBe(true);
    expect(await input.evaluate((element: HTMLInputElement) => element.validity.valueMissing)).toBe(true);
    const proxyBox = await input.boundingBox();
    const visibleBox = await visibleValidityOwners[index].boundingBox();
    expect(proxyBox).not.toBeNull();
    expect(visibleBox).not.toBeNull();
    expect(proxyBox!.x).toBeCloseTo(visibleBox!.x, 0);
    expect(proxyBox!.y).toBeCloseTo(visibleBox!.y, 0);
    expect(proxyBox!.width).toBeCloseTo(visibleBox!.width, 0);
    expect(proxyBox!.height).toBeCloseTo(visibleBox!.height, 0);
  }
  await expect(acknowledgementError).toHaveCount(0);
  await expect(deliveryError).toHaveCount(0);
  const save = form.getByRole("button", { name: "Save preferences" });
  const originalViewport = page.viewportSize();
  await page.setViewportSize({ height: 320, width: 390 });
  await save.scrollIntoViewIfNeeded();
  expect((await acknowledgement.boundingBox())!.y).toBeLessThan(0);
  await save.click();
  await expect(status).toHaveText("No form event yet");
  await expect(acknowledgement).toBeFocused();
  await expect(acknowledgement).toHaveAttribute("data-focus-visible", "");
  await expect
    .poll(() =>
      acknowledgement.evaluate((element) => {
        const style = getComputedStyle(element);
        return style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0;
      }),
    )
    .toBe(true);
  const focusedBox = (await acknowledgement.boundingBox())!;
  expect(focusedBox.y).toBeGreaterThanOrEqual(0);
  expect(focusedBox.y + focusedBox.height).toBeLessThanOrEqual(320);
  if (originalViewport) await page.setViewportSize(originalViewport);
  await expect(form).toHaveAttribute("data-invalid", "");
  await expect(acknowledgementField).toHaveAttribute("data-invalid", "");
  await expect(deliveryFieldset).toHaveAttribute("data-invalid", "");
  await expect(deliveryGroup).toHaveAttribute("data-invalid", "");
  await expect(acknowledgement).toHaveAttribute("data-invalid", "");
  await expect(email).toHaveAttribute("data-invalid", "");
  await expect(acknowledgementError).toBeVisible();
  await expect(deliveryError).toBeVisible();
  const invalidForeground = await deliveryError.evaluate(
    (element) => getComputedStyle(element).color,
  );
  await expect
    .poll(() =>
      acknowledgement.evaluate((element) =>
        getComputedStyle(
          element.querySelector<HTMLElement>(".brick-checkbox-control")!,
        ).borderInlineStartColor,
      ),
    )
    .toBe(invalidForeground);
  const acknowledgementInvalidColors = await acknowledgement.evaluate((element) => {
    const style = getComputedStyle(element);
    const control = element.querySelector<HTMLElement>(".brick-checkbox-control")!;
    return {
      controlBorder: getComputedStyle(control).borderInlineStartColor,
      rowBorder: style.borderInlineStartColor,
      text: style.color,
    };
  });
  expect(acknowledgementInvalidColors.controlBorder).toBe(invalidForeground);
  expect(acknowledgementInvalidColors.rowBorder).toBe(invalidForeground);
  expect(acknowledgementInvalidColors.text).not.toBe(invalidForeground);

  const groupInvalidColors = await deliveryGroup.evaluate((element) => {
    const item = element.querySelector<HTMLElement>(".brick-checkbox-group-item")!;
    const label = element.querySelector(".brick-checkbox-group-item-label");
    const description = element.querySelector(
      ".brick-checkbox-group-item-description",
    );
    const control = item.querySelector<HTMLElement>(".brick-checkbox-control")!;
    return {
      controlBorder: getComputedStyle(control).borderInlineStartColor,
      description: description ? getComputedStyle(description).color : null,
      groupBorder: getComputedStyle(element).borderInlineStartColor,
      label: label ? getComputedStyle(label).color : null,
    };
  });
  expect(groupInvalidColors.groupBorder).toBe(invalidForeground);
  expect(groupInvalidColors.controlBorder).not.toBe(invalidForeground);
  expect(groupInvalidColors.label).not.toBe(invalidForeground);
  expect(groupInvalidColors.description).not.toBe(invalidForeground);
  expect(
    await deliveryError.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).paddingBlockStart),
    ),
  ).toBeGreaterThanOrEqual(12);

  await acknowledgement.click();
  await expect(acknowledgementField).not.toHaveAttribute("data-invalid", "");
  await expect(acknowledgement).not.toHaveAttribute("data-invalid", "");
  await expect(acknowledgementError).toHaveCount(0);
  await expect(form).toHaveAttribute("data-invalid", "");
  await expect(deliveryError).toBeVisible();
  await save.click();
  await expect(status).toHaveText("No form event yet");
  await expect(email).toBeFocused();
  await expect(acknowledgement).not.toHaveAttribute("data-focus-visible", "");
  await expect(email).toHaveAttribute("data-focus-visible", "");
  await expect
    .poll(() =>
      email.evaluate((element) => {
        const style = getComputedStyle(element);
        return style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0;
      }),
    )
    .toBe(true);

  await email.click();
  await expect(form).not.toHaveAttribute("data-invalid", "");
  await expect(deliveryFieldset).not.toHaveAttribute("data-invalid", "");
  await expect(deliveryGroup).not.toHaveAttribute("data-invalid", "");
  await expect(email).not.toHaveAttribute("data-invalid", "");
  await expect(deliveryError).toHaveCount(0);
  await external.click();
  await expect(email).not.toHaveAttribute("data-focus-visible", "");
  expect(await form.evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(true);
  await save.click();
  await expect(status).toContainText("Submitted: accepted; email");
  await form.getByRole("button", { name: "Reset" }).click();
  for (const checkbox of [acknowledgement, email, external]) {
    await expect(checkbox).toHaveAttribute("aria-checked", "false");
  }
});

test("invalid presentation distinguishes independent, group, and item scope", async ({ page }) => {
  const stage = page.getByTestId("checkbox-invalid-scope");
  const standalone = stage.getByRole("checkbox", {
    name: "Standalone invalid choice",
  });
  const group = stage.getByRole("group", {
    name: "Standalone invalid delivery group",
  });
  const groupItem = group.getByRole("checkbox", { name: "Email delivery" });
  const localItem = stage.getByRole("checkbox", {
    name: "Restricted destination",
  });

  const colors = await stage.evaluate((element) => {
    const standalone = element.querySelector<HTMLElement>(".brick-checkbox[data-invalid]")!;
    const group = element.querySelector<HTMLElement>(".brick-checkbox-group[data-invalid]")!;
    const groupItem = group.querySelector<HTMLElement>(".brick-checkbox-group-item")!;
    const groupLabel = groupItem.querySelector<HTMLElement>(
      ".brick-checkbox-group-item-label",
    )!;
    const groupDescription = groupItem.querySelector<HTMLElement>(
      ".brick-checkbox-group-item-description",
    )!;
    const localItem = element.querySelector<HTMLElement>(
      '.brick-checkbox-group:not([data-invalid]) > .brick-checkbox-group-item[data-invalid]',
    )!;
    const controlBorder = (row: HTMLElement) =>
      getComputedStyle(
        row.querySelector<HTMLElement>(".brick-checkbox-control")!,
      ).borderInlineStartColor;
    return {
      groupBorder: getComputedStyle(group).borderInlineStartColor,
      groupRadius: getComputedStyle(group).borderStartStartRadius,
      groupControl: controlBorder(groupItem),
      groupDescription: getComputedStyle(groupDescription).color,
      groupLabel: getComputedStyle(groupLabel).color,
      localBorder: getComputedStyle(localItem).borderInlineStartColor,
      localControl: controlBorder(localItem),
      localText: getComputedStyle(localItem).color,
      standaloneBorder: getComputedStyle(standalone).borderInlineStartColor,
      standaloneControl: controlBorder(standalone),
      standaloneText: getComputedStyle(standalone).color,
    };
  });

  expect(colors.standaloneControl).toBe(colors.standaloneBorder);
  expect(colors.standaloneText).not.toBe(colors.standaloneBorder);
  expect(colors.groupBorder).toBe(colors.standaloneBorder);
  expect(Number.parseFloat(colors.groupRadius)).toBeGreaterThan(0);
  expect(colors.groupControl).not.toBe(colors.groupBorder);
  expect(colors.groupLabel).not.toBe(colors.groupBorder);
  expect(colors.groupDescription).not.toBe(colors.groupBorder);
  expect(colors.localControl).toBe(colors.localBorder);
  expect(colors.localText).not.toBe(colors.localBorder);
  await expect(groupItem).toHaveAttribute("data-invalid", "");
  await expect(localItem).toHaveAttribute("data-invalid", "");
  await expect(standalone).toHaveAttribute("data-invalid", "");
});

test("required controls reveal touched invalid state without an initial error", async ({ page }) => {
  const form = page.getByRole("form", { name: "Publishing preferences" });
  const acknowledgement = form.getByRole("checkbox", { name: "Release acknowledgement" });
  const email = form.getByRole("checkbox", { name: "Email report" });
  const push = form.getByRole("checkbox", { name: "Push notification" });
  const save = form.getByRole("button", { name: "Save preferences" });
  const acknowledgementError = form.getByText("Review is required.");
  const deliveryError = form.getByText("Choose at least one delivery method.");

  await expect(acknowledgementError).toHaveCount(0);
  await expect(deliveryError).toHaveCount(0);

  await acknowledgement.focus();
  await save.focus();
  await expect(acknowledgementError).toBeVisible();
  await acknowledgement.click();
  await expect(acknowledgementError).toHaveCount(0);
  await acknowledgement.click();
  await expect(acknowledgementError).toBeVisible();
  await acknowledgement.click();

  await email.focus();
  await push.focus();
  await expect(deliveryError).toHaveCount(0);
  await save.focus();
  await expect(deliveryError).toBeVisible();
  await email.click();
  await expect(deliveryError).toHaveCount(0);
  await email.click();
  await expect(deliveryError).toBeVisible();

  await form.getByRole("button", { name: "Reset" }).click();
  await expect(acknowledgementError).toHaveCount(0);
  await expect(deliveryError).toHaveCount(0);
});

test("disabled and read-only choices block activation while retaining state", async ({ page }) => {
  const disabled = page.getByRole("checkbox", { name: "Disabled", exact: true });
  const readOnly = page.getByRole("checkbox", { name: "Read only" });
  await expect(disabled).toBeDisabled();
  await disabled.click({ force: true });
  await expect(disabled).toHaveAttribute("aria-checked", "false");
  await readOnly.click();
  await expect(readOnly).toHaveAttribute("aria-checked", "true");
});

test("composition retains one control and public Brick anatomy", async ({ page }) => {
  const composed = page.getByRole("checkbox", { name: "Composed adapter" });
  await expect(composed).toHaveAttribute("data-adapter", "composed-checkbox");
  await expect(composed.locator(".brick-checkbox-control")).toHaveCount(1);
  const item = page.getByRole("checkbox", { name: "Composed item" });
  await expect(item).toHaveAttribute("data-adapter", "composed-item");
  await expect(item.locator(".brick-checkbox-control")).toHaveCount(1);
  await expect(item).toHaveAttribute("aria-describedby", /.+/);
});

test("family remains contained at 256 px, honors RTL, and passes axe", async ({ page }) => {
  await page.setViewportSize({ width: 256, height: 720 });
  const stress = page.getByTestId("checkbox-stress");
  const rtl = stress.locator('[dir="rtl"]');
  await expect(rtl).toHaveAttribute("dir", "rtl");
  const rtlInvalidBorders = await rtl
    .locator(".brick-checkbox-group[data-invalid]")
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        left: Number.parseFloat(style.borderLeftWidth),
        right: Number.parseFloat(style.borderRightWidth),
      };
    });
  expect(rtlInvalidBorders.left).toBe(0);
  expect(rtlInvalidBorders.right).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  for (const frame of await stress.locator(".phone-frame").all()) {
    const frameBox = await frame.boundingBox();
    for (const control of await frame.locator(".brick-checkbox-group, .brick-checkbox-group-item, .brick-checkbox-group-parent").all()) {
      const box = await control.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(frameBox!.x - 0.5);
      expect(box!.x + box!.width).toBeLessThanOrEqual(frameBox!.x + frameBox!.width + 0.5);
    }
  }
  const result = await new AxeBuilder({ page }).disableRules(["region"]).analyze();
  expect(result.violations).toEqual([]);
});
