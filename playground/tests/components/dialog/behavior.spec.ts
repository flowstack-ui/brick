import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";

test("Dialog Footer maps logical action distribution to flex alignment", async ({ page }) => {
  await page.goto("/dialog");
  await page.getByRole("button", { name: "Edit profile" }).click();
  const footer = page.getByTestId("dialog-overview-content").locator("[data-slot='dialog-footer']");
  await expect(footer).toHaveAttribute("data-justify", "end");
  for (const [justify, expected] of [["start", "flex-start"], ["center", "center"], ["between", "space-between"]] as const) {
    await footer.evaluate((element, value) => element.setAttribute("data-justify", value), justify);
    await expect.poll(() => footer.evaluate((element) => getComputedStyle(element).justifyContent)).toBe(expected);
  }
});

async function readShellViewportOffsets(page: Page) {
  return page.evaluate(() => {
    const readOffset = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element || getComputedStyle(element).display === "none") return null;
      return element.getBoundingClientRect().y;
    };
    return {
      appBar: readOffset(".evidence-app-bar"),
      reviewHeader: readOffset(".evidence-review-header"),
      sidebar: readOffset(".evidence-sidebar"),
    };
  });
}

async function expectDialogDefaults(
  dialog: Locator,
  slot = "dialog-content",
) {
  await expect(dialog).toHaveAttribute("data-size", "md");
  await expect(dialog).toHaveAttribute("role", "dialog");
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  await expect(dialog).toHaveAttribute("data-slot", slot);
}

test("Dialog exposes its default modal anatomy, relationships, and focus lifecycle", async ({
  page,
}) => {
  await page.goto("/dialog");

  const appBar = page.locator(".evidence-app-bar");
  const sidebar = page.locator(".evidence-sidebar");
  const trigger = page.getByRole("button", { name: "Edit profile" });
  await page.evaluate(() => window.scrollTo(0, 400));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  const shellOffsets = await readShellViewportOffsets(page);
  if (shellOffsets.appBar === 0) {
    expect(shellOffsets.sidebar).not.toBeNull();
    expect(shellOffsets.reviewHeader).not.toBeNull();
  }
  await trigger.evaluate((element) => (element as HTMLElement).click());
  const dialog = page.getByTestId("dialog-overview-content");
  await expectDialogDefaults(dialog);
  await expect(dialog).toHaveAccessibleName("Edit profile");
  await expect(dialog).toHaveAccessibleDescription(
    "Update the information visible to your team.",
  );
  await expect(
    dialog.getByRole("heading", { level: 2, name: "Edit profile" }),
  ).toHaveAttribute("data-slot", "dialog-title");
  await expect(dialog.locator("[data-slot='dialog-header']")).toHaveCount(1);
  await expect(dialog.locator("[data-slot='dialog-body']")).toHaveCount(1);
  await expect(dialog.locator("[data-slot='dialog-footer']")).toHaveCount(1);
  const cornerClose = dialog.getByRole("button", {
    name: "Close profile dialog",
  });
  await expect(cornerClose).toHaveAttribute("data-placement", "corner");
  await expect.poll(async () => dialog.evaluate((element) => {
    const close = element.querySelector<HTMLElement>(
      '[data-slot="dialog-close"][data-placement="corner"]',
    );
    if (!close) throw new Error("Missing corner close control");
    const dialogRect = element.getBoundingClientRect();
    const closeRect = close.getBoundingClientRect();
    return {
      blockStartInset: Math.round((closeRect.top - dialogRect.top) * 10) / 10,
      inlineEndInset: Math.round((dialogRect.right - closeRect.right) * 10) / 10,
      position: getComputedStyle(close).position,
    };
  })).toEqual({
    blockStartInset: 8,
    inlineEndInset: 8,
    position: "absolute",
  });
  await dialog.evaluate((element) => element.setAttribute("dir", "rtl"));
  await expect.poll(async () => dialog.evaluate((element) => {
    const close = element.querySelector<HTMLElement>(
      '[data-slot="dialog-close"][data-placement="corner"]',
    );
    if (!close) throw new Error("Missing RTL corner close control");
    const dialogRect = element.getBoundingClientRect();
    const closeRect = close.getBoundingClientRect();
    return Math.round((closeRect.left - dialogRect.left) * 10) / 10;
  })).toBe(8);
  await dialog.evaluate((element) => element.removeAttribute("dir"));
  const overlay = page.locator(".brick-dialog-overlay");
  await expect(overlay).toBeVisible();
  await expect(dialog).toHaveCSS("opacity", "1");
  expect(
    await overlay.evaluate((element) => getComputedStyle(element).backgroundColor),
  ).toMatch(/^rgba\(.+,\s*0\.\d+\)$/);
  await expect.poll(() => readShellViewportOffsets(page)).toEqual(shellOffsets);
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  if (shellOffsets.appBar === 0) await expect(appBar).toBeVisible();
  if (shellOffsets.sidebar !== null) await expect(sidebar).toBeVisible();
  await expect(dialog.getByLabel("Display name")).toHaveValue("Ada Lovelace");
  await expect(dialog.getByLabel("Team role")).toHaveValue("Product engineer");
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(
    true,
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);

  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
  await expect.poll(() => readShellViewportOffsets(page)).toEqual(shellOffsets);
});

