import { Appearance, Button, For, Frame, HStack, IconButton, Spinner, Text, Toaster, toast, VStack, ZStack } from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const spinnerScenarios = [
  { id: "spinner.basic", number: 1, title: "Basic", description: "A decorative ring beside persistent loading feedback." },
  { id: "spinner.sizes", number: 2, title: "Sizes", description: "Five fixed diameters; every ring remains square." },
  { id: "spinner.inherit", number: 3, title: "Inherited size", description: "The ring follows the surrounding text size." },
  { id: "spinner.tones", number: 4, title: "Tones", description: "Semantic paint without changing geometry." },
  { id: "spinner.emphasis", number: 5, title: "Emphasis", description: "Readable text paint compared with solid palette paint." },
  { id: "spinner.color", number: 6, title: "Custom color", description: "The documented color variable accepts a semantic token." },
  { id: "spinner.track", number: 7, title: "Track", description: "An optional track behind the rotating arc." },
  { id: "spinner.thickness", number: 8, title: "Thickness", description: "Three ring weights at the same diameter." },
  { id: "spinner.duration", number: 9, title: "Duration", description: "A local duration override; reduced motion remains static." },
  { id: "spinner.status", number: 10, title: "Localized status", description: "Visible authored text owns the polite announcement." },
  { id: "spinner.name", number: 11, title: "Graphic name", description: "An informative standalone graphic can have an authored name." },
  { id: "spinner.overlay", number: 12, title: "Contained overlay", description: "ZStack owns placement inside a bounded region." },
  { id: "spinner.actions", number: 13, title: "Action loading", description: "Existing controls retain their own loading semantics and dimensions." },
  { id: "spinner.feedback", number: 14, title: "Feedback composition", description: "A visual indicator does not create a second announcement." },
  { id: "spinner.preferences", number: 15, title: "Preferences", description: "Inspect with reduced motion and forced colors enabled." },
  { id: "spinner.appearance", number: 16, title: "Appearance and direction", description: "Matched light/dark and RTL specimens." },
] as const;

export function SpinnerPage() {
  return <VStack data-component-page="spinner" gap="6">
    <Scenario {...spinnerScenarios[0]}><Specimen label="Preparing preview"><HStack gap="3"><Spinner data-testid="spinner-basic" /><Text>Preparing preview…</Text></HStack></Specimen></Scenario>
    <Scenario {...spinnerScenarios[1]}><HStack gap="4" wrap><For each={["xs", "sm", "md", "lg", "xl"] as const}>{size => <Specimen key={size} label={size}><Spinner size={size} /></Specimen>}</For></HStack></Scenario>
    <Scenario {...spinnerScenarios[2]}><HStack gap="4" wrap><For each={["body-sm", "body-md", "body-lg"] as const}>{variant => <Specimen key={variant} label={variant}><Text variant={variant}><Spinner size="inherit" /> Preparing preview</Text></Specimen>}</For></HStack></Scenario>
    <Scenario {...spinnerScenarios[3]}><HStack gap="4" wrap><For each={["inherit", "primary", "secondary", "muted", "accent", "info", "success", "warning", "danger"] as const}>{tone => <Specimen key={tone} label={tone}><Spinner tone={tone} /></Specimen>}</For></HStack></Scenario>
    <Scenario {...spinnerScenarios[4]}><HStack gap="4"><For each={["text", "solid"] as const}>{emphasis => <Specimen key={emphasis} label={emphasis}><Spinner tone="accent" emphasis={emphasis} /></Specimen>}</For></HStack></Scenario>
    <Scenario {...spinnerScenarios[5]}><Specimen label="Custom color"><Spinner style={{ "--brick-spinner-color": "var(--brick-color-info-solid)" }} /></Specimen></Scenario>
    <Scenario {...spinnerScenarios[6]}><Specimen label="Visible track"><Spinner style={{ "--brick-spinner-track-color": "var(--brick-color-border-default)" }} /></Specimen></Scenario>
    <Scenario {...spinnerScenarios[7]}><HStack gap="4"><For each={["thin", "regular", "thick"] as const}>{thickness => <Specimen key={thickness} label={thickness}><Spinner thickness={thickness} /></Specimen>}</For></HStack></Scenario>
    <Scenario {...spinnerScenarios[8]}><Specimen label="One second"><Spinner style={{ "--brick-spinner-duration": "1s" }} /></Specimen></Scenario>
    <Scenario {...spinnerScenarios[9]}><Specimen label="French"><HStack gap="3" lang="fr"><Spinner /><Text role="status">Préparation de votre aperçu…</Text></HStack></Specimen></Scenario>
    <Scenario {...spinnerScenarios[10]}><Specimen label="Authored accessible name"><Spinner label="Preparing preview" /></Specimen></Scenario>
    <Scenario {...spinnerScenarios[11]}><Specimen label="Contained"><Frame blockSize="8rem" asChild><ZStack.Root align="center" justify="center"><ZStack.Item><Spinner /></ZStack.Item></ZStack.Root></Frame></Specimen></Scenario>
    <Scenario {...spinnerScenarios[12]}><VStack gap="4"><For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const}>{size => <Specimen key={size} label={size}><HStack gap="4" wrap><Button size={size} loading>Save changes</Button><Button size={size} disabled loading>Save changes</Button><IconButton size={size} loading aria-label="Save changes">+</IconButton></HStack></Specimen>}</For></VStack></Scenario>
    <Scenario {...spinnerScenarios[13]}><Specimen label="One status message"><VStack gap="3"><Toaster /><HStack gap="3"><Spinner /><Text role="status">Uploading your document…</Text></HStack><Button onClick={() => toast.loading("Preparing export", { description: "The Toast owns its announcement; its Spinner is decorative.", duration: 4000 })}>Show loading toast</Button></VStack></Specimen></Scenario>
    <Scenario {...spinnerScenarios[14]}><Specimen label="System preferences"><Spinner size="lg" tone="accent" /></Specimen></Scenario>
    <Scenario {...spinnerScenarios[15]}><HStack gap="4" wrap><For each={["light", "dark"] as const}>{appearance => <Appearance key={appearance} value={appearance}><Specimen label={appearance}><HStack gap="3" dir="rtl"><Spinner /><Text lang="ar">جارٍ التحضير</Text></HStack></Specimen></Appearance>}</For></HStack></Scenario>
  </VStack>;
}
