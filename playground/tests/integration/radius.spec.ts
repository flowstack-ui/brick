import { expect, test } from "@playwright/test";

test("core and semantic radius choices reach standalone and attached controls", async ({page}) => {
  await page.goto("/toggle");
  const choices={none:0,"2xs":1,xs:2,sm:4,md:6,lg:8,xl:12,"2xl":16,"3xl":24,"4xl":32,subtle:4,control:8,surface:12,overlay:16,full:9999};
  for(const [radius,pixels] of Object.entries(choices)) {
    const example=page.locator(`[data-radius-example="${radius}"]`);
    await expect(example.getByRole("button",{name:"Save",exact:true})).toHaveCSS("border-top-left-radius",`${pixels}px`);
    const items=example.getByRole("group").getByRole("button");
    await expect(items.first()).toHaveCSS("border-top-left-radius",`${pixels}px`);
    await expect(items.first()).toHaveCSS("border-top-right-radius","0px");
    await expect(items.last()).toHaveCSS("border-top-right-radius",`${pixels}px`);
  }
});

for (const [route,selector,property] of [
  ["input",".brick-input","--brick-input-radius"],
  ["textarea",".brick-textarea","--brick-textarea-radius"],
  ["card",".brick-card","--brick-card-radius"],
  ["surface",".brick-surface","--brick-surface-radius"],
  ["badge",".brick-badge","--brick-badge-radius"],
  ["chip",".brick-chip","--brick-chip-radius"],
  ["toolbar",".brick-toolbar","--brick-toolbar-radius"],
  ["segment-group",".brick-segment-group","--brick-segment-group-radius"],
]) {
  test(`${route} resolves core corners and live semantic scope changes`, async ({page}) => {
    await page.goto(`/${route}`);
    const boundary=page.locator(selector!).first();
    await expect(boundary).toBeVisible();
    for(const [token,pixels] of [["2xs",1],["sm",4],["md",6],["4xl",32]] as const) {
      await boundary.evaluate((element,{property,token})=>(element as HTMLElement).style.setProperty(property!,`var(--brick-radius-core-${token})`),{property,token});
      await expect(boundary).toHaveCSS("border-top-left-radius",`${pixels}px`);
    }
    await boundary.evaluate((element,property)=>{
      const style=(element as HTMLElement).style;
      style.setProperty(property!,"var(--brick-radius-control)");
      style.setProperty("--brick-radius-control","3px");
    },property);
    await expect(boundary).toHaveCSS("border-top-left-radius","3px");
    await boundary.evaluate((element)=>(element as HTMLElement).style.setProperty("--brick-radius-control","0px"));
    await expect(boundary).toHaveCSS("border-top-left-radius","0px");
  });
}

test("attached corners follow logical edges in RTL and small nested radii stay nonnegative",async({page})=>{
  await page.goto("/toggle");
  const example=page.locator('[data-radius-example="xs"]');
  await example.evaluate(element=>element.setAttribute("dir","rtl"));
  const items=example.getByRole("group").getByRole("button");
  await expect(items.first()).toHaveCSS("border-top-right-radius","2px");
  await expect(items.first()).toHaveCSS("border-top-left-radius","0px");
  await expect(items.last()).toHaveCSS("border-top-left-radius","2px");
  await page.goto("/tabs");
  const list=page.locator('.brick-tabs[data-variant="soft"] .brick-tabs-list').first();
  await list.evaluate(element=>(element as HTMLElement).style.setProperty("--brick-tabs-radius","1px"));
  await expect(list.getByRole("tab").first()).toHaveCSS("border-top-left-radius","0px");
});