test("Dialog sizes change only preferred measure and coordinated inset", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/dialog");
  const measurements: Array<{ space: number; width: number }> = [];

  for (const size of ["sm", "md", "lg"] as const) {
    await page.getByRole("button", { name: `Open ${size} dialog` }).click();
    const dialog = page.getByTestId(`dialog-size-${size}`);
    await expect(dialog).toHaveAttribute("data-size", size);
    await expect(dialog).toHaveAccessibleName("Project settings");
    await expect(dialog.locator("[data-slot='dialog-header']")).toHaveCount(1);
    await expect(dialog.locator("[data-slot='dialog-body']")).toContainText(
      "The same focused task makes the selected Dialog behavior easier to compare.",
    );
    await expect(dialog.locator("[data-slot='dialog-footer']")).toHaveCount(1);
    measurements.push(
      await dialog.evaluate((element) => ({
        space: Number.parseFloat(
          getComputedStyle(element).getPropertyValue("--brick-dialog-space"),
        ),
        width: element.getBoundingClientRect().width,
      })),
    );
    await dialog.getByRole("button", { name: "Save changes" }).click();
  }

  expect(measurements[0].width).toBeLessThan(measurements[1].width);
  expect(measurements[1].width).toBeLessThan(measurements[2].width);
  expect(measurements[0].space).toBeLessThan(measurements[1].space);
  expect(measurements[1].space).toBeLessThan(measurements[2].space);
});

test("Dialog renders only the anatomy authored by the consumer", async ({
  page,
}) => {
  await page.goto("/dialog");

  await page.getByRole("button", { name: "Open named surface" }).click();
  const titleOnly = page.getByTestId("dialog-anatomy-title");
  await expectDialogDefaults(titleOnly);
  await expect(titleOnly).toHaveAccessibleName("Named surface");
  await expect(titleOnly.locator("[data-slot='dialog-title']")).toHaveCount(1);
  await expect(titleOnly.locator("[data-slot='dialog-header']")).toHaveCount(0);
  await expect(titleOnly.locator("[data-slot='dialog-body']")).toHaveCount(0);
  await expect(titleOnly.locator("[data-slot='dialog-footer']")).toHaveCount(0);
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Open descriptive task" }).click();
  const body = page.getByTestId("dialog-anatomy-body");
  await expectDialogDefaults(body);
  await expect(body.locator("[data-slot='dialog-header']")).toHaveCount(1);
  await expect(body.locator("[data-slot='dialog-description']")).toHaveCount(1);
  await expect(body.locator("[data-slot='dialog-body']")).toHaveCount(1);
  await expect(body.locator("[data-slot='dialog-footer']")).toHaveCount(0);
  await page.keyboard.press("Escape");

  await page.getByRole("button", { name: "Inspect dialog anatomy" }).click();
  const complete = page.getByTestId("dialog-anatomy-complete");
  await expectDialogDefaults(complete);
  await expect(complete.locator("[data-slot='dialog-header']")).toHaveCount(1);
  await expect(complete.locator("[data-slot='dialog-body']")).toHaveCount(1);
  await expect(complete.locator("[data-slot='dialog-footer']")).toHaveCount(1);
});

