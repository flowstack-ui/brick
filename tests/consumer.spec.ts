import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

  await page.getByRole("button", { name: "Dark appearance" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-brick-appearance", "dark");
  await expect(page.getByRole("button", { name: "Light appearance" })).toBeVisible();
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

test("has no automatically detectable accessibility violations", async ({ page }) => {
  const lightResults = await new AxeBuilder({ page }).analyze();
  expect(lightResults.violations).toEqual([]);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Dark appearance" }).click();
  await page.getByRole("button", { name: "Publish project" }).click();
  const darkResults = await new AxeBuilder({ page }).analyze();
  expect(darkResults.violations).toEqual([]);
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
});
