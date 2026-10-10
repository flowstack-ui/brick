import { expect, test } from "../../evidence-test.js";

test("inline pointer entry cancels dismissal until the panel is left", async ({ page }) => {
  await page.goto("/navigation-menu");
  const section = page.locator("#inline");
  const trigger = section.getByRole("button", { name: "Learn", exact: true });
  await trigger.hover();
  const link = section.getByRole("link", { name: "Getting started" });
  await expect(link).toBeVisible();
  await link.hover();
  // Deliberately dwell beyond closeDelay: visibility immediately after hover
  // would miss the pending trigger timer.
  await page.waitForTimeout(450);
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(link).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("indicator retains geometry through exit and interrupted reopen", async ({ page }) => {
  await page.goto("/navigation-menu");
  const section = page.locator("#header");
  const trigger = section.getByRole("button", { name: "Resources" });
  await trigger.click();
  const panel = section.locator(".brick-navigation-menu__viewport");
  const arrow = section.locator(".brick-navigation-menu__indicator-arrow");
  await expect(arrow).toBeVisible();
  await panel.evaluate(async node => {
    await Promise.all(node.getAnimations().map(a => a.finished.catch(() => {})));
  });
  const before = (await arrow.boundingBox())!;
  await trigger.press("Escape");
  await expect(arrow).toBeAttached();
  const during = (await arrow.boundingBox())!;
  expect(during.x).toBeCloseTo(before.x, 0);
  expect(during.y).toBeCloseTo(before.y, 0);
  await trigger.press("Enter");
  await expect(arrow).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await trigger.press("Escape");
  await expect(panel).toBeHidden();
  await expect(arrow).not.toBeAttached();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await trigger.press("Enter");
  await expect(arrow).toBeVisible();
  await trigger.press("Escape");
  await expect(arrow).not.toBeAttached();
});

test("vertical collision placement updates after document scroll", async ({ page }) => {
  await page.goto("/navigation-menu");
  const section = page.locator("#vertical");
  const trigger = section.getByRole("button", { name: "Learn", exact: true });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await trigger.press("Enter");
  const panel = section.locator(".brick-navigation-menu__viewport");
  await expect(panel).toBeVisible();
  await trigger.evaluate(node => window.scrollBy(0, node.getBoundingClientRect().top - 20));
  await expect.poll(async () => (await panel.boundingBox())?.y).toBeCloseTo(8, 0);
});