test("Dialog Title exposes every supported native heading level", async ({
  page,
}) => {
  await page.goto("/dialog");

  for (const level of [1, 2, 3, 4, 5, 6] as const) {
    await page.getByRole("button", { name: `Open h${level} title` }).click();
    const dialog = page.getByTestId(`dialog-title-h${level}`);
    await expectDialogDefaults(dialog);
    const title = dialog.getByRole("heading", {
      level,
      name: "Project settings",
    });
    await expect(title).toHaveJSProperty("tagName", `H${level}`);
    await expect(dialog).toHaveAccessibleName("Project settings");
    await dialog.getByRole("button", { name: "Close" }).click();
  }
});

test("Dialog preserves dismissal reasons and unavailable policies", async ({
  page,
}) => {
  await page.goto("/dialog");
  const eventTrigger = page.getByRole("button", { name: "Open event dialog" });
  await eventTrigger.click();
  const eventDialog = page.getByRole("dialog", { name: "Dismissal evidence" });
  await expectDialogDefaults(eventDialog);
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Tab");
  expect(
    await eventDialog.evaluate((element) =>
      element.contains(document.activeElement),
    ),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(eventDialog).toBeHidden();
  await expect(eventTrigger).toBeFocused();
  await expect(page.getByText("Closed: escapeKeyDown")).toBeVisible();
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");

  const disabled = page.getByRole("button", { name: "Unavailable dialog" });
  await expect(disabled).toBeDisabled();
  await expect(disabled).toHaveAttribute("data-disabled", "");
  await expect(disabled).toHaveAttribute("tabindex", "-1");
  await disabled.click({ force: true });
  await expect(
    page.getByRole("dialog", { name: "Unavailable content" }),
  ).toHaveCount(0);

  const persistentTrigger = page.getByRole("button", {
    name: "Open overlay-disabled dialog",
  });
  await persistentTrigger.click();
  const persistent = page.getByRole("dialog", {
    name: "Overlay dismissal disabled",
  });
  const overlay = page.locator(".brick-dialog-overlay").filter({ visible: true });
  await overlay.click({ position: { x: 4, y: 4 } });
  await expect(persistent).toBeVisible();
  await persistent
    .getByRole("button", { name: "Close persistent dialog" })
    .click();
  await expect(persistentTrigger).toBeFocused();
});

test("Dialog preserves nested layers and a registered portalled branch", async ({
  page,
}) => {
  await page.goto("/dialog");
  const parentTrigger = page.getByRole("button", {
    name: "Open parent dialog",
  });
  await parentTrigger.click();
  const parent = page.getByRole("dialog", { name: "Parent settings" });
  await parent.getByRole("button", { name: "Open nested dialog" }).click();
  const nested = page.getByRole("dialog", { name: "Nested confirmation" });
  await expectDialogDefaults(nested);
  await nested.getByRole("button", { name: "Done" }).click();
  await expect(parent).toBeVisible();
  await parent.getByRole("button", { name: "Close parent" }).click();
  await expect(parentTrigger).toBeFocused();

  await page.getByRole("button", { name: "Open branch example" }).click();
  const branchDialog = page.getByRole("dialog", {
    name: "Registered portal branch",
  });
  await branchDialog
    .getByRole("button", { name: "Open portalled panel" })
    .click();
  const branch = page.getByRole("complementary", {
    name: "Registered portalled panel",
  });
  await expect(branch).toHaveAttribute("data-slot", "modal-branch");
  await expect(branch).toHaveClass(/brick-dialog-branch/);
  await branch.getByRole("button", { name: "Close portalled panel" }).focus();
  await expect(
    branch.getByRole("button", { name: "Close portalled panel" }),
  ).toBeFocused();
  await branch.getByRole("button", { name: "Close portalled panel" }).click();
  await expect(branch).toHaveCount(0);
  await branchDialog.getByRole("button", { name: "Close dialog" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
});

test("Dialog preserves scoped portals and exact customization hooks", async ({
  page,
}) => {
  await page.goto("/dialog");
  const scopes = page.getByTestId("dialog-appearance");

  await scopes.getByRole("button", { name: "Light scoped dialog" }).click();
  const light = scopes.getByRole("dialog", { name: "Light scoped dialog" });
  await expect(light).toHaveAttribute("data-size", "sm");
  const lightBackground = await light.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await light.getByRole("button", { name: "Close" }).click();

  await scopes.getByRole("button", { name: "Dark scoped dialog" }).click();
  const dark = scopes.getByRole("dialog", { name: "Dark scoped dialog" });
  expect(
    await dark.evaluate((element) => getComputedStyle(element).backgroundColor),
  ).not.toBe(lightBackground);
  await dark.getByRole("button", { name: "Close" }).click();

  await page
    .getByRole("button", { name: "Open token customization" })
    .click();
  const token = page.getByTestId("dialog-token-customization");
  await expectDialogDefaults(token);
  await expect(token).toHaveCSS("--brick-dialog-radius", "0.25rem");
  await expect(token).toHaveCSS("--brick-dialog-space", "2rem");
  await expect(token).toHaveCSS(
    "--brick-dialog-shadow",
    "0 1.5rem 4rem rgb(53 46 91 / 35%)",
  );
  await expect(token).toHaveCSS("border-radius", "4px");
  await token.getByRole("button", { name: "Close" }).click();

  await page.getByRole("button", { name: "Open consumer hooks" }).click();
  const hook = page.locator('.brick-dialog-content[data-slot="custom-dialog"]');
  await expectDialogDefaults(hook, "custom-dialog");
  await expect(hook).toHaveClass(/dashed-dialog/);
  await expect(hook).toHaveCSS("border-style", "dashed");
  await expect(hook).toHaveCSS("border-width", "2px");
  await expect(
    hook.locator('[data-slot="custom-dialog-header"]'),
  ).toHaveCount(1);
});

test("Dialog keeps long Body content and RTL surfaces within the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 640 });
  await page.goto("/dialog");

  await page
    .getByRole("button", { name: "Open long mobile dialog" })
    .click();
  const longDialog = page.getByTestId("dialog-long-content-surface");
  const body = longDialog.locator("[data-slot='dialog-body']");
  const footer = longDialog.locator("[data-slot='dialog-footer']");
  await expectDialogDefaults(longDialog);
  await expect(footer).toBeVisible();
  expect(
    await body.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  let box = await longDialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(640);
  await longDialog.getByRole("button", { name: "Cancel" }).click();

  await page
    .getByRole("button", { name: "فتح إعدادات مساحة العمل المفصلة" })
    .click();
  const rtl = page.getByTestId("dialog-rtl-content");
  await expectDialogDefaults(rtl);
  await expect(rtl).toHaveAttribute("dir", "rtl");
  for (const slot of [
    "dialog-title",
    "dialog-description",
    "dialog-body",
    "dialog-footer",
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

test("Dialog removes nonessential motion and preserves its boundary", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Forced colors is a Chromium release check.",
  );
  await page.goto("/dialog");
  await page.emulateMedia({ forcedColors: "active", reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Edit profile" }).click();
  const dialog = page.getByTestId("dialog-overview-content");
  const overlay = page.locator(".brick-dialog-overlay").filter({ visible: true });
  await expect(dialog).toHaveCSS("transition-duration", "0.001s");
  await expect(dialog).toHaveCSS("transform", /matrix\(1, 0, 0, 1,/);
  expect(
    await dialog.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).borderWidth),
    ),
  ).toBeGreaterThanOrEqual(1);
  await expect(dialog).toHaveCSS("box-shadow", "none");
  await expect(overlay).toHaveCSS("background-color", "rgb(255, 255, 255)");
});
