import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { UserRound } from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  For,
  Frame,
  Grid,
  HStack,
  Icon,
  Text,
  Toggle,
  VStack,
  type ChipShape,
  type ChipSize,
  type ChipTone,
  type ChipVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Specimen } from "../../shared/Specimen.js";
import "./chip.playground.css";

const variants = ["soft", "outline", "surface", "solid"] as const satisfies readonly ChipVariant[];
const tones = ["neutral", "accent", "info", "success", "warning", "danger"] as const satisfies readonly ChipTone[];
const sizes = ["sm", "md", "lg", "xl"] as const satisfies readonly ChipSize[];
const shapes = ["rounded", "pill"] as const satisfies readonly ChipShape[];

const customStyle = {
  "--brick-chip-background": "var(--brick-color-accent-soft)",
  "--brick-chip-border-color": "var(--brick-color-accent-border)",
  "--brick-chip-radius": "0.75rem",
} as CSSProperties;

function PersonIcon() {
  return <UserRound />;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="chip-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="chip-cell__preview">{children}</div></EvidenceSurface>;
}

function Standard({
  disabled,
  label = "Riley Chen",
  removable = true,
  shape,
  size,
  style,
  tone,
  variant,
}: {
  disabled?: boolean;
  label?: string;
  removable?: boolean;
  shape?: ChipShape;
  size?: ChipSize;
  style?: CSSProperties;
  tone?: ChipTone;
  variant?: ChipVariant;
}) {
  return <Chip.Root shape={shape} size={size} style={style} tone={tone} variant={variant}><Chip.Label>{label}</Chip.Label>{removable ? <Chip.RemoveTrigger ariaLabel={`Remove ${label}`} disabled={disabled} /> : null}</Chip.Root>;
}

function RemovalExample() {
  const [values, setValues] = useState(["Design", "Research", "Accessibility"]);
  const restoreRef = useRef<HTMLElement>(null);
  return <VStack align="start" gap="3"><HStack aria-label="Assigned disciplines" gap="2" wrap><For each={values}>{value => <Chip.Root key={value} tone="accent"><Chip.Label>{value}</Chip.Label><Chip.RemoveTrigger ariaLabel={`Remove ${value}`} onPress={() => { setValues(current => current.filter(item => item !== value)); restoreRef.current?.focus(); }} /></Chip.Root>}</For></HStack><Text aria-live="polite" tone="secondary" variant="body-sm">{values.length === 0 ? "No disciplines assigned." : `${values.length} disciplines assigned.`}</Text><Button ref={restoreRef} size="sm" variant="outline" onPress={() => setValues(["Design", "Research", "Accessibility"])}>Restore disciplines</Button></VStack>;
}

function Appearance({ appearance }: { appearance: "light" | "dark" }) {
  return <EvidenceSurface className="chip-cell" data-brick-appearance={appearance}><SpecimenLabel>{appearance}</SpecimenLabel><div className="chip-cell__preview"><Standard tone="accent" /></div></EvidenceSurface>;
}

function ActionExample() {
  const restoreRef = useRef<HTMLElement>(null);
  const [opened, setOpened] = useState(0);
  const [removed, setRemoved] = useState(false);
  return <VStack align="start" gap="3">
    {!removed && <Chip.Root density="compact" tone="accent" variant="surface">
      <Chip.ActionTrigger onPress={() => setOpened(count => count + 1)}>
        <Chip.StartElement><Icon aria-hidden="true" size="sm"><PersonIcon /></Icon></Chip.StartElement>
        <Chip.Label>View Riley</Chip.Label>
      </Chip.ActionTrigger>
      <Chip.RemoveTrigger ariaLabel="Remove Riley assignment" onPress={() => { setRemoved(true); restoreRef.current?.focus(); }} />
    </Chip.Root>}
    <Text role="status" variant="body-sm">{removed ? "Assignment removed." : `Profile opened ${opened} times.`}</Text>
    <Button ref={restoreRef} size="sm" variant="outline" onPress={() => setRemoved(false)}>Restore assignment</Button>
    <Chip.Root><Chip.ActionTrigger disabled><Chip.Label>Locked record</Chip.Label></Chip.ActionTrigger></Chip.Root>
  </VStack>;
}

