import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";
const [brickArg, atomArg, digest] = process.argv.slice(2);
if (!brickArg || !atomArg || !digest) throw new Error("Pass Brick archive, Atom archive and Atom SHA256");
const brick = resolve(brickArg), atom = resolve(atomArg);
verifyArchiveDigest(await readFile(atom), digest);
const root = await mkdtemp("/private/tmp/brick-tree-family-consumers-");
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
import { Tree, TreeGrid, useTreeController, createTreeCollection } from "@flowstack-ui/brick";
import { TreeRootProvider, TreeCheckbox } from "@flowstack-ui/brick/tree";
import { TreeGridColumnResizeHandle } from "@flowstack-ui/brick/tree-grid";
const collection=createTreeCollection([{value:"one",label:"One"}]);
export function Demo() { const api=useTreeController({collection,checkable:true});return <>
<TreeRootProvider value={api} size={{initial:"xs",md:"md"}} density={{lg:"compact"}} selectionVariant="solid">
<Tree.Item value="one" selectable={false} interactive><Tree.ItemContent><TreeCheckbox/><Tree.ItemText>One</Tree.ItemText></Tree.ItemContent></Tree.Item></TreeRootProvider>
<TreeGrid.Root aria-label="Records" rowCount={1} columnCount={1} pageSize={5} tone="neutral" density={{md:"compact"}}>
<TreeGrid.Body><TreeGrid.Row rowIndex={1} value="one"><TreeGrid.RowHeader ref={createRef<HTMLTableCellElement>()} columnIndex={1} sticky="start" interactive><button>Open</button></TreeGrid.RowHeader></TreeGrid.Row></TreeGrid.Body></TreeGrid.Root>
<TreeGridColumnResizeHandle aria-label="Width" onValueChange={value=>value.toFixed()} /></>; }
`);
  run(["npx", "tsc", "--noEmit", "--jsx", "react-jsx", "--module", "NodeNext", "--moduleResolution", "NodeNext", "--target", "ES2022", "--strict", "--skipLibCheck", "consumer.tsx"], dir);
  await writeFile(join(dir, "verify.mjs"), `
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:"http://localhost"});
for(const key of ["window","document","HTMLElement","Element","Node","MutationObserver"]) globalThis[key]=dom.window[key];
Object.defineProperty(globalThis,"navigator",{value:dom.window.navigator,configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;Element.prototype.scrollIntoView=()=>{};
const React=await import("react"),{hydrateRoot}=await import("react-dom/client"),{renderToString}=await import("react-dom/server");
const {Tree:T,TreeGrid:G,useTreeController,createTreeCollection}=await import("@flowstack-ui/brick");
const {createElement:h,act,createRef,StrictMode}=React;const treeRef=createRef(),cellRef=createRef();
const errors=[];const original=console.error;console.error=(...args)=>errors.push(args.join(" "));
const collection=createTreeCollection([{value:"one",label:"One"}]);
function Demo(){const api=useTreeController({collection,defaultValue:"one"});return h(StrictMode,null,
h(T.RootProvider,{value:api,ref:treeRef,"aria-label":"Files"},h(T.Item,{value:"one"},h(T.ItemContent,null,h(T.ItemText,null,"One")))),
h(G.Root,{"aria-label":"Records",rowCount:1,columnCount:1},h(G.Body,null,h(G.Row,{rowIndex:1,value:"one"},h(G.RowHeader,{columnIndex:1,ref:cellRef,interactive:true},h("input",{"aria-label":"Name",defaultValue:"Project"}))))));}
const app=h(Demo),container=document.getElementById("root");container.innerHTML=renderToString(app);const before=container.firstChild;
let root;await act(async()=>{root=hydrateRoot(container,app);});assert.equal(container.firstChild,before);assert.equal(treeRef.current.tagName,"DIV");assert.equal(cellRef.current.tagName,"TH");
await act(async()=>treeRef.current.focus());assert.ok(document.getElementById(treeRef.current.getAttribute("aria-activedescendant")));
const grid=container.querySelector('[role=treegrid]'),input=container.querySelector("input");
await act(async()=>input.focus());await act(async()=>input.dispatchEvent(new window.KeyboardEvent("keydown",{key:"Escape",bubbles:true})));
assert.equal(document.activeElement,grid);assert.equal(input.tabIndex,-1);
await act(async()=>root.unmount());assert.equal(treeRef.current,null);assert.equal(cellRef.current,null);console.error=original;assert.deepEqual(errors,[]);
console.log("React "+React.version+": packed root/subpath types, provider SSR/hydration, focus, Escape, refs and cleanup passed");
`);
  console.log(run([process.execPath, "verify.mjs"], dir));
}
console.log(`Consumer evidence retained at ${root}`);
