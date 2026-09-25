import { expect, test, type Page } from "@playwright/test";

type ControlEvidence = {
  fontSize: string;
  height: number;
  radius: string;
};

async function evidence(page: Page, route: string, selector: string): Promise<ControlEvidence> {
  await page.goto(route);
  const control = page.locator(selector).first();
  await expect(control).toBeVisible();
  return control.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      fontSize: style.fontSize,
      height: element.getBoundingClientRect().height,
      radius: style.borderRadius,
    };
  });
}

for (const [size, height, fontSize] of [
  ["2xs", 24, "12px"],
  ["sm", 36, "14px"],
  ["md", 40, "14px"],
  ["lg", 44, "16px"],
] as const) {
  test(`button-like ${size} controls share geometry and control typography`, async ({ page }) => {
    const peers: ControlEvidence[] = [];
    for (const [route, selector] of [
      ["/button", `.brick-button[data-size='${size}']`],
      ["/select", `.brick-select-trigger[data-size='${size}']`],
      ["/multi-select", `.brick-multi-select-trigger[data-size='${size}']`],
      ["/toggle", `.brick-toggle[data-size='${size}']`],
      ["/toggle-group", `.brick-toggle-group[data-size='${size}'] > .brick-toggle-group-item`],
    ] as const) {
      peers.push(await evidence(page, route, selector));
    }

    for (const peer of peers) {
      expect(peer.height).toBeCloseTo(height, 0);
      expect(peer.fontSize).toBe(fontSize);
    }

    const roundedPeers = peers.slice(0, 5);
    expect(new Set(roundedPeers.map((peer) => peer.radius)).size).toBe(1);
  });
}

test("default editable controls preserve mobile-safe text while sharing outer geometry", async ({ page }) => {
  const button = await evidence(page, "/button", ".brick-button[data-size='lg']");
  const input = await evidence(page, "/input", ".brick-input[data-size='lg']");
  const combobox = await evidence(page, "/combobox", ".brick-combobox-control[data-size='lg']");

  expect(input.height).toBeCloseTo(button.height, 0);
  expect(combobox.height).toBeCloseTo(button.height, 0);
  expect(Number.parseFloat(input.fontSize)).toBeGreaterThanOrEqual(16);

  await page.goto("/combobox");
  await expect(page.locator(".brick-combobox-control[data-size='lg'] .brick-combobox-input").first()).toHaveCSS("font-size", "16px");
});

test("2xs shared minimum permits intrinsic nested-control growth", async ({ page }) => {
  for (const [route, selector, height] of [
    ["input", ".brick-input", 24],
    ["password-toggle-field", ".brick-password-toggle-field", 24],
    ["combobox", ".brick-combobox-control", 26],
    ["number-input", ".brick-number-input", 24],
    ["segment-group", ".brick-segment-group", 24],
  ] as const) {
    await page.goto(`/${route}`);
    const control = page.locator(`${selector}[data-size='2xs']`).first();
    await expect(control).toHaveCSS("min-height", "24px");
    expect((await control.boundingBox())!.height).toBeCloseTo(height, 0);
  }
});

test("line tabs reserve accent for selection geometry", async ({ page }) => {
  await page.goto("/tabs");
  const line = page.locator("#variants").locator(".brick-tabs[data-variant='line']");
  const active = line.locator(".brick-tabs-trigger[data-state='active']");
  const indicator = line.locator(".brick-tabs-indicator");
  const resolved = await line.evaluate((element) => {
    const probe = document.createElement("span");
    element.append(probe);
    probe.style.color = "var(--brick-color-text-primary)";
    const primary = getComputedStyle(probe).color;
    probe.style.color = "var(--brick-color-accent-solid)";
    const accent = getComputedStyle(probe).color;
    probe.remove();
    return { accent, primary };
  });

  await expect(active).toHaveCSS("color", resolved.primary);
  await expect(indicator).toHaveCSS("background-color", resolved.accent);
});
