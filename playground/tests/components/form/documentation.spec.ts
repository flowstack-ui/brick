import { expect, test } from "../../evidence-test.js";
test("reset defeats obsolete asynchronous completion", async ({page})=>{
 await page.goto("/form"); const form=page.locator("#async form");
 await form.getByRole("button",{name:"Save profile"}).click();
 await expect(form).toHaveAttribute("data-submitting","");
 await form.getByRole("button",{name:"Reset",exact:true}).click();
 await expect(form).not.toHaveAttribute("data-submitting");
 await page.waitForTimeout(1200);
 await expect(form).not.toHaveAttribute("data-submitted");
});
