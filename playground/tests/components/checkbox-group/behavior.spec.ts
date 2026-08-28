import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

async function controlSize(checkbox: Locator) {
  return checkbox.locator(".brick-checkbox-control").evaluate((control) => {
    const rect = control.getBoundingClientRect();
    return { height: rect.height, width: rect.width };
  });
}

test.beforeEach(async ({ page }) => {
  await page.goto("/checkbox-group");
});

test("CheckboxGroup overview preserves the default medium vertical unchecked state", async ({ page }) => {
  const overview = page.getByTestId("checkbox-group-overview");
  const group = overview.getByRole("group", { name: "Delivery methods" });
  await expect(group).toHaveAttribute("data-size", "md");
  await expect(group).toHaveAttribute("data-orientation", "vertical");
  const items = group.getByRole("checkbox");
  await expect(items).toHaveCount(2);
  for (const item of await items.all()) {
    await expect(item).toHaveAttribute("aria-checked", "false");
    await expect(item).not.toHaveAttribute("data-disabled");
  }
  await items.first().click();
  await expect(items.first()).toHaveAttribute("aria-checked", "true");
  await expect(items.last()).toHaveAttribute("aria-checked", "false");
});

test("CheckboxGroup keeps item rows clickable while control feedback stays on each square", async ({ page }) => {
  const item = page
    .getByTestId("checkbox-group-overview")
    .getByRole("checkbox", { name: "Email reports" });
  const control = item.locator(".brick-checkbox-control");

  await item.hover();
  await expect(item).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await item.focus();
  await expect(item).toHaveCSS("outline-style", "none");
  await expect(control).toHaveCSS("outline-style", "solid");
  expect((await item.boundingBox())!.height).toBeGreaterThanOrEqual(44);
});

test("CheckboxGroup ownership examples begin identically and retain their ownership behavior", async ({ page }) => {
  const ownership = page.getByTestId("checkbox-group-ownership");
  const groups = ownership.getByRole("group");
  await expect(groups).toHaveCount(2);
  for (const group of await groups.all()) {
    await expect(group).toHaveAttribute("data-size", "md");
    await expect(group).toHaveAttribute("data-orientation", "vertical");
    await expect(
      group.getByRole("checkbox", { name: "Email reports" }),
    ).toHaveAttribute("aria-checked", "true");
    await expect(
      group.getByRole("checkbox", { name: "Push notifications" }),
    ).toHaveAttribute("aria-checked", "false");
  }

  await groups
    .first()
    .getByRole("checkbox", { name: "Push notifications" })
    .click();
  await expect(
    groups.first().getByRole("checkbox", { name: "Push notifications" }),
  ).toHaveAttribute("aria-checked", "true");
  await groups
    .last()
    .getByRole("checkbox", { name: "Email reports" })
    .click();
  await expect(
    groups.last().getByRole("checkbox", { name: "Email reports" }),
  ).toHaveAttribute("aria-checked", "false");
});

test("CheckboxGroup Parent exposes and updates none, some, and all aggregation", async ({ page }) => {
  const matrix = page.getByTestId("checkbox-group-parent");
  const parents = matrix.getByRole("checkbox", {
    name: "All delivery methods",
  });
  await expect(parents).toHaveCount(3);
  await expect(parents.nth(0)).toHaveAttribute("aria-checked", "false");
  await expect(parents.nth(1)).toHaveAttribute("aria-checked", "mixed");
  await expect(parents.nth(2)).toHaveAttribute("aria-checked", "true");

  const mixedGroup = page
    .getByRole("group", { name: "Mixed aggregate" });
  const interactive = mixedGroup
    .getByRole("checkbox", { name: "All delivery methods" });
  await expect(interactive).toHaveAttribute("aria-checked", "mixed");
  await interactive.click();
  await expect(
    mixedGroup.getByRole("checkbox", { name: "Email reports" }),
  ).toHaveAttribute("aria-checked", "true");
  await expect(
    mixedGroup.getByRole("checkbox", { name: "Push notifications" }),
  ).toHaveAttribute("aria-checked", "true");
  await expect(interactive).toHaveAttribute("aria-checked", "true");
});

