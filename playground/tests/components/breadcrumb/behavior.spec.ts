import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/breadcrumb?qualification=1");
});

test("default trail preserves landmark, hierarchy, links, current page, and hidden separators", async ({
  page,
}) => {
  const overview = page.getByTestId("breadcrumb-overview");
  const root = overview.getByRole("navigation", { name: "Overview path" });
  await expect(root).toHaveAttribute("data-size", "md");
  await expect(root).toHaveAttribute("data-variant", "plain");
  await expect(root.locator("ol")).toHaveCount(1);
  await expect(root.locator(".brick-breadcrumb-item")).toHaveCount(3);
  await expect(root.getByRole("link")).toHaveCount(2);
  await expect(root.locator("[aria-current='page']")).toHaveText(
    "Quarterly report",
  );
  for (const separator of await root
    .locator(".brick-breadcrumb-separator")
    .all()) {
    await expect(separator).toHaveAttribute("role", "presentation");
    await expect(separator).toHaveAttribute("aria-hidden", "true");
  }
});

test("variants and sizes change only their adopted visual dimensions", async ({
  page,
}) => {
  const plain = page
    .getByTestId("breadcrumb-variants")
    .locator(".forms-cell")
    .nth(0)
    .getByRole("link")
    .first();
  const underline = page
    .getByTestId("breadcrumb-variants")
    .locator(".forms-cell")
    .nth(1)
    .getByRole("link")
    .first();
  await expect(plain).toHaveCSS("text-decoration-line", "none");
  await expect(underline).toHaveCSS("text-decoration-line", "underline");
  const fontSizes: number[] = [];
  for (const size of ["sm", "md", "lg"]) {
    const root = page
      .getByTestId("breadcrumb-sizes")
      .locator(`.brick-breadcrumb[data-size='${size}']`);
    fontSizes.push(
      await root.evaluate((node) =>
        Number.parseFloat(getComputedStyle(node).fontSize),
      ),
    );
    const metrics = {
      sm: ["12px", "16px", "4px", 24],
      md: ["14px", "20px", "6px", 32],
      lg: ["16px", "24px", "8px", 44],
    }[size]!;
    await expect(root).toHaveCSS("font-size", metrics[0] as string);
    await expect(root).toHaveCSS("line-height", metrics[1] as string);
    await expect(root.locator("ol")).toHaveCSS("gap", metrics[2] as string);
    const coarse = await page.evaluate(
      () => matchMedia("(any-pointer: coarse)").matches,
    );
    const target = coarse ? 44 : (metrics[3] as number);
    const bounds = (await root.getByRole("link").first().boundingBox())!;
    expect(bounds.height).toBeGreaterThanOrEqual(target);
    expect(bounds.width).toBeGreaterThanOrEqual(target);
  }
  expect(fontSizes[0]).toBeLessThan(fontSizes[1]);
  expect(fontSizes[1]).toBeLessThan(fontSizes[2]);
});

test("interactive Ellipsis reveals application-owned ancestors and keeps native focus", async ({
  page,
}) => {
  const collapse = page.getByTestId("breadcrumb-collapse");
  const trigger = collapse.getByRole("button", {
    name: "Show two collapsed pages",
  });
  await trigger.focus();
  await expect(trigger).toBeFocused();
  expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(32);
  await trigger.press("Enter");
  await expect(collapse.getByRole("link", { name: "Library" })).toBeVisible();
  await expect(collapse.getByRole("link", { name: "Reports" })).toBeVisible();
  await expect(collapse.getByText("Two ancestor pages shown")).toBeVisible();
  await expect(collapse.getByRole("link", { name: "Library" })).toBeFocused();
});

