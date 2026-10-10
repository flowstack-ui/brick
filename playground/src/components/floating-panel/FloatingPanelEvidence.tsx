import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, Minus, Settings } from "lucide-react";
import { Appearance, Button, CloseButton, Dialog, FloatingPanel, For, Frame, Grid, HStack, IconButton, Input,
  NumberInput, Popover, Text, VStack, useFloatingPanel, type FloatingPanelOptions } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const floatingPanelScenarios = [
  {id:"floating-panel.basic",number:1,title:"Complete inspector",description:"Compact header, independent controls and discoverable geometry settings."},
  {id:"floating-panel.controlled-open",number:2,title:"Controlled disclosure",description:"The parent may reject a close request without losing the panel."},
  {id:"floating-panel.store",number:3,title:"External controller",description:"The hook and RootProvider share the same panel, not a second state store."},
  {id:"floating-panel.stages",number:4,title:"Window stages",description:"Minimize, maximize and restore preserve the normal rectangle."},
  {id:"floating-panel.multiple",number:5,title:"Several panels",description:"Open three inspectors and activate them independently."},
  {id:"floating-panel.triggerless",number:6,title:"Programmatic opening",description:"A controller command opens a tool without a Trigger part."},
  {id:"floating-panel.context",number:7,title:"Context commands",description:"Controls inside the panel consume its public Context."},
  {id:"floating-panel.drag",number:8,title:"Drag policy",description:"Disable dragging or interact with no-drag header content."},
  {id:"floating-panel.disabled",number:9,title:"Unavailable controls",description:"Resize and all panel actions can be disabled independently."},
  {id:"floating-panel.axes",number:10,title:"Resize axes",description:"Eight physical handles or a selected south/east subset."},
  {id:"floating-panel.constraints",number:11,title:"Geometry constraints",description:"A 280–520 by 160–400 rectangle remains within its boundary."},
  {id:"floating-panel.anchor",number:12,title:"Initial placement",description:"An authored resolver positions the panel next to the trigger."},
  {id:"floating-panel.boundary",number:13,title:"Element boundary",description:"Absolute geometry lives inside a bounded, independently scrolling host."},
  {id:"floating-panel.position",number:14,title:"Controlled position",description:"Rejected proposals leave accepted x/y unchanged; completion reports accepted values."},
  {id:"floating-panel.size",number:15,title:"Controlled size",description:"Rejected size proposals preserve the accepted border box."},
  {id:"floating-panel.overflow",number:16,title:"Strict containment",description:"Compare overflow permission with bounded movement and recover through settings."},
  {id:"floating-panel.rtl",number:17,title:"RTL and long labels",description:"Header layout follows direction while physical arrows retain their meaning."},
  {id:"floating-panel.modifiers",number:18,title:"Grid and modifiers",description:"Movement snaps to eight pixels; Shift locks ratio and Alt resizes around the center."},
  {id:"floating-panel.keyboard",number:19,title:"Non-drag settings",description:"Arrow keys and precise numeric controls offer movement and resize alternatives."},
  {id:"floating-panel.focus",number:20,title:"Focus and nesting",description:"Editable content, nested popover and a blocking confirmation preserve focus ownership."},
  {id:"floating-panel.presence",number:21,title:"Retained lifetime",description:"An uncontrolled draft remains mounted after closing; reopen while exiting."},
  {id:"floating-panel.appearance",number:22,title:"Appearance and bounds",description:"Light and dark panels share semantic paint, borders and geometry."},
  {id:"floating-panel.content",number:23,title:"Long content and actions",description:"Body scrolling leaves the compact header and its controls reachable."},
  {id:"floating-panel.environment",number:24,title:"Explicit portal container",description:"Rendering in a named local portal target preserves its environment."},
] as const;

