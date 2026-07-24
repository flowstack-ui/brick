import { expect, test, type Locator } from "@playwright/test";

async function togglePresentation(toggle: Locator) {
  return toggle.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return {
      background: style.backgroundColor,
      borderColor: style.borderColor,
      color: style.color,
      fontSize: style.fontSize,
      height: rect.height,
      radius: style.borderRadius,
    };
  });
}

test("Toggle and ToggleGroup Items share the same default recipe and selected paint", async ({
  page,
}) => {
  await page.goto("/toggle");
  const standaloneStates = page
    .getByTestId("toggle-recipes")
    .locator(".toggle-evidence-group")
    .filter({ hasText: "Soft states" })
    .getByRole("button", { name: "Preview" });
  const standaloneOff = await togglePresentation(standaloneStates.nth(0));
  const standaloneOn = await togglePresentation(standaloneStates.nth(1));

  await page.goto("/toggle-group");
  const group = page.getByRole("group", { name: "soft project view" });
  const groupedOn = await togglePresentation(
    group.getByRole("button", { name: "Cards" }),
  );
  const groupedOff = await togglePresentation(
    group.getByRole("button", { name: "List" }),
  );

  expect(groupedOff).toEqual(standaloneOff);
  expect(groupedOn).toEqual(standaloneOn);
  await expect(group).toHaveAttribute("data-variant", "soft");
  await expect(group).toHaveAttribute("data-size", "md");
  await expect(group).toHaveAttribute("data-shape", "rounded");
});
