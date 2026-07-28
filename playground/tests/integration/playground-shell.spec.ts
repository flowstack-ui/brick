import { expect, test } from "@playwright/test";

test("Button route exposes component and scenario navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/button");

  const componentNavigation = page.getByRole("navigation", {
    name: "Component navigation",
  });
  await expect(componentNavigation).toBeVisible();
  const buttonLink = componentNavigation.getByRole("link", {
    exact: true,
    name: "Button",
  });
  await expect(buttonLink).toHaveAttribute("aria-current", "page");
  await expect(
    componentNavigation.getByText("Reference", { exact: true }),
  ).toHaveCount(0);
  await expect(
    componentNavigation.getByRole("link", {
      exact: true,
      name: "Card",
    }),
  ).toHaveAttribute("href", "/card");
  await expect(
    componentNavigation.getByRole("link", {
      exact: true,
      name: "Icon Button",
    }),
  ).toHaveAttribute("href", "/icon-button");
  await expect(
    componentNavigation.getByRole("link", {
      exact: true,
      name: "Checkbox Group",
    }),
  ).toHaveAttribute("href", "/checkbox-group");
  await expect(
    componentNavigation.getByRole("heading", { name: "Integrations" }),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Brick playground" })).toHaveText(
    "Brick playground",
  );

  const scenarioNavigation = page.getByRole("navigation", {
    name: "Button scenarios",
  });
  await expect(page.locator(".evidence-review-header")).toHaveCSS(
    "position",
    "sticky",
  );
  await expect(scenarioNavigation.getByRole("link")).toHaveCount(9);
  await scenarioNavigation.getByRole("link", { name: /links/i }).click();
  await expect(page).toHaveURL(/#scenario-button-composition$/);
  const target = page.locator("#scenario-button-composition");
  await expect(target).toHaveCSS(
    "outline-style",
    "none",
  );
  await expect(target.locator(":scope > .scenario-heading")).toHaveCSS(
    "border-left-style",
    "solid",
  );
});

test("review controls update the document environment", async ({ page }) => {
  await page.goto("/button");

  await expect(page.locator(".review-controls.brick-toolbar")).toHaveCount(1);
  await expect(page.locator(".review-controls .brick-toolbar__toggle-group")).toHaveCount(2);
  await expect(
    page.locator(".review-controls .brick-toolbar__toggle-item"),
  ).toHaveCount(5);
  await expect(page.locator(".review-controls .brick-toolbar__separator")).toHaveCount(1);
  await expect(page.getByRole("toolbar", { name: "Review controls" })).toBeVisible();
  await expect(page.getByRole("group", { name: "Direction" })).toBeAttached();

  await page.getByRole("button", { name: "dark", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "dark", exact: true }),
  ).toHaveAttribute("data-state", "on");
  await expect(page.locator("html")).toHaveAttribute(
    "data-brick-appearance",
    "dark",
  );

  await page.getByRole("button", { name: "RTL", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "RTL", exact: true }),
  ).toHaveAttribute("data-state", "on");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await page.getByRole("button", { name: "system", exact: true }).click();
  await expect(page.locator("html")).not.toHaveAttribute(
    "data-brick-appearance",
  );
});

test("review controls remain content-sized in a stacked header", async ({
  page,
}) => {
  await page.setViewportSize({ width: 700, height: 900 });
  await page.goto("/button");

  const panel = page.locator(".review-controls");
  const content = page.locator(".evidence-page-header");
  const items = panel.locator(".brick-toolbar__toggle-item");
  const [panelBox, contentBox, itemBoxes] = await Promise.all([
    panel.boundingBox(),
    content.boundingBox(),
    items.evaluateAll((elements) => elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { left: box.left, right: box.right, width: box.width };
    })),
  ]);

  expect(panelBox!.width).toBeLessThan(contentBox!.width);
  expect(itemBoxes).toHaveLength(5);
  expect(Math.min(...itemBoxes.map(({ left }) => left))).toBeGreaterThanOrEqual(panelBox!.x);
  expect(Math.max(...itemBoxes.map(({ right }) => right))).toBeLessThanOrEqual(panelBox!.x + panelBox!.width);
  expect(Math.max(...itemBoxes.map(({ width }) => width))).toBeLessThan(panelBox!.width);
});