function PanelExample({kind,name=kind,dark=false,config={},hideTrigger=false}:{kind:string;name?:string;dark?:boolean;config?:FloatingPanelOptions;hideTrigger?:boolean}) {
  const [open,setOpen]=useState(false), [reject,setReject]=useState(false), [flag,setFlag]=useState(false), [settings,setSettings]=useState(false);
  const [event,setEvent]=useState("No completed geometry change.");
  const boundary=useRef<HTMLElement>(null), final=useRef<HTMLButtonElement>(null);
  const bounded=kind==="boundary"||kind==="environment";
  const options:FloatingPanelOptions={open,onOpenChange:next=>{if(kind!=="controlled-open"||!reject)setOpen(next);},
    ...(kind==="position"&&reject?{position:{x:80,y:100}}:{}),
    ...(kind==="size"&&reject?{size:{width:360,height:260}}:{}),
    ...(kind==="constraints"?{minSize:{width:280,height:160},maxSize:{width:520,height:400}}:{}),
    ...(kind==="drag"?{draggable:!flag}:{}),...(kind==="disabled"?{resizable:!flag,disabled:reject}:{}),
    ...(kind==="modifiers"?{gridSize:8,lockAspectRatio:flag}:{}),
    ...(kind==="overflow"?{allowOverflow:flag}:{allowOverflow:false}),
    ...(kind==="presence"?{unmountOnExit:false,lazyMount:!flag}:{}),
    ...(kind==="rtl"?{dir:"rtl",translations:{close:"إغلاق اللوحة",minimize:"تصغير",maximize:"تكبير",restore:"استعادة",move:"تحريك اللوحة",resize:"تغيير الحجم"}}:{}),
    ...(kind==="anchor"?{getAnchorPosition:({triggerRect})=>({x:triggerRect?.left??32,y:Math.min((triggerRect?.bottom??32)+8,window.innerHeight-260)})}:{}),
    ...(bounded?{strategy:"absolute",getBoundaryEl:()=>boundary.current,defaultPosition:{x:8,y:8},defaultSize:{width:320,height:220}}:{}),
    finalFocus:final,onPositionChangeEnd:(p,d)=>setEvent(`${d.reason}: accepted x ${Math.round(p.x)}, y ${Math.round(p.y)}`),
    onSizeChangeEnd:(s,d)=>setEvent(`${d.reason}: accepted ${Math.round(s.width)} × ${Math.round(s.height)}`),...config};
  const controller=useFloatingPanel(options);
  const body=<FloatingPanel.RootProvider value={controller}>
    <HStack gap="3" wrap>
      {hideTrigger?null:kind==="triggerless"?<Button size="sm" ref={final} onPress={()=>setOpen(true)}>{`Open ${name}`}</Button>:<FloatingPanel.Trigger asChild><Button size="sm" ref={final} variant="outline">{`Open ${name}`}</Button></FloatingPanel.Trigger>}
      {["controlled-open","position","size","disabled"].includes(kind)?<Button size="sm" variant="outline" aria-pressed={reject} onPress={()=>setReject(v=>!v)}>{reject?"Accept changes":"Reject changes"}</Button>:null}
      {["drag","disabled","axes","overflow","modifiers","presence"].includes(kind)?<Button size="sm" variant="outline" aria-pressed={flag} onPress={()=>setFlag(v=>!v)}>Toggle policy</Button>:null}
      {kind==="store"?<Button size="sm" variant="outline" onPress={()=>controller.setPosition({x:24,y:24})}>Position externally</Button>:null}
      {kind==="overflow"?<Button size="sm" variant="outline" onPress={()=>controller.setPosition({x:24,y:24})}>Recover panel</Button>:null}
    </HStack>
    <FloatingPanel.Portal container={bounded?boundary.current:null}>
      <Appearance value={dark?"dark":"inherit"}><FloatingPanel.Positioner>
        <FloatingPanel.Content aria-label={`Inspector ${name}`} render={kind==="content"?<section/>:undefined}>
          <FloatingPanel.Header>
            <FloatingPanel.DragTrigger><FloatingPanel.Title>{kind==="rtl"?"إعدادات مساحة العمل والمظهر والتخطيط":"Workspace inspector"}</FloatingPanel.Title>{kind==="drag"?<Input data-no-drag size="xs" aria-label="Header filter" placeholder="Filter"/>:null}</FloatingPanel.DragTrigger>
            <FloatingPanel.Control>
              <IconButton size="xs" aria-label={`Geometry settings ${name}`} onPress={()=>setSettings(v=>!v)}><Settings/></IconButton>
              <FloatingPanel.StageTrigger stage="minimized" asChild><IconButton size="xs" aria-label={`Minimize ${name}`}><Minus/></IconButton></FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="maximized" asChild><IconButton size="xs" aria-label={`Maximize ${name}`}><Maximize2/></IconButton></FloatingPanel.StageTrigger>
              <FloatingPanel.StageTrigger stage="default" asChild><IconButton size="xs" aria-label={`Restore ${name}`}><Minimize2/></IconButton></FloatingPanel.StageTrigger>
              <FloatingPanel.CloseTrigger asChild><CloseButton size="xs" aria-label={`Close ${name}`}/></FloatingPanel.CloseTrigger>
            </FloatingPanel.Control>
          </FloatingPanel.Header>
          <FloatingPanel.Body><VStack gap="3">
            <FloatingPanel.Description>Adjust the selected workspace without leaving your current task.</FloatingPanel.Description>
            <Input size="sm" aria-label={`Workspace name ${name}`} defaultValue="Design workspace"/>
            {settings||kind==="keyboard"?<Grid.Root columns={2} gap="3"><For each={["x","y","width","height"] as const}>{key=><VStack key={key} gap="1">
              <Text variant="caption">{key}</Text><NumberInput.Root size="sm" value={key==="x"||key==="y"?controller.position[key]:controller.size[key]} min={key==="width"||key==="height"?1:undefined} onValueChange={value=>{
                if(value===null)return;
                key==="x"||key==="y"?controller.setPosition({...controller.position,[key]:value}):controller.setSize({...controller.size,[key]:value});
              }}><NumberInput.Input aria-label={`${name} ${key}`}/><NumberInput.Increment aria-label={`Increase ${name} ${key}`}/><NumberInput.Decrement aria-label={`Decrease ${name} ${key}`}/></NumberInput.Root>
            </VStack>}</For></Grid.Root>:null}
            {kind==="context"?<FloatingPanel.Context>{c=><Button size="sm" onPress={()=>c.setSize({width:400,height:320})}>Resize through Context</Button>}</FloatingPanel.Context>:null}
            {kind==="focus"?<HStack gap="2" wrap><Popover.Root><Popover.Trigger asChild><Button size="sm" variant="outline">Open inspector options</Button></Popover.Trigger><Popover.Portal><Popover.Content><Popover.Header><Popover.Title>Inspector options</Popover.Title></Popover.Header><Popover.Body><Input aria-label="Option name"/></Popover.Body></Popover.Content></Popover.Portal></Popover.Root>
              <Dialog.Root><Dialog.Trigger asChild><Button size="sm">Confirm workspace change</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay/><Dialog.Content><Dialog.Header><Dialog.Title>Apply workspace changes?</Dialog.Title></Dialog.Header><Dialog.Body><Text>Your current view will stay open.</Text></Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button variant="outline">Cancel confirmation</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root></HStack>:null}
            {kind==="content"?<><For each={Array.from({length:12},(_,i)=>i+1)}>{n=><Text key={n}>Workspace preference {n}: inherited from the team configuration.</Text>}</For><HStack gap="2"><Button size="sm" loading>Saving</Button><Button size="sm" loading disabled>Unavailable</Button></HStack></>:null}
          </VStack></FloatingPanel.Body>
          <FloatingPanel.ResizeTriggers axes={kind==="axes"&&flag?["s","e","se"]:undefined}/>
        </FloatingPanel.Content>
      </FloatingPanel.Positioner></Appearance>
    </FloatingPanel.Portal>
    <Text variant="caption" role="status">{event}</Text>
  </FloatingPanel.RootProvider>;
  return bounded?<Frame ref={boundary} blockSize={360} inlineSize="100%" style={{position:"relative",overflow:"auto"}}>{body}</Frame>:body;
}

