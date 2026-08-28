import AxeBuilder from "@axe-core/playwright";import{expect,test}from"@playwright/test";test.beforeEach(async({page})=>page.goto("/password-toggle-field"));
test("Password Toggle Field is labeled and toggles localized visibility",async({page})=>{const area=page.getByTestId("password-toggle-field-overview");const input=area.getByRole("textbox",{name:"Password"});await expect(input).toHaveAttribute("type","password");await area.getByRole("button",{name:"Show password"}).click();await expect(input).toHaveAttribute("type","text");await expect(area.getByRole("button",{name:"Hide password"})).toBeVisible();const localized=page.getByTestId("password-toggle-field-visibility");await localized.getByRole("button",{name:"Mostrar contraseña"}).click();await expect(localized.getByRole("button",{name:"Ocultar contraseña"})).toBeVisible()});
test("Password form reset clears validity, value, and visible type",async({page})=>{const form=page.getByRole("form",{name:"Password form"});const field=form.locator(".brick-field");const input=form.getByLabel("Account password",{exact:false});await expect(form.locator("label")).toHaveCount(1);await expect(form.locator("legend")).toHaveCount(0);await input.fill("correct horse battery staple");await form.getByRole("button",{name:"Show password"}).click();await expect(input).toHaveAttribute("type","text");await form.getByRole("button",{name:"Save password"}).click();await expect(form.locator("output")).toContainText("Submitted type: password");await form.getByRole("button",{name:"Reset"}).click();await expect(input).toHaveValue("");await expect(input).toHaveAttribute("type","password");await form.getByRole("button",{name:"Save password"}).click();await expect(field).toHaveAttribute("data-invalid","");await expect(form.getByText("Enter an account password.")).toBeVisible();await form.getByRole("button",{name:"Reset"}).click();await expect(field).not.toHaveAttribute("data-invalid");await expect(form.getByText("Enter an account password.")).toBeHidden();await expect(form.locator("output")).toContainText("Form reset")});
test("Password state cards top-align their controls at every breakpoint",async({page})=>{const previews=page.getByTestId("password-toggle-field-states").locator(".forms-cell__preview");await expect(previews).toHaveCount(4);expect(await previews.evaluateAll(elements=>elements.map(element=>getComputedStyle(element).alignItems))).toEqual(["start","start","start","start"])});
test("Password visibility artwork is centered in its square action",async({page})=>{const area=page.getByTestId("password-toggle-field-overview");const toggle=area.getByRole("button",{name:"Show password"});const artwork=toggle.locator(".brick-password-toggle-field-artwork");const geometry=await toggle.evaluate((element)=>{const button=element.getBoundingClientRect();const icon=element.querySelector(".brick-password-toggle-field-artwork")!.getBoundingClientRect();return{buttonCenterX:button.left+button.width/2,buttonCenterY:button.top+button.height/2,iconCenterX:icon.left+icon.width/2,iconCenterY:icon.top+icon.height/2}});expect(geometry.iconCenterX).toBeCloseTo(geometry.buttonCenterX,1);expect(geometry.iconCenterY).toBeCloseTo(geometry.buttonCenterY,1);await expect(artwork).toHaveCSS("display","block")});
test("Password field hover and shared focus frame match Input-family feedback", async ({ page }) => {
  const area = page.getByTestId("password-toggle-field-overview");
  const root = area.locator(".brick-password-toggle-field");
  const input = area.getByRole("textbox", { name: "Password" });
  const toggle = area.getByRole("button", { name: "Show password" });
  const state = () => root.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    border: getComputedStyle(element).borderColor,
  }));
  const focusState = () => root.evaluate((element) => ({
    border: getComputedStyle(element).borderColor,
    shadow: getComputedStyle(element).boxShadow,
  }));
  const settledFocusState = () => root.evaluate(async (element) => {
    const read = () => ({
      border: getComputedStyle(element).borderColor,
      shadow: getComputedStyle(element).boxShadow,
    });
    const before = read();
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const after = read();
    return JSON.stringify(before) === JSON.stringify(after) ? after : null;
  });

  const rest = await state();
  await root.hover();
  await expect.poll(state).not.toEqual(rest);
  await input.focus();
  await expect.poll(settledFocusState).not.toBeNull();
  const inputFocus = await focusState();
  expect(inputFocus.shadow).toContain("2px");

  await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();
  await expect.poll(settledFocusState).toEqual(inputFocus);
  await expect(toggle).toHaveCSS("outline-style", "solid");
  await expect(toggle).toHaveCSS("outline-color", inputFocus.border);
});
test("Password recipes, RTL, and accessibility remain complete",async({page})=>{await expect(page.getByTestId("password-toggle-field-variants").locator(".brick-password-toggle-field")).toHaveCount(3);const rtl=page.getByTestId("password-toggle-field-stress").locator("[dir=rtl]");await expect(rtl.getByRole("button",{name:"إظهار كلمة المرور"})).toBeVisible();expect((await new AxeBuilder({page}).analyze()).violations).toEqual([])});
