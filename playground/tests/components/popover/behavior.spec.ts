import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "../../evidence-test.js";

test("nested popup arrows do not steal the parent resize observer", async ({ page }) => {
  await page.goto("/popover#nested");
  const trigger = page.getByRole("button", { name: "Open parent", exact: true });
  await trigger.click();
  const parent = page.getByRole("dialog", { name: "Parent panel", exact: true });
  await expect(parent).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Open nested panel", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Nested panel", exact: true })).toHaveCSS("opacity", "1");
  const arrow = parent.locator(":scope > [data-slot=popover-arrow]");
  const gap = async () => {
    const a = (await arrow.boundingBox())!;
    const t = (await trigger.boundingBox())!;
    const side = await parent.getAttribute("data-side");
    return side === "bottom" ? a.y - t.y - t.height : t.y - a.y - a.height;
  };
  const before = await gap();
  await arrow.evaluate(element => (element as SVGElement).style.setProperty("--brick-overlay-arrow-size", "24px"));
  await expect.poll(async () => (await arrow.boundingBox())!.width).toBeCloseTo(24 * Math.SQRT2, 1);
  await expect.poll(async () => Math.abs(await gap() - before)).toBeLessThan(1);
});

test("shared arrow resizing preserves tip clearance and the border join", async ({ page }) => {
  await page.goto("/popover?appearance=dark#placement");
  const trigger = page.locator("#placement").getByRole("button", { name: "bottom", exact: true });
  await trigger.click();
  const panel = page.getByRole("dialog", { name: "bottom", exact: true });
  await expect(panel).toHaveCSS("opacity", "1");
  const arrow = panel.locator("[data-slot=popover-arrow]");
  const measure = async () => {
    const t = (await trigger.boundingBox())!;
    const p = (await panel.boundingBox())!;
    const a = (await arrow.boundingBox())!;
    const side = await panel.getAttribute("data-side");
    return {
      width: a.width, height: a.height,
      gap: side === "bottom" ? a.y - t.y - t.height : t.y - a.y - a.height,
      join: side === "bottom" ? Math.abs(a.y + a.height - p.y) : Math.abs(a.y - p.y - p.height),
    };
  };
  const initial = await measure();
  expect(initial.width).toBeCloseTo(12 * Math.SQRT2, 1);
  expect(initial.gap).toBeGreaterThan(0);
  await arrow.evaluate(element => (element as SVGElement).style.setProperty("--brick-overlay-arrow-size", "20px"));
  await expect.poll(async () => (await measure()).width).toBeCloseTo(20 * Math.SQRT2, 1);
  await expect.poll(async () => Math.abs((await measure()).gap - initial.gap)).toBeLessThan(1);
  expect((await measure()).join).toBeLessThan(2);
  await expect(arrow).toHaveCSS("filter", "none");
  await expect(arrow.locator(".brick-floating-arrow__edge").first()).toHaveCSS("vector-effect", "non-scaling-stroke");
  await page.emulateMedia({ forcedColors: "active" });
  const colors = await arrow.evaluate(element => {
    const paint = getComputedStyle(element);
    const join = getComputedStyle(element.querySelector(".brick-floating-arrow__join")!);
    return { fill: paint.fill, join: join.stroke };
  });
  expect(colors.fill).toBe(colors.join);
});