function EnvironmentExample({shadow=false}:{shadow?:boolean}) {
  const host=useRef<HTMLElement>(null);
  const [target,setTarget]=useState<HTMLElement|null>(null);
  function prepare(root:ShadowRoot|HTMLElement){
    const existing=root.querySelector<HTMLElement>('[data-panel-document]');
    if(existing){setTarget(existing);return;}
    // Demo document setup, not FloatingPanel behavior. A real application loads
    // its own theme/styles into the rendering document or shadow tree.
    const document=root.ownerDocument;
    for(const style of window.document.querySelectorAll('link[rel="stylesheet"],style'))root.appendChild(style.cloneNode(true));
    const content=document.createElement("div");content.dataset.panelDocument="";root.appendChild(content);setTarget(content);
  }
  useEffect(()=>{if(shadow&&host.current){const root=host.current.shadowRoot??host.current.attachShadow({mode:"open"});prepare(root);}},[shadow]);
  return <VStack gap="3">
    {shadow?<Frame ref={host} inlineSize="100%"/>:<iframe title="Independent panel document" srcDoc="<!doctype html><html><head></head><body></body></html>" style={{width:"100%",height:460,border:0}} onLoad={event=>{const body=event.currentTarget.contentDocument?.body;if(body)prepare(body);}}/>}
    {target?<FloatingPanel.Portal container={target}><PanelExample kind="environment" name={shadow?"shadow root":"iframe"}/></FloatingPanel.Portal>:null}
  </VStack>;
}

