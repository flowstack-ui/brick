import { verifyFormSurfaceRecipes } from "../../form-surface-recipes.js";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";
test("scrubber retains document cursor beyond its icon and restores on release or Escape", async ({
  page,
}) => {
  await page.goto("/number-input");
  const scrub = page.locator("#scrubber .brick-number-input-scrubber");
  const input = page.getByRole("spinbutton", { name: "Scrub quantity" });
  const link = page.getByRole("link", {
    name: "Source (opens in a new tab)",
    exact: true,
  });
  const originalCursor = await input.evaluate(
    (el) => getComputedStyle(el).cursor,
  );
  const rootStyle = await page.locator("html").getAttribute("style");
  await scrub.scrollIntoViewIfNeeded();
  const box = (await scrub.boundingBox())!;
  for (const end of ["release", "escape"]) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await expect(scrub).toHaveAttribute("data-scrubbing", "");
    await page.mouse.move(box.x + 100, box.y + box.height / 2, { steps: 5 });
    await expect(scrub).toHaveAttribute("data-scrubbing", "");
    await expect(input).toHaveCSS("cursor", "ew-resize");
    await expect(link).toHaveCSS("cursor", "ew-resize");
    if (end === "escape") await page.keyboard.press("Escape");
    else await page.mouse.up();
    await expect(scrub).not.toHaveAttribute("data-scrubbing");
    await expect(input).toHaveCSS("cursor", originalCursor);
    await expect(link).not.toHaveCSS("cursor", "ew-resize");
    expect(await page.locator("html").getAttribute("style")).toBe(rootStyle);
    await page.mouse.up();
  }
});
test("documentation fields keep deliberate widths, labelled group geometry and compact scrubber", async ({
  page,
}) => {
  await page.goto("/number-input");
  const fields = page.locator(
    '[data-component-page="number-input"] .brick-number-input:not(.brick-number-input-group)',
  );
  for (const field of await fields.all()) {
    const box = await field.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(201);
    expect(box!.width).toBeGreaterThan(100);
  }
  const group = page.locator("#controller .brick-number-input-group");
  const label = page.locator("#controller label");
  const input = group.getByRole("spinbutton");
  const g = await group.boundingBox();
  const l = await label.boundingBox();
  expect(l!.y + l!.height).toBeLessThan(g!.y);
  expect(l!.x).toBe(g!.x);
  await expect(group.locator("..")).toHaveCSS("border-top-width", "0px");
  await input.focus();
  await expect(group).toHaveCSS("box-shadow", /.+/);
  await expect(group.locator("..")).toHaveCSS("box-shadow", "none");
  const scrub = page.locator("#scrubber .brick-number-input-scrubber");
  const sg = await page
    .locator("#scrubber .brick-number-input-group")
    .boundingBox();
  const s = await scrub.boundingBox();
  expect(s!.width).toBeLessThanOrEqual(24);
  expect(
    Math.abs(s!.y + s!.height / 2 - (sg!.y + sg!.height / 2)),
  ).toBeLessThan(1);
  expect(g!.height).toBe(sg!.height);
  const helper = page.locator("#helper .brick-number-input-stepper");
  const buttons = await helper.getByRole("button").all();
  const [a, b] = await Promise.all(
    buttons.map((button) => button.boundingBox()),
  );
  expect(a!.x).toBe(b!.x);
  expect(a!.width).toBe(b!.width);
});
test("documentation hover controls hide the divider with the actions", async ({
  page,
}) => {
  await page.goto("/number-input");
  const root = page.locator("#responsive .brick-number-input");
  const control = root.locator(".brick-number-input-stepper");
  await root.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const fine = await page.evaluate(
    () => matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  await expect(control).toHaveCSS("opacity", fine ? "0" : "1");
  const before = await root.boundingBox();
  await root.getByRole("spinbutton").focus();
  await expect(control).toHaveCSS("opacity", "1");
  const after = await root.boundingBox();
  expect(after!.width).toBe(before!.width);
  expect(after!.height).toBe(before!.height);
});
test.beforeEach(async ({ page }) => page.goto("/number-input?qualification=1"));
test("forced colors preserve numeric field focus across variants", async ({
  page,
}) => {
  await page.emulateMedia({ forcedColors: "active" });
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const root of await page
      .getByTestId("number-input-variants")
      .locator(".brick-number-input")
      .all()) {
      const before = await root.boundingBox();
      await root.locator("input").focus();
      await expect(root).toHaveCSS("outline-style", "solid");
      await expect(root).toHaveCSS("outline-width", "2px");
      await expect(root).toHaveCSS("box-shadow", "none");
      const after = await root.boundingBox();
      expect(after?.width).toBe(before?.width);
      expect(after?.height).toBe(before?.height);
    }
  }
});

test("surface recipes preserve transparent outline and filled surface", async ({
  page,
}) => {
  await verifyFormSurfaceRecipes(
    page,
    "number-input",
    ".brick-number-input",
    "",
  );
});

