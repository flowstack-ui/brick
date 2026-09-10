import { ArrowLeft } from "lucide-react";
import { CloseButton, Button, Dialog, For, HStack, LocaleProvider, Popover, Text, VStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
export const closeButtonScenarios = [
  {id:"close-button.sizes",number:1,title:"Sizes",description:"The complete IconButton scale without independent close geometry."},
  {id:"close-button.naming",number:2,title:"Naming and state",description:"Localized fallback, explicit names, disabled and loading states."},
  {id:"close-button.dialog",number:3,title:"Dialog composition",description:"The close owner retains dismissal and focus restoration."},
  {id:"close-button.variants",number:4,title:"Variants and custom icon",description:"Shared action recipes and an explicitly named alternate glyph."},
  {id:"close-button.popover",number:5,title:"Popover composition",description:"The same visual close action in a smaller contextual overlay."},
] as const;
export function CloseButtonPage(){return <VStack gap="6" data-component-page="close-button">
  <Scenario {...closeButtonScenarios[0]}><Specimen label="Close sizes"><HStack gap="3" wrap data-testid="close-sizes"><For each={["2xs","xs","sm","md","lg","xl","2xl"] as const}>{size=><CloseButton key={size} size={size} aria-label={`Close ${size}`}/>}</For></HStack></Specimen></Scenario>
  <Scenario {...closeButtonScenarios[1]}><Specimen label="Names and states"><HStack gap="3"><LocaleProvider locale="fr" localeText={{close:"Fermer"}}><CloseButton/></LocaleProvider><CloseButton disabled aria-label="Unavailable close"/><CloseButton loading aria-label="Closing"/><CloseButton size={{lg:"sm"}} aria-label="Responsive close"/></HStack></Specimen></Scenario>
  <Scenario {...closeButtonScenarios[2]}><Specimen label="Settings"><Dialog.Root><Dialog.Trigger asChild><Button>Open settings</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay/><Dialog.Content><Dialog.Header><Dialog.Title>Settings</Dialog.Title></Dialog.Header><Dialog.Body><Text>Adjust workspace preferences.</Text></Dialog.Body><Dialog.Close placement="corner" asChild><CloseButton size="sm" aria-label="Close settings"/></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root></Specimen></Scenario>
  <Scenario {...closeButtonScenarios[3]}><HStack gap="4" wrap><For each={["solid", "soft", "outline", "ghost"] as const}>{variant => <Specimen key={variant} label={variant}><CloseButton variant={variant} aria-label={`Dismiss ${variant}`} /></Specimen>}</For><Specimen label="Custom glyph"><CloseButton aria-label="Return to settings"><ArrowLeft /></CloseButton></Specimen></HStack></Scenario>
  <Scenario {...closeButtonScenarios[4]}><Specimen label="Help"><Popover.Root><Popover.Trigger asChild><Button variant="outline">Open quick help</Button></Popover.Trigger><Popover.Portal><Popover.Content><Popover.Header><Popover.Title>Quick help</Popover.Title></Popover.Header><Popover.Body><Text>Changes are saved automatically.</Text></Popover.Body><Popover.Footer><Popover.Close asChild><CloseButton aria-label="Dismiss quick help" /></Popover.Close></Popover.Footer></Popover.Content></Popover.Portal></Popover.Root></Specimen></Scenario>
</VStack>;}
