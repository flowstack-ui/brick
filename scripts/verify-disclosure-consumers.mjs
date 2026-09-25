import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";
const [brickArg, atomArg, digest] = process.argv.slice(2);
if (!brickArg || !atomArg || !digest) throw new Error("Usage: node scripts/verify-disclosure-consumers.mjs brick.tgz atom.tgz atom-sha256");
const brick=resolve(brickArg), atom=resolve(atomArg);
verifyArchiveDigest(await readFile(atom),digest);
const root=await mkdtemp(join(tmpdir(),"brick-disclosure-consumers-"));
function run(args,cwd) {
  const result=spawnSync(args[0],args.slice(1),{cwd,encoding:"utf8",timeout:180000});
  if(result.status!==0) throw new Error(result.stdout+result.stderr+(result.error??""));
  return result.stdout;
}
for(const version of ["18.3.1","19.2.3"]) {
  const dir=join(root,version); await mkdir(dir);
  await writeFile(join(dir,"package.json"),JSON.stringify({private:true,type:"module"}));
  run(["npm","install","--ignore-scripts","--save-exact",brick,atom,`react@${version}`,`react-dom@${version}`,`@types/react@${version.startsWith("18")?"18":"19"}`,`@types/react-dom@${version.startsWith("18")?"18":"19"}`,"typescript@5.9.3","jsdom@26.1.0"],dir);
  await writeFile(join(dir,"consumer.tsx"),`
import {Accordion, Collapsible, useAccordion, useCollapsible} from "@flowstack-ui/brick";
import {Accordion as A, type AccordionRootProps} from "@flowstack-ui/brick/accordion";
import {Collapsible as C} from "@flowstack-ui/brick/collapsible";
export function Demo(){const a=useAccordion({defaultValue:"a",hideMode:"activity",unmountOnExit:false});const c=useCollapsible({hideMode:"activity",unmountOnExit:false});return <><A.RootProvider value={a} size={{md:"lg"}} variant={{initial:"subtle",lg:"enclosed"}}><Accordion.Item value="a"><Accordion.Header><Accordion.Trigger>Details<Accordion.Indicator/></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner asChild><section>Body</section></Accordion.ContentInner></Accordion.Content></Accordion.Item></A.RootProvider><C.RootProvider value={c} variant={{md:"outline"}}><Collapsible.Trigger>More</Collapsible.Trigger><Collapsible.Content>Content</Collapsible.Content></C.RootProvider></>}
// @ts-expect-error single mode remains a string
const invalid:AccordionRootProps={value:["a"]}; void invalid;
`);
  run(["npx","tsc","--noEmit","--jsx","react-jsx","--module","NodeNext","--moduleResolution","NodeNext","--target","ES2022","--strict","--skipLibCheck","consumer.tsx"],dir);
  await writeFile(join(dir,"verify.mjs"),`
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {JSDOM} from "jsdom";
const server=process.argv.includes("--server");
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:"http://localhost"});
if(!server) { for(const key of ["window","document","HTMLElement","Node","MutationObserver"])globalThis[key]=dom.window[key];
Object.defineProperty(globalThis,"navigator",{value:dom.window.navigator,configurable:true}); }
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const React=await import("react"); const {hydrateRoot}=await import("react-dom/client");const {renderToString}=await import("react-dom/server");
const {Accordion:A,useAccordion}=await import("@flowstack-ui/brick/accordion");
const {Collapsible:C,useCollapsible}=await import("@flowstack-ui/brick/collapsible");
const {createElement:h,act,createRef}=React; const ref=createRef();let a,c;const errors=[];const original=console.error;console.error=(...xs)=>errors.push(xs.join(" "));
function App(){a=useAccordion({defaultValue:"a",unmountOnExit:false,hideMode:"activity"});c=useCollapsible({defaultOpen:true,unmountOnExit:false,hideMode:"activity"});return h("main",null,h(A.RootProvider,{value:a},h(A.Item,{value:"a"},h(A.Header,null,h(A.Trigger,{ref},"Details",h(A.Indicator))),h(A.Content,null,h(A.ContentInner,null,h("input",{defaultValue:"draft","aria-label":"Draft"}))))),h(C.RootProvider,{value:c},h(C.Trigger,null,"Other"),h(C.Content,null,"Second panel")));}
if(server){const html=renderToString(h(App));assert.deepEqual(errors,[]);process.stdout.write(html);process.exit(0);}
const container=document.getElementById("root");container.innerHTML=execFileSync(process.execPath,[fileURLToPath(import.meta.url),"--server"],{encoding:"utf8"});const first=container.firstChild;let root;
await act(async()=>{root=hydrateRoot(container,h(App));});assert.equal(container.firstChild,first);
const input=container.querySelector("input");input.value="Saved draft";
await act(async()=>{input.focus();a.setValue([]);c.setOpen(false);});
assert.equal(document.activeElement,ref.current);assert.ok(container.querySelector('[data-slot="accordion-content"]').hasAttribute("inert"));
await act(async()=>{a.setValue(["a"]);c.setOpen(true);});assert.equal(container.querySelector("input").value,"Saved draft");assert.equal(ref.current.getAttribute("aria-expanded"),"true");
await act(async()=>root.unmount());assert.equal(ref.current,null);console.error=original;assert.deepEqual(errors,[]);
console.log("React "+React.version+": imports, types, SSR/hydration, refs, retained state, focus recovery and Activity/fallback passed");dom.window.close();
`);
  console.log(run(["node","verify.mjs"],dir));
}
console.log(`Consumer evidence retained at ${root}`);
