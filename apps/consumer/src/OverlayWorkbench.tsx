import { useState } from "react";
import { Button } from "@flowstack-ui/brick/button";
import { CloseButton } from "@flowstack-ui/brick/close-button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { FloatingPanel, useFloatingPanel } from "@flowstack-ui/brick/floating-panel";
import { createOverlay, type OverlayLifecycleProps } from "@flowstack-ui/brick/overlay-manager";
import { Input } from "@flowstack-ui/brick/input";
import { NumberInput } from "@flowstack-ui/brick/number-input";
import { For } from "@flowstack-ui/brick/for";
import { Grid } from "@flowstack-ui/brick/grid";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Surface } from "@flowstack-ui/brick/surface";
import { Heading, Text } from "@flowstack-ui/brick/text";

function Inspector({name,onSave}:{name:string;onSave:(draft:string)=>void}){
  const [draft,setDraft]=useState(name),[settings,setSettings]=useState(false),[reject,setReject]=useState(false);
  const [size,setSize]=useState({width:360,height:360});
  const panel=useFloatingPanel({size,onSizeChange:next=>{if(!reject)setSize(next);},allowOverflow:false,persistRect:true});
  return <FloatingPanel.RootProvider value={panel}>
    <FloatingPanel.Trigger asChild><Button variant="outline" size="sm">{`Inspect ${name}`}</Button></FloatingPanel.Trigger>
    <FloatingPanel.Portal><FloatingPanel.Positioner><FloatingPanel.Content aria-label={`${name} inspector`}>
      <FloatingPanel.Header><FloatingPanel.DragTrigger><FloatingPanel.Title>{name}</FloatingPanel.Title></FloatingPanel.DragTrigger><FloatingPanel.Control>
        <FloatingPanel.StageTrigger stage="minimized" asChild><Button size="xs" variant="ghost" aria-label={`Minimize ${name}`}>Minimize</Button></FloatingPanel.StageTrigger>
        <FloatingPanel.StageTrigger stage="default" asChild><Button size="xs" variant="ghost" aria-label={`Restore ${name}`}>Restore</Button></FloatingPanel.StageTrigger>
        <FloatingPanel.CloseTrigger asChild><CloseButton size="xs" aria-label={`Close ${name}`}/></FloatingPanel.CloseTrigger>
      </FloatingPanel.Control></FloatingPanel.Header>
      <FloatingPanel.Body><VStack gap="3">
        <FloatingPanel.Description>Edit this workspace item while keeping the application available.</FloatingPanel.Description>
        <Input aria-label={`${name} title`} value={draft} onChange={event=>setDraft(event.target.value)}/>
        <HStack gap="2" wrap><Button size="sm" onPress={()=>onSave(draft)}>{`Save ${name}`}</Button><Button size="sm" variant="outline" onPress={()=>setSettings(value=>!value)}>Geometry</Button></HStack>
        <Button size="sm" variant="outline" aria-pressed={reject} onPress={()=>setReject(value=>!value)}>{reject?"Accept resize":"Reject resize"}</Button>
        {settings?<Grid.Root columns={2} gap="2"><For each={["x","y","width","height"] as const}>{key=><VStack key={key} gap="1"><Text variant="caption">{key}</Text><NumberInput.Root size="sm" value={key==="x"||key==="y"?panel.position[key]:panel.size[key]} onValueChange={value=>{if(value===null)return;key==="x"||key==="y"?panel.setPosition({...panel.position,[key]:value}):panel.setSize({...panel.size,[key]:value});}}><NumberInput.Input aria-label={`${name} ${key}`}/><NumberInput.Increment/><NumberInput.Decrement/></NumberInput.Root></VStack>}</For></Grid.Root>:null}
      </VStack></FloatingPanel.Body><FloatingPanel.ResizeTriggers/>
    </FloatingPanel.Content></FloatingPanel.Positioner></FloatingPanel.Portal>
  </FloatingPanel.RootProvider>;
}

export function OverlayWorkbench(){
  const [status,setStatus]=useState("No workspace changes applied.");
  const [confirmation]=useState(()=>createOverlay<{draft:string},"save">(function Confirm({draft,...lifecycle}:{draft:string}&OverlayLifecycleProps){return <Dialog.Root {...lifecycle}><Dialog.Portal><Dialog.Overlay/><Dialog.Content>
    <Dialog.Header><Dialog.Title>Apply inspector changes?</Dialog.Title></Dialog.Header><Dialog.Body><Text>{`Save “${draft}” to this workspace?`}</Text></Dialog.Body>
    <Dialog.Footer><Dialog.Close asChild><Button variant="outline">Keep editing</Button></Dialog.Close><Button onPress={()=>void confirmation.close("save","save")}>Apply changes</Button></Dialog.Footer>
  </Dialog.Content></Dialog.Portal></Dialog.Root>;}));
  return <Surface as="section" inset="md" bordered><VStack gap="4"><Heading level={2} variant="title-md">Workspace inspectors</Heading>
    <HStack gap="3" wrap><For each={["Design","Content"]}>{name=><Inspector key={name} name={name} onSave={draft=>{void confirmation.open("save",{draft}).then(result=>{setStatus(result==="save"?`Saved ${draft}.`:"Changes not applied.");});}}/>}</For></HStack>
    <Text role="status">{status}</Text><confirmation.Viewport/>
  </VStack></Surface>;
}
