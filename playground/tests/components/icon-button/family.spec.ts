import { expect, test } from "../../evidence-test.js";

for (const appearance of ["light", "dark"]) {
  test(`action family shares paint and geometry in ${appearance}`, async ({ page }) => {
    await page.goto(`/icon-button?appearance=${appearance}`);
    const group = page.locator("#groups");
    const buttons = group.locator(".brick-group button.brick-button");
    await expect(buttons).toHaveCount(2);
    const styles = await buttons.evaluateAll(nodes => nodes.map(n => {
      const s=getComputedStyle(n); const r=n.getBoundingClientRect();
      return {background:s.backgroundColor,border:s.borderColor,color:s.color,height:r.height};
    }));
    expect(styles[1]).toEqual(styles[0]);
    for (const name of ["Working", "Unavailable working", "Custom working"]) {
      const button=page.locator("#loading").getByRole("button",{name,exact:true});
      await expect(button).toHaveAttribute("aria-busy","true");
      const r=await button.boundingBox(); expect(r!.width).toBeCloseTo(r!.height,2);
    }
    const custom=page.locator("#loading").getByRole("button",{name:"Custom working",exact:true});
    const root=await custom.boundingBox(), spinner=await custom.locator(".brick-button__spinner").boundingBox();
    expect(spinner!.x+spinner!.width/2).toBeCloseTo(root!.x+root!.width/2,1);
    expect(spinner!.y+spinner!.height/2).toBeCloseTo(root!.y+root!.height/2,1);
    await page.locator("#variants").screenshot({path:`test-results/icon-family-${appearance}.png`});
    await page.goto(`/close-button?appearance=${appearance}`);
    await expect(page.locator("#variants button.brick-close-button")).toHaveCount(7);
    await expect(page.locator("#naming").getByRole("button",{name:"Fermer",exact:true})).toBeVisible();
  });
}
