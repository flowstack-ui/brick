import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function expectDrawerSettled(drawer: Locator) {
  await expect(drawer).toHaveAttribute("data-state", "open");
  await expect.poll(async () => drawer.evaluate((element) => getComputedStyle(element).transform)).toBe(
    "matrix(1, 0, 0, 1, 0, 0)",
  );
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders and operates Brick through its public package", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Build useful interfaces",
  );

  const appBar = page.getByRole("banner", { name: "Primary" });
  await expect(appBar).toHaveClass(/brick-app-bar/);
  await expect(appBar).toHaveAttribute("data-position", "sticky");
  await expect(appBar.locator("[data-slot='appbar-toolbar']")).toHaveAttribute("data-density", "compact");
  await expect(page.getByRole("link", { name: "Jump to workspace" })).toHaveClass(/brick-icon-button/);

  const publishTrigger = page.getByRole("button", { name: "Publish project" });
  await publishTrigger.click();
  const dialog = page.getByRole("dialog", { name: "Publish project?" });
  await expect(dialog).toHaveAttribute("data-slot", "dialog-content");
  await expect(dialog).toHaveAttribute("data-size", "sm");
  await expect(dialog).toHaveAccessibleDescription(
    "Review the release summary before making it available to the team.",
  );
  await page.getByRole("button", { name: "Publish now" }).click();
  await expect(page.getByText("Published 1 time.")).toBeVisible();
  await expect(dialog).toBeHidden();
  await expect(publishTrigger).toBeFocused();

  const appearanceToggle = page.getByRole("button", { name: "Dark appearance" });
  await expect(appearanceToggle).toHaveAttribute("aria-pressed", "false");
  await appearanceToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-brick-appearance", "dark");
  await expect(appearanceToggle).toHaveAttribute("aria-pressed", "true");
  await appearanceToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-brick-appearance", "light");
  await expect(appearanceToggle).toHaveAttribute("aria-pressed", "false");
});

test("composes Dialog as a focused consumer publishing flow", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Publish project" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Publish project?" });
  await expect(dialog.getByText("Mobile checkout refresh")).toBeVisible();
  await expect(dialog.getByText("Candidate 8")).toBeVisible();

  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByText("Project has not been published.")).toBeVisible();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("uses Tooltip as supplemental help for AppBar controls", async ({ page }) => {
  const jump = page.getByRole("link", { name: "Jump to workspace" });
  await jump.focus();
  const tooltip = page.getByRole("tooltip");
  await expect(tooltip).toHaveText("Jump to workspace");
  await expect(tooltip.locator("[data-slot='tooltip-arrow']")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
  await expect(jump).toBeFocused();

  const appearance = page.getByRole("button", { name: "Dark appearance" });
  await appearance.focus();
  await expect(page.getByRole("tooltip")).toHaveText("Toggle dark appearance");
});

test("composes HoverCard as a noninteractive preview for a genuine collaborator link", async ({ page }) => {
  const link = page.getByRole("link", { name: "Ada Lovelace" });
  await expect(link).toHaveAttribute("href", "#ada-profile");
  await expect(link).toHaveClass(/brick-hover-card__trigger/);
  await link.focus();

  const preview = page.locator("[data-slot='hover-card']").filter({ hasText: "Lead reviewer" });
  await expect(preview).toBeVisible();
  await expect(preview).toHaveAttribute("data-size", "md");
  await expect(preview).not.toHaveAttribute("role");
  await expect(preview.locator("[data-slot='hover-card-arrow']")).toBeVisible();
  await expect(preview.locator("a,button,input,select,textarea,[tabindex]")).toHaveCount(0);
  await expect(link).not.toHaveAttribute("aria-expanded");
  await expect(link).not.toHaveAttribute("aria-haspopup");

  await page.keyboard.press("Escape");
  await expect(preview).toBeHidden();
  await expect(link).toBeFocused();
  await link.press("Enter");
  await expect(page).toHaveURL(/#ada-profile$/);
});

test("composes Popover as a compact AppBar settings panel", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Workspace settings" });
  await trigger.click();
  const popover = page.getByRole("dialog", { name: "Workspace settings" });
  await expect(popover).toHaveAttribute("data-slot", "popover");
  await expect(popover).toHaveAttribute("data-size", "sm");
  await expect(popover).toHaveAccessibleDescription(
    "Change compact display options for this workspace.",
  );
  await page.getByLabel("Compact project spacing").check();
  await expect(page.locator(".workspace-grid")).toHaveAttribute("data-compact", "true");
  await popover.getByRole("button", { name: "Done" }).click();
  await expect(popover).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("composes AlertDialog as an application-owned destructive decision", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Remove project" });
  await trigger.click();
  const alert = page.getByRole("alertdialog", {
    name: "Remove Mobile checkout refresh?",
  });
  await expect(alert).toHaveAttribute("data-slot", "alert-dialog-content");
  await expect(alert).toHaveAttribute("data-size", "sm");
  await expect(alert).toHaveAccessibleDescription(
    "This permanently removes the project from the workspace and cannot be undone.",
  );
  const cancel = page.getByRole("button", { name: "Keep project" });
  await expect(cancel).toBeFocused();
  await cancel.click();
  await expect(alert).toBeHidden();
  await expect(page.getByText("Project is active.")).toBeVisible();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByRole("button", { name: "Remove permanently" }).click();
  await expect(alert).toBeHidden();
  await expect(page.getByText("Project removal confirmed.")).toBeVisible();
  await expect(trigger).toBeFocused();
});

test("composes Drawer as an application-owned project filter workflow", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Filter projects" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Filter workspace projects" });
  await expect(drawer).toHaveAttribute("data-slot", "drawer-content");
  await expect(drawer).toHaveAttribute("data-placement", "end");
  await expect(drawer).toHaveAttribute("data-size", "md");
  await expect(drawer).toHaveAccessibleDescription(
    "Choose which projects appear in this workspace view.",
  );

  await page.getByLabel("Archived projects").check();
  await page.getByLabel("Owner").selectOption("ada");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(drawer).toBeHidden();
  await expect(page.getByText("Showing active and archived projects for Ada Lovelace.")).toBeVisible();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByLabel("Active projects")).toBeChecked();
  await expect(page.getByLabel("Archived projects")).not.toBeChecked();
  await expect(page.getByLabel("Owner")).toHaveValue("any");
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("keeps AlertDialog open on its scrim and supports safe Escape dismissal", async ({ page }) => {
  const trigger = page.getByRole("button", { name: "Remove project" });
  await trigger.click();
  const alert = page.getByRole("alertdialog", {
    name: "Remove Mobile checkout refresh?",
  });
  const overlay = page.locator(".brick-alert-dialog-overlay");
  await overlay.click({ position: { x: 4, y: 4 } });
  await expect(alert).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(alert).toBeHidden();
  await expect(page.getByText("Project is active.")).toBeVisible();
  await expect(trigger).toBeFocused();
});

