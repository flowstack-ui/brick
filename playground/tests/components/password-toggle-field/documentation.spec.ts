import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/password-toggle-field");
});

test("public page keeps focused examples and matching multipart props navigation", async ({
  page,
}) => {
  await expect(
    page.getByRole("heading", { name: "Usage", level: 2 }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Examples", level: 2 }),
  ).toBeVisible();
  await expect(page.locator("#sizes .brick-password-toggle-field")).toHaveCount(
    7,
  );
  await expect(
    page.locator("#variants .brick-password-toggle-field"),
  ).toHaveCount(7);
  const tableOfContents = page.getByRole("navigation", {
    name: "On this page",
  });

  for (const part of ["Root", "Input", "Toggle", "Icon"]) {
    const id = `props-${part.toLowerCase()}`;
    await expect(
      page.getByRole("heading", { name: part, level: 3 }).last(),
    ).toBeVisible();
    if (await tableOfContents.count()) {
      await expect(tableOfContents.locator(`a[href="#${id}"]`)).toBeVisible();
    }
    await expect(page.locator(`#${id} table`)).toBeVisible();
  }

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("controlled value and visibility never echo the password", async ({
  page,
}) => {
  const value = page.locator("#controlled-value");
  const valueInput = value.getByRole("textbox", { name: "Password" });
  await valueInput.fill("synthetic controlled secret");
  await value.getByRole("button", { name: "Show password" }).click();
  await expect(valueInput).toHaveValue("synthetic controlled secret");
  await expect(value).not.toContainText("synthetic controlled secret");

  const visibility = page.locator("#controlled-visibility");
  await expect(visibility.getByText("Visibility: hidden")).toBeVisible();
  await visibility.getByRole("button", { name: "Show password" }).click();
  await expect(visibility.getByText("Visibility: shown")).toBeVisible();
});

test("React Hook Form register and Controller preserve focus, reset, and safe feedback", async ({
  page,
}) => {
  const example = page.locator("#hook-form");
  const registered = example.getByLabel("Registered password");
  const controlled = example.getByLabel("Controlled password");
  await example.getByRole("button", { name: "Sign in" }).click();
  await expect(registered).toBeFocused();

  await registered.fill("synthetic registered secret");
  await controlled.fill("synthetic controlled secret");
  await example.getByRole("button", { name: "Show password" }).first().click();
  await expect(registered).toHaveValue("synthetic registered secret");
  await example.getByRole("button", { name: "Sign in" }).click();
  await expect(example.getByText("Submitted safely")).toBeVisible();
  await expect(example).not.toContainText("synthetic registered secret");
  await expect(example).not.toContainText("synthetic controlled secret");

  await example.getByRole("button", { name: "Reset" }).click();
  await expect(registered).toHaveValue("");
  await expect(controlled).toHaveValue("");
});

test("strength remains local, measured, labeled, and free of secret output", async ({
  page,
}) => {
  const example = page.locator("#strength");
  const input = example.getByLabel("New password");
  const meter = example.getByRole("meter", { name: "Password strength" });
  await expect(example.getByText("No password entered")).toBeVisible();
  await input.fill("A@2synthetic2026!!");
  await expect(meter).toHaveAttribute("value", "3");
  await expect(example.getByText("Strong")).toBeVisible();
  await expect(example).not.toContainText("A@2synthetic2026!!");
});

test("native form restores type for submission and reset without exposing a value", async ({
  page,
}) => {
  const example = page.locator("#native-form");
  const input = example.getByLabel("Account password");
  await input.fill("synthetic native secret");
  await example.getByRole("button", { name: "Show password" }).click();
  await example.getByRole("button", { name: "Sign in" }).click();
  await expect(example.getByText("Submitted safely")).toBeVisible();
  await expect(example).not.toContainText("synthetic native secret");
  await example.getByRole("button", { name: "Reset" }).click();
  await expect(input).toHaveValue("");
  await expect(input).toHaveAttribute("type", "password");
  await expect(example.getByText("Form reset")).toBeVisible();
});

test("custom artwork and IconButton composition retain one action host and stable geometry", async ({
  page,
}) => {
  const example = page.locator("#custom-action");
  const controls = example.locator(".brick-password-toggle-field");
  await expect(controls).toHaveCount(2);
  await expect(example.locator("button button")).toHaveCount(0);
  const artworkGeometry = await controls
    .first()
    .getByRole("button", { name: "Show password" })
    .evaluate((element) => {
      const action = element.getBoundingClientRect();
      const artwork = element.firstElementChild?.firstElementChild;
      if (!(artwork instanceof HTMLElement)) {
        throw new Error("Expected custom artwork element");
      }
      const artworkBox = artwork.getBoundingClientRect();
      return {
        actionCenterX: action.left + action.width / 2,
        actionCenterY: action.top + action.height / 2,
        artworkCenterX: artworkBox.left + artworkBox.width / 2,
        artworkCenterY: artworkBox.top + artworkBox.height / 2,
      };
    });
  expect(artworkGeometry.artworkCenterX).toBeCloseTo(
    artworkGeometry.actionCenterX,
    1,
  );
  expect(artworkGeometry.artworkCenterY).toBeCloseTo(
    artworkGeometry.actionCenterY,
    1,
  );
  const custom = controls.nth(1);
  const before = await custom.boundingBox();
  await custom.getByRole("button", { name: "Show password" }).click();
  await expect(
    custom.getByRole("textbox", { name: "Custom action recipe" }),
  ).toHaveAttribute("type", "text");
  const after = await custom.boundingBox();
  expect(after?.width).toBeCloseTo(before?.width ?? 0, 1);
  expect(after?.height).toBeCloseTo(before?.height ?? 0, 1);
});

test("state examples top-align fields and responsive size resolves at the active breakpoint", async ({
  page,
}) => {
  const states = page.locator("#states");
  const disabled = states.getByLabel("Disabled password");
  const readOnly = states.getByLabel("Read-only password");
  const stateGeometry = await Promise.all(
    [disabled, readOnly].map((input) =>
      input.evaluate((element) => {
        const field = element.closest(".brick-field")!;
        const label = field.querySelector(".brick-field-label")!;
        const control = element.closest(".brick-password-toggle-field")!;
        return {
          gap:
            control.getBoundingClientRect().top -
            label.getBoundingClientRect().bottom,
        };
      }),
    ),
  );
  expect(stateGeometry[0].gap).toBeCloseTo(stateGeometry[1].gap, 1);

  const responsive = page.getByRole("textbox", {
    name: "Responsive password",
  });
  const rtl = page.getByRole("textbox", { name: "كلمة المرور" });
  const [responsiveHeight, rtlHeight] = await Promise.all(
    [responsive, rtl].map((input) =>
      input.evaluate(
        (element) =>
          element
            .closest(".brick-password-toggle-field")!
            .getBoundingClientRect().height,
      ),
    ),
  );
  expect(responsiveHeight).toBeCloseTo(rtlHeight, 1);
});
