import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Grid,
  VStack,
  Button,
  Checkbox,
  Field,
  Input,
  Popover,
  Text,
  type PopoverSize,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./popover.playground.css";

const sizes: PopoverSize[] = ["sm", "md", "lg"];
const sides = ["top", "right", "bottom", "left"] as const;
const aligns = ["start", "center", "end"] as const;
const customTokens = {
  "--brick-popover-border": "var(--brick-color-accent-border)",
  "--brick-popover-radius": "0.25rem",
  "--brick-popover-shadow": "0 1rem 3rem rgb(53 46 91 / 25%)",
  "--brick-popover-space": "1.25rem",
} as CSSProperties;

function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <VStack as="section" className="popover-evidence-group"><VStack className="popover-evidence-group__heading"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="popover-specimen-cell" level="canvas"><SpecimenLabel>{label}</SpecimenLabel><div className="popover-specimen-cell__preview">{children}</div></EvidenceSurface>;
}

function SettingsContent({ label }: { label: string }) {
  return <>
    <Popover.Title>{label}</Popover.Title>
    <Popover.Description>Change compact project options without leaving this page.</Popover.Description>
    <Popover.Body>
      <Field.Root className="popover-project-field">
        <Field.Label>Project name</Field.Label>
        <Input defaultValue="Analytical Engine" />
      </Field.Root>
      <Checkbox defaultChecked>Share activity updates</Checkbox>
    </Popover.Body>
    <Popover.Footer>
      <Button tone="neutral" variant="outline">Reset</Button>
      <Popover.Close asChild><Button>Done</Button></Popover.Close>
    </Popover.Footer>
    <Popover.Arrow />
  </>;
}

function SettingsPopover({ label, modal = false, side = "bottom", size, align = "center" }: {
  align?: "start" | "center" | "end";
  label: string;
  modal?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  size?: PopoverSize;
}) {
  return <Popover.Root modal={modal}><Popover.Trigger asChild><Button tone="neutral" variant="outline">{label}</Button></Popover.Trigger><Popover.Portal><Popover.Content align={align} side={side} size={size}><SettingsContent label={label} /></Popover.Content></Popover.Portal></Popover.Root>;
}

function ScopedPopover({ appearance }: { appearance: "light" | "dark" }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const label = `${appearance} scoped settings`;
  return <EvidenceSurface className="popover-appearance-panel" data-brick-appearance={appearance} level="canvas" ref={setContainer}><SpecimenLabel>{appearance === "light" ? "Light" : "Dark"}</SpecimenLabel>{container ? <Popover.Root><Popover.Trigger asChild><Button tone="neutral" variant="outline">{label}</Button></Popover.Trigger><Popover.Portal container={container}><Popover.Content className="popover-persistent-preview"><Popover.Title>{label}</Popover.Title><Popover.Description>This portal remains inside its local appearance scope.</Popover.Description><Popover.Footer><Popover.Close asChild><Button>Close</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root> : null}</EvidenceSurface>;
}

