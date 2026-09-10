import { useRef, useState } from "react";
import { Archive, Share2, Trash2 } from "lucide-react";
import { ActionBar, Button, CloseButton, Dialog, For, FormatNumber, HStack, Icon,
  Input, LocaleProvider, Popover, Text, VStack, type ActionBarPlacement } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const actionBarScenarios = [
  { id:"action-bar.basic", number:1, title:"Selection actions", description:"A selection-driven bar preserves focus and leaves selection state with the application." },
  { id:"action-bar.close", number:2, title:"Close trigger", description:"Close requests dismissal; it does not delete selected files." },
  { id:"action-bar.placement", number:3, title:"Placements", description:"Bottom center, logical start and logical end use the same content." },
  { id:"action-bar.dialog", number:4, title:"Confirmation dialog", description:"A destructive action opens a dialog above the bar and restores focus." },
  { id:"action-bar.nested", number:5, title:"Nested popover", description:"Nested contextual content remains owned by its overlay." },
  { id:"action-bar.controller", number:6, title:"Context and uncontrolled state", description:"The public Context controls an uncontrolled root without a second store." },
  { id:"action-bar.outside", number:7, title:"Outside dismissal", description:"This example dismisses when focus or a pointer moves outside." },
  { id:"action-bar.focus", number:8, title:"Explicit initial focus", description:"This example opts into focusing the selection action." },
  { id:"action-bar.retained", number:9, title:"Retained content", description:"A draft input retains state across closing and reopening." },
  { id:"action-bar.inline", number:10, title:"Inline rendering", description:"Portal is disabled while the positioner still owns viewport placement." },
  { id:"action-bar.localized", number:11, title:"Long localized content", description:"Long labels wrap within viewport gutters instead of clipping." },
  { id:"action-bar.states", number:12, title:"Loading and disabled", description:"Action controls preserve centered loader geometry." },
  { id:"action-bar.rtl", number:13, title:"Right to left", description:"Logical placement and count formatting follow the locale." },
  { id:"action-bar.modal", number:14, title:"Optional modal behavior", description:"Modal mode is explicit; ordinary selection bars remain nonmodal." },
] as const;

function Example({ kind, placement = "bottom" }: { kind: string; placement?: ActionBarPlacement }) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("No action performed.");
  const initial = useRef<HTMLButtonElement>(null);
  const isLong = kind === "localized";
  return <VStack gap="3" align="start">
    <ActionBar.Root {...(kind === "controller" ? {} : { open, onOpenChange:setOpen })}
      modal={kind === "modal"} closeOnInteractOutside={kind === "outside"}
      unmountOnExit={kind !== "retained"}>
      <ActionBar.Context>{state => <Button size="sm" variant="outline" onClick={() => state.setOpen(true)}>
        {`Open ${kind}${kind === "placement" ? ` ${placement}` : ""}`}
      </Button>}</ActionBar.Context>
      <ActionBar.Portal disabled={kind === "inline"}>
        <ActionBar.Positioner placement={placement} dir={kind === "rtl" ? "rtl" : undefined}>
          <ActionBar.Content aria-label={`File actions ${kind}`} initialFocus={kind === "focus" || kind === "modal" ? initial : false}>
            <ActionBar.SelectionTrigger ref={initial} onPress={() => setResult("Selection details requested.")}>
              <FormatNumber value={2} /> {isLong ? "ausgewählte Projektdateien" : "selected"}
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            {kind === "retained" ? <Input size="sm" aria-label="Retained draft" placeholder="Draft note" /> : null}
            {kind === "dialog" ? <Dialog.Root>
              <Dialog.Trigger asChild><Button size="sm" variant="soft" tone="danger" startIcon={<Trash2 />}>Delete</Button></Dialog.Trigger>
              <Dialog.Portal><Dialog.Overlay /><Dialog.Content>
                <Dialog.Header><Dialog.Title>Delete selected files?</Dialog.Title></Dialog.Header>
                <Dialog.Body><Text>This action affects two selected files.</Text></Dialog.Body>
                <Dialog.Footer><Dialog.Close asChild><Button variant="outline" tone="neutral">Cancel deletion</Button></Dialog.Close>
                  <Dialog.Close asChild><Button tone="danger" onPress={() => setResult("Two files deleted.")}>Confirm deletion</Button></Dialog.Close></Dialog.Footer>
              </Dialog.Content></Dialog.Portal>
            </Dialog.Root> : <Button size="sm" variant="outline" tone="neutral" startIcon={<Archive />} loading={kind === "states"} onPress={() => setResult("Two files archived.")}>
              {isLong ? "Ausgewählte Dateien archivieren" : "Archive"}
            </Button>}
            {kind === "nested" ? <Popover.Root><Popover.Trigger asChild><Button size="sm" variant="outline">Share options</Button></Popover.Trigger>
              <Popover.Portal><Popover.Content><Popover.Header><Popover.Title>Sharing options</Popover.Title></Popover.Header>
                <Popover.Body><Button size="sm" onPress={() => setResult("Link copied.")}>Copy link</Button></Popover.Body></Popover.Content></Popover.Portal>
            </Popover.Root> : <Button size="sm" variant="outline" tone="neutral" startIcon={<Share2 />} disabled={kind === "states"} loading={kind === "states"} onPress={() => setResult("Sharing requested.")}>
              {isLong ? "Mit dem gesamten Projektteam teilen" : "Share"}
            </Button>}
            <ActionBar.CloseTrigger asChild><CloseButton size="sm" aria-label={`Close ${kind} actions`} /></ActionBar.CloseTrigger>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Portal>
    </ActionBar.Root>
    <Text role="status" variant="body-sm">{result}</Text>
  </VStack>;
}

export function ActionBarPage() {
  return <VStack gap="6" data-component-page="action-bar"><For each={actionBarScenarios}>{scenario => {
    const kind = scenario.id.split(".")[1]!;
    return <Scenario {...scenario} key={scenario.id}><Specimen label={scenario.title}>
      {kind === "placement" ? <HStack gap="3" wrap><For each={["bottom","bottom-start","bottom-end"] as const}>{placement =>
        <Example kind={kind} placement={placement} key={placement} />}</For></HStack> : kind === "rtl" ?
        <LocaleProvider locale="ar"><Example kind={kind} placement="bottom-start" /></LocaleProvider> : <Example kind={kind} />}
    </Specimen></Scenario>;
  }}</For></VStack>;
}