test("composes Card through its public package without inventing interaction", async ({ page }) => {
  const project = page.getByRole("article", { name: "Mobile checkout refresh" });
  await expect(project).toHaveAttribute("data-slot", "card");
  await expect(project).toHaveAttribute("data-variant", "elevated");
  await expect(project).toHaveAttribute("data-size", "lg");
  await expect(project).not.toHaveAttribute("tabindex");

  const checklist = page.getByRole("region", { name: "Ready for review" });
  await expect(checklist).toHaveAttribute("data-variant", "subtle");
  await expect(checklist.getByRole("button", { name: "Review checklist" })).toBeVisible();

  const invite = page.getByRole("region", { name: "Invite a teammate" });
  await expect(invite).toHaveAttribute("data-size", "lg");
  await expect(invite.getByLabel("Work email")).toBeVisible();
});

test("composes the complete public Form, Field, and Fieldset foundation", async ({ page }) => {
  const form = page.getByRole("form", { name: "Invite teammate" });
  const field = form.locator("#invite-email-field");
  const fieldset = form.locator("#invite-role");
  const email = form.getByLabel("Work email");

  await expect(form).toHaveClass(/brick-form/);
  await expect(field).toHaveClass(/brick-field/);
  await expect(fieldset).toHaveClass(/brick-fieldset/);
  await expect(fieldset).toHaveAttribute("data-required", "");
  await expect(form.getByRole("group", { name: "Workspace role" })).toBeVisible();
  await expect(form.getByLabel("Reviewer")).toBeChecked();

  await form.getByRole("button", { name: "Prepare invitation" }).click();
  await expect(field).toHaveAttribute("data-invalid", "");
  await expect(email).toHaveAttribute("aria-invalid", "true");
  await expect(form.locator("#invite-email-field-error")).toBeVisible();

  await email.fill("team@example.com");
  await form.getByLabel("Editor").check();
  await form.getByRole("button", { name: "Prepare invitation" }).click();
  await expect(page.getByText("Invitation ready for team@example.com.")).toBeVisible();

  await form.getByRole("button", { name: "Reset" }).click();
  await expect(email).toHaveValue("");
  await expect(field).not.toHaveAttribute("data-invalid");
  await expect(page.getByText("Invitation form reset.")).toBeVisible();
});