test("surface recipes fill detached stepper actions without joining the value plane", async ({
  page,
}) => {
  await page.goto("/number-input?qualification=1");
  const root = page.locator(
    '.brick-number-input[data-layout="stepper"][data-variant="surface"]',
  );
  await expect(root).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  for (const button of await root.getByRole("button").all()) {
    await expect(button).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }
  await root.getByRole("button", { name: "Add quantity" }).click();
  await expect(root.getByRole("spinbutton")).toHaveValue("4");
});
test("Number Input exposes defaults, stepping, bounds, and Field relationships", async ({
  page,
}) => {
  const area = page.getByTestId("number-input-overview");
  const input = area.getByRole("spinbutton", { name: "Quantity" });
  const root = input.locator("..");
  await expect(root).toHaveAttribute("data-variant", "outline");
  await expect(root).toHaveAttribute("data-size", "lg");
  await expect(root).toHaveAttribute("data-shape", "rounded");
  await area.getByRole("button", { name: "Increase quantity" }).click();
  await expect(input).toHaveValue("4");
  await expect(input).toHaveAttribute(
    "id",
    "number-input-overview-field-control",
  );
});
test("Number Input keyboard, submission, and reset remain native", async ({
  page,
}) => {
  const stepping = page.getByTestId("number-input-stepping");
  const step = stepping.locator("#number-step-control");
  await step.focus();
  await page.keyboard.press("ArrowUp");
  await expect(step).toHaveValue("2.0");
  await expect(
    stepping.getByRole("button", { name: "Increase quantity" }).first(),
  ).toHaveAttribute("aria-disabled", "true");
  const form = page.getByRole("form", { name: "Quantity form" });
  const field = form.locator(".brick-field");
  const input = form.getByRole("spinbutton", { name: "Units" });
  await expect(form.locator("label")).toHaveCount(1);
  await expect(form.locator("legend")).toHaveCount(0);
  await input.fill("5");
  await form.getByRole("button", { name: "Save quantity" }).click();
  await expect(form.locator("output")).toContainText("Submitted: 5");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(input).toHaveValue("");
  await form.getByRole("button", { name: "Save quantity" }).click();
  await expect(input).toBeFocused();
  await expect(field).toHaveAttribute("data-invalid", "");
  await expect(form.getByText("Enter at least one unit.")).toBeVisible();
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(field).not.toHaveAttribute("data-invalid");
  await expect(form.getByText("Enter at least one unit.")).toBeHidden();
  await expect(form.locator("output")).toContainText("Form reset");
});
test("hover steppers preserve geometry and reveal on hover or focus", async ({
  page,
}) => {
  const input = page.locator("#number-hover-step-control");
  const root = input.locator("..");
  const button = root.getByRole("button").first();
  const before = await root.boundingBox();
  const finePointer = await page.evaluate(
    () => matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  await expect(button).toHaveCSS("opacity", finePointer ? "0" : "1");
  await root.hover();
  await expect(button).toHaveCSS("opacity", "1");
  const after = await root.boundingBox();
  expect(after?.width).toBe(before?.width);
  expect(after?.height).toBe(before?.height);
  await page.mouse.move(0, 0);
  await input.focus();
  await expect(button).toHaveCSS("opacity", "1");
});
test("stepper layout keeps separate square actions around a readable centered value", async ({
  page,
}) => {
  const input = page.locator("#number-square-step-control");
  const root = input.locator("..");
  const decrement = root.getByRole("button", { name: "Remove quantity" });
  const increment = root.getByRole("button", { name: "Add quantity" });
  await expect(root).toHaveAttribute("data-layout", "stepper");
  const [inputBox, decrementBox, incrementBox] = await Promise.all([
    input.boundingBox(),
    decrement.boundingBox(),
    increment.boundingBox(),
  ]);
  expect(inputBox && decrementBox && incrementBox).toBeTruthy();
  expect(decrementBox!.x + decrementBox!.width).toBeLessThanOrEqual(
    inputBox!.x,
  );
  expect(incrementBox!.x).toBeGreaterThanOrEqual(inputBox!.x + inputBox!.width);
  expect(
    Math.abs(decrementBox!.width - decrementBox!.height),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(incrementBox!.width - incrementBox!.height),
  ).toBeLessThanOrEqual(1);
  await expect(input).toHaveCSS("font-size", "18px");
  await expect(input).toHaveCSS("font-weight", "400");
  await expect(decrement.locator("path")).toHaveAttribute("d", "M3 8h10");
  await expect(increment.locator("path")).toHaveAttribute(
    "d",
    "M3 8h10M8 3v10",
  );
  await increment.click();
  await expect(input).toHaveValue("4");
});
test("Number Input recipes and RTL remain contained and accessible", async ({
  page,
}) => {
  await expect(
    page.getByTestId("number-input-variants").getByRole("spinbutton"),
  ).toHaveCount(7);
  const rtl = page
    .getByTestId("number-input-stress")
    .locator("[dir=rtl] .brick-number-input");
  const root = await rtl.boundingBox();
  const actions = await rtl.getByRole("button").first().boundingBox();
  expect(root && actions).toBeTruthy();
  expect(actions!.x).toBeLessThan(root!.x + root!.width / 2);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("Number Input step actions retain minimum coarse-pointer targets", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("mobile-"),
    "requires a coarse-pointer profile",
  );
  for (const button of await page
    .getByTestId("number-input-sizes")
    .getByRole("button")
    .all()) {
    const box = await button.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.height).toBeGreaterThanOrEqual(24);
  }
});
test("number-input documentation presents usage, examples and named props", async ({
  page,
}, testInfo) => {
  await page.goto("/number-input");
  await expect(
    page.getByRole("heading", { name: "Usage", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Examples", exact: true }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: "Props", exact: true }),
  ).toBeAttached();
  await expect(page.locator("table").first()).toBeAttached();
  await expect(page.locator("iframe")).toHaveCount(0);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(overflow).toBe(false);
  if (testInfo.project.name === "chromium")
    await page.screenshot({
      path: "../../output/playwright/intl-number-input.png",
      fullPage: true,
    });
});