test("native attributes, composition output, customization, wrapping, and RTL remain correct", async ({
  page,
}) => {
  const external = page
    .getByTestId("breadcrumb-native")
    .getByRole("link", { name: "Reference (new tab)" });
  await expect(external).toHaveAttribute("target", "_blank");
  await expect(external).toHaveAttribute("rel", "noopener");
  await expect(
    page
      .getByTestId("breadcrumb-native")
      .getByRole("link", { name: "Download report" }),
  ).toHaveAttribute("download", "report.csv");
  await expect(page.locator("[data-adapter='render-root']")).toHaveAttribute(
    "aria-label",
    "Rendered path",
  );
  await expect(page.locator("[data-adapter='render-page']")).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    page.locator("[data-adapter='composed-separator']"),
  ).toHaveAttribute("aria-hidden", "true");
  const custom = page.getByRole("navigation", { name: "Customized path" });
  const accent = await custom.evaluate((node) =>
    getComputedStyle(node).getPropertyValue("--brick-color-accent-text").trim(),
  );
  const resolved = await custom.evaluate((node, color) => {
    const probe = document.createElement("span");
    probe.style.color = color;
    node.append(probe);
    const value = getComputedStyle(probe).color;
    probe.remove();
    return value;
  }, accent);
  await expect(custom.getByRole("link").first()).toHaveCSS("color", resolved);
  await page.setViewportSize({ width: 390, height: 844 });
  const stress = page.getByTestId("breadcrumb-stress");
  expect((await stress.boundingBox())!.width).toBeLessThanOrEqual(390);
  const rtl = stress.locator("[dir='rtl'] .brick-breadcrumb");
  await expect(rtl).toHaveCSS("direction", "rtl");
  await expect(rtl.locator(".brick-icon").first()).toHaveAttribute(
    "data-directional",
    "",
  );
});