test("composes Checkbox and CheckboxGroup as a complete publishing-preferences workflow", async ({ page }) => {
  const form = page.getByRole("form", { name: "Publishing preferences" });
  const acknowledgement = form.getByRole("checkbox", { name: "Release acknowledgement" });
  const group = form.locator(".brick-checkbox-group");
  const parent = group.getByRole("checkbox", { name: "Select every available channel" });
  const email = group.getByRole("checkbox", { name: "Email report" });
  const push = group.getByRole("checkbox", { name: "Push notification" });
  const sms = group.getByRole("checkbox", { name: "SMS unavailable" });

  await expect(acknowledgement).toHaveClass(/brick-checkbox/);
  await expect(group).toHaveClass(/brick-checkbox-group/);
  await expect(email).toHaveAccessibleDescription("Build, package, and review details.");
  await expect(sms).toBeDisabled();
  await acknowledgement.click();
  await email.click();
  await expect(parent).toHaveAttribute("aria-checked", "mixed");
  await parent.click();
  await expect(email).toHaveAttribute("aria-checked", "true");
  await expect(push).toHaveAttribute("aria-checked", "true");
  await expect(sms).toHaveAttribute("aria-checked", "false");
  await form.getByRole("button", { name: "Save publishing preferences" }).click();
  await expect(page.getByText("Preferences saved for email, push.")).toBeVisible();

  await form.getByRole("button", { name: "Reset preferences" }).click();
  await expect(acknowledgement).toHaveAttribute("aria-checked", "false");
  await expect(email).toHaveAttribute("aria-checked", "false");
  await expect(push).toHaveAttribute("aria-checked", "false");
  await expect(page.getByText("Publishing preferences reset.")).toBeVisible();
});

test("composes Badge and NotificationBadge through their public subpath", async ({ page }) => {
  const status = page.getByText("3 tasks ready", { exact: true });
  await expect(status).toHaveClass("brick-badge");
  await expect(status).toHaveAttribute("data-tone", "success");
  await expect(status).not.toHaveAttribute("role");
  await expect(status).not.toHaveAttribute("aria-live");

  const taskControl = page.getByRole("button", { name: "Review tasks, 3 ready" });
  const wrapper = taskControl.locator("..");
  const indicator = wrapper.locator("[data-slot='notification-badge-indicator']");
  await expect(wrapper).toHaveClass(/brick-notification-badge/);
  await expect(indicator).toHaveText("3");
  await expect(indicator).toHaveAttribute("aria-hidden", "true");
  await taskControl.focus();
  await expect(taskControl).toBeFocused();
  expect(await indicator.evaluate((element) => getComputedStyle(element).pointerEvents)).toBe("none");
});

test("composes Avatar status and fallback states through its public subpath", async ({ page }) => {
  const adaImage = page.getByRole("img", { name: "Ada Lovelace" });
  const ada = adaImage.locator("..");
  await expect(ada).toHaveAttribute("data-slot", "avatar");
  await expect(ada).toHaveAttribute("data-size", "lg");
  await expect(ada).toHaveAttribute("data-shape", "circle");
  await expect(ada).toHaveAttribute("data-status", "online");
  await expect(adaImage).toHaveAttribute("data-slot", "avatar-image");
  await expect(adaImage).toHaveAttribute("src", /^data:image\/svg\+xml/);
  await expect(page.getByText("Online · 2 updates")).toBeVisible();

  const adaWrapper = ada.locator("..");
  await expect(adaWrapper).toHaveClass(/brick-notification-badge/);
  await expect(adaWrapper.locator("[data-slot='notification-badge-indicator']")).toHaveText("2");

  const graceFallback = page.getByRole("img", { name: "Grace Hopper" });
  const grace = graceFallback.locator("..");
  await expect(grace).toHaveAttribute("data-shape", "rounded");
  await expect(grace).toHaveAttribute("data-status", "busy");
  await expect(graceFallback).toContainText("GH");
  await expect(page.getByText("Busy · fallback shown")).toBeVisible();
});

test("composes Toggle and ToggleGroup as application-owned persistent views", async ({ page }) => {
  const appearance = page.getByRole("button", { name: "Dark appearance" });
  await expect(appearance).toHaveClass(/brick-toggle/);
  await expect(appearance).toHaveAttribute("data-variant", "ghost");

  const group = page.getByRole("group", { name: "Workspace view" });
  const cards = group.getByRole("button", { name: "Cards" });
  const list = group.getByRole("button", { name: "List" });
  await expect(group).toHaveClass(/brick-toggle-group/);
  await expect(group).toHaveAttribute("data-attached", "true");
  await expect(cards).toHaveAttribute("aria-pressed", "true");
  await cards.click();
  await expect(cards).toHaveAttribute("aria-pressed", "true");
  await list.click();
  await expect(list).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".workspace-grid")).toHaveAttribute("data-view", "list");
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  const lightResults = await new AxeBuilder({ page }).analyze();
  expect(lightResults.violations).toEqual([]);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Dark appearance" }).click();
  await page.getByRole("button", { name: "Publish project" }).click();
  const darkResults = await new AxeBuilder({ page }).analyze();
  expect(darkResults.violations).toEqual([]);

  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Remove project" }).click();
  const alertResults = await new AxeBuilder({ page }).analyze();
  expect(alertResults.violations).toEqual([]);

  await page.getByRole("button", { name: "Keep project" }).click();
  await page.getByRole("button", { name: "Filter projects" }).click();
  const drawerResults = await new AxeBuilder({ page }).analyze();
  expect(drawerResults.violations).toEqual([]);
});

