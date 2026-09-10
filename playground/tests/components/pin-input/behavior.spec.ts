import AxeBuilder from "@axe-core/playwright";import{expect,test}from"@playwright/test";test.beforeEach(async({page})=>page.goto("/pin-input"));
test("PIN and explicit OTP, native mask and atomic formatted paste",async({page})=>{
  const general=page.getByRole("group",{name:"General PIN",exact:true});
  await expect(general.locator("input").first()).toHaveAttribute("autocomplete","off");
  const formatted=page.getByRole("group",{name:"Formatted OTP",exact:true});
  const input=formatted.locator("input").first();
  await expect(input).toHaveAttribute("autocomplete","one-time-code");
  const paste=async(value:string)=>input.evaluate((el,value)=>{const event=new Event("paste",{bubbles:true,cancelable:true});Object.defineProperty(event,"clipboardData",{value:{getData:()=>value}});el.dispatchEvent(event);},value);
  await paste("12x4");await expect(page.getByText("Rejected: 12x4")).toBeVisible();await expect(input).toHaveValue("");
  await paste("01-23");await expect(formatted.locator("input").nth(3)).toHaveValue("3");
  await expect(page.locator("#otp-mask-control")).toHaveAttribute("type","password");
});
test("controller preserves sparse positions, direct labels and responsive metadata",async({page})=>{
  const section=page.getByTestId("pin-input-controller");const inputs=section.locator(".brick-pin-input-input");
  await expect(inputs.nth(1)).toHaveValue("");await expect(inputs.nth(2)).toHaveValue("3");
  await section.getByRole("button",{name:"Fill second"}).click();await expect(inputs.nth(1)).toHaveValue("2");
  await inputs.nth(1).press("Delete");await expect(inputs.nth(2)).toHaveValue("3");
  await expect(section.getByRole("group",{name:"Access PIN"})).toBeVisible();
  await section.getByRole("button",{name:"Toggle length"}).click();await expect(inputs).toHaveCount(6);
  await section.getByRole("button",{name:"Clear PIN"}).click();for(let i=0;i<6;i++)await expect(inputs.nth(i)).toHaveValue("");
});
test("completion blurs and external autosubmit receives final code",async({page})=>{
  const blur=page.getByRole("group",{name:"Blur on completion",exact:true}).locator("input");
  await blur.first().pressSequentially("1234");await expect(blur.last()).not.toBeFocused();await expect(page.getByText("Completed: 1234")).toBeVisible();
  const automatic=page.getByRole("group",{name:"Automatic OTP",exact:true}).locator("input");
  await automatic.first().pressSequentially("0123");await expect(page.getByText("Automatic: 0123",{exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Reset external PIN"}).click();await expect(automatic.first()).toHaveValue("");
});
test("seven border-box sizes align with ordinary controls and no viewport overflow",async({page})=>{
  const data=await page.getByTestId("pin-input-sizes").locator(".brick-pin-input").evaluateAll(roots=>roots.slice(0,7).map(root=>{
    const cell=root.querySelector("input")!;const comparison=root.parentElement!.querySelector(".brick-input")!;
    const rect=cell.getBoundingClientRect();return {size:root.getAttribute("data-size"),width:rect.width,height:rect.height,adjacent:comparison.getBoundingClientRect().height,font:parseFloat(getComputedStyle(cell).fontSize)};
  }));
  expect(data).toHaveLength(7);for(const value of data){expect(Math.abs(value.width-value.height)).toBeLessThan(0.1);expect(Math.abs(value.height-value.adjacent)).toBeLessThan(0.1);}
  expect(data[data.length-1].font).toBeGreaterThan(data[0].font);
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
  await page.emulateMedia({forcedColors:"active"});const input=page.getByTestId("pin-input-overview").locator("input").first();await input.focus();expect(await input.evaluate(el=>getComputedStyle(el).outlineStyle)).toBe("solid");
});
test("composition drafts and logical RTL navigation remain stable",async({page})=>{
  const alphabetic=page.getByRole("group",{name:"Letters",exact:true}).locator("input");
  await alphabetic.first().focus();await alphabetic.first().dispatchEvent("compositionstart");
  await alphabetic.first().evaluate(el=>{(el as HTMLInputElement).value="a";el.dispatchEvent(new InputEvent("input",{bubbles:true,isComposing:true,data:"a"}));});
  await expect(alphabetic.first()).toBeFocused();await alphabetic.first().dispatchEvent("compositionend",{data:"a"});
  await expect(alphabetic.first()).toHaveValue("a");await expect(alphabetic.nth(1)).toBeFocused();
  const rtl=page.getByTestId("pin-input-stress").locator("[dir=rtl] .brick-pin-input-input");await rtl.first().focus();await rtl.first().press("ArrowLeft");await expect(rtl.nth(1)).toBeFocused();
});
test("Pin Input filters, advances, and localizes",async({page})=>{const overview=page.getByTestId("pin-input-overview");const cells=overview.getByRole("textbox");await expect(cells).toHaveCount(6);await cells.first().pressSequentially("12x3456");await expect(cells.nth(0)).toHaveValue("1");await expect(cells.nth(5)).toHaveValue("6");const localized=page.getByTestId("pin-input-behavior").getByRole("textbox",{name:"Dígito 1 de 4"});await expect(localized).toBeVisible()});
test("Pin Input owns one required validity target and submits and resets one value",async({page})=>{const form=page.getByRole("form",{name:"Verification form"});const field=form.locator(".brick-field");const cells=form.getByRole("textbox");await expect(form.locator("label")).toHaveCount(1);await expect(form.locator("legend")).toHaveCount(0);await cells.first().pressSequentially("1234");await form.getByRole("button",{name:"Verify"}).click();await expect(form.locator("output")).toContainText("Submitted: 1234");await form.getByRole("button",{name:"Reset"}).click();for(let index=0;index<4;index+=1)await expect(cells.nth(index)).toHaveValue("");await form.getByRole("button",{name:"Verify"}).click();await expect(cells.first()).toBeFocused();await expect(cells.first()).toHaveAttribute("required","");await expect(cells.nth(1)).not.toHaveAttribute("required");await expect(field).toHaveAttribute("data-invalid","");await expect(form.getByText("Enter the security code.")).toBeVisible();await form.getByRole("button",{name:"Reset"}).click();await expect(field).not.toHaveAttribute("data-invalid");await expect(form.getByText("Enter the security code.")).toBeHidden();await expect(form.locator("output")).toContainText("Form reset")});
test("Pin Input layouts, RTL, and accessibility remain complete",async({page})=>{await expect(page.getByTestId("pin-input-layouts").locator("[data-layout=attached]")).toHaveCount(2);const stress=page.getByTestId("pin-input-stress");await expect(stress.locator("[dir=rtl] input")).toHaveCount(4);expect((await new AxeBuilder({page}).analyze()).violations).toEqual([])});
