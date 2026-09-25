import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/scroll-area");
});

test("custom sizes, corner geometry, native fallback and narrow containment", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const first = page.getByRole("region", {
    name: "Release notes",
    exact: true,
  });
  await expect(first).toHaveAttribute("data-custom-ready", "");
  await expect(first).toHaveCSS("scrollbar-width", "none");
  expect(await first.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(
    true,
  );
  const bars = page.locator(
    "#sizes [data-example-canvas] .brick-scroll-area-scrollbar",
  );
  await expect(bars).toHaveCount(4);
  expect(
    await bars.evaluateAll((nodes) =>
      nodes.map((el) => el.getBoundingClientRect().width),
    ),
  ).toEqual([4, 6, 8, 12]);
  const both = page.locator("#both [data-example-canvas] .brick-scroll-area");
  await expect(both).toHaveAttribute("data-overflow-x", "");
  await expect(both).toHaveAttribute("data-overflow-y", "");
  const geometry = await both.evaluate((el) => {
    const v = el
      .querySelector(
        '.brick-scroll-area-scrollbar[data-orientation="vertical"]',
      )!
      .getBoundingClientRect();
    const h = el
      .querySelector(
        '.brick-scroll-area-scrollbar[data-orientation="horizontal"]',
      )!
      .getBoundingClientRect();
    return {
      verticalEnd: v.bottom,
      horizontalTop: h.top,
      horizontalEnd: h.right,
      verticalStart: v.left,
    };
  });
  expect(geometry.verticalEnd).toBeLessThanOrEqual(geometry.horizontalTop);
  expect(geometry.horizontalEnd).toBeLessThanOrEqual(geometry.verticalStart);
  await page.setViewportSize({ width: 375, height: 800 });
  expect(
    await page
      .locator("[data-example-canvas]")
      .evaluateAll((nodes) =>
        nodes
          .filter((el) => el.scrollWidth > el.clientWidth + 1)
          .map((el) => el.closest("section[id]")?.id),
      ),
  ).toEqual([]);
  await page.emulateMedia({ forcedColors: "active" });
  if (
    await page.evaluate(() => matchMedia("(forced-colors: active)").matches)
  ) {
    // Firefox on this macOS host computes even an unstyled native scroller's
    // `auto` width as `none`. Compare with a native control, not an OS assumption.
    const nativeWidth = await page.evaluate(() => {
      const probe = document.createElement("div");
      probe.style.cssText = "overflow:auto;scrollbar-width:auto;height:10px";
      const content = document.createElement("div");
      content.style.height = "100px";
      probe.append(content);
      document.body.append(probe);
      const width = getComputedStyle(probe).scrollbarWidth;
      probe.remove();
      return width;
    });
    await expect(first).toHaveCSS("scrollbar-width", nativeWidth);
    await expect(bars.first()).toHaveCSS("display", "none");
    await first.evaluate((el) => {
      el.scrollTop = 100;
    });
    expect(await first.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
  } else {
    test
      .info()
      .annotations.push({
        type: "unsupported-environment",
        description:
          "This browser host does not emulate forced colors; fallback assertions run in supporting projects.",
      });
  }
});

test("dynamic overflow, bottom policy and real virtualization", async ({
  page,
}) => {
  const dynamic = page.getByRole("region", {
    name: "Dynamic content",
    exact: true,
  });
  await expect(dynamic).not.toHaveAttribute("data-overflow-y", "");
  await page.getByRole("button", { name: "Show more", exact: true }).click();
  await expect(dynamic).toHaveAttribute("data-overflow-y", "");
  await page.getByRole("button", { name: "Show less", exact: true }).click();
  await expect(dynamic).not.toHaveAttribute("data-overflow-y", "");
  const conversation = page.getByRole("region", {
    name: "Conversation",
    exact: true,
  });
  await page.getByRole("button", { name: "Latest", exact: true }).click();
  await expect(conversation).toHaveAttribute("data-at-bottom", "");
  await page.getByRole("button", { name: "Add message", exact: true }).click();
  await expect(conversation).toHaveAttribute("data-at-bottom", "");
  await conversation.evaluate((el) => {
    el.scrollTop = 0;
  });
  await expect(conversation).toHaveAttribute("data-at-top", "");
  await page.getByRole("button", { name: "Add message", exact: true }).click();
  await expect(conversation).toHaveAttribute("data-at-top", "");
  const virtual = page.getByRole("region", {
    name: "Virtual project archive",
    exact: true,
  });
  expect(await virtual.getByRole("listitem").count()).toBeLessThan(40);
  expect(await virtual.evaluate((el) => el.scrollHeight)).toBe(400000);
  await virtual.evaluate((el) => {
    el.scrollTop = 200000;
  });
  await expect(
    virtual.getByText("Project record 5001", { exact: true }),
  ).toBeVisible();
});

test("menu focus reaches last item and returns; docs source and accessibility", async ({
  page,
}) => {
  const trigger = page.getByRole("button", {
    name: "Open projects",
    exact: true,
  });
  await trigger.focus();
  await trigger.press("Enter");
  await expect(
    page.getByRole("menuitem", { name: "Project 1", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("End");
  const last = page.getByRole("menuitem", { name: "Project 30", exact: true });
  await expect(last).toBeFocused();
  await expect(last).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page
    .locator("#virtual")
    .getByRole("tab", { name: "Code", exact: true })
    .click();
  await expect(page.locator("#virtual")).toContainText(
    "@tanstack/react-virtual",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .include('[data-component-page="scroll-area"]')
        .analyze()
    ).violations,
  ).toEqual([]);
});