test("contains the layout at the project viewport", async ({ page }) => {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);

  const headerBox = await page.locator(".site-header").boundingBox();
  expect(headerBox).not.toBeNull();
  expect(headerBox!.x).toBeCloseTo(0, 0);
  expect(headerBox!.width).toBeCloseTo(dimensions.clientWidth, 0);

  await page.getByRole("button", { name: "Publish project" }).click();
  const dialog = page.getByRole("dialog", { name: "Publish project?" });
  const box = await dialog.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(dimensions.clientWidth);

  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Remove project" }).click();
  const alert = page.getByRole("alertdialog", {
    name: "Remove Mobile checkout refresh?",
  });
  const alertBox = await alert.boundingBox();
  expect(alertBox).not.toBeNull();
  expect(alertBox!.x).toBeGreaterThanOrEqual(0);
  expect(alertBox!.x + alertBox!.width).toBeLessThanOrEqual(dimensions.clientWidth);

  await page.getByRole("button", { name: "Keep project" }).click();
  await page.getByRole("button", { name: "Filter projects" }).click();
  const drawer = page.getByRole("dialog", { name: "Filter workspace projects" });
  await expect(drawer).toBeVisible();
  await expectDrawerSettled(drawer);
  const drawerBox = await drawer.boundingBox();
  expect(drawerBox).not.toBeNull();
  expect(drawerBox!.x).toBeGreaterThanOrEqual(0);
  expect(drawerBox!.x + drawerBox!.width).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("keeps the page stable while Dialog and Drawer own scroll lock", async ({ page }) => {
  const shell = page.locator(".site-shell");
  const before = await shell.boundingBox();
  expect(before).not.toBeNull();
  const paddingBefore = await page.evaluate(() => document.body.style.paddingRight);

  async function expectStable(label: string) {
    const current = await shell.boundingBox();
    expect(current, label).not.toBeNull();
    expect(current!.x, `${label} x`).toBeCloseTo(before!.x, 0);
    expect(current!.width, `${label} width`).toBeCloseTo(before!.width, 0);
    expect(
      await page.evaluate(() => document.body.style.paddingRight),
      `${label} body padding`,
    ).toBe(paddingBefore);
  }

  await page.getByRole("button", { name: "Publish project" }).click();
  const dialog = page.getByRole("dialog", { name: "Publish project?" });
  await expect(dialog).toBeVisible();
  await expectStable("open Dialog");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expectStable("closed Dialog");

  await page.getByRole("button", { name: "Filter projects" }).click();
  const drawer = page.getByRole("dialog", { name: "Filter workspace projects" });
  await expectDrawerSettled(drawer);
  await expectStable("open Drawer");
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expectStable("closed Drawer");
});

test("keeps the mobile header and Card content intentionally contained", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const header = page.locator(".site-header");
  const brand = page.locator(".brand");
  const appearance = page.getByRole("button", { name: "Dark appearance" });
  const [headerBox, brandBox, appearanceBox] = await Promise.all([
    header.boundingBox(),
    brand.boundingBox(),
    appearance.boundingBox(),
  ]);
  expect(headerBox).not.toBeNull();
  expect(brandBox).not.toBeNull();
  expect(appearanceBox).not.toBeNull();
  expect(Math.abs(brandBox!.y - appearanceBox!.y)).toBeLessThan(8);
  expect(appearanceBox!.x + appearanceBox!.width).toBeLessThanOrEqual(headerBox!.x + headerBox!.width);

  const collaborators = page.locator(".project-collaborators");
  const card = page.getByRole("article", { name: "Mobile checkout refresh" });
  const [collaboratorsBox, cardBox] = await Promise.all([
    collaborators.boundingBox(),
    card.boundingBox(),
  ]);
  expect(collaboratorsBox).not.toBeNull();
  expect(cardBox).not.toBeNull();
  expect(collaboratorsBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
  expect(collaboratorsBox!.x + collaboratorsBox!.width).toBeLessThanOrEqual(cardBox!.x + cardBox!.width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
