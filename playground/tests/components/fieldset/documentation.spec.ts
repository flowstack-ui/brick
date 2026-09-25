import { expect, test } from "../../evidence-test.js";
test("sizes keep the description with its legend and separate the field group", async ({
  page,
}) => {
  await page.goto("/fieldset");
  for (const direction of ["ltr", "rtl"]) {
    await page
      .locator("#sizes")
      .evaluate((node, dir) => node.setAttribute("dir", dir), direction);
    const values = await page.locator("#sizes fieldset").evaluateAll((nodes) =>
      nodes.map((node) => {
        const legend = node.querySelector("legend")!.getBoundingClientRect();
        const description = node
          .querySelector(".brick-fieldset-description")!
          .getBoundingClientRect();
        const content = node
          .querySelector(".brick-fieldset-content")!
          .getBoundingClientRect();
        return {
          header: description.top - legend.bottom,
          section: content.top - description.bottom,
        };
      }),
    );
    expect(values).toHaveLength(3);
    values.forEach((value, index) => {
      expect(value.header).toBeCloseTo(8, 2);
      expect(value.section).toBeCloseTo([8, 16, 24][index], 2);
    });
  }
});
test("Content has real spacing and invalidity stays local", async ({
  page,
}) => {
  await page.goto("/fieldset");
  const content = page.locator(".brick-fieldset-content").first();
  const gap = await content.evaluate((el) => {
    const fields = el.querySelectorAll(".brick-field");
    return (
      fields[1].getBoundingClientRect().top -
      fields[0].getBoundingClientRect().bottom
    );
  });
  expect(gap).toBeGreaterThanOrEqual(15);
  await expect(
    page.locator("#errors").getByRole("textbox", { name: "Name" }),
  ).not.toHaveAttribute("aria-invalid", "true");
  await expect(
    page.locator("#errors").getByRole("textbox", { name: "Email" }),
  ).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#props-content")).toBeVisible();
});
