import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { verifyArchiveDigest } from './verify-archive-digest.mjs';
const [brickArg,atomArg,digest]=process.argv.slice(2);
if(!brickArg || !atomArg || !digest) throw new Error('Usage: node scripts/verify-icon-consumers.mjs brick.tgz atom.tgz atom-sha256');
const brick=resolve(brickArg),atom=resolve(atomArg);
verifyArchiveDigest(await readFile(atom),digest);
const temp=await mkdtemp(join(tmpdir(),'brick-icon-consumers-'));
function run(args,cwd){const r=spawnSync(args[0],args.slice(1),{cwd,encoding:'utf8',timeout:180000});if(r.status!==0)throw new Error(r.stdout+r.stderr+(r.error??''));return r.stdout;}
try {
 for(const version of ['18.3.1','19.2.3']) {
  const dir=join(temp,version);await mkdir(dir);await writeFile(join(dir,'package.json'),JSON.stringify({private:true,type:'module'}));
  run(['npm','install','--ignore-scripts','--save-exact',brick,atom,`react@${version}`,`react-dom@${version}`,'jsdom@26.1.0'],dir);
  await writeFile(join(dir,'verify.mjs'),`
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:'http://localhost'});
for(const key of ['window','document','HTMLElement','SVGElement','Node'])globalThis[key]=dom.window[key];
Object.defineProperty(globalThis,'navigator',{value:dom.window.navigator,configurable:true});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const React=await import('react');const {createRoot,hydrateRoot}=await import('react-dom/client');const {renderToString}=await import('react-dom/server');
const {Icon,createIcon,IconPropsProvider}=await import('@flowstack-ui/brick/icon');
const {composeHost}=await import('@flowstack-ui/atom/compose-host');
const {createElement:h,act,StrictMode,createRef}=React;
const react19=React.version.startsWith('19.');const errors=[];const original=console.error;console.error=(...args)=>errors.push(args.join(' '));
const container=document.getElementById('root');let attached=0,detached=0,active=0;
const callback=node=>{if(node){attached++;active++;if(react19)return ()=>{detached++;active--;};}else{detached++;active--;}};
const owner=createRef();const events=[];
const tree=key=>h(StrictMode,null,h(Icon,{asChild:true,ref:owner,onClick:e=>{events.push('owner');e.preventDefault();}},h('svg',{key,ref:callback,onClick:()=>events.push('child'),'aria-label':'wrong'},h('title',null,'wrong'))));
const root=createRoot(container);await act(()=>root.render(tree('a')));assert.equal(active,1);assert.equal(owner.current,container.firstChild);assert.equal(owner.current.getAttribute('aria-label'),null);
owner.current.dispatchEvent(new window.MouseEvent('click',{bubbles:true,cancelable:true}));assert.deepEqual(events,['owner','child']);
await act(()=>root.render(tree('b')));assert.equal(active,1);await act(()=>root.unmount());assert.equal(active,0);assert.equal(attached,detached);assert.equal(owner.current,null);
// Direct Atom evidence, separate from Brick adaptation.
const object=createRef();let nodeRef;const atomRoot=createRoot(container);
await act(()=>atomRoot.render(composeHost(h('svg',{ref:node=>{nodeRef=node;}}),{ref:object})));
assert.equal(nodeRef,object.current);assert.ok(nodeRef);await act(()=>atomRoot.unmount());assert.equal(nodeRef,null);assert.equal(object.current,null);
const Graphic=createIcon({d:'M0 0h24v24z',defaultProps:{size:'xs'}});
const app=h(IconPropsProvider,{value:{tone:'success'}},h(Graphic,{label:'Ready',size:{md:'xl'}}));container.innerHTML=renderToString(app);const before=container.firstChild;
let hydrated;await act(()=>{hydrated=hydrateRoot(container,app);});assert.equal(container.firstChild,before);assert.equal(before.tagName,'svg');assert.equal(before.getAttribute('aria-label'),'Ready');assert.equal(before.getAttribute('data-size'),'md');assert.equal(before.getAttribute('data-size-md'),'xl');assert.equal(before.getAttribute('data-tone'),'success');
await act(()=>hydrated.unmount());console.error=original;assert.deepEqual(errors,[]);console.log('React '+React.version+': mounted refs, detach/cleanup, replacement, StrictMode, events, Atom owner and hydration passed');
`);
  console.log(run(['node','verify.mjs'],dir).trim());
 }
} finally {await rm(temp,{recursive:true,force:true});}