export const popoverScenarios = [
  { description: "Popover’s canonical rendering is a non-modal medium elevated panel opened intentionally from a named Button. Direct Title and Description generate stable dialog relationships; Body, Footer, Close, and Arrow remain explicit.", id: "popover.overview", number: 1, title: "Overview" },
  { description: "Size changes only preferred maximum inline width. Content, controls, placement, focus, dismissal, structure, and Arrow remain identical.", id: "popover.sizes", number: 2, title: "Sizes" },
  { description: "All structural parts are optional presentational regions. Direct semantic Title and Description are preferred; native heading and paragraph inside Header require explicit ARIA relationships.", id: "popover.anatomy", navigationTitle: "Anatomy", number: 3, title: "Anatomy and semantics" },
  { description: "Preferred side and alignment change only initial geometry. Atom may flip or shift to preserve the viewport; Arrow follows the final resolved side.", id: "popover.placement", number: 4, title: "Placement" },
  { description: "Controlled and disabled state, modal focus containment, Escape, outside interaction, and explicit dismissal policy remain Atom behavior.", id: "popover.states", navigationTitle: "States", number: 5, title: "State and dismissal" },
  { description: "Anchor may differ from Trigger, and a nested Popover owns the top layer until it closes. Each active panel retains its own focus and dismissal boundary.", id: "popover.composition", navigationTitle: "Composition", number: 6, title: "Anchor and nesting" },
  { description: "Same-document custom portal containers preserve local light and dark appearance scopes without changing Popover defaults.", id: "popover.appearance", navigationTitle: "Theme", number: 7, title: "Appearance and portal scopes" },
  { description: "Public Content class, slot, native style, and component tokens customize one elevated surface without changing semantics, focus, layout anatomy, or dismissal.", id: "popover.customization", navigationTitle: "Custom", number: 8, title: "Customization" },
  { description: "Long localized content, scrollable Body, wrapping Footer actions, extreme reflow, and genuine RTL remain contained and reachable at narrow widths.", id: "popover.stress", navigationTitle: "Stress", number: 9, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

export function PopoverPage() {
  const [controlledOpen, setControlledOpen] = useState(false);
  return <VStack className="popover-page" data-component-page="popover" data-testid="popover-workbench">
    <Scenario {...popoverScenarios[0]}><EvidenceSurface className="popover-overview" data-testid="popover-overview" inset="lg" level="canvas"><SettingsPopover label="Project settings" /></EvidenceSurface></Scenario>

    <Scenario {...popoverScenarios[1]}><Grid.Root columns={3} className="popover-specimen-grid popover-specimen-grid--three" data-testid="popover-sizes">{sizes.map((size) => <Cell key={size} label={size}><SettingsPopover label={`Open ${size} settings`} size={size} /></Cell>)}</Grid.Root></Scenario>

    <Scenario {...popoverScenarios[2]}><VStack className="popover-evidence-stack" data-testid="popover-anatomy">
      <EvidenceGroup description="Direct Title and Description let Atom generate server-stable dialog relationships." title="Direct semantic parts"><EvidenceSurface className="popover-overview" inset="lg"><SettingsPopover label="Direct semantic settings" /></EvidenceSurface></EvidenceGroup>
      <EvidenceGroup description="Header is visual only, so authored semantic text uses explicit IDs and matching native ARIA on Content." title="Authored Header semantics"><EvidenceSurface className="popover-overview" inset="lg"><Popover.Root><Popover.Trigger asChild><Button tone="neutral" variant="outline">Inspect anatomy</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-describedby="custom-popover-description" aria-labelledby="custom-popover-title"><Popover.Header><Text as="h3" data-slot="popover-title" id="custom-popover-title" variant="title-sm">Custom workspace panel</Text><Text as="p" data-slot="popover-description" id="custom-popover-description" tone="secondary" variant="body-sm">Explicit ARIA supports authored semantic Text inside the visual Header.</Text></Popover.Header><Popover.Body>Header, Body, and Footer remain presentational layout parts.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close anatomy</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></EvidenceSurface></EvidenceGroup>
    </VStack></Scenario>

    <Scenario {...popoverScenarios[3]}><VStack className="popover-evidence-stack" data-testid="popover-placement">
      <EvidenceGroup description="Every specimen keeps center alignment, medium size, identical content, and the same default behavior." title="Sides"><Grid.Root columns={4} className="popover-specimen-grid popover-specimen-grid--four">{sides.map((side) => <Cell key={side} label={side}><SettingsPopover label={`Open ${side}`} side={side} /></Cell>)}</Grid.Root></EvidenceGroup>
      <EvidenceGroup description="Every specimen keeps the default bottom side and changes only cross-axis alignment." title="Alignments"><Grid.Root columns={3} className="popover-specimen-grid popover-specimen-grid--three">{aligns.map((align) => <Cell key={align} label={align}><SettingsPopover align={align} label={`Open ${align} aligned`} /></Cell>)}</Grid.Root></EvidenceGroup>
    </VStack></Scenario>

    <Scenario {...popoverScenarios[4]}><Grid.Root columns={4} className="popover-specimen-grid popover-specimen-grid--four" data-testid="popover-state">
      <Cell label="controlled"><Popover.Root onOpenChange={setControlledOpen} open={controlledOpen}><Popover.Trigger asChild><Button tone="neutral" variant="outline">Controlled settings</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Controlled settings"><Popover.Body>Open state belongs to the application.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close controlled</Button></Popover.Close></Popover.Footer></Popover.Content></Popover.Portal></Popover.Root></Cell>
      <Cell label="disabled"><Popover.Root disabled><Popover.Trigger asChild><Button tone="neutral" variant="outline">Unavailable settings</Button></Popover.Trigger></Popover.Root></Cell>
      <Cell label="modal"><SettingsPopover label="Open modal settings" modal /></Cell>
      <Cell label="explicit Close"><Popover.Root closeOnEscape={false} closeOnInteractOutside={false}><Popover.Trigger asChild><Button tone="neutral" variant="outline">Explicit close only</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Explicit close settings"><Popover.Body>Escape and outside interaction are disabled.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close explicitly</Button></Popover.Close></Popover.Footer></Popover.Content></Popover.Portal></Popover.Root></Cell>
    </Grid.Root></Scenario>

    <Scenario {...popoverScenarios[5]}><Grid.Root columns={2} className="popover-specimen-grid popover-specimen-grid--two" data-testid="popover-composition">
      <Cell label="separate Anchor"><Popover.Root><Popover.Anchor asChild><span className="popover-anchor-marker">Anchor target</span></Popover.Anchor><Popover.Trigger asChild><Button tone="neutral" variant="outline">Open anchored panel</Button></Popover.Trigger><Popover.Portal><Popover.Content align="start" aria-label="Anchored panel"><Popover.Body>Position follows the separate marker.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Done</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></Cell>
      <Cell label="nested"><Popover.Root><Popover.Trigger asChild><Button tone="neutral" variant="outline">Open parent panel</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Parent panel"><Popover.Body><Popover.Root><Popover.Trigger asChild><Button>Open nested panel</Button></Popover.Trigger><Popover.Portal><Popover.Content aria-label="Nested panel"><Popover.Body>Nested content is the active top layer.</Popover.Body><Popover.Footer><Popover.Close asChild><Button>Close nested panel</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></Popover.Body><Popover.Footer><Popover.Close asChild><Button tone="neutral" variant="outline">Close parent panel</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></Cell>
    </Grid.Root></Scenario>

    <Scenario {...popoverScenarios[6]}><Grid.Root columns={2} className="popover-scoped-grid" data-testid="popover-appearance"><ScopedPopover appearance="light" /><ScopedPopover appearance="dark" /></Grid.Root></Scenario>

    <Scenario {...popoverScenarios[7]}><EvidenceSurface as="article" className="popover-customization" inset="none"><div><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">Content CSS properties</Text><Text as="p" tone="secondary" variant="body-sm">Content class, slot, native style, and public surface tokens remain local.</Text><PlaygroundCodeBlock aria-label="Popover customization example" tabIndex={0}>{`<Popover.Content
  className="custom-popover"
  data-slot="custom-popover"
  style={{
    "--brick-popover-border":
      "var(--brick-color-accent-border)",
    "--brick-popover-radius": "0.25rem",
    "--brick-popover-shadow":
      "0 1rem 3rem rgb(53 46 91 / 25%)",
    "--brick-popover-space": "1.25rem",
  }}
>
  <SettingsContent label="Customized settings" />
</Popover.Content>`}</PlaygroundCodeBlock></div><div className="popover-customization__preview"><Popover.Root defaultOpen><Popover.Trigger asChild><Button tone="neutral" variant="outline">Custom settings</Button></Popover.Trigger><Popover.Portal><Popover.Content className="custom-popover popover-persistent-preview" data-slot="custom-popover" style={customTokens}><SettingsContent label="Customized settings" /></Popover.Content></Popover.Portal></Popover.Root></div></EvidenceSurface></Scenario>

    <Scenario {...popoverScenarios[8]}><VStack className="popover-evidence-stack" data-testid="popover-stress">
      <EvidenceGroup description="A long title, scrollable Body, and complete Footer remain reachable inside a 20rem frame." title="Constrained-width stress"><EvidenceSurface className="popover-stress-panel" level="canvas"><div className="popover-phone-frame"><Popover.Root><Popover.Trigger asChild><Button tone="neutral" variant="outline">Open long settings</Button></Popover.Trigger><Popover.Portal><Popover.Content align="start" size="lg"><Popover.Title>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break</Popover.Title><Popover.Description>A deliberately long localized description remains readable and contained.</Popover.Description><Popover.Body><VStack className="popover-long-copy">{Array.from({ length: 8 }, (_, index) => <Text as="p" key={index}>Compact setting {index + 1} remains reachable at high zoom.</Text>)}</VStack></Popover.Body><Popover.Footer><Button tone="neutral" variant="outline">Reset all settings</Button><Popover.Close asChild><Button>Save workspace settings</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></div></EvidenceSurface></EvidenceGroup>
      <EvidenceGroup description="Popover and its authored controls inherit genuine right-to-left direction through the portal." title="RTL inheritance"><EvidenceSurface className="popover-stress-panel" level="canvas"><div className="popover-phone-frame" dir="rtl"><Popover.Root><Popover.Trigger asChild><Button tone="neutral" variant="outline">فتح إعدادات المشروع</Button></Popover.Trigger><Popover.Portal><Popover.Content align="end"><Popover.Title>إعدادات المشروع</Popover.Title><Popover.Description>غيّر الخيارات المختصرة بدون مغادرة مساحة العمل.</Popover.Description><Popover.Body><Checkbox defaultChecked>مشاركة تحديثات النشاط</Checkbox></Popover.Body><Popover.Footer><Popover.Close asChild><Button>تم</Button></Popover.Close></Popover.Footer><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></div></EvidenceSurface></EvidenceGroup>
    </VStack></Scenario>
  </VStack>;
}
