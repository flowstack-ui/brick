import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";
const [brickArg, atomArg, digest] = process.argv.slice(2);
if (!brickArg || !atomArg || !digest) throw new Error("Usage: node scripts/verify-radio-group-consumers.mjs brick.tgz atom.tgz atom-sha256");
const brick = resolve(brickArg), atom = resolve(atomArg);
verifyArchiveDigest(await readFile(atom), digest);
const root = await mkdtemp(join(tmpdir(), "brick-radio-group-consumers-"));
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
import { RadioGroup, useRadioGroup } from "@flowstack-ui/brick";
import { RadioGroup as Subpath, type RadioGroupVariant } from "@flowstack-ui/brick/radio-group";
const native = createRef<HTMLInputElement>(), closed = createRef<HTMLButtonElement>();
const variants: RadioGroupVariant[] = ["solid", "outline", "subtle"];
export function Demo() {
 const controller = useRadioGroup({ defaultValue: "a" });
 return <Subpath.RootProvider controller={controller} size={{ initial:"xs", md:"lg" }} variant={{initial:"solid",md:"outline"}}>
  <RadioGroup.Item ref={closed} value="a">A</RadioGroup.Item>
  <RadioGroup.ItemRoot value="b"><RadioGroup.ItemHiddenInput ref={native}/><RadioGroup.ItemControl><RadioGroup.ItemIndicator /></RadioGroup.ItemControl><RadioGroup.ItemText>B</RadioGroup.ItemText></RadioGroup.ItemRoot>
 </Subpath.RootProvider>;
}
void variants;
`);
  console.log(run(["npx", "tsc", "--noEmit", "--jsx", "react-jsx", "--module", "NodeNext", "--moduleResolution", "NodeNext", "--target", "ES2022", "--strict", "--skipLibCheck", "consumer.tsx"], dir));
  await writeFile(join(dir, "verify.mjs"), `
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom = new JSDOM('<!doctype html><div id="root"></div><iframe></iframe>', { url:"http://localhost" });
for (const key of ["window","document","HTMLElement","HTMLInputElement","Node","MutationObserver"]) globalThis[key] = dom.window[key];
Object.defineProperty(globalThis,"navigator",{value:dom.window.navigator,configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const React = await import("react");
const { createRoot, hydrateRoot } = await import("react-dom/client");
const { renderToString } = await import("react-dom/server");
const { RadioGroup: R, useRadioGroup } = await import("@flowstack-ui/brick/radio-group");
const { createElement:h, act, createRef, StrictMode } = React;
const errors=[]; const original=console.error; console.error=(...args)=>errors.push(args.join(" "));
const inputRef=createRef(); let controller; const changes=[];
function App() {
 controller=useRadioGroup({defaultValue:"a",name:"choice",onValueChange:value=>changes.push(value)});
 return h("form",null,h(R.RootProvider,{controller,"aria-label":"Choice"},
 h(R.Item,{value:"a"},"A"),
 h(R.ItemRoot,{value:"b"},h(R.ItemHiddenInput,{ref:inputRef}),h(R.ItemControl,null,h(R.ItemIndicator)),h(R.ItemText,null,"B"),h(R.ItemDescription,null,"Details"))));
}
const container=document.getElementById("root");
const app=h(StrictMode,null,h(App));
container.innerHTML=renderToString(app);const before=container.firstChild;
let root;await act(async()=>{root=hydrateRoot(container,app);});
assert.equal(before,container.firstChild);
await act(async()=>inputRef.current.click());
assert.equal(controller.value,"b");assert.deepEqual(changes,["b"]);
assert.deepEqual(new window.FormData(container.querySelector("form")).getAll("choice"),["b"]);
assert.equal(inputRef.current.getAttribute("tabindex"),"0");
await act(async()=>controller.reset());assert.equal(controller.value,"a");
await act(async()=>root.unmount());assert.equal(inputRef.current,null);
const frame=document.querySelector("iframe").contentDocument;
const target=frame.createElement("div");frame.body.append(target);
root=createRoot(target);
await act(async()=>root.render(h(App)));
const input=inputRef.current;await act(async()=>input.focus());
assert.equal(frame.activeElement,input);
await act(async()=>input.dispatchEvent(new frame.defaultView.KeyboardEvent("keydown",{key:"Home",bubbles:true})));
assert.equal(frame.activeElement.getAttribute("data-value"),"a");
await act(async()=>root.unmount());assert.equal(inputRef.current,null);
console.error=original;assert.deepEqual(errors,[]);
console.log("React "+React.version+": packed imports, SSR/hydration, native and closed items, refs, cleanup, form, reset and iframe keyboard passed");
`);
  console.log(run(["node", "verify.mjs"], dir));
}
console.log(`Consumer evidence retained at ${root}`);
