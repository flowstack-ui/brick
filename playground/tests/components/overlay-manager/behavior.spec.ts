import { expect,test } from "../../evidence-test.js";
import AxeBuilder from "@axe-core/playwright";
test.describe("documentation examples", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/overlay-manager"); });
  test("ordered sections, source pairs and named API sections", async ({ page }) => {
    for (const name of ["Drawer", "Update props", "Return value", "Open from a menu", "Form submission", "Instance lifetime", "Providers", "Floating panel", "Factory", "Viewport", "Injected lifecycle", "Controller"]) {
      await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
    }
    const basic = page.locator("[data-example-preview]").first();
    await basic.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(basic.getByText("createOverlay", { exact: false }).first()).toBeVisible();
    expect(await page.locator("iframe").count()).toBe(0);
  });
  test("basic uses current positioning and accessible descriptions", async ({ page }) => {
    // Safari does not focus buttons on pointer activation; exercise keyboard
    // restoration from a genuinely focused launcher.
    await page.getByRole("button", { name: "Open dialog", exact: true }).focus();
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: "Dialog title" });
    await expect(dialog).toHaveAttribute("aria-describedby", /.+/);
    await expect(page.locator(".brick-dialog-positioner")).toBeVisible();
    const scan = await new AxeBuilder({ page }).include(".brick-dialog-content").analyze();
    expect(scan.violations.filter(v => v.impact === "serious" || v.impact === "critical")).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open dialog", exact: true })).toBeFocused();
  });
  test("actual form submission returns a value", async ({ page }) => {
    await page.getByRole("button", { name: "Open form", exact: true }).click();
    await page.getByRole("textbox", { name: "Workspace name" }).fill("Design team");
    await page.getByRole("textbox", { name: "Workspace name" }).press("Enter");
    await expect(page.getByRole("status").filter({ hasText: "Saved: Design team" })).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
  test("documentation updates, providers, drawer and panel use real owners", async ({ page }) => {
    await page.getByRole("button", { name: "Open update", exact: true }).click();
    await page.getByRole("textbox", { name: "Draft", exact: true }).fill("Keep me");
    await page.getByRole("button", { name: "Update title", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Updated title", exact: true })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Draft", exact: true })).toHaveValue("Keep me");
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Open localized dialog" }).click();
    await expect(page.getByRole("dialog").getByText(/123.456,78/)).toBeVisible();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Open drawer", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Drawer title" })).toBeVisible();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Open inspector" }).click();
    await expect(page.getByRole("dialog", { name: "Inspector" })).toBeVisible();
    await page.getByRole("dialog", { name: "Inspector" }).getByRole("button", { name: /close/i }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
  test("documentation lifetime keeps independent IDs and resets replacement state", async ({ page }) => {
    await page.getByRole("button", { name: "Open instances" }).click();
    await page.getByRole("textbox", { name: "Instance draft" }).fill("Old draft");
    await page.getByRole("button", { name: "Replace", exact: true }).click();
    await expect(page.getByRole("textbox", { name: "Instance draft" })).toHaveValue("");
    await page.getByRole("button", { name: "Open second" }).click();
    await expect(page.getByRole("dialog", { name: "Second instance" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Replacement instance" })).toBeVisible();
    await page.getByRole("button", { name: "Dispose host" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await page.getByRole("button", { name: "Remount host" }).click();
    await expect(page.getByRole("button", { name: "Open instances" })).toBeEnabled();
  });
  test("nested menu hands back focus to the persistent launcher", async ({ page }) => {
    await page.getByRole("button", { name: "Commands", exact: true }).click();
    await page.getByRole("menuitem", { name: "Open dialog", exact: true }).click();
    await page.getByRole("button", { name: "More actions", exact: true }).click();
    await page.getByRole("menuitem", { name: "Finish", exact: true }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Commands", exact: true })).toBeFocused();
  });
  test("early cancellation settles in the installed Atom candidate", async ({ page }) => {
    await page.getByRole("button", { name: "Open and immediately close" }).click();
    await expect(page.getByRole("status").filter({ hasText: "Cancelled before display." })).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
  test("normal-motion exit completes before the next dialog opens", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.getByRole("button", { name: "Open confirmation" }).click();
    const first = page.getByRole("dialog", { name: "Confirm action" });
    await expect(first).toBeVisible();
    await first.evaluate(node => {
      const state = { overlap: false };
      (window as any).__overlaySequence = state;
      const observer = new MutationObserver(() => {
        if (node.isConnected && document.querySelector('[role="dialog"]') !== node) state.overlap = true;
        if (document.querySelectorAll('[role="dialog"]').length > 1) state.overlap = true;
        if (document.querySelectorAll('.brick-dialog-overlay').length > 1) state.overlap = true;
      });
      observer.observe(document.body, { childList: true, subtree: true });
      (window as any).__overlayObserver = observer;
    });
    await first.getByRole("button", { name: "Continue", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Completed", exact: true })).toBeVisible();
    expect(await page.evaluate(() => { (window as any).__overlayObserver.disconnect(); return (window as any).__overlaySequence.overlap; })).toBe(false);
    await expect(first).toHaveCount(0);
  });
});
test.beforeEach(async({page})=>{await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/overlay-manager?qualification=1");});
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
