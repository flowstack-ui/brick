import { useRef, useState } from "react";
import { Appearance, Button, CloseButton, Dialog, Drawer, DropdownMenu, FloatingPanel, For, FormatNumber,
  HStack, Input, LocaleProvider, Text, VStack, createOverlay, type OverlayLifecycleProps } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const overlayManagerScenarios = [
  {id:"overlay-manager.dialog",number:1,title:"Managed dialog",description:"One Viewport hosts an imperative dialog without replacing its focus or dismissal behavior."},
  {id:"overlay-manager.drawer",number:2,title:"Managed drawer",description:"The same lifecycle contract drives a standard Drawer."},
  {id:"overlay-manager.result",number:3,title:"Typed result",description:"Accept resolves a typed result; dismissal resolves undefined."},
  {id:"overlay-manager.update",number:4,title:"Live properties",description:"Updating a title preserves the draft input and mounted identity."},
  {id:"overlay-manager.exit",number:5,title:"Result and exit",description:"A result settles at close; exit completion settles after the visual primitive finishes."},
  {id:"overlay-manager.multiple",number:6,title:"Independent IDs",description:"Open a second entry from the first; closing it reveals the earlier dialog."},
  {id:"overlay-manager.reopen",number:7,title:"Duplicate and reopen",description:"Duplicate open updates one entry; reopening an exiting ID starts a fresh generation."},
  {id:"overlay-manager.remove",number:8,title:"Immediate removal",description:"Remove and removeAll bypass animation and settle pending results and exits."},
  {id:"overlay-manager.focus",number:9,title:"Focus handoff",description:"An explicit persistent return target supports transient launchers."},
  {id:"overlay-manager.form",number:10,title:"Form-owned dismissal",description:"The authored form may reject dismissal while a draft is incomplete."},
  {id:"overlay-manager.providers",number:11,title:"Local providers",description:"A Viewport inherits locale context; an Appearance boundary on the portalled host owns its semantic colors."},
  {id:"overlay-manager.hosts",number:12,title:"Host lifetime",description:"Unmounting an independent host settles its pending requests."},
  {id:"overlay-manager.panel",number:13,title:"Managed floating panel",description:"A nonmodal inspector uses the same typed result and exit orchestration."},
  {id:"overlay-manager.content",number:14,title:"Long content",description:"Ordinary Dialog sizing, scrolling and reduced motion remain owned by Brick."},
] as const;

