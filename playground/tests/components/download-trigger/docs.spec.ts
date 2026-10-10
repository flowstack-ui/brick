import {test,expect} from '../../evidence-test.js';
test.beforeEach(async({page})=>{await page.goto('/download-trigger?testMode=1');});
test('docs expose actual data and hook contracts with paired examples',async({page})=>{
 await expect(page.locator('#props-trigger')).toContainText('fileName');
 await expect(page.locator('#props-hook')).toContainText('ownerDocument');
 await expect(page.locator('#svg').getByRole('tab',{name:'Code',exact:true})).toBeVisible();
 const pending=page.waitForEvent('download');
 await page.locator('#basic').getByRole('button',{name:'Download text',exact:true}).click();
 expect((await pending).suggestedFilename()).toBe('notes.txt');
});
test('shared loading and icon geometry do not leak rendering props',async({page})=>{
 await page.clock.install({time:new Date('2026-09-15T12:00:00Z')});
 await page.clock.pauseAt(new Date('2026-09-15T12:00:01Z'));
 const button=page.locator('#loading').getByRole('button',{name:'Prepare export',exact:true});
 const event=page.waitForEvent('download');
 await button.click();
 const busy=page.locator('#loading [data-slot="download-trigger"]').first();
 await expect(busy).toHaveAttribute('aria-busy','true');
 await expect(busy).toHaveText('Preparing');
 for(const attr of ['loadingText','spinnerPlacement','spinner'])await expect(busy).not.toHaveAttribute(attr);
 const icon=page.locator('#icons').getByRole('button',{name:'Download notes',exact:true});
 const box=await icon.boundingBox();expect(box!.width).toBeCloseTo(box!.height,0);
 await page.clock.fastForward(1000);await event;
});
test('groups inherit action sizes and custom hook cancellation suppresses saving',async({page})=>{
 const group=page.locator('#groups');
 const first=await group.getByRole('button',{name:'Preview',exact:true}).boundingBox();
 const last=await group.getByRole('button',{name:'Download copy',exact:true}).boundingBox();
 expect(first!.height).toBe(last!.height);
 await page.clock.install();let downloads=0;page.on('download',()=>downloads++);
 await page.locator('#hook').getByRole('button',{name:'Prepare custom export',exact:true}).click();
 await page.locator('#hook').getByRole('button',{name:'Cancel preparation',exact:true}).click();
 await page.clock.fastForward(2000);expect(downloads).toBe(0);
 await expect(page.locator('#hook').getByRole('button',{name:'Prepare custom export',exact:true})).not.toHaveAttribute('aria-busy');
});
