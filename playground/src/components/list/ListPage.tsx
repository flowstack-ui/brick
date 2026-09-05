import { type ComponentProps, type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Button,
  Grid,
  HStack,
  Icon,
  List,
  Text,
  VStack,
  type ListDensity,
  type ListInset,
  type ListMarker,
  type ListSize,
  type ListVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./list.playground.css";

const items = ["Package build", "Browser checks", "Release notes"];
const variants: ListVariant[] = ["plain", "divided", "bordered"];
const sizes: ListSize[] = ["sm", "md", "lg"];
const densities: ListDensity[] = ["compact", "comfortable"];
const insets: ListInset[] = ["default", "none"];
const markers: ListMarker[] = ["auto", "disc", "circle", "square", "decimal", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman", "none"];
const customStyle = {
  "--brick-list-border-color": "var(--brick-color-accent-border)",
  "--brick-list-marker-color": "var(--brick-color-accent-solid)",
  "--brick-list-radius": "1.25rem",
  "--brick-list-row-padding-block": "var(--brick-space-4)",
} as CSSProperties;

function CheckGraphic() {
  return <svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>;
}

function BasicList(props: ComponentProps<typeof List.Root>) {
  return <List.Root {...props}>{items.map((item) => <List.Item key={item}>{item}</List.Item>)}</List.Root>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="list-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <VStack gap="3"><VStack gap="1"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>;
}

function StructuredList({ align, dir }: { align?: ComponentProps<typeof List.Root>["align"]; dir?: "ltr" | "rtl" }) {
  return <List.Root align={align} dir={dir} marker="none" variant="divided">
    <List.Item>
      <List.Leading><Icon tone="success"><CheckGraphic /></Icon></List.Leading>
      <List.Content><List.Title>Package build</List.Title><List.Description>Compiled output matches the public package contract.</List.Description></List.Content>
      <List.Trailing><Badge size="sm">Ready</Badge></List.Trailing>
    </List.Item>
    <List.Item>
      <List.Leading><Icon tone="success"><CheckGraphic /></Icon></List.Leading>
      <List.Content><List.Title>Browser checks</List.Title><List.Description>Desktop and mobile behavior is covered.</List.Description></List.Content>
      <List.Trailing><Button size="sm" tone="neutral" variant="outline">Review</Button></List.Trailing>
    </List.Item>
  </List.Root>;
}

export const listScenarios = [
  { id: "list.overview", number: 1, title: "Overview", description: "List’s canonical rendering is an unordered, plain, medium, comfortable list with automatic native markers." },
  { id: "list.semantics", number: 2, title: "Semantics", description: "Unordered and ordered roots keep the same default recipe and content while their native relationship and sequence change." },
  { id: "list.variants", number: 3, title: "Variants", description: "Plain, divided, and bordered change only list boundaries; size, density, marker, and content remain at their defaults." },
  { id: "list.sizing", number: 4, title: "Sizes, density, and inset", navigationTitle: "Sizing", description: "Size changes typography and metrics, density changes only vertical row spacing, and inset controls ordinary row alignment with adjacent content." },
  { id: "list.markers", number: 5, title: "Markers and nesting", navigationTitle: "Markers", description: "The complete marker recipe and meaningful nested list preserve native list structure without changing item content." },
  { id: "list.anatomy", number: 6, title: "Structured anatomy", navigationTitle: "Anatomy", description: "Leading, Content, Title, Description, and Trailing form aligned passive rows without adding selection or whole-row interaction." },
  { id: "list.output", number: 7, title: "Native output and state", navigationTitle: "Output", description: "Native numbering, disabled metadata, and Atom composition remain observable in the actual rendered HTML." },
  { id: "list.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "List typography and boundaries adapt to appearance while documented properties visibly customize the same bordered list." },
  { id: "list.stress", number: 9, title: "Responsive and stress", navigationTitle: "Stress", description: "Long localized content, constrained width, structured actions, RTL, zoom, and forced colors remain contained and logically aligned." },
] as const satisfies readonly ScenarioDefinition[];

export function ListPage() {
  return <VStack className="list-page" data-component-page="list" gap="6">
    <Scenario {...listScenarios[0]}><EvidenceSurface className="list-overview"><BasicList /></EvidenceSurface></Scenario>
    <Scenario {...listScenarios[1]}><Grid.Root className="list-output-grid" columns={2} gap="4"><RenderedOutput label="Unordered List HTML"><BasicList /></RenderedOutput><RenderedOutput label="Ordered List HTML"><BasicList ordered /></RenderedOutput></Grid.Root></Scenario>
    <Scenario {...listScenarios[2]}><Grid.Root className="list-grid list-grid--three" columns={3} gap="4">{variants.map((variant) => <Cell key={variant} label={variant}><BasicList variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...listScenarios[3]}><VStack gap="5"><VStack gap="3"><Text as="h3" variant="title-sm">Sizes</Text><Grid.Root className="list-grid list-grid--three" columns={3} gap="4">{sizes.map((size) => <Cell key={size} label={size}><BasicList size={size} /></Cell>)}</Grid.Root></VStack><VStack gap="3"><Text as="h3" variant="title-sm">Density</Text><Grid.Root className="list-grid list-grid--two" columns={2} gap="4">{densities.map((density) => <Cell key={density} label={density}><BasicList density={density} /></Cell>)}</Grid.Root></VStack><VStack gap="3"><Text as="h3" variant="title-sm">Inset</Text><Grid.Root className="list-grid list-grid--two" columns={2} data-list-insets gap="4">{insets.map((inset) => <Cell key={inset} label={inset}><BasicList inset={inset} marker="none" /></Cell>)}</Grid.Root></VStack></VStack></Scenario>
    <Scenario {...listScenarios[4]}><VStack gap="5"><Grid.Root className="list-grid list-grid--markers" columns={5} gap="4">{markers.map((marker) => <Cell key={marker} label={marker}><BasicList marker={marker} ordered={marker.includes("alpha") || marker.includes("roman") || marker === "decimal"} /></Cell>)}</Grid.Root><Cell label="nested sequence"><List.Root ordered><List.Item>Prepare package<List.Root marker="circle"><List.Item>Run unit checks</List.Item><List.Item>Inspect browser evidence</List.Item></List.Root></List.Item><List.Item>Publish release</List.Item></List.Root></Cell></VStack></Scenario>
    <Scenario {...listScenarios[5]}><Grid.Root className="list-grid list-grid--two" columns={2} gap="4"><Cell label="center-aligned complete row"><StructuredList align="center" /></Cell><Cell label="content only"><List.Root marker="none" variant="divided"><List.Item><List.Content><List.Title>Release notes</List.Title><List.Description>Summarize every public change without truncating the explanation.</List.Description></List.Content></List.Item><List.Item><List.Content><List.Title>Package verification</List.Title><List.Description>Confirm root and subpath imports from the packed artifact.</List.Description></List.Content></List.Item></List.Root></Cell></Grid.Root></Scenario>
    <Scenario {...listScenarios[6]}><VStack gap="4"><Grid.Root className="list-grid list-grid--two" columns={2} gap="4"><Cell label="native numbering"><List.Root ordered reversed start={4}><List.Item>Publish package</List.Item><List.Item value={2}>Verify registry</List.Item></List.Root></Cell><Cell label="disabled metadata"><List.Root><List.Item>Available report</List.Item><List.Item disabled>Archived report</List.Item></List.Root></Cell></Grid.Root><Grid.Root className="list-output-grid" columns={2} gap="4"><RenderedOutput label="Native ordered List HTML"><List.Root ordered reversed start={4}><List.Item value={7}>Publish package</List.Item></List.Root></RenderedOutput><RenderedOutput label="Composed List HTML"><List.Root asChild><ol><List.Item asChild><li>Composed item</li></List.Item></ol></List.Root></RenderedOutput></Grid.Root></VStack></Scenario>
    <Scenario {...listScenarios[7]}><VStack gap="5"><Grid.Root className="list-grid list-grid--two" columns={2} gap="4"><EvidenceSurface className="list-cell" data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><BasicList variant="bordered" /></EvidenceSurface><EvidenceSurface className="list-cell" data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><BasicList variant="bordered" /></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="list-customization playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">List CSS properties</Text><Text tone="secondary" variant="body-sm">The preview uses the exact accent border, marker, radius, and row padding shown in code.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-list-border-color: var(--brick-color-accent-border);\n--brick-list-marker-color: var(--brick-color-accent-solid);\n--brick-list-radius: 1.25rem;\n--brick-list-row-padding-block: var(--brick-space-4);`}</PlaygroundCodeBlock></VStack><div className="playground-customization-preview"><BasicList style={customStyle} variant="bordered" /></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...listScenarios[8]}><VStack gap="6"><EvidenceGroup title="Responsive boundaries" description="Constrained, marker-free, and trailing-action examples remain readable without widening their surfaces."><Grid.Root className="list-grid list-grid--stress" columns={3} gap="4"><Cell label="narrow and long"><div className="list-narrow"><List.Root><List.Item>A carefully localized requirement wraps without escaping its constrained list container.</List.Item><List.Item>Package verification remains readable at narrow widths.</List.Item></List.Root></div></Cell><Cell label="marker-free"><BasicList marker="none" /></Cell><Cell label="long trailing row"><List.Root marker="none" variant="bordered"><List.Item><List.Content><List.Title>International workspace publishing review</List.Title><List.Description>Supporting copy wraps while the independently named action stays contained.</List.Description></List.Content><List.Trailing><Button size="sm">Review</Button></List.Trailing></List.Item></List.Root></Cell></Grid.Root></EvidenceGroup><EvidenceGroup title="RTL inheritance" description="The structured row keeps its semantic order while leading, content, trailing, and divided boundaries follow the inherited writing direction."><Grid.Root className="list-grid list-grid--rtl" columns={1} gap="4"><Cell label="RTL structured"><StructuredList dir="rtl" /></Cell></Grid.Root></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