function PresenceExamples(){
  const [present,setPresent]=useState<boolean|undefined>(undefined);
  return <VStack gap="3" align="start">
    <PanelExample kind="presence"/>
    <PanelExample kind="presence" name="immediate unmount" config={{immediate:true,unmountOnExit:true,lazyMount:true,skipAnimationOnMount:true}}/>
    <Button size="sm" variant="outline" onPress={()=>setPresent(value=>value===false?undefined:false)}>{present===false?"Restore presentation":"Suppress presentation"}</Button>
    <PanelExample kind="presence" name="presentation override" config={{present}}/>
    <PanelExample kind="presence" name="activity retention" config={{hideMode:"activity",unmountOnExit:false,lazyMount:false}}/>
  </VStack>;
}

function PanelInDialog(){return <Dialog.Root><Dialog.Trigger asChild><Button size="sm" variant="outline">Open inspector workspace dialog</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay/><Dialog.Content>
  <Dialog.Header><Dialog.Title>Inspector workspace dialog</Dialog.Title></Dialog.Header><Dialog.Body><PanelExample kind="focus" name="modal inspector" config={{closeOnEscape:true}}/></Dialog.Body>
  <Dialog.Footer><Dialog.Close asChild><Button variant="outline">Close workspace dialog</Button></Dialog.Close></Dialog.Footer>
</Dialog.Content></Dialog.Portal></Dialog.Root>;}

function DelayedPositionExample(){
  const [position,setPosition]=useState({x:40,y:80});
  const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  return <PanelExample kind="store" name="delayed position" config={{position,onPositionChange:next=>{
    clearTimeout(timer.current);timer.current=setTimeout(()=>setPosition(next),200);
  }}}/>;
}

function RemovedTriggerExample(){
  const [removed,setRemoved]=useState(false);
  const fallback=useRef<HTMLButtonElement>(null);
  return <VStack gap="3" align="start">
    <Button ref={fallback} size="sm" variant="outline" onPress={()=>setRemoved(value=>!value)}>{removed?"Restore inspector launcher":"Remove inspector launcher"}</Button>
    <PanelExample kind="focus" name="removed launcher" hideTrigger={removed} config={{finalFocus:fallback,closeOnEscape:true}}/>
  </VStack>;
}

export function FloatingPanelEvidence() {
  return <VStack gap="6" data-component-page="floating-panel"><For each={floatingPanelScenarios}>{scenario=>{
    const kind=scenario.id.split(".")[1]!;
    return <Scenario {...scenario} key={scenario.id}><Specimen label={scenario.title}>
      {kind==="multiple"?<HStack gap="3" wrap><For each={["one","two","three"]}>{name=><PanelExample key={name} kind={kind} name={name}/>}</For></HStack>
        :kind==="appearance"?<HStack gap="3" wrap><PanelExample kind={kind} name="light"/><PanelExample kind={kind} name="dark" dark/></HStack>
        :kind==="presence"?<PresenceExamples/>
        :kind==="focus"?<VStack gap="3"><PanelExample kind={kind}/><PanelInDialog/><RemovedTriggerExample/></VStack>
        :kind==="position"?<VStack gap="3"><PanelExample kind={kind}/><DelayedPositionExample/></VStack>
        :kind==="environment"?<VStack gap="4"><PanelExample kind={kind}/><EnvironmentExample/><EnvironmentExample shadow/></VStack>
        :kind==="modifiers"?<VStack gap="4"><PanelExample kind={kind}/><Frame style={{transform:"scale(.75)",transformOrigin:"top left"}} inlineSize="100%"><PanelExample kind="boundary" name="scaled boundary" config={{scale:.75}}/></Frame></VStack>
        :kind==="constraints"?<VStack gap="4"><PanelExample kind={kind}/><Frame inlineSize={220}><PanelExample kind="boundary" name="small boundary" config={{minSize:{width:280,height:420},allowOverflow:false}}/></Frame></VStack>
        :kind==="anchor"?<VStack gap="3"><PanelExample kind={kind}/><PanelExample kind={kind} name="explicit position" config={{defaultPosition:{x:24,y:24}}}/><PanelExample kind={kind} name="persistent rectangle" config={{persistRect:true}}/></VStack>
        :<PanelExample kind={kind}/>}
    </Specimen></Scenario>;
  }}</For></VStack>;
}