test("CheckboxGroup size and orientation comparisons change only their named dimension", async ({ page }) => {
  const widths: number[] = [];
  for (const size of ["sm", "md", "lg"]) {
    const group = page
      .getByTestId("checkbox-group-sizes")
      .locator(`.brick-checkbox-group[data-size="${size}"]`);
    await expect(group).toHaveAttribute("data-orientation", "vertical");
    const email = group.getByRole("checkbox", { name: "Email reports" });
    await expect(email).toHaveAttribute("aria-checked", "true");
    widths.push((await controlSize(email)).width);
  }
  expect(widths[0]).toBeLessThan(widths[1]);
  expect(widths[1]).toBeLessThan(widths[2]);

  const orientations = page.getByTestId("checkbox-group-orientation");
  const groups = orientations.getByRole("group");
  await expect(groups).toHaveCount(2);
  await expect(groups.nth(0)).toHaveAttribute("data-orientation", "vertical");
  await expect(groups.nth(1)).toHaveAttribute("data-orientation", "horizontal");
  for (const group of await groups.all()) {
    await expect(group).toHaveAttribute("data-size", "md");
    await expect(
      group.getByRole("checkbox", { name: "Email reports" }),
    ).toHaveAttribute("aria-checked", "true");
  }
});

test("CheckboxGroup structured content and state scopes preserve default geometry", async ({ page }) => {
  const detailed = page
    .getByRole("group", { name: "Detailed delivery methods" })
    .getByRole("checkbox", { name: "Email report", exact: true });
  await expect(detailed).toHaveAttribute("aria-describedby", /description/);
  await expect(detailed).toHaveAttribute("aria-checked", "false");

  const normal = page
    .getByTestId("checkbox-group-overview")
    .getByRole("checkbox", { name: "Email reports" });
  const disabledGroup = page.getByRole("group", {
    name: "Disabled delivery methods",
  });
  const disabledItems = disabledGroup.getByRole("checkbox");
  const normalControl = await controlSize(normal);
  const normalHeight = (await normal.boundingBox())!.height;
  for (const item of await disabledItems.all()) {
    await expect(item).toBeDisabled();
    await expect(item).toHaveAttribute("aria-checked", "false");
    expect(await controlSize(item)).toEqual(normalControl);
    expect((await item.boundingBox())!.height).toBeCloseTo(normalHeight, 2);
  }

  const invalidGroup = page.getByRole("group", {
    name: "Invalid delivery methods",
  });
  await expect(invalidGroup).toHaveAttribute("data-invalid", "");
  const inheritedInvalid = invalidGroup.getByRole("checkbox", {
    name: "Email reports",
  });
  await expect(inheritedInvalid).toHaveAttribute("data-invalid", "");
  await expect(invalidGroup).toHaveCSS("border-left-style", "solid");
  await expect(inheritedInvalid).toHaveCSS("border-left-style", "none");
  const individual = page.getByRole("group", {
    name: "Individual delivery validation",
  });
  const individualInvalid = individual.getByRole("checkbox", {
    name: "Email reports",
  });
  await expect(individualInvalid).toHaveAttribute("data-invalid", "");
  await expect(individualInvalid).toHaveCSS("border-left-style", "solid");
  await expect(
    individual.getByRole("checkbox", { name: "Push notifications" }),
  ).not.toHaveAttribute("data-invalid");
});

