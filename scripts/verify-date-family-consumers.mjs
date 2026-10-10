import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { verifyArchiveDigest } from "./verify-archive-digest.mjs";

const [brickArg, atomArg, digest] = process.argv.slice(2);
if (!brickArg || !atomArg || !digest) throw new Error("Usage: node scripts/verify-date-family-consumers.mjs brick.tgz atom.tgz atom-sha256");
const brick = resolve(brickArg), atom = resolve(atomArg);
verifyArchiveDigest(await readFile(atom), digest);
const root = await mkdtemp(join(tmpdir(), "brick-date-family-consumers-"));
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
import { DatePicker, DateInput, Calendar, useDatePicker, useDateInput, useCalendar, parseDate } from "@flowstack-ui/brick";
import type { DatePickerTextCodec } from "@flowstack-ui/brick/date-picker";
const textRef = createRef<HTMLInputElement>();
const date = parseDate("2026-09-18");
const codec: DatePickerTextCodec = { format: value => value.toString(), parse: text => parseDate(text) };
export function Demo() {
 const picker = useDatePicker({ referenceDate: date, entryMode: "text", textCodec: codec });
 const input = useDateInput({ referenceDate: date });
 const calendar = useCalendar({ referenceDate: date, numOfMonths: 2 });
 return <><DatePicker.RootProvider value={picker} variant={{initial:"outline",md:"subtle"}}><DatePicker.TextInput ref={textRef}/></DatePicker.RootProvider>
 <DateInput.RootProvider value={input} /><Calendar.RootProvider value={calendar} tone="contrast" />
 <Calendar.Root referenceDate={date} asChild><section><Calendar.NextTrigger asChild><button>Next</button></Calendar.NextTrigger><Calendar.Grid /></section></Calendar.Root></>;
}
`);
  run(["npx", "tsc", "--noEmit", "--jsx", "react-jsx", "--module", "NodeNext", "--moduleResolution", "NodeNext", "--target", "ES2022", "--strict", "--skipLibCheck", "consumer.tsx"], dir);
  await writeFile(join(dir, "verify.mjs"), `
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const dom = new JSDOM('<!doctype html><div id="root"></div><iframe></iframe>', { url:"http://localhost", pretendToBeVisual:true });
for (const key of ["window","document","HTMLElement","HTMLInputElement","Element","Node","MutationObserver","requestAnimationFrame","cancelAnimationFrame"]) globalThis[key] = dom.window[key];
Object.defineProperty(globalThis,"navigator",{value:dom.window.navigator,configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
const React = await import("react");
const { createRoot, hydrateRoot } = await import("react-dom/client");
const { renderToString } = await import("react-dom/server");
const { DatePicker: P, useDatePicker } = await import("@flowstack-ui/brick/date-picker");
const { DateInput: I } = await import("@flowstack-ui/brick/date-input");
const { Calendar: C } = await import("@flowstack-ui/brick/calendar");
const { parseDate } = await import("@flowstack-ui/brick/date-value");
const { createElement:h, act, createRef, StrictMode } = React;
const date=parseDate("2026-09-18"), textRef=createRef(), inputRef=createRef(), calendarRef=createRef();
let controller;
function App() {
 controller=useDatePicker({referenceDate:date,defaultValue:date,name:"date",entryMode:"text"});
 return h("form",null,h(P.RootProvider,{value:controller},h(P.TextInput,{ref:textRef,"aria-label":"Date"})),
 h(I.Root,{referenceDate:date,defaultValue:date,ref:inputRef,"aria-label":"Segments"}),
 h(C.Root,{referenceDate:date,ref:calendarRef,"aria-label":"Calendar",asChild:true},h("section",null,h(C.Grid))));
}
const container=document.getElementById("root"), app=h(StrictMode,null,h(App));
container.innerHTML=renderToString(app);const before=container.firstChild;const errors=[];
let root;await act(async()=>{root=hydrateRoot(container,app,{onRecoverableError:error=>errors.push(String(error))});});
assert.equal(before,container.firstChild);assert.equal(textRef.current.tagName,"INPUT");
assert.equal(inputRef.current.tagName,"DIV");assert.equal(calendarRef.current.tagName,"SECTION");
assert.deepEqual(new window.FormData(container.querySelector("form")).getAll("date"),["2026-09-18"]);
await act(async()=>controller.setDraft(0,"2026-02-30"));assert.equal(controller.valid,false);
await act(async()=>controller.setDraft(0,"2026-09-23"));
await act(async()=>controller.commitDraft(0));assert.equal(textRef.current.value,"2026-09-23");
assert.deepEqual(new window.FormData(container.querySelector("form")).getAll("date"),["2026-09-23"]);
await act(async()=>root.unmount());assert.equal(textRef.current,null);assert.equal(inputRef.current,null);assert.equal(calendarRef.current,null);
const frame=document.querySelector("iframe").contentDocument,target=frame.createElement("div");frame.body.append(target);
root=createRoot(target);await act(async()=>root.render(h(App)));
await act(async()=>textRef.current.focus());assert.equal(frame.activeElement,textRef.current);
await act(async()=>root.unmount());assert.equal(textRef.current,null);assert.deepEqual(errors,[]);
dom.window.close();
console.log("React "+React.version+": packed types, subpaths, SSR/hydration, canonical forms, draft recovery, refs, unmount and iframe focus passed");
`);
  console.log(run(["node", "verify.mjs"], dir));
}
console.log(`Consumer evidence retained at ${root}`);