export const chipScenarios = [
  { id: "chip.overview", number: 1, title: "Overview", description: "A value token stays noninteractive while its explicit remove button remains discoverable and independently named." },
  { id: "chip.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "Root, Label, and RemoveTrigger expose stable native hosts without turning the value container into a control." },
  { id: "chip.recipes", number: 3, title: "Variants and tones", navigationTitle: "Recipes", description: "Four surfaces combine with semantic palettes without adding automatic status announcements." },
  { id: "chip.sizes", number: 4, title: "Sizes and shapes", navigationTitle: "Sizes", description: "Four comfortable sizes preserve accessible remove targets; existing sizes retain their geometry." },
  { id: "chip.leading", number: 5, title: "Leading content", navigationTitle: "Content", description: "Authored Icon and Avatar content align with the same value label and removal anatomy." },
  { id: "chip.removal", number: 6, title: "Removal and disabled state", navigationTitle: "Removal", description: "The application owns value mutation while Atom Button owns activation and unavailable behavior." },
  { id: "chip.containment", number: 7, title: "Long and localized values", navigationTitle: "Containment", description: "Long English and Arabic values remain contained inside constrained token boundaries." },
  { id: "chip.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Light/dark scopes and exact documented variables change paint and radius without changing anatomy." },
  { id: "chip.boundary", number: 9, title: "Responsive, RTL, focus, and component boundary", navigationTitle: "Boundary", description: "Narrow and RTL tokens preserve logical placement; Badge and Toggle demonstrate passive and selectable tag-like alternatives." },
  { id: "chip.compact", number: 10, title: "Compact density", description: "Passive compact tokens follow smaller geometry; controls reserve at least 24px rather than overlapping adjacent targets." },
  { id: "chip.slots", number: 11, title: "Start and end elements", description: "Dedicated slots coordinate icon and avatar geometry, including under narrow-width pressure." },
  { id: "chip.actions", number: 12, title: "Independent token actions", description: "The main action and removal are siblings, with independent names, focus stops and activation." },
] as const satisfies readonly ScenarioDefinition[];

export function ChipEvidence() {
  return <VStack className="chip-page" data-component-page="chip" gap="6">
    <Scenario {...chipScenarios[0]}><EvidenceSurface inset="lg"><Standard /></EvidenceSurface></Scenario>
    <Scenario {...chipScenarios[1]}><RenderedOutput label="Rendered Chip HTML"><Standard variant="outline" /></RenderedOutput></Scenario>
    <Scenario {...chipScenarios[2]}><Grid.Root className="chip-grid" columns={2} gap="4"><For each={variants}>{variant => <For key={variant} each={tones}>{tone => <Cell key={`${variant}-${tone}`} label={`${variant} · ${tone}`}><Standard tone={tone} variant={variant} /></Cell>}</For>}</For></Grid.Root></Scenario>
    <Scenario {...chipScenarios[3]}><VStack gap="4"><Grid.Root className="chip-grid" columns={3} gap="4"><For each={sizes}>{size => <Cell key={size} label={size}><Standard size={size} /></Cell>}</For></Grid.Root><Grid.Root className="chip-grid" columns={2} gap="4"><For each={shapes}>{shape => <Cell key={shape} label={shape}><Standard shape={shape} /></Cell>}</For></Grid.Root></VStack></Scenario>
    <Scenario {...chipScenarios[4]}><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="authored icon"><Chip.Root><Icon aria-hidden="true" size="sm"><PersonIcon /></Icon><Chip.Label>Release owner</Chip.Label><Chip.RemoveTrigger ariaLabel="Remove Release owner" /></Chip.Root></Cell><Cell label="authored avatar"><Chip.Root><Avatar alt="" fallback="RC" size="xs" /><Chip.Label>Riley Chen</Chip.Label><Chip.RemoveTrigger ariaLabel="Remove Riley Chen" /></Chip.Root></Cell></Grid.Root></Scenario>
    <Scenario {...chipScenarios[5]}><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="application-owned values"><RemovalExample /></Cell><Cell label="disabled remove"><Standard disabled label="Required reviewer" /></Cell></Grid.Root></Scenario>
    <Scenario {...chipScenarios[6]}><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="constrained English"><div className="chip-constrained"><Standard label="International accessibility review coordinator" /></div></Cell><Cell label="localized Arabic"><div className="chip-constrained" dir="rtl"><Standard label="مراجع تجربة المستخدم الدولية" tone="accent" /></div></Cell></Grid.Root></Scenario>
    <Scenario {...chipScenarios[7]}><VStack gap="5"><Grid.Root className="chip-grid" columns={2} gap="4"><Appearance appearance="light" /><Appearance appearance="dark" /></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="chip-customization playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>customized</SpecimenLabel><Text as="h3" variant="title-sm">Chip CSS properties</Text><Text tone="secondary" variant="body-sm">The accent surface, border, and radius use only the documented properties shown below.</Text><PlaygroundCodeBlock>{`--brick-chip-background: var(--brick-color-accent-soft);\n--brick-chip-border-color: var(--brick-color-accent-border);\n--brick-chip-radius: 0.75rem;`}</PlaygroundCodeBlock></VStack><div className="chip-customization__preview"><Standard style={customStyle} variant="outline" /></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...chipScenarios[8]}><VStack gap="5"><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="narrow RTL focus"><div className="chip-constrained" dir="rtl"><Standard label="فريق التصميم" tone="accent" /></div></Cell><Cell label="read-only value"><Standard label="Release 42" removable={false} variant="outline" /></Cell></Grid.Root><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="passive tag"><Badge shape="pill">Design</Badge></Cell><Cell label="selectable filter"><Toggle shape="pill">Design</Toggle></Cell></Grid.Root></VStack></Scenario>
    <Scenario {...chipScenarios[9]}><Grid.Root columns={{ initial: 1, md: 2, lg: 4 }} gap="4">
      <For each={sizes}>{size => <Specimen key={size} label={size}><VStack align="start" gap="3">
        <Chip.Root density="compact" size={size} data-evidence="compact-passive"><Chip.Label>Riley Chen</Chip.Label></Chip.Root>
        <Chip.Root density="compact" size={size}><Chip.Label>Riley Chen</Chip.Label><Chip.RemoveTrigger ariaLabel={`Remove Riley (${size})`} /></Chip.Root>
      </VStack></Specimen>}</For>
    </Grid.Root></Scenario>
    <Scenario {...chipScenarios[10]}><Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
      <For each={sizes}>{size => <Specimen key={size} label={`compact ${size}`}><Frame maxInlineSize="100%">
        <Chip.Root density="compact" size={size}>
          <Chip.StartElement><Avatar alt="" fallback="RC" size="xs" /></Chip.StartElement>
          <Chip.Label>Riley Chen</Chip.Label>
          <Chip.EndElement><Icon aria-hidden="true" size="sm"><PersonIcon /></Icon></Chip.EndElement>
        </Chip.Root>
      </Frame></Specimen>}</For>
    </Grid.Root></Scenario>
    <Scenario {...chipScenarios[11]}><Specimen label="Action and removal"><ActionExample /></Specimen></Scenario>
  </VStack>;
}
