import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";
const [brickArg, brickDigest, atomArg, atomDigest] = process.argv.slice(2);
if (!atomDigest) throw new Error("Usage: verify-chip-consumers.mjs brick.tgz brick-sha256 atom.tgz atom-sha256");
const brick=resolve(brickArg), atom=resolve(atomArg);
verifyArchiveDigest(await readFile(brick),brickDigest);
verifyArchiveDigest(await readFile(atom),atomDigest);
const root=await mkdtemp(join(tmpdir(),"brick-chip-consumers-"));
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
import {Chip} from "@flowstack-ui/brick";
import {Chip as C, type ChipRootProps} from "@flowstack-ui/brick/chip";
import {createRef} from "react";
const ref=createRef<HTMLSpanElement>();
export function Demo(){return <C.Root size={{md:"lg"}} variant={{sm:"subtle"}} density={{lg:"compact"}} tone="contrast"><Chip.Label asChild ref={ref}><strong>Design</strong></Chip.Label><Chip.RemoveTrigger ariaLabel="Remove Design" /></C.Root>}
// @ts-expect-error radius excludes shape
const invalid:ChipRootProps={radius:"control",shape:"pill"}; void invalid;
`);
 run(["npx","tsc","--noEmit","--jsx","react-jsx","--module","NodeNext","--moduleResolution","NodeNext","--target","ES2022","--strict","--skipLibCheck","consumer.tsx"],dir);
 await writeFile(join(dir,"verify.mjs"),`
import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {JSDOM} from "jsdom";
const server=process.argv.includes("--server");
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:"http://localhost"});
if(!server){for(const key of ["window","document","HTMLElement","Node","MutationObserver"])globalThis[key]=dom.window[key];Object.defineProperty(globalThis,"navigator",{value:dom.window.navigator,configurable:true});}
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const React=await import("react"); const {hydrateRoot}=await import("react-dom/client"); const {renderToString}=await import("react-dom/server");
const {Chip:C}=await import("@flowstack-ui/brick/chip");
const {createElement:h,act,createRef}=React;const ref=createRef();let cleanups=0,presses=0;
const errors=[];const original=console.error; console.error=(...xs)=>errors.push(xs.join(" "));
const callback=node=>{if(node && React.version.startsWith("19"))return ()=>{cleanups++;};};
function App(){return h(C.Root,{size:{md:"lg"},variant:{sm:"subtle"},tone:"contrast"},h(C.Label,{asChild:true,ref},h("strong",null,"Design")),h(C.StartElement,{ref:callback},"+"),h(C.RemoveTrigger,{ariaLabel:"Remove Design",onPress:()=>presses++}));}
if(server){const html=renderToString(h(App));assert.deepEqual(errors,[]);process.stdout.write(html);process.exit(0);}
const container=document.getElementById("root");container.innerHTML=execFileSync(process.execPath,[fileURLToPath(import.meta.url),"--server"],{encoding:"utf8"});
const first=container.firstChild;let root;await act(async()=>{root=hydrateRoot(container,h(App));});
assert.equal(first,container.firstChild);assert.equal(ref.current.tagName,"STRONG");assert.equal(first.getAttribute("data-size"),"md");assert.equal(first.getAttribute("data-size-md"),"lg");
await act(async()=>container.querySelector("button").click());assert.equal(presses,1);assert.equal(container.querySelector("button").type,"button");
await act(async()=>root.unmount());assert.equal(ref.current,null);if(React.version.startsWith("19"))assert.equal(cleanups,1);
console.error=original;assert.deepEqual(errors,[]);dom.window.close();console.log("React "+React.version+": packed types, DOM-free SSR, hydration, projection, actions and ref cleanup passed");
`);
 console.log(run(["node","verify.mjs"],dir));
}
console.log("Consumer evidence retained at "+root);
