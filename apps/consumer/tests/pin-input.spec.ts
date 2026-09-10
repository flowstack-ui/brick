import { expect, test } from "@playwright/test";
test("verification uses explicit OTP and preserves deleted positions",async({page})=>{
  await page.goto("/");
  const group=page.getByRole("group",{name:"Verification code",exact:true});
  const cells=group.locator(".brick-pin-input-input");
  await expect(cells.first()).toHaveAttribute("autocomplete","one-time-code");
  await cells.first().pressSequentially("012345");
  await cells.nth(2).press("Delete");await expect(cells.nth(3)).toHaveValue("3");
  await expect(cells.nth(2)).toHaveValue("");
  expect(await cells.first().evaluate(el=>(el as HTMLInputElement).validity.valid)).toBe(false);
  await cells.nth(2).pressSequentially("2");
  expect(await cells.first().evaluate(el=>(el as HTMLInputElement).validity.valid)).toBe(true);
  await expect(page.locator('input[type="hidden"][name="verificationCode"]')).toHaveValue("012345");
});
