import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";
const [brickArg, atomArg, digest] = process.argv.slice(2);
if (!brickArg || !atomArg || !digest) throw new Error("Pass Brick archive, Atom archive and Atom SHA256");
const brick = resolve(brickArg), atom = resolve(atomArg);
verifyArchiveDigest(await readFile(atom), digest);
const root = await mkdtemp("/private/tmp/brick-feed-consumers-");
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
import { Feed, type FeedRecipeProps } from "@flowstack-ui/brick";
import { FeedPropsProvider, FeedRoot, FeedItem } from "@flowstack-ui/brick/feed";
const defaults: FeedRecipeProps={density:{md:"compact"},variant:{initial:"outline",lg:"divided"},dividerStrength:{md:"default"}};
export const demo=<FeedPropsProvider value={defaults}><FeedRoot aria-label="Activity" ref={createRef<HTMLElement>()}><FeedItem index={0} ref={createRef<HTMLElement>()}>Update</FeedItem></FeedRoot></FeedPropsProvider>;
void Feed;
`);
  run(["npx", "tsc", "--noEmit", "--jsx", "react-jsx", "--module", "NodeNext", "--moduleResolution", "NodeNext", "--target", "ES2022", "--strict", "--skipLibCheck", "consumer.tsx"], dir);
  await writeFile(join(dir, "verify.mjs"), `
import assert from "node:assert/strict";
import {JSDOM} from "jsdom";
const dom=new JSDOM("<div id='root'></div>",{pretendToBeVisual:true,url:"https://example.test"});
for(const key of ["window","document","HTMLElement","Element","Node","Event","KeyboardEvent"])globalThis[key]=dom.window[key];
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
dom.window.HTMLElement.prototype.scrollIntoView=function(){};
const React=await import("react");const {hydrateRoot}=await import("react-dom/client");const {renderToString}=await import("react-dom/server");
const {Feed:F}=await import("@flowstack-ui/brick");const {FeedRoot,FeedItem,FeedPropsProvider}=await import("@flowstack-ui/brick/feed");
assert.equal(F.Root,FeedRoot);assert.equal(F.Item,FeedItem);assert.equal(F.PropsProvider,FeedPropsProvider);
const {createElement:h,act,createRef,StrictMode}=React,refs=[createRef(),createRef(),createRef()];
const errors=[],old=console.error;console.error=(...v)=>errors.push(v.join(" "));
const app=h(StrictMode,null,h(F.PropsProvider,{value:{variant:"outline",density:"compact"}},h(F.Root,{ref:refs[0],"aria-label":"Updates",variant:{md:"plain"},setSize:3},h(F.Item,{ref:refs[1],index:0,"aria-label":"First"},"First"),h(F.Item,{hidden:true,index:1},"Hidden"),h(F.Item,{ref:refs[2],index:2,"aria-label":"Last"},"Last"))));
const container=document.getElementById("root");container.innerHTML=renderToString(app);const before=container.firstChild;
let root;await act(async()=>{root=hydrateRoot(container,app);});
assert.equal(container.firstChild,before);assert.deepEqual(refs.map(r=>r.current.tagName),["DIV","ARTICLE","ARTICLE"]);
assert.equal(refs[0].current.dataset.variant,"divided");assert.equal(refs[0].current.dataset.variantMd,"plain");assert.equal(refs[0].current.dataset.density,"compact");
refs[1].current.focus();await act(async()=>refs[1].current.dispatchEvent(new KeyboardEvent("keydown",{key:"PageDown",bubbles:true,cancelable:true})));assert.equal(document.activeElement,refs[2].current);
await act(async()=>root.unmount());assert.ok(refs.every(r=>r.current===null));console.error=old;assert.deepEqual(errors,[]);dom.window.close();
console.log("React "+React.version+": packed types, exports, provider, SSR/hydration, refs, keyboard and cleanup passed");
`);
  console.log(run([process.execPath,"verify.mjs"],dir));
}
console.log(`Consumer evidence retained at ${root}`);