test("CheckboxGroup participates in Fieldset, repeated FormData, reset, and external ownership", async ({ page }) => {
  const form = page.getByRole("form", { name: "Publishing preferences" });
  await form.getByRole("button", { name: "Save preferences" }).click();
  const firstItem = form.getByRole("checkbox", { name: "Email reports" });
  await expect(firstItem).toBeFocused();

  await firstItem.click();
  await form.getByRole("checkbox", { name: "Push notifications" }).click();
  const externalGroup = page.getByRole("group", {
    name: "Externally owned delivery methods",
  });
  await externalGroup
    .getByRole("checkbox", { name: "Email reports" })
    .click();
  expect(
    await form.evaluate((element) => ({
      delivery: new FormData(element as HTMLFormElement).getAll("delivery"),
      external: new FormData(element as HTMLFormElement).getAll(
        "external-delivery",
      ),
    })),
  ).toEqual({ delivery: ["email", "push"], external: ["email"] });

  await form.getByRole("button", { name: "Save preferences" }).click();
  await expect(form.locator("output")).toHaveText("Submitted: email, push");
  await form.getByRole("button", { name: "Reset" }).click();
  await expect(firstItem).toHaveAttribute("aria-checked", "false");
  await expect(
    externalGroup.getByRole("checkbox", { name: "Email reports" }),
  ).toHaveAttribute("aria-checked", "false");
});

test("CheckboxGroup composition and appearance examples preserve identical defaults", async ({ page }) => {
  for (const adapter of ["rendered", "composed"]) {
    const group = page.locator(`[data-adapter="${adapter}-group"]`);
    await expect(group).toHaveJSProperty("tagName", "SECTION");
    await expect(group).toHaveAttribute("role", "group");
    await expect(group).toHaveAttribute("data-size", "md");
    await expect(group).toHaveAttribute("data-orientation", "vertical");
    await expect(
      group.getByRole("checkbox", { name: "All delivery methods" }),
    ).toHaveAttribute("aria-checked", "false");
    const item = group.getByRole("checkbox", {
      name: "Email reports",
      exact: true,
    });
    await expect(item).toHaveAttribute("aria-checked", "false");
    await expect(item).toHaveAttribute("aria-describedby", /description/);
    await expect(item.locator(".brick-checkbox-control")).toHaveCount(1);
  }
  const outputs = page
    .getByTestId("checkbox-group-composition")
    .locator("[data-rendered-output]");
  await expect(outputs).toHaveCount(2);
  await expect(outputs.first()).toContainText('data-adapter="rendered-group"');
  await expect(outputs.last()).toContainText('data-adapter="composed-group"');

  const appearances = page
    .getByTestId("checkbox-group-appearance")
    .getByRole("group");
  await expect(appearances).toHaveCount(2);
  for (const group of await appearances.all()) {
    await expect(group).toHaveAttribute("data-size", "md");
    await expect(group).toHaveAttribute("data-orientation", "vertical");
    for (const item of await group.getByRole("checkbox").all()) {
      await expect(item).toHaveAttribute("aria-checked", "false");
    }
  }
});

test("CheckboxGroup customization, anchor navigation, accessibility, and narrow containment remain stable", async ({ page }) => {
  const custom = page.getByRole("group", {
    name: "Customized delivery methods",
  });
  await expect(custom).toHaveCSS("gap", "20px");
  await expect(
    custom.getByRole("checkbox", { name: "Email reports" }),
  ).toHaveCSS("border-radius", "8px");
  await expect(
    custom
      .getByRole("checkbox", { name: "Email reports" })
      .locator(".brick-checkbox-control"),
  ).toHaveCSS("background-color", "rgb(24, 121, 78)");

  await page.getByRole("link", { name: "08 Compose" }).click();
  await expect(page).toHaveURL(/#scenario-checkbox-group-composition$/);
  const target = page.locator("#scenario-checkbox-group-composition");
  await expect(target).toHaveCSS("outline-style", "none");
  await expect(target.locator(":scope > .scenario-heading")).toHaveCSS(
    "border-left-style",
    "solid",
  );

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.locator("html").evaluate((node) => node.scrollWidth),
  ).toBeLessThanOrEqual(390);
});
