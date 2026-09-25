import { verifyFormSurfaceRecipes } from "../../form-surface-recipes.js";
import fs from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) =>
  page.goto("/password-toggle-field?qualification=1"),
);
test("forced colors preserve the field boundary and reveal-action focus", async ({
  page,
}) => {
  await page.emulateMedia({ forcedColors: "active" });
  for (const root of await page
    .getByTestId("password-toggle-field-variants")
    .locator(".brick-password-toggle-field")
    .all()) {
    const before = await root.boundingBox();
    await root.locator("input").focus();
    await expect(root).toHaveCSS("outline-style", "solid");
    await expect(root).toHaveCSS("outline-width", "2px");
    await expect(root).toHaveCSS("box-shadow", "none");
    await page.keyboard.press("Tab");
    await expect(root.locator("button")).toBeFocused();
    await expect(root.locator("button")).toHaveCSS("outline-style", "solid");
    await expect(root).toHaveCSS("outline-style", "none");
    const after = await root.boundingBox();
    expect(after?.width).toBe(before?.width);
    expect(after?.height).toBe(before?.height);
  }
});
test("Password Toggle Field is labeled and toggles localized visibility", async ({
  page,
}) => {
  const area = page.getByTestId("password-toggle-field-overview");
  const input = area.getByRole("textbox", { name: "Password" });
  await expect(input).toHaveAttribute("type", "password");
  await area.getByRole("button", { name: "Show password" }).click();
  await expect(input).toHaveAttribute("type", "text");
  await expect(
    area.getByRole("button", { name: "Hide password" }),
  ).toBeVisible();
  const localized = page.getByTestId("password-toggle-field-visibility");
  await localized.getByRole("button", { name: "Mostrar contraseña" }).click();
  await expect(
    localized.getByRole("button", { name: "Ocultar contraseña" }),
  ).toBeVisible();
});
test("Password form reset clears validity, value, and visible type", async ({
  page,
}) => {
  const form = page.getByRole("form", { name: "Password form" });
  const field = form.locator(".brick-field");
  const input = form.getByLabel("Account password", { exact: false });
  await expect(form.locator("label")).toHaveCount(1);
  await expect(form.locator("legend")).toHaveCount(0);
  await input.fill("correct horse battery staple");
  await form.getByRole("button", { name: "Show password" }).click();
  await expect(input).toHaveAttribute("type", "text");
  await form.getByRole("button", { name: "Save password" }).click();
  await expect(form.locator("output")).toContainText(
    "Submitted type: password",
  );
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(input).toHaveValue("");
  await expect(input).toHaveAttribute("type", "password");
  await form.getByRole("button", { name: "Save password" }).click();
  await expect(field).toHaveAttribute("data-invalid", "");
  await expect(form.getByText("Enter an account password.")).toBeVisible();
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(field).not.toHaveAttribute("data-invalid");
  await expect(form.getByText("Enter an account password.")).toBeHidden();
  await expect(form.locator("output")).toContainText("Form reset");
});
test("external form submission is repeatable and a prevented reset preserves state", async ({
  page,
}) => {
  const area = page.getByTestId("password-toggle-field-external-form");
  const input = area.getByRole("textbox", {
    name: "External form password",
  });
  await input.fill("synthetic external value");
  await area.getByRole("button", { name: "Show password" }).click();

  for (let count = 0; count < 2; count += 1) {
    await area.getByRole("button", { name: "Submit external form" }).click();
    await expect(area.locator("output")).toHaveText(
      "External submitted type: password",
    );
    await expect(input).toHaveAttribute("type", "text");
    await expect(
      area.getByRole("button", { name: "Hide password" }),
    ).toBeVisible();
  }

  await area.getByRole("button", { name: "Prevent external reset" }).click();
  await expect(area.locator("output")).toHaveText("External reset prevented");
  await expect(input).toHaveValue("synthetic external value");
  await expect(input).toHaveAttribute("type", "text");
});

