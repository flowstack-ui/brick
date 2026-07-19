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

test("supports a normal consumer form", async ({ page }) => {
  await page.getByLabel("Work email").fill("team@example.com");
  await page.getByRole("button", { name: "Prepare invitation" }).click();
  await expect(page.getByText("Invitation ready for team@example.com.")).toBeVisible();
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
