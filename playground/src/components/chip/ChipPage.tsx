import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Avatar,
  Badge,
  Chip,
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
import "./chip.playground.css";

const variants = ["soft", "outline"] as const satisfies readonly ChipVariant[];
const tones = ["neutral", "accent"] as const satisfies readonly ChipTone[];
const sizes = ["sm", "md", "lg"] as const satisfies readonly ChipSize[];
const shapes = ["rounded", "pill"] as const satisfies readonly ChipShape[];

const customStyle = {
  "--brick-chip-background": "var(--brick-color-accent-subtle)",
  "--brick-chip-border-color": "var(--brick-color-accent-border)",
  "--brick-chip-radius": "0.75rem",
} as CSSProperties;

function PersonIcon() {
  return <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5 6a5 5 0 0 0-10 0" />;
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
  return <VStack gap="3"><HStack aria-label="Assigned disciplines" gap="2" wrap>{values.map(value => <Chip.Root key={value} tone="accent"><Chip.Label>{value}</Chip.Label><Chip.RemoveTrigger ariaLabel={`Remove ${value}`} onPress={() => setValues(current => current.filter(item => item !== value))} /></Chip.Root>)}</HStack><Text aria-live="polite" tone="secondary" variant="body-sm">{values.length === 0 ? "No disciplines assigned." : `${values.length} disciplines assigned.`}</Text></VStack>;
}

function Appearance({ appearance }: { appearance: "light" | "dark" }) {
  return <EvidenceSurface className="chip-cell" data-brick-appearance={appearance}><SpecimenLabel>{appearance}</SpecimenLabel><div className="chip-cell__preview"><Standard tone="accent" /></div></EvidenceSurface>;
}

export const chipScenarios = [
  { id: "chip.overview", number: 1, title: "Overview", description: "A value token stays noninteractive while its explicit remove button remains discoverable and independently named." },
  { id: "chip.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "Root, Label, and RemoveTrigger expose stable native hosts without turning the value container into a control." },
  { id: "chip.recipes", number: 3, title: "Variants and tones", navigationTitle: "Recipes", description: "Soft and outline surfaces combine with neutral and accent identity emphasis without status semantics." },
  { id: "chip.sizes", number: 4, title: "Sizes and shapes", navigationTitle: "Sizes", description: "Three coordinated sizes preserve a 24px remove target while rounded and pill change corners only." },
  { id: "chip.leading", number: 5, title: "Leading content", navigationTitle: "Content", description: "Authored Icon and Avatar content align with the same value label and removal anatomy." },
  { id: "chip.removal", number: 6, title: "Removal and disabled state", navigationTitle: "Removal", description: "The application owns value mutation while Atom Button owns activation and unavailable behavior." },
  { id: "chip.containment", number: 7, title: "Long and localized values", navigationTitle: "Containment", description: "Long English and Arabic values remain contained inside constrained token boundaries." },
  { id: "chip.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Light/dark scopes and exact documented variables change paint and radius without changing anatomy." },
  { id: "chip.boundary", number: 9, title: "Responsive, RTL, focus, and component boundary", navigationTitle: "Boundary", description: "Narrow and RTL tokens preserve logical placement; Badge and Toggle demonstrate passive and selectable tag-like alternatives." },
] as const satisfies readonly ScenarioDefinition[];

export function ChipPage() {
  return <VStack className="chip-page" data-component-page="chip" gap="6">
    <Scenario {...chipScenarios[0]}><EvidenceSurface inset="lg"><Standard /></EvidenceSurface></Scenario>
    <Scenario {...chipScenarios[1]}><RenderedOutput label="Rendered Chip HTML"><Standard variant="outline" /></RenderedOutput></Scenario>
    <Scenario {...chipScenarios[2]}><Grid.Root className="chip-grid" columns={2} gap="4">{variants.flatMap(variant => tones.map(tone => <Cell key={`${variant}-${tone}`} label={`${variant} · ${tone}`}><Standard tone={tone} variant={variant} /></Cell>))}</Grid.Root></Scenario>
    <Scenario {...chipScenarios[3]}><VStack gap="4"><Grid.Root className="chip-grid" columns={3} gap="4">{sizes.map(size => <Cell key={size} label={size}><Standard size={size} /></Cell>)}</Grid.Root><Grid.Root className="chip-grid" columns={2} gap="4">{shapes.map(shape => <Cell key={shape} label={shape}><Standard shape={shape} /></Cell>)}</Grid.Root></VStack></Scenario>
    <Scenario {...chipScenarios[4]}><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="authored icon"><Chip.Root><Icon aria-hidden="true" size="sm"><PersonIcon /></Icon><Chip.Label>Release owner</Chip.Label><Chip.RemoveTrigger ariaLabel="Remove Release owner" /></Chip.Root></Cell><Cell label="authored avatar"><Chip.Root><Avatar alt="" fallback="RC" size="xs" /><Chip.Label>Riley Chen</Chip.Label><Chip.RemoveTrigger ariaLabel="Remove Riley Chen" /></Chip.Root></Cell></Grid.Root></Scenario>
    <Scenario {...chipScenarios[5]}><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="application-owned values"><RemovalExample /></Cell><Cell label="disabled remove"><Standard disabled label="Required reviewer" /></Cell></Grid.Root></Scenario>
    <Scenario {...chipScenarios[6]}><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="constrained English"><div className="chip-constrained"><Standard label="International accessibility review coordinator" /></div></Cell><Cell label="localized Arabic"><div className="chip-constrained" dir="rtl"><Standard label="مراجع تجربة المستخدم الدولية" tone="accent" /></div></Cell></Grid.Root></Scenario>
    <Scenario {...chipScenarios[7]}><VStack gap="5"><Grid.Root className="chip-grid" columns={2} gap="4"><Appearance appearance="light" /><Appearance appearance="dark" /></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="chip-customization playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>customized</SpecimenLabel><Text as="h3" variant="title-sm">Chip CSS properties</Text><Text tone="secondary" variant="body-sm">The accent surface, border, and radius use only the documented properties shown below.</Text><PlaygroundCodeBlock>{`--brick-chip-background: var(--brick-color-accent-subtle);\n--brick-chip-border-color: var(--brick-color-accent-border);\n--brick-chip-radius: 0.75rem;`}</PlaygroundCodeBlock></VStack><div className="chip-customization__preview"><Standard style={customStyle} variant="outline" /></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...chipScenarios[8]}><VStack gap="5"><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="narrow RTL focus"><div className="chip-constrained" dir="rtl"><Standard label="فريق التصميم" tone="accent" /></div></Cell><Cell label="read-only value"><Standard label="Release 42" removable={false} variant="outline" /></Cell></Grid.Root><Grid.Root className="chip-grid" columns={2} gap="4"><Cell label="passive tag"><Badge shape="pill">Design</Badge></Cell><Cell label="selectable filter"><Toggle shape="pill">Design</Toggle></Cell></Grid.Root></VStack></Scenario>
  </VStack>;
}