test("virtual DOMRect anchor positions the panel at Reference and follows scrolling", async ({ page }) => {
  await page.goto("/popover#virtual");
  const trigger = page.getByRole("button", { name: "Open at reference", exact: true });
  const reference = page.getByRole("button", { name: "Reference", exact: true });
  const panel = page.getByRole("dialog", { name: "Virtual anchor", exact: true });
  for (let attempt = 0; attempt < 2; attempt++) {
    await trigger.click();
    await expect(panel).toBeVisible();
    const checkPosition = async () => {
      const a = (await reference.boundingBox())!;
      const b = (await panel.boundingBox())!;
      expect(Number.isFinite(b.x + b.y + b.width + b.height)).toBe(true);
      return Math.abs(a.x + a.width / 2 - b.x - b.width / 2);
    };
    await expect.poll(checkPosition).toBeLessThan(3);
    await page.evaluate(() => window.scrollBy(0, 30));
    await expect.poll(checkPosition).toBeLessThan(3);
    const a = (await reference.boundingBox())!;
    const b = (await panel.boundingBox())!;
    expect(Math.min(Math.abs(b.y + b.height - a.y), Math.abs(b.y - a.y - a.height))).toBeLessThan(30);
    await expect(panel.locator("[data-slot=popover-arrow]")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  }
});

test("documentation indicator uses the button icon slot and radius specimens stay compact", async ({ page }) => {
  await page.goto("/popover#indicator");
  const trigger = page.locator("#indicator").getByRole("button", { name: "Settings", exact: true });
  const icon = trigger.locator(".brick-button__icon [data-slot=popover-indicator]");
  await expect(icon).toHaveCount(1);
  const labelBox = (await trigger.locator(".brick-button__content").boundingBox())!;
  const iconBox = (await icon.boundingBox())!;
  expect(Math.abs(labelBox.y + labelBox.height / 2 - iconBox.y - iconBox.height / 2)).toBeLessThan(2);
  expect(iconBox.x - labelBox.x - labelBox.width).toBeGreaterThan(3);
  for (const radius of ["none", "sm", "overlay", "full"]) {
    await page.locator("#radius").getByRole("button", { name: radius, exact: true }).click();
    const panel = page.getByRole("dialog", { name: radius, exact: true });
    await expect(panel).toBeVisible();
    await expect(panel.locator("[data-slot=popover-body]")).toHaveText(radius);
    await page.keyboard.press("Escape");
  }
});

test("documentation arrows attach on resolved sides and full radius supports narrow RTL enlarged text", async ({ page }) => {
  await page.goto("/popover#placement");
  for (const side of ["top", "right", "bottom", "left"]) {
    await page.locator("#placement").getByRole("button", { name: side, exact: true }).click();
    const panel = page.getByRole("dialog", { name: side, exact: true });
    await expect(panel).toHaveCSS("opacity", "1");
    const box = (await panel.boundingBox())!;
    const arrow = (await panel.locator("[data-slot=popover-arrow]").boundingBox())!;
    const resolved = await panel.getAttribute("data-side");
    const distance = resolved === "top" ? Math.abs(arrow.y - box.y - box.height)
      : resolved === "bottom" ? Math.abs(arrow.y + arrow.height - box.y)
      : resolved === "left" ? Math.abs(arrow.x - box.x - box.width)
      : Math.abs(arrow.x + arrow.width - box.x);
    expect(distance).toBeLessThan(3);
    await page.keyboard.press("Escape");
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/popover?appearance=dark&exampleDirection=rtl#radius");
  // Text enlargement is independent of actual browser zoom qualification.
  await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
  await page.locator("#radius").getByRole("button", { name: "full", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "full", exact: true });
  await expect(panel).toHaveCSS("opacity", "1");
  const box = (await panel.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(375);
  const readable = await panel.locator(".brick-text").evaluate(element => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const r = range.getBoundingClientRect();
    return [[r.left + 1, r.top + 1], [r.right - 1, r.top + 1],
      [r.left + 1, r.bottom - 1], [r.right - 1, r.bottom - 1]].every(([x, y]) =>
      element.contains(document.elementFromPoint(x, y)));
  });
  expect(readable).toBe(true);
});

async function readShellViewportOffsets(page: Page) {
  return page.evaluate(() => {
    const readOffset = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element || getComputedStyle(element).display === "none") return null;
      return element.getBoundingClientRect().y;
    };
    return {
      appBar: readOffset("[data-playground-app-bar]"),
      reviewHeader: readOffset(".evidence-review-header"),
      sidebar: readOffset(".evidence-sidebar"),
    };
  });
}