type EntryProps = { id:string; title:string };
function Example({kind}:{kind:string}) {
  const [events,setEvents]=useState("No overlay opened."), [mounted,setMounted]=useState(true);
  const returnTarget=useRef<HTMLButtonElement>(null);
  // One factory per example lifetime, not one factory on every render.
  const [manager]=useState(()=>createOverlay<EntryProps,"accepted">(function Managed({id,title,open,onOpenChange,onExitComplete}:EntryProps&OverlayLifecycleProps){
    const [draft,setDraft]=useState("");
    const finish=()=>{
      void manager.close(id,"accepted").then(()=>setEvents(previous=>`${previous} Exit complete.`));
    };
    const actions=<HStack gap="2" wrap>
      <Button size="sm" variant="outline" onPress={()=>onOpenChange(false)}>Cancel</Button>
      <Button size="sm" onPress={finish}>Accept</Button>
      {kind==="update"?<Button size="sm" variant="outline" onPress={()=>manager.update(id,{title:"Updated workspace"})}>Update title</Button>:null}
      {kind==="multiple"?<Button size="sm" onPress={()=>void manager.open("second",{id:"second",title:"Second workspace"})}>Open second</Button>:null}
      {kind==="reopen"?<><Button size="sm" variant="outline" onPress={()=>void manager.open(id,{id,title:"Same mounted workspace"})}>Open same ID</Button><Button size="sm" variant="outline" onPress={()=>{void manager.close(id);void manager.open(id,{id,title:"Reopened workspace"});}}>Close and reopen</Button></>:null}
      {kind==="remove"?<><Button size="sm" variant="outline" onPress={()=>manager.remove(id)}>Remove immediately</Button><Button size="sm" variant="outline" onPress={()=>manager.removeAll()}>Remove all</Button></>:null}
    </HStack>;
    const body=<VStack gap="3"><Text>Review this workspace before applying changes.</Text>
      <Input aria-label="Workspace draft" value={draft} onChange={event=>setDraft(event.target.value)}/>
      {kind==="form"?<Text variant="body-sm">Enter a workspace name to enable dismissal. Accept explicitly submits it.</Text>:null}
      {kind==="providers"?<Text><FormatNumber value={123456.78}/></Text>:null}
      {kind==="content"?<For each={Array.from({length:16},(_,index)=>index+1)}>{number=><Text key={number}>Workspace preference {number}: shared application settings can be reviewed independently before confirming this change.</Text>}</For>:null}
      {kind==="hosts"?<Button size="sm" onPress={()=>setMounted(false)}>Dispose this host</Button>:null}
    </VStack>;
    const lifecycle={open,onOpenChange:(next:boolean)=>{if(kind!=="form"||draft.trim()||next)onOpenChange(next);},onExitComplete};
    if(kind==="panel")return <FloatingPanel.Root {...lifecycle} allowOverflow={false}><FloatingPanel.Portal><FloatingPanel.Positioner><FloatingPanel.Content>
      <FloatingPanel.Header><FloatingPanel.DragTrigger><FloatingPanel.Title>{title}</FloatingPanel.Title></FloatingPanel.DragTrigger><FloatingPanel.CloseTrigger asChild><CloseButton size="xs"/></FloatingPanel.CloseTrigger></FloatingPanel.Header>
      <FloatingPanel.Body><VStack gap="3">{body}{actions}</VStack></FloatingPanel.Body><FloatingPanel.ResizeTriggers/>
    </FloatingPanel.Content></FloatingPanel.Positioner></FloatingPanel.Portal></FloatingPanel.Root>;
    if(kind==="drawer")return <Drawer.Root {...lifecycle}><Drawer.Portal><Drawer.Overlay/><Drawer.Content><Drawer.Header><Drawer.Title>{title}</Drawer.Title></Drawer.Header><Drawer.Body>{body}</Drawer.Body><Drawer.Footer>{actions}</Drawer.Footer></Drawer.Content></Drawer.Portal></Drawer.Root>;
    return <Dialog.Root {...lifecycle}><Dialog.Portal><Dialog.Overlay/><Appearance value={kind==="providers"?"dark":"inherit"}><Dialog.Content finalFocus={kind==="focus"?returnTarget:undefined}>
      <Dialog.Header><Dialog.Title>{title}</Dialog.Title></Dialog.Header><Dialog.Body>{body}</Dialog.Body><Dialog.Footer>{actions}</Dialog.Footer>
    </Dialog.Content></Appearance></Dialog.Portal></Dialog.Root>;
  }));
  const launch=()=>{
    setEvents("Opened.");
    void manager.open("workspace",{id:"workspace",title:`Workspace ${kind}`}).then(result=>setEvents(`Result: ${result??"dismissed"}.`));
    if(kind==="exit")void manager.waitForExit("workspace").then(()=>setEvents(previous=>`${previous} waitForExit complete.`));
  };
  return <VStack gap="3" align="start">
    {kind==="focus"?<DropdownMenu.Root><DropdownMenu.Trigger asChild><Button size="sm" variant="outline" ref={returnTarget}>Workspace commands</Button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content ariaLabel="Workspace commands"><DropdownMenu.Item value="edit" onSelect={launch}><DropdownMenu.ItemLabel>Edit workspace</DropdownMenu.ItemLabel></DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>:<Button size="sm" variant="outline" ref={returnTarget} disabled={!mounted} onPress={launch}>{`Open ${kind}`}</Button>}
    {!mounted?<Button size="sm" onPress={()=>setMounted(true)}>Remount host</Button>:null}
    <Text role="status" variant="body-sm">{events}</Text>
    {mounted?<LocaleProvider locale={kind==="providers"?"de-DE":"en-US"}><manager.Viewport/></LocaleProvider>:null}
  </VStack>;
}

export function OverlayManagerPage(){return <VStack gap="6" data-component-page="overlay-manager"><For each={overlayManagerScenarios}>{scenario=><Scenario {...scenario} key={scenario.id}><Specimen label={scenario.title}><Example kind={scenario.id.split(".")[1]!}/></Specimen></Scenario>}</For></VStack>;}
