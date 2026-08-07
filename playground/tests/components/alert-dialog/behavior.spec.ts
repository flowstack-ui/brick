import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

test("AlertDialog Footer maps logical response distribution to flex alignment", async ({ page }) => {
  await page.goto("/alert-dialog");
  await page.getByRole("button", { name: "Delete project?" }).click();
  const footer = page.getByTestId("alert-dialog-overview-content").locator("[data-slot='alert-dialog-footer']");
  await expect(footer).toHaveAttribute("data-justify", "end");
  for (const [justify, expected] of [["start", "flex-start"], ["center", "center"], ["between", "space-between"]] as const) {
    await footer.evaluate((element, value) => element.setAttribute("data-justify", value), justify);
    await expect.poll(() => footer.evaluate((element) => getComputedStyle(element).justifyContent)).toBe(expected);
  }
});

async function expectAlertDefaults(
  alert: Locator,
  slot = "alert-dialog-content",
) {
  await expect(alert).toHaveAttribute("data-size", "md");
  await expect(alert).toHaveAttribute("role", "alertdialog");
  await expect(alert).toHaveAttribute("aria-modal", "true");
  await expect(alert).toHaveAttribute("data-slot", slot);
}

test("AlertDialog exposes default alert semantics, safe focus, and explicit responses", async ({
  page,
}) => {
  await page.goto("/alert-dialog");
  const trigger = page.getByRole("button", { name: "Delete project?" });
  await trigger.click();
  const alert = page.getByTestId("alert-dialog-overview-content");
  await expectAlertDefaults(alert);
  await expect(alert).toHaveAccessibleName("Delete project?");
  await expect(alert).toHaveAccessibleDescription(
    "This permanently removes the selected project and cannot be undone.",
  );
  await expect(
    alert.getByRole("heading", { level: 2, name: "Delete project?" }),
  ).toHaveAttribute("data-slot", "alert-dialog-title");
  await expect(alert.locator("[data-slot='alert-dialog-header']")).toHaveCount(1);
  await expect(alert.locator("[data-slot='alert-dialog-body']")).toHaveCount(0);
  await expect(alert.locator("[data-slot='alert-dialog-footer']")).toHaveCount(1);
  await expect(page.locator(".brick-alert-dialog-overlay")).toBeVisible();
  const cancel = alert.getByRole("button", { name: "Keep project" });
  const action = alert.getByRole("button", { name: "Delete project" });
  await expect(cancel).toBeFocused();
  await expect(action).toHaveAttribute("data-tone", "danger");
  await expect(alert).toHaveCSS("opacity", "1");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await cancel.click();
  await expect(alert).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("AlertDialog sizes change only preferred measure and coordinated inset", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.goto("/alert-dialog");
  const measurements: Array<{ space: number; width: number }> = [];

  for (const size of ["sm", "md"] as const) {
    await page.getByRole("button", { name: `Open ${size} decision` }).click();
    const alert = page.getByTestId(`alert-dialog-size-${size}`);
    await expect(alert).toHaveAttribute("data-size", size);
    await expect(alert).toHaveAccessibleName("Delete project?");
    await expect(alert).toHaveAccessibleDescription(
      "This permanently removes the selected project and cannot be undone.",
    );
    measurements.push(
      await alert.evaluate((element) => ({
        space: Number.parseFloat(
          getComputedStyle(element).getPropertyValue(
            "--brick-alert-dialog-space",
          ),
        ),
        width: element.getBoundingClientRect().width,
      })),
    );
    await alert.getByRole("button", { name: "Keep project" }).click();
  }

  expect(measurements[0].width).toBeLessThan(measurements[1].width);
  expect(measurements[0].space).toBeLessThan(measurements[1].space);
});

test("AlertDialog covers optional Body, native description, acknowledgement, and Title levels", async ({
  page,
}) => {
  await page.goto("/alert-dialog");

  await page.getByRole("button", { name: "Inspect decision anatomy" }).click();
  const bodyAlert = page.getByTestId("alert-dialog-anatomy-body");
  await expectAlertDefaults(bodyAlert);
  await expect(bodyAlert.locator("[data-slot='alert-dialog-body']")).toContainText(
    "Project: Mobile checkout refresh",
  );
  await bodyAlert.getByRole("button", { name: "Keep project" }).click();

  await page
    .getByRole("button", { name: "Open native relationship" })
    .click();
  const nativeAlert = page.getByTestId("alert-dialog-native-description");
  await expectAlertDefaults(nativeAlert);
  await expect(nativeAlert).toHaveAccessibleDescription(
    "Archived workspaces become read-only for every member.",
  );
  await expect(
    nativeAlert.locator("[data-slot='alert-dialog-description']"),
  ).toHaveCount(0);
  await nativeAlert.getByRole("button", { name: "Keep active" }).click();

  await page.getByRole("button", { name: "Open acknowledgement" }).click();
  const acknowledgement = page.getByTestId("alert-dialog-acknowledgement");
  await expectAlertDefaults(acknowledgement);
  await expect(
    acknowledgement.locator("[data-slot='alert-dialog-cancel']"),
  ).toHaveCount(0);
  await expect(
    acknowledgement.getByRole("button", { name: "Continue to sign in" }),
  ).toBeFocused();
  await acknowledgement
    .getByRole("button", { name: "Continue to sign in" })
    .click();

  for (const level of [1, 2, 3, 4, 5, 6] as const) {
    await page
      .getByRole("button", { name: `Open h${level} decision` })
      .click();
    const alert = page.getByTestId(`alert-dialog-title-h${level}`);
    await expectAlertDefaults(alert);
    await expect(
      alert.getByRole("heading", { level, name: "Delete project?" }),
    ).toHaveJSProperty("tagName", `H${level}`);
    await alert.getByRole("button", { name: "Keep project" }).click();
  }
});

test("AlertDialog preserves decision reasons and strict modal policies", async ({
  page,
}) => {
  await page.goto("/alert-dialog");
  const trackedTrigger = page.getByRole("button", {
    name: "Open tracked decision",
  });
  await trackedTrigger.click();
  let alert = page.getByRole("alertdialog", {
    name: "Remove tracked project?",
  });
  await alert
    .getByRole("button", { name: "Cancel tracked decision" })
    .click();
  await expect(page.getByText("Closed: cancel")).toBeVisible();
  await trackedTrigger.click();
  alert = page.getByRole("alertdialog", {
    name: "Remove tracked project?",
  });
  await alert
    .getByRole("button", { name: "Confirm tracked decision" })
    .click();
  await expect(page.getByText("Closed: action")).toBeVisible();

  const strictTrigger = page.getByRole("button", {
    name: "Open Escape-disabled decision",
  });
  await strictTrigger.click();
  const strict = page.getByRole("alertdialog", {
    name: "Explicit response required",
  });
  await page.keyboard.press("Escape");
  await expect(strict).toBeVisible();
  await page
    .locator(".brick-alert-dialog-overlay")
    .filter({ visible: true })
    .click({ position: { x: 4, y: 4 } });
  await expect(strict).toBeVisible();
  await strict
    .getByRole("button", { name: "Close explicit decision" })
    .click();
  await expect(strictTrigger).toBeFocused();

  const disabled = page.getByRole("button", {
    name: "Unavailable decision",
  });
  await expect(disabled).toBeDisabled();
  await expect(disabled).toHaveAttribute("data-disabled", "");
  await expect(disabled).toHaveAttribute("tabindex", "-1");
  await disabled.click({ force: true });
  await expect(page.getByRole("alertdialog")).toHaveCount(0);

  await page.getByRole("button", { name: "Open pending decision" }).click();
  const pending = page.getByRole("alertdialog", {
    name: "Start asynchronous removal?",
  });
  await pending.getByRole("button", { name: "Start pending action" }).click();
  await expect(pending).toBeVisible();
  await expect(page.getByText("Pending action kept open")).toBeVisible();
  await pending
    .getByRole("button", { name: "Cancel pending decision" })
    .click();
});

test("nested AlertDialog returns focus and ownership to its parent Dialog", async ({
  page,
}) => {
  await page.goto("/alert-dialog");
  const parentTrigger = page.getByRole("button", {
    name: "Edit draft project",
  });
  await parentTrigger.click();
  const parent = page.getByRole("dialog", { name: "Edit draft project" });
  const alertTrigger = parent.getByRole("button", { name: "Discard draft" });
  await alertTrigger.click();
  const alert = page.getByRole("alertdialog", { name: "Discard draft?" });
  await expect(alert).toBeVisible();
  await alert.getByRole("button", { name: "Keep editing draft" }).click();
  await expect(parent).toBeVisible();
  await expect(alertTrigger).toBeFocused();
  await parent.getByRole("button", { name: "Finish editing" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
  await expect(parentTrigger).toBeFocused();
});

test("AlertDialog preserves scoped portals and exact customization hooks", async ({
  page,
}) => {
  await page.goto("/alert-dialog");
  const scopes = page.getByTestId("alert-dialog-appearance");

  await scopes.getByRole("button", { name: "Light decision" }).click();
  const light = scopes.getByRole("alertdialog", { name: "Light decision" });
  await expectAlertDefaults(light);
  const lightBackground = await light.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await light.getByRole("button", { name: "Cancel" }).click();

  await scopes.getByRole("button", { name: "Dark decision" }).click();
  const dark = scopes.getByRole("alertdialog", { name: "Dark decision" });
  expect(
    await dark.evaluate((element) => getComputedStyle(element).backgroundColor),
  ).not.toBe(lightBackground);
  await dark.getByRole("button", { name: "Cancel" }).click();

  await page
    .getByRole("button", { name: "Open token customization" })
    .click();
  const token = page.getByTestId("alert-dialog-token-customization");
  await expectAlertDefaults(token);
  await expect(token).toHaveCSS("--brick-alert-dialog-radius", "0.25rem");
  await expect(token).toHaveCSS("--brick-alert-dialog-space", "2rem");
  await expect(token).toHaveCSS(
    "--brick-alert-dialog-shadow",
    "0 1.5rem 4rem rgb(53 46 91 / 35%)",
  );
  await token.getByRole("button", { name: "Cancel" }).click();

  await page.getByRole("button", { name: "Open consumer hooks" }).click();
  const hook = page.locator(
    '.brick-alert-dialog-content[data-slot="custom-alert-dialog"]',
  );
  await expectAlertDefaults(hook, "custom-alert-dialog");
  await expect(hook).toHaveClass(/dashed-alert-dialog/);
  await expect(hook).toHaveCSS("border-style", "dashed");
  await expect(hook).toHaveCSS("border-width", "2px");
  await expect(
    hook.locator('[data-slot="custom-alert-dialog-header"]'),
  ).toHaveCount(1);
  await expect(hook.getByRole("button", { name: "Remove" })).toHaveAttribute(
    "data-tone",
    "danger",
  );
});

test("AlertDialog keeps long detail and RTL decisions within a narrow viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/alert-dialog");

  await page.getByRole("button", { name: "Open long decision" }).click();
  const longAlert = page.getByTestId("alert-dialog-long-content-surface");
  const body = longAlert.locator("[data-slot='alert-dialog-body']");
  const footer = longAlert.locator("[data-slot='alert-dialog-footer']");
  await expectAlertDefaults(longAlert);
  expect(
    await body.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  await expect(footer).toBeVisible();
  let box = await longAlert.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y + box!.height).toBeLessThanOrEqual(640);
  await longAlert.getByRole("button", { name: "Keep project" }).click();

  await page
    .getByRole("button", { name: "حذف مشروع مساحة العمل بالتأكيد؟" })
    .click();
  const rtl = page.getByTestId("alert-dialog-rtl-content");
  await expectAlertDefaults(rtl);
  await expect(rtl).toHaveAttribute("dir", "rtl");
  for (const slot of [
    "alert-dialog-title",
    "alert-dialog-description",
    "alert-dialog-body",
    "alert-dialog-footer",
  ]) {
    await expect(rtl.locator(`[data-slot="${slot}"]`)).toHaveCSS(
      "direction",
      "rtl",
    );
  }
  box = await rtl.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
});

test("AlertDialog responses remain reachable under extreme reflow", async ({
  page,
}) => {
  for (const viewport of [
    { width: 128, height: 422 },
    { width: 320, height: 200 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/alert-dialog");
    await page
      .getByRole("button", { name: "Open tracked decision" })
      .focus();
    await page.keyboard.press("Enter");
    const alert = page.getByRole("alertdialog", {
      name: "Remove tracked project?",
    });
    const action = alert.getByRole("button", {
      name: "Confirm tracked decision",
    });
    await expect(alert).toHaveCSS("overflow-y", "auto");
    await action.scrollIntoViewIfNeeded();
    const [alertBox, actionBox] = await Promise.all([
      alert.boundingBox(),
      action.boundingBox(),
    ]);
    expect(alertBox).not.toBeNull();
    expect(actionBox).not.toBeNull();
    expect(actionBox!.y).toBeGreaterThanOrEqual(alertBox!.y);
    expect(actionBox!.y + actionBox!.height).toBeLessThanOrEqual(
      alertBox!.y + alertBox!.height + 1,
    );
    await action.click();
  }
});

test("AlertDialog removes nonessential motion and preserves its boundary", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Forced colors is a Chromium release check.",
  );
  await page.goto("/alert-dialog");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Delete project?" }).click();
  const alert = page.getByTestId("alert-dialog-overview-content");
  await expect(alert).toHaveCSS("transition-duration", "0.001s");
  await expect(alert).toHaveCSS("box-shadow", "none");
  expect(
    await alert.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).borderWidth),
    ),
  ).toBeGreaterThanOrEqual(1);
});