test("documentation exposes preview examples and named props sections", async ({ page }) => {
  await page.goto("/popover");
  await expect(page.getByRole("heading", { name: "Multiple triggers", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Root", exact: true })).toHaveCount(1);
  await page.getByRole("button", { name: "Open settings", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Project settings", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
});

test("Popover opens intentionally with generated name and description, then restores focus", async ({
  page,
}) => {
  await page.goto("/popover?qualification=1");
  const trigger = page.getByRole("button", { name: "Project settings" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const popover = page.getByRole("dialog", { name: "Project settings" });
  await expect(popover).toBeVisible();
  const [containerBackground, contentBackground] = await Promise.all([
    page
      .getByTestId("popover-overview")
      .evaluate((element) => getComputedStyle(element).backgroundColor),
    popover.evaluate((element) => getComputedStyle(element).backgroundColor),
  ]);
  expect(containerBackground).not.toBe(contentBackground);
  await expect(popover).toHaveAttribute("aria-describedby", /.+/);
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(
    await popover
      .locator("[data-slot='popover-viewport']")
      .evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  const arrow = popover.locator("[data-slot='popover-arrow']");
  await expect(arrow).toBeVisible();
  const arrowBox = await arrow.boundingBox();
  expect(arrowBox).not.toBeNull();
  expect(arrowBox!.width).toBeGreaterThan(0);
  expect(arrowBox!.height).toBeGreaterThan(0);
  await expect(popover.getByRole("button", { name: "Reset" })).toHaveAttribute(
    "data-variant",
    "outline",
  );
  const input = popover.getByRole("textbox", { name: "Project name" });
  await input.focus();
  await expect(input).toHaveCSS("outline-style", "none");
  expect(
    await input
      .locator("xpath=..")
      .evaluate((element) => getComputedStyle(element).boxShadow),
  ).not.toBe("none");
  await page.keyboard.press("Escape");
  await expect(popover).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("shared triggers move one panel without a second disclosure", async ({ page }) => {
  await page.goto("/popover");
  await page.getByRole("button", { name: "Profile", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Profile", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Help", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Help", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Help", exact: true })).toBeFocused();
});

test("insets scale independently and same width matches its trigger", async ({ page }) => {
  await page.goto("/popover");
  for (const [name, inset] of [["xs", 12], ["sm", 16], ["md", 20], ["lg", 24]] as const) {
    await page.locator("#insets").getByRole("button", { name, exact: true }).click();
    const panel = page.getByRole("dialog", { name, exact: true });
    await expect(panel.locator("[data-slot=popover-body]")).toHaveCSS("padding-left", `${inset}px`);
    await page.keyboard.press("Escape");
  }
  const trigger = page.getByRole("button", { name: "Match trigger width", exact: true });
  await trigger.click();
  const panel = page.getByRole("dialog", { name: "Same width", exact: true });
  await expect(panel).toBeVisible();
  await expect.poll(async () => Math.abs((await panel.boundingBox())!.width - (await trigger.boundingBox())!.width)).toBeLessThan(2);
});

test("docs nested dialog and retained draft use the library behavior", async ({ page }) => {
  await page.goto("/popover");
  await page.getByRole("button", { name: "Lazy mount", exact: true }).click();
  await page.getByRole("textbox", { name: "Draft name" }).fill("Preserved draft");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Lazy mount", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Draft name" })).toHaveValue("Preserved draft");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open dialog", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "Workspace settings", exact: true });
  await dialog.getByRole("button", { name: "Project settings", exact: true }).click();
  const panel = page.getByRole("dialog", { name: "Inside the dialog", exact: true });
  await expect(panel).toBeVisible();
  await panel.getByRole("button", { name: "Done", exact: true }).click();
  await expect(dialog).toBeVisible();
});

test("Popover removes authored motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/popover?qualification=1");
  await page.getByRole("button", { name: "Project settings" }).click();
  const durations = await page
    .getByRole("dialog", { name: "Project settings" })
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(
    durations.split(",").every((value) => Number.parseFloat(value) <= 0.001),
  ).toBe(true);
});

test("Popover exposes three bounded sizes, shared Arrow, and disabled state", async ({
  page,
}) => {
  await page.goto("/popover?qualification=1");
  for (const size of ["sm", "md", "lg"] as const) {
    await page.getByRole("button", { name: `Open ${size} settings` }).click();
    const popover = page.locator(
      `[data-slot='popover'][data-size='${size}'][data-state='open']`,
    );
    await expect(popover).toBeVisible();
    await expect(popover.locator("[data-slot='popover-arrow']")).toBeVisible();
    await popover.getByRole("button", { name: "Done" }).click();
  }
  await expect(
    page.getByRole("button", { name: "Unavailable settings" }),
  ).toBeDisabled();

  await page.getByRole("button", { name: "Inspect anatomy" }).click();
  const anatomy = page.getByRole("dialog", { name: "Custom workspace panel" });
  await expect(anatomy).toHaveAccessibleDescription(
    "Explicit ARIA supports authored semantic Text inside the visual Header.",
  );
  await anatomy
    .getByRole("button", { name: "Close anatomy" })
    .evaluate((element) => (element as HTMLElement).click());
  await expect(anatomy).toBeHidden();
});

test("Popover respects explicit dismissal policy and nested top-layer order", async ({
  page,
}) => {
  await page.goto("/popover?qualification=1");
  await page.getByRole("button", { name: "Explicit close only" }).click();
  const explicit = page.getByRole("dialog", {
    name: "Explicit close settings",
  });
  await page.keyboard.press("Escape");
  await expect(explicit).toBeVisible();
  await explicit
    .getByRole("button", { name: "Close explicitly" })
    .evaluate((element) => (element as HTMLElement).click());
  await expect(explicit).toBeHidden();

  await page.getByRole("button", { name: "Open parent panel" }).click();
  const parent = page.getByRole("dialog", { name: "Parent panel" });
  await parent
    .getByRole("button", { name: "Open nested panel" })
    .evaluate((element) => (element as HTMLElement).click());
  const nested = page.getByRole("dialog", { name: "Nested panel" });
  await expect(nested).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nested).toBeHidden();
  await expect(parent).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(parent).toBeHidden();
});

test("Popover modal mode traps focus and closes through its visible action", async ({
  page,
}) => {
  await page.goto("/popover?qualification=1");
  const appBar = page.locator("[data-playground-app-bar]");
  const sidebar = page.locator(".evidence-sidebar");
  const trigger = page.getByRole("button", { name: "Open modal settings" });
  await trigger.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  const shellOffsets = await readShellViewportOffsets(page);
  // The app bar stays sticky on mobile, where the sidebar is intentionally
  // hidden. Compare each actual shell region before/after modal locking.
  await trigger.evaluate((element) => (element as HTMLElement).click());
  const popover = page.getByRole("dialog", { name: "Open modal settings" });
  await expect(popover).toHaveAttribute("aria-modal", "true");
  await expect(popover).toHaveCSS("opacity", "1");
  await expect.poll(() => readShellViewportOffsets(page)).toEqual(shellOffsets);
  await expect
    .poll(() => page.evaluate(() => document.documentElement.style.overflow))
    .toBe("hidden");
  await expect
    .poll(() => page.evaluate(() => document.body.style.overflow))
    .not.toBe("hidden");
  if (shellOffsets.appBar === 0) await expect(appBar).toBeVisible();
  if (shellOffsets.sidebar !== null) await expect(sidebar).toBeVisible();
  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press("Tab");
    expect(
      await popover.evaluate((element) =>
        element.contains(document.activeElement),
      ),
    ).toBe(true);
  }
  await popover.getByRole("button", { name: "Done" }).click();
  await expect(trigger).toBeFocused();
  await expect.poll(() => readShellViewportOffsets(page)).toEqual(shellOffsets);
});

test("Popover remains contained at 256 px, supports RTL, and passes focused axe", async ({
  page,
}) => {
  await page.setViewportSize({ width: 256, height: 640 });
  await page.goto("/popover?qualification=1");
  await page.getByRole("button", { name: "فتح إعدادات المشروع" }).click();
  const popover = page.getByRole("dialog", { name: "إعدادات المشروع" });
  await expect(popover).toBeVisible();
  await expect(popover).toHaveAttribute("dir", "rtl");
  await expect
    .poll(() =>
      popover.evaluate((element) => getComputedStyle(element).direction),
    )
    .toBe("rtl");
  const box = await popover.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(256);
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true);
  await expect
    .poll(() =>
      popover.evaluate((element) => getComputedStyle(element).opacity),
    )
    .toBe("1");
  expect(
    (await new AxeBuilder({ page }).disableRules(["region"]).analyze())
      .violations,
  ).toEqual([]);
});

test("Popover stays open during outside touch scrolling and closes on an outside touch tap", async ({
  page,
}) => {
  await page.goto("/popover?qualification=1");
  await page.getByRole("button", { name: "Project settings" }).click();
  const popover = page.getByRole("dialog", { name: "Project settings" });
  await expect(popover).toBeVisible();

  await page.dispatchEvent("body", "pointerdown", {
    pointerType: "touch",
    pointerId: 7,
    clientX: 10,
    clientY: 10,
  });
  await page.dispatchEvent("body", "pointermove", {
    pointerType: "touch",
    pointerId: 7,
    clientX: 10,
    clientY: 40,
  });
  await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
  await page.dispatchEvent("body", "pointerup", {
    pointerType: "touch",
    pointerId: 7,
    clientX: 10,
    clientY: 40,
  });
  await expect(popover).toBeVisible();

  await page.dispatchEvent("body", "pointerdown", {
    pointerType: "touch",
    pointerId: 8,
    clientX: 10,
    clientY: 10,
  });
  await page.dispatchEvent("body", "pointerup", {
    pointerType: "touch",
    pointerId: 8,
    clientX: 11,
    clientY: 11,
  });
  await page.dispatchEvent("body", "click", {
    clientX: 11,
    clientY: 11,
    detail: 1,
  });
  await expect(popover).toBeHidden();
});

test("Popover stacks long Footer actions inside an extreme narrow viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 150, height: 200 });
  await page.goto("/popover?qualification=1");
  const trigger = page.getByRole("button", { name: "Open long settings" });
  await trigger.scrollIntoViewIfNeeded();
  await trigger.focus();
  await page.keyboard.press("Enter");

  const popover = page.getByRole("dialog", {
    name: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break",
  });
  const actions = [
    popover.getByRole("button", { name: "Reset all settings" }),
    popover.getByRole("button", { name: "Save workspace settings" }),
  ];
  const viewport = popover.locator("[data-slot='popover-viewport']");
  await expect(popover.locator("[data-slot='popover-arrow']")).toBeVisible();
  await expect(popover).toHaveCSS("opacity", "1");
  expect(
    await viewport.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);

  for (const action of actions) {
    await action.evaluate((element) =>
      element.scrollIntoView({ block: "nearest" }),
    );
    const [actionBox, popoverBox] = await Promise.all([
      action.boundingBox(),
      viewport.boundingBox(),
    ]);
    expect(actionBox).not.toBeNull();
    expect(popoverBox).not.toBeNull();
    expect(actionBox!.x).toBeGreaterThanOrEqual(popoverBox!.x);
    expect(actionBox!.x + actionBox!.width).toBeLessThanOrEqual(
      popoverBox!.x + popoverBox!.width,
    );
    expect(actionBox!.y).toBeGreaterThanOrEqual(popoverBox!.y);
    expect(actionBox!.y + actionBox!.height).toBeLessThanOrEqual(
      popoverBox!.y + popoverBox!.height,
    );
  }
});