test("Breadcrumb page has no automatically detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("documentation examples, part navigation and owned icon spacing are complete", async ({
  page,
}) => {
  await page.goto("/breadcrumb");
  for (const part of [
    "Root",
    "List",
    "Item",
    "Link",
    "Page",
    "Separator",
    "Ellipsis",
    "Trigger",
  ]) {
    await expect(
      page
        .locator(`#props-${part.toLowerCase()}`)
        .getByRole("heading", { name: part, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("table", { name: `Breadcrumb.${part} props` }),
    ).toBeVisible();
  }
  const iconLinks = page.locator("#icons .brick-breadcrumb-link");
  await expect(iconLinks).toHaveCount(2);
  for (const link of await iconLinks.all()) {
    await expect(link).toHaveCSS("gap", "8px");
    await expect(link.locator(".brick-icon")).toHaveCSS(
      "margin-inline-end",
      "0px",
    );
  }
  const current = page.locator("#current .brick-breadcrumb-page");
  await expect(current).toHaveAttribute("href", "#current");
  await current.focus();
  await expect(current).toHaveCSS("outline-style", "solid");
  await expect(current).toHaveCSS("text-decoration-line", "underline");
  await expect(page.locator("#closed .brick-breadcrumb-item")).toHaveCount(3);
  await expect(page.locator("#closed .brick-breadcrumb-page")).toHaveCount(1);
});

test("ancestor and collapsed menus use native destinations and restore focus", async ({
  page,
}) => {
  await page.goto("/breadcrumb");
  for (const [section, name, destination] of [
    ["menu", "Components", "Overview"],
    ["collapsedmenu", "Show hidden ancestors", "Workspace"],
  ]) {
    const trigger = page
      .locator(`#${section}`)
      .getByRole("button", { name, exact: true });
    await expect(trigger).toHaveAttribute("type", "button");
    await trigger.focus();
    await trigger.press("Enter");
    const menu = page.getByRole("menu", { name, exact: true });
    await expect(menu).toBeVisible();
    const first = menu.getByRole("menuitem", {
      name: destination,
      exact: true,
    });
    await expect(first).toHaveAttribute("href", /#/);
    await expect(first).toHaveCSS("text-decoration-line", "none");
    await expect(first).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.press("Space");
    await expect(menu).toBeVisible();
    const href = await first.getAttribute("href");
    await first.click();
    await expect(menu).toBeHidden();
    expect(new URL(page.url()).hash).toBe(href);
  }
});

test("size and variant breakpoints retain local overrides and compact geometry", async ({
  page,
}) => {
  await page.goto("/breadcrumb");
  const responsive = page.locator("#responsive .brick-breadcrumb");
  for (const [width, size, decoration] of [
    [390, "12px", "underline"],
    [900, "16px", "none"],
    [1320, "14px", "none"],
  ] as const) {
    await page.setViewportSize({ width, height: 900 });
    await expect(responsive).toHaveCSS("font-size", size);
    await expect(responsive.getByRole("link").first()).toHaveCSS(
      "text-decoration-line",
      decoration,
    );
  }
  await responsive.evaluate((node) => {
    (node as HTMLElement).style.setProperty(
      "--brick-breadcrumb-font-size",
      "19px",
    );
    (node as HTMLElement).style.setProperty(
      "--brick-breadcrumb-list-gap",
      "11px",
    );
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(responsive).toHaveCSS("font-size", "19px");
  await expect(responsive.locator("ol")).toHaveCSS("gap", "11px");
  for (const root of await page.locator(".brick-breadcrumb").all()) {
    expect(
      await root.evaluate((node) => node.scrollWidth <= node.clientWidth + 1),
    ).toBe(true);
  }
});

test("plain and subtle interaction, default RTL icons, and router clicks", async ({
  page,
}) => {
  await page.goto("/breadcrumb");
  const variants = page.locator("#variants .brick-breadcrumb");
  const plain = variants.nth(0).getByRole("link").first();
  const subtle = variants.nth(2).getByRole("link").first();
  await plain.hover();
  await expect(plain).toHaveCSS("text-decoration-line", "none");
  await subtle.hover();
  await expect(subtle).toHaveCSS("text-decoration-line", "underline");
  const icons = page.locator(
    "#direction .brick-breadcrumb .brick-breadcrumb-separator .brick-icon",
  );
  // Icon uses the individual scale property so authored transforms compose.
  await expect(icons.nth(0)).toHaveCSS("scale", "-1 1");
  await expect(icons.nth(2)).toHaveCSS("scale", "1");
  await page
    .locator("#routing")
    .getByRole("link", { name: "Docs", exact: true })
    .click();
  await expect(
    page
      .locator("#routing")
      .getByText("Selected route: /docs", { exact: true }),
  ).toBeVisible();
});

test("semantic tones and linked focus survive dark appearance and forced colors", async ({
  page,
}) => {
  await page.goto("/breadcrumb?appearance=dark");
  const darkResults = await new AxeBuilder({ page })
    .include('[data-component-page="breadcrumb"]')
    .analyze();
  expect(darkResults.violations).toEqual([]);
  const tones = page.locator("#tones .brick-breadcrumb");
  await expect(tones).toHaveCount(3);
  const accent = tones.nth(1).getByRole("link").first();
  if (!test.info().project.name.startsWith("mobile")) {
    const rest = await accent.evaluate((element) => getComputedStyle(element).color);
    await accent.hover();
    await expect(accent).not.toHaveCSS("color", rest);
    const inherited = tones.nth(2).getByRole("link").first();
    const inheritedColor = await inherited.evaluate((element) => getComputedStyle(element).color);
    await inherited.hover();
    await expect(inherited).toHaveCSS("color", inheritedColor);
    await expect(inherited).toHaveCSS("text-decoration-line", "underline");
    await page.mouse.move(0, 0);
    await expect(inherited).toHaveCSS("text-decoration-line", "none");
  }
  await accent.focus();
  await expect(accent).toHaveCSS("outline-style", "solid");
  await page.emulateMedia({ forcedColors: "active" });
  await page.reload();
  const current = page.locator("#current .brick-breadcrumb-page");
  await current.focus();
  await expect(current).toHaveCSS("outline-style", "solid");
  await expect(current).toHaveCSS("text-decoration-line", "underline");
  const results = await new AxeBuilder({ page })
    .include(".brick-breadcrumb")
    .analyze();
  expect(results.violations).toEqual([]);
});