test("keyboard activation toggles once and secondary pointer activation does not", async ({
  page,
}) => {
  const area = page.getByTestId("password-toggle-field-overview");
  const input = area.getByRole("textbox", { name: "Password" });
  const toggle = area.getByRole("button", { name: "Show password" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(input).toHaveAttribute("type", "text");
  await page.keyboard.press("Space");
  await expect(input).toHaveAttribute("type", "password");
  await toggle.click({ button: "right" });
  await expect(input).toHaveAttribute("type", "password");
});
test("Password state cards top-align their controls at every breakpoint", async ({
  page,
}) => {
  const previews = page
    .getByTestId("password-toggle-field-states")
    .locator(".forms-cell__preview");
  await expect(previews).toHaveCount(4);
  expect(
    await previews.evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).alignItems),
    ),
  ).toEqual(["start", "start", "start", "start"]);
});
test("Password visibility artwork is centered in its square action", async ({
  page,
}) => {
  const area = page.getByTestId("password-toggle-field-overview");
  const toggle = area.getByRole("button", { name: "Show password" });
  const artwork = toggle.locator(".brick-password-toggle-field-artwork");
  const geometry = await toggle.evaluate((element) => {
    const button = element.getBoundingClientRect();
    const icon = element
      .querySelector(".brick-password-toggle-field-artwork")!
      .getBoundingClientRect();
    return {
      buttonCenterX: button.left + button.width / 2,
      buttonCenterY: button.top + button.height / 2,
      iconCenterX: icon.left + icon.width / 2,
      iconCenterY: icon.top + icon.height / 2,
    };
  });
  expect(geometry.iconCenterX).toBeCloseTo(geometry.buttonCenterX, 1);
  expect(geometry.iconCenterY).toBeCloseTo(geometry.buttonCenterY, 1);
  await expect(artwork).toHaveCSS("display", "block");
});
test("Input and reveal action own independent focus paint", async ({
  page,
}) => {
  const area = page.getByTestId("password-toggle-field-overview");
  const root = area.locator(".brick-password-toggle-field");
  const input = area.getByRole("textbox", { name: "Password" });
  const toggle = area.getByRole("button", { name: "Show password" });
  const state = () =>
    root.evaluate((element) => ({
      background: getComputedStyle(element).backgroundColor,
      border: getComputedStyle(element).borderColor,
    }));
  const focusState = () =>
    root.evaluate((element) => ({
      border: getComputedStyle(element).borderColor,
      shadow: getComputedStyle(element).boxShadow,
    }));
  const settledFocusState = () =>
    root.evaluate(async (element) => {
      const read = () => ({
        border: getComputedStyle(element).borderColor,
        shadow: getComputedStyle(element).boxShadow,
      });
      const before = read();
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
      const after = read();
      return JSON.stringify(before) === JSON.stringify(after) ? after : null;
    });

  const rest = await state();
  const supportsHover = await page.evaluate(
    () => matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  if (supportsHover) {
    await root.hover();
    await expect.poll(state).not.toEqual(rest);
    await page.mouse.move(0, 0);
  }
  await input.focus();
  await expect.poll(settledFocusState).not.toBeNull();
  const inputFocus = await focusState();
  expect(inputFocus.shadow).toContain("2px");

  await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();
  await expect.poll(settledFocusState).toEqual({
    border: rest.border,
    shadow: "none",
  });
  await expect(toggle).toHaveCSS("outline-style", "solid");
  await expect(toggle).toHaveCSS("outline-width", "2px");
});

test("Pointer reveal retains input focus, selection, value, and geometry", async ({
  page,
}) => {
  const area = page.getByTestId("password-toggle-field-overview");
  const root = area.locator(".brick-password-toggle-field");
  const input = area.getByRole("textbox", { name: "Password" });
  const toggle = area.getByRole("button", { name: "Show password" });
  const before = await root.boundingBox();
  await input.focus();
  await input.evaluate((element) =>
    (element as HTMLInputElement).setSelectionRange(2, 7),
  );
  await toggle.click();
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("type", "text");
  await expect(input).toHaveValue("correct horse");
  expect(
    await input.evaluate((element) => {
      const input = element as HTMLInputElement;
      return [input.selectionStart, input.selectionEnd];
    }),
  ).toEqual([2, 7]);
  const after = await root.boundingBox();
  expect(after?.width).toBeCloseTo(before?.width ?? 0, 1);
  expect(after?.height).toBeCloseTo(before?.height ?? 0, 1);
});
test("Password recipes, RTL, and accessibility remain complete", async ({
  page,
}) => {
  await expect(
    page
      .getByTestId("password-toggle-field-variants")
      .locator(".brick-password-toggle-field"),
  ).toHaveCount(7);
  const rtl = page
    .getByTestId("password-toggle-field-stress")
    .locator("[dir=rtl]");
  await expect(
    rtl.getByRole("button", { name: "إظهار كلمة المرور" }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("surface recipes preserve transparent outline and filled surface", async ({
  page,
}) => {
  await verifyFormSurfaceRecipes(
    page,
    "password-toggle-field",
    ".brick-password-toggle-field",
    "",
  );
});

test("surface recipes keep reveal actions inside the control height", async ({
  page,
}) => {
  await page.goto("/password-toggle-field?qualification=1");
  for (const size of ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]) {
    const root = page
      .locator(`.brick-password-toggle-field[data-size="${size}"]`)
      .first();
    const geometry = await root.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        height: element.getBoundingClientRect().height,
        minimum: parseFloat(style.minBlockSize),
      };
    });
    expect(geometry.height).toBeCloseTo(geometry.minimum, 1);
  }
  await fs.mkdir("output/playwright/form-surfaces", { recursive: true });
  await page.getByTestId("password-toggle-field-variants").screenshot({
    path: "output/playwright/form-surfaces/password-variants.png",
  });
});
