import { expect,test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test.beforeEach(async({page})=>{await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/overlay-manager");});
test("typed results and visual exits settle separately",async({page})=>{
  await page.getByRole("button",{name:"Open result",exact:true}).click();
  const dialog=page.getByRole("dialog",{name:"Workspace result",exact:true});await expect(dialog).toBeVisible();
  const scan=await new AxeBuilder({page}).include('.brick-dialog-content').analyze();
  expect(scan.violations.filter(v=>v.impact==='serious'||v.impact==='critical')).toEqual([]);
  await dialog.getByRole("button",{name:"Accept",exact:true}).click();
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("status").filter({hasText:"Result: accepted. Exit complete."})).toBeVisible();
});
test("live update preserves input identity",async({page})=>{
  await page.getByRole("button",{name:"Open update",exact:true}).click();
  await page.getByLabel("Workspace draft",{exact:true}).fill("Keep this draft");
  await page.getByRole("button",{name:"Update title",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Updated workspace",exact:true})).toBeVisible();
  await expect(page.getByLabel("Workspace draft",{exact:true})).toHaveValue("Keep this draft");
});
test("drawer and floating panel use their real primitives",async({page})=>{
  await page.getByRole("button",{name:"Open drawer",exact:true}).click();
  await expect(page.locator(".brick-drawer-content")).toBeVisible();
  await page.getByRole("button",{name:"Cancel",exact:true}).click();
  await expect(page.locator(".brick-drawer-content")).toBeHidden();
  await page.getByRole("button",{name:"Open panel",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Workspace panel",exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Accept",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Workspace panel",exact:true})).toBeHidden();
});
test("host disposal settles pending results",async({page})=>{
  await page.getByRole("button",{name:"Open hosts",exact:true}).click();
  await page.getByRole("button",{name:"Dispose this host",exact:true}).click();
  await expect(page.getByRole("dialog",{name:"Workspace hosts",exact:true})).toBeHidden();
  await expect(page.getByRole("button",{name:"Remount host",exact:true})).toBeVisible();
  await expect(page.getByRole("status").filter({hasText:"Result: dismissed."})).toBeVisible();
});
test("menu handoff transfers focus and restores the persistent launcher",async({page})=>{
  await page.getByRole("button",{name:"Workspace commands",exact:true}).click();
  await page.getByRole("menuitem",{name:"Edit workspace",exact:true}).click();
  const dialog=page.getByRole("dialog",{name:"Workspace focus",exact:true});await expect(dialog).toBeVisible();
  await expect(page.getByLabel("Workspace draft",{exact:true})).toBeFocused();
  await page.keyboard.press("Escape");await expect(dialog).toBeHidden();
  await expect(page.getByRole("button",{name:"Workspace commands",exact:true})).toBeFocused();
});
test("form dismissal remains authored policy",async({page})=>{
  await page.getByRole("button",{name:"Open form",exact:true}).click();
  const dialog=page.getByRole("dialog",{name:"Workspace form",exact:true});
  await page.keyboard.press("Escape");await expect(dialog).toBeVisible();
  await page.getByLabel("Workspace draft",{exact:true}).fill("Complete draft");
  await page.keyboard.press("Escape");await expect(dialog).toBeHidden();
});

test("same-ID updates retain draft and a replacement generation resets it",async({page})=>{
  await page.getByRole('button',{name:'Open reopen',exact:true}).click();
  await page.getByLabel('Workspace draft',{exact:true}).fill('First generation');
  await page.getByRole('button',{name:'Open same ID',exact:true}).click();
  await expect(page.getByRole('dialog',{name:'Same mounted workspace',exact:true})).toBeVisible();
  await expect(page.getByLabel('Workspace draft',{exact:true})).toHaveValue('First generation');
  await page.getByRole('button',{name:'Close and reopen',exact:true}).click();
  await expect(page.getByRole('dialog',{name:'Reopened workspace',exact:true})).toBeVisible();
  await expect(page.getByLabel('Workspace draft',{exact:true})).toHaveValue('');
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
});

test("multiple IDs dismiss top first and immediate removal settles results",async({page})=>{
  await page.getByRole('button',{name:'Open multiple',exact:true}).click();
  await page.getByRole('button',{name:'Open second',exact:true}).click();
  await expect(page.getByRole('dialog',{name:'Second workspace',exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog',{name:'Workspace multiple',exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Open remove',exact:true}).click();
  await page.getByRole('button',{name:'Remove immediately',exact:true}).click();
  await expect(page.getByRole('dialog',{name:'Workspace remove',exact:true})).toBeHidden();
  await expect(page.locator('[data-scenario="overlay-manager.remove"]').getByRole('status')).toHaveText('Result: dismissed.');
  await page.getByRole('button',{name:'Open remove',exact:true}).click();
  await page.getByRole('button',{name:'Remove all',exact:true}).click();
  await expect(page.getByRole('dialog',{name:'Workspace remove',exact:true})).toBeHidden();
});

test("managed portals inherit the authored locale and appearance",async({page})=>{
  await page.getByRole('button',{name:'Open providers',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Workspace providers',exact:true});
  await expect(dialog.getByText('123.456,78',{exact:true})).toBeVisible();
  const paint=await dialog.evaluate(node=>getComputedStyle(node).backgroundColor);
  const channels=paint.match(/[\d.]+/g)!.slice(0,3).map(Number);expect(Math.max(...channels)).toBeLessThan(128);
});