test("wide scenario navigation aligns, scrolls without overlap, and sticks with its header", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/aspect-ratio");

  const navigation = page.getByRole("navigation", {
    name: "Aspect Ratio scenarios",
  });
  const content = page.locator("[data-playground-content]");
  const [navigationBox, contentBox] = await Promise.all([
    navigation.boundingBox(),
    content.boundingBox(),
  ]);
  expect(navigationBox?.x).toBe(contentBox?.x);
  expect(navigationBox?.width).toBe(contentBox?.width);

  const itemRects = await navigation.locator("li").evaluateAll((items) =>
    items.map((item) => {
      const rect = item.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    }),
  );
  expect(itemRects.every((rect, index) =>
    index === itemRects.length - 1 || rect.right <= itemRects[index + 1]!.left + 0.5,
  )).toBe(true);
  const overflowingLinks = await navigation.locator("a").evaluateAll((links) =>
    links.filter((link) => link.scrollWidth > link.clientWidth).length,
  );
  expect(overflowingLinks).toBe(0);
  const scrollGeometry = await navigation.locator(".scenario-nav-scroll").evaluate((root) => ({
    clientWidth: root.clientWidth,
    scrollWidth: root.scrollWidth,
  }));
  expect(scrollGeometry.scrollWidth).toBeGreaterThanOrEqual(scrollGeometry.clientWidth);

  const appBar = page.getByRole("banner", { name: "Brick playground" });
  const kicker = page.getByText("@flowstack-ui/brick", { exact: true });
  const [initialAppBarBox, initialKickerBox] = await Promise.all([
    appBar.boundingBox(),
    kicker.boundingBox(),
  ]);
  const initialHeaderGap =
    initialKickerBox!.y - (initialAppBarBox!.y + initialAppBarBox!.height);
  await page.evaluate(() => window.scrollTo(0, 1200));
  const [appBarBox, reviewHeaderBox, stickyKickerBox] = await Promise.all([
    appBar.boundingBox(),
    page.locator(".evidence-review-header").boundingBox(),
    kicker.boundingBox(),
  ]);
  expect(appBarBox?.y).toBe(0);
  expect(reviewHeaderBox?.y).toBe(appBarBox?.height);
  expect(stickyKickerBox!.y - reviewHeaderBox!.y).toBe(initialHeaderGap);
});

test("zoom-equivalent layouts progressively release sticky review chrome", async ({
  page,
}) => {
  await page.setViewportSize({ width: 960, height: 540 });
  await page.goto("/button");

  const appBar = page.getByRole("banner", { name: "Brick playground" });
  const reviewHeader = page.locator(".evidence-review-header");
  await expect(appBar).toHaveCSS("position", "sticky");
  await expect(reviewHeader).toHaveCSS("position", "static");

  await page
    .getByRole("navigation", { name: "Button scenarios" })
    .getByRole("link", { name: /links/i })
    .click();
  const target = page.locator("#scenario-button-composition");
  await expect(target).toBeInViewport();
  const [appBarBox, targetBox] = await Promise.all([
    appBar.boundingBox(),
    target.boundingBox(),
  ]);
  expect(targetBox!.y).toBeGreaterThanOrEqual(appBarBox!.height);

  await page.setViewportSize({ width: 480, height: 270 });
  await page.reload();
  await expect(appBar).toHaveCSS("position", "static");
  await expect(reviewHeader).toHaveCSS("position", "static");
  await page.evaluate(() => window.scrollTo(0, 1200));
  const scrolledAppBarBox = await appBar.boundingBox();
  expect(scrolledAppBarBox!.y + scrolledAppBarBox!.height).toBeLessThan(0);
});

test("mobile component navigation opens, closes, and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/button");

  const trigger = page.getByRole("button", {
    name: "Open component navigation",
  });
  await expect(
    page.locator(".brick-app-bar-end").getByRole("button", {
      name: "Open component navigation",
    }),
  ).toBeVisible();
  await trigger.click();

  const drawer = page.getByRole("dialog", { name: "Brick components" });
  await expect(drawer).toBeVisible();
  await page.getByRole("button", {
    name: "Close component navigation",
  }).click();
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("html")).toHaveJSProperty("scrollWidth", 390);
});
