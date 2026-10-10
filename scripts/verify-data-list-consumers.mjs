import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";
const [brickArg, atomArg, digest] = process.argv.slice(2);
if (!brickArg || !atomArg || !digest) throw new Error("Pass Brick archive, Atom archive and Atom SHA256");
const brick = resolve(brickArg), atom = resolve(atomArg);
verifyArchiveDigest(await readFile(atom), digest);
const root = await mkdtemp("/private/tmp/brick-data-list-consumers-");
function run(args, cwd) {
  const result = spawnSync(args[0], args.slice(1), { cwd, encoding: "utf8", timeout: 180000 });
  if (result.status !== 0) throw new Error(result.stdout + result.stderr + (result.error ?? ""));
  return result.stdout;
}
for (const version of ["18.3.1", "19.2.3"]) {
  const dir = join(root, version); await mkdir(dir);
  await writeFile(join(dir, "package.json"), JSON.stringify({ private: true, type: "module" }));
  run(["npm", "install", "--ignore-scripts", "--save-exact", brick, atom, `react@${version}`, `react-dom@${version}`, `@types/react@${version.startsWith("18") ? "18" : "19"}`, `@types/react-dom@${version.startsWith("18") ? "18" : "19"}`, "typescript@5.9.3", "jsdom@26.1.0"], dir);
  await writeFile(join(dir, "consumer.tsx"), `
import { createRef } from "react";
import { DataList, type DataListRecipeProps } from "@flowstack-ui/brick";
import { DataListPropsProvider, DataListRoot, DataListItem, DataListLabel, DataListValue } from "@flowstack-ui/brick/data-list";
const defaults: DataListRecipeProps={size:{md:"lg"},variant:{initial:"bold",lg:"subtle"},orientation:{initial:"horizontal",md:"vertical"},labelWidth:{md:"sm"},divide:true};
export const demo=<DataListPropsProvider value={defaults}><DataListRoot ref={createRef<HTMLDListElement>()} divide={false}><DataListItem ref={createRef<HTMLDivElement>()}><DataListLabel ref={createRef<HTMLElement>()}>Name</DataListLabel><DataListValue ref={createRef<HTMLElement>()}>Ada</DataListValue></DataListItem></DataListRoot><DataList.Root/></DataListPropsProvider>;
`);
  run(["npx","tsc","--noEmit","--jsx","react-jsx","--module","NodeNext","--moduleResolution","NodeNext","--target","ES2022","--strict","--skipLibCheck","consumer.tsx"],dir);
  await writeFile(join(dir,"verify.mjs"),`
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:"http://localhost"});
for(const key of ["window","document","HTMLElement","Element","Node"])globalThis[key]=dom.window[key];
Object.defineProperty(globalThis,"navigator",{value:dom.window.navigator,configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const React=await import("react"),{hydrateRoot}=await import("react-dom/client"),{renderToString}=await import("react-dom/server");
const {DataList:D}=await import("@flowstack-ui/brick");
const {DataListPropsProvider}=await import("@flowstack-ui/brick/data-list");
assert.equal(D.PropsProvider,DataListPropsProvider);
const {createElement:h,act,createRef,StrictMode}=React,refs=Array.from({length:4},()=>createRef());
const errors=[],old=console.error; console.error=(...v)=>errors.push(v.join(" "));
const app=h(StrictMode,null,h(D.PropsProvider,{value:{size:"lg",variant:"bold",divide:true}},
h(D.Root,{ref:refs[0],divide:false,orientation:{initial:"horizontal",md:"vertical"},size:{md:"sm"}},
h(D.Item,{ref:refs[1]},h(D.Label,{ref:refs[2]},"Name"),h(D.Value,{ref:refs[3]},"Ada")))));
const container=document.getElementById("root");container.innerHTML=renderToString(app);const before=container.firstChild;
let root;await act(async()=>{root=hydrateRoot(container,app);});
assert.equal(container.firstChild,before);assert.deepEqual(refs.map(r=>r.current.tagName),["DL","DIV","DT","DD"]);
assert.equal(refs[0].current.dataset.size,"md");assert.equal(refs[0].current.dataset.sizeMd,"sm");
assert.equal(refs[0].current.dataset.variant,"bold");assert.equal(refs[0].current.hasAttribute("data-divide"),false);
assert.equal(refs[0].current.dataset.orientationMd,"vertical");assert.equal(container.querySelectorAll("dl").length,1);
await act(async()=>root.unmount());assert.ok(refs.every(r=>r.current===null));console.error=old;assert.deepEqual(errors,[]);
console.log("React "+React.version+": packed types, root/subpath exports, provider, SSR/hydration, native refs and cleanup passed");
`);
  console.log(run([process.execPath,"verify.mjs"],dir));
}
console.log(`Consumer evidence retained at ${root}`);
