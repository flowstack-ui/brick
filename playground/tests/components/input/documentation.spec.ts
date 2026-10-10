import { expect, test } from "../../evidence-test.js";

test.beforeEach(async ({ page }) => { await page.goto("/input"); });

test("recipes have equal boundaries and the attached action stays one line", async ({ page }) => {
  const boxes = await page.locator("#variants .brick-input").evaluateAll(nodes => nodes.map(node => {
    const rect = node.getBoundingClientRect(); return { width: rect.width, height: rect.height };
  }));
  expect(boxes).toHaveLength(7);
  for (const box of boxes) expect(box).toEqual(boxes[0]);
  const button = page.locator("#addons").getByRole("button", { name: "Search", exact: true });
  const input = page.locator("#addons").getByRole("searchbox");
  expect((await button.boundingBox())!.height).toBe((await input.locator("..").boundingBox())!.height);
  await expect(button).toHaveCSS("flex-shrink", "0");
  await page.setViewportSize({ width: 390, height: 844 });
  expect((await button.boundingBox())!.height).toBe((await input.locator("..").boundingBox())!.height);
});

test("counter and native domain selector live inside their input boundary", async ({ page }) => {
  const counter = page.locator("#counter .brick-input");
  await counter.getByRole("textbox").fill("Brick");
  await expect(counter.locator('[data-slot="input-end"]')).toHaveText("5 / 40");
  const extension = page.locator("#select .brick-input").getByRole("combobox", { name: "Domain extension" });
  await extension.focus();
  await extension.selectOption(".org");
  await expect(extension).toHaveValue(".org");
  await expect(extension).toBeFocused();
  const domain = page.locator("#select .brick-input");
  await expect(domain).toHaveCSS("box-shadow", "none");
  await expect(extension).not.toHaveCSS("box-shadow", "none");
  const inset = await domain.evaluate(node => {
    const root = node.getBoundingClientRect();
    const select = node.querySelector("select")!.getBoundingClientRect();
    return root.right - select.right;
  });
  expect(inset).toBeLessThanOrEqual(2);
  await domain.getByRole("textbox").focus();
  await expect(domain).not.toHaveCSS("box-shadow", "none");
});

test("mask preserves empty click position, entry, middle edits and deletion", async ({ page }) => {
  const input = page.getByRole("textbox", { name: "US phone number" });
  await input.hover();
  await input.click();
  const samples = await input.evaluate(async node => {
    const input = node as HTMLInputElement;
    const positions = [input.selectionStart];
    for (let frame = 0; frame < 8; frame++) {
      await new Promise(requestAnimationFrame);
      positions.push(input.selectionStart);
    }
    return positions;
  });
  expect(new Set(samples).size).toBe(1);
  await input.pressSequentially("2125550123");
  await expect(input).toHaveValue("(212) 555-0123");
  await input.evaluate(node => (node as HTMLInputElement).setSelectionRange(6, 9));
  await input.pressSequentially("444");
  await expect(input).toHaveValue("(212) 444-0123");
  await input.press("End");
  await input.press("Backspace");
  await expect(input).toHaveValue("(212) 444-012_");
});

test("payment details form one joined layout and show card artwork", async ({ page }) => {
  const payment = page.locator("#payment");
  const number = payment.getByRole("textbox", { name: "Card number", exact: true });
  const expiry = payment.getByRole("textbox", { name: "Expiry date in format MM YY" });
  const cvc = payment.getByRole("textbox", { name: "CVC", exact: true });
  await expect(number).toHaveAttribute("autocomplete", "cc-number");
  await expect(expiry).toHaveAttribute("autocomplete", "cc-exp");
  await expect(cvc).toHaveAttribute("autocomplete", "cc-csc");
  const top = (await number.locator("..").boundingBox())!;
  const left = (await expiry.locator("..").boundingBox())!;
  const right = (await cvc.locator("..").boundingBox())!;
  expect(Math.abs(top.x - left.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(top.y + top.height - left.y)).toBeLessThanOrEqual(1);
  expect(Math.abs(left.y - right.y)).toBeLessThanOrEqual(1);
  expect(Math.abs(top.width - (left.width + right.width - 1))).toBeLessThanOrEqual(1);
  await number.pressSequentially("4242424242424242");
  await expect(number).toHaveValue("4242 4242 4242 4242");
  await expect(number.locator("..").locator("svg")).toBeVisible();
  const standalone = page.locator("#card-number").getByRole("textbox");
  await standalone.pressSequentially("4242424242424242");
  await expect(standalone).toHaveValue("4242 4242 4242 4242");
  await expect(standalone.locator("..").locator("svg")).toBeVisible();
});
