import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Badge,
  Button,
  Field,
  Form,
  Grid,
  HStack,
  MultiSelect,
  Text,
  VStack,
  type MultiSelectRootProps,
  type MultiSelectShape,
  type MultiSelectSize,
  type MultiSelectVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import "../../shared/forms-evidence.playground.css";
import "./multi-select.playground.css";

const variants: MultiSelectVariant[] = ["outline", "soft", "underline"];
const sizes: MultiSelectSize[] = ["sm", "md", "lg"];
const shapes: MultiSelectShape[] = ["sharp", "rounded", "pill"];

const customTokens = {
  "--brick-multi-select-trigger-background": "#eefbf5",
  "--brick-multi-select-trigger-border": "#18794e",
  "--brick-multi-select-trigger-focus-ring": "#18794e",
  "--brick-multi-select-trigger-foreground": "#0d3b2a",
  "--brick-multi-select-content-background": "#f4fff9",
  "--brick-multi-select-item-highlighted-background": "#d7f7e5",
} as CSSProperties;

function Options() {
  return (
    <>
      <MultiSelect.Item value="design"><MultiSelect.ItemText>Design</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
      <MultiSelect.Item value="engineering"><MultiSelect.ItemText>Engineering</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
      <MultiSelect.Item value="research" disabled><MultiSelect.ItemText>Research</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
      <MultiSelect.Item value="writing"><MultiSelect.ItemText>Writing</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>
    </>
  );
}

function SkillsMultiSelect({
  id,
  label = "Team skills",
  rootProps,
  children,
  style,
  countSummary = false,
}: {
  id: string;
  label?: string;
  rootProps?: Omit<MultiSelectRootProps, "children">;
  children?: ReactNode;
  style?: CSSProperties;
  countSummary?: boolean;
}) {
  const multiSelectProps = { defaultValue: ["design", "engineering"], ...rootProps } as MultiSelectRootProps;
  return (
    <Field.Root id={id}>
      <Field.Label>{label}</Field.Label>
      <MultiSelect.Root {...multiSelectProps}>
        <MultiSelect.Trigger style={style}><MultiSelect.Value placeholder="Choose skills" renderValue={countSummary ? (values) => `${values.length} skills selected` : undefined} /><MultiSelect.Icon /></MultiSelect.Trigger>
        <MultiSelect.Content disablePortal={id === "multi-select-long"} style={style}>
          <MultiSelect.ScrollUpButton />
          <MultiSelect.Viewport>{children ?? Options()}</MultiSelect.Viewport>
          <MultiSelect.ScrollDownButton />
          <MultiSelect.Arrow />
        </MultiSelect.Content>
      </MultiSelect.Root>
    </Field.Root>
  );
}

function Tile({ label, children }: { label: string; children: ReactNode }) {
  return <EvidenceSurface className="multi-select-tile" inset="md"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

export const multiSelectScenarios = [
  { id: "multi-select.overview", number: 1, title: "Overview", description: "MultiSelect’s canonical rendering is full-width, medium, outline, and rounded. Field supplies the visible label; the multi-selected value and default artwork demonstrate the complete default control." },
  { id: "multi-select.variants", number: 2, title: "Variants", description: "Outline, soft, and underline change trigger paint only. Value, options, size, and all other defaults remain identical." },
  { id: "multi-select.sizes", number: 3, title: "Sizes", description: "Small, medium, and large change complete control geometry only. Every example stays outline and rounded with identical content." },
  { id: "multi-select.shapes", number: 4, title: "Shapes and width", description: "Sharp, rounded, and pill change trigger geometry only. Separate examples prove the default full width and opt-in intrinsic width." },
  { id: "multi-select.options", number: 5, title: "Options and scrolling", navigationTitle: "Options", description: "Groups, labels, separator, disabled options, scrolling controls, Viewport, and collision-aware Arrow appear together in one long-list example." },
  { id: "multi-select.states", number: 6, title: "Content and states", navigationTitle: "States", description: "Placeholder, controlled value/open state, disabled, read-only, and invalid examples retain the default recipe so only the named state changes." },
  { id: "multi-select.forms", number: 7, title: "Forms and composition", navigationTitle: "Forms", description: "Field and Form expose native submission, reset, validation, external ownership, Trigger composition, and rendered anatomy without moving those responsibilities into MultiSelect." },
  { id: "multi-select.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Light and dark scopes retain the same defaults. One documented token override visibly customizes the actual trigger, popup, and options." },
  { id: "multi-select.stress", number: 9, title: "Responsive, RTL, and preferences", navigationTitle: "Responsive", description: "Long localization, narrow containment, RTL logical placement, zoom, reduced motion, and forced colors remain usable without clipping." },
] as const satisfies readonly ScenarioDefinition[];

export function MultiSelectPage() {
  const [value, setValue] = useState<string[]>(["design", "engineering"]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("No form event yet");
  return (
    <VStack className="forms-page multi-select-page" data-component-page="multi-select" data-testid="multi-select-workbench">
      <Scenario {...multiSelectScenarios[0]}><EvidenceSurface data-testid="multi-select-overview" inset="lg"><SkillsMultiSelect id="multi-select-overview-field" /></EvidenceSurface></Scenario>
      <Scenario {...multiSelectScenarios[1]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="multi-select-variants">{variants.map((variant) => <Tile key={variant} label={variant}><SkillsMultiSelect id={`multi-select-variant-${variant}`} rootProps={{ variant }} /></Tile>)}</Grid.Root></Scenario>
      <Scenario {...multiSelectScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="multi-select-sizes">{sizes.map((size) => <Tile key={size} label={size}><SkillsMultiSelect id={`multi-select-size-${size}`} rootProps={{ size }} /></Tile>)}</Grid.Root></Scenario>
      <Scenario {...multiSelectScenarios[3]}><VStack gap="4" data-testid="multi-select-shapes"><Grid.Root columns={3} className="forms-grid forms-grid--three">{shapes.map((shape) => <Tile key={shape} label={shape}><SkillsMultiSelect id={`multi-select-shape-${shape}`} rootProps={{ shape }} /></Tile>)}</Grid.Root><Grid.Root columns={2} className="forms-grid"><Tile label="full width"><SkillsMultiSelect id="multi-select-full-width" /></Tile><Tile label="intrinsic"><SkillsMultiSelect id="multi-select-intrinsic" rootProps={{ fullWidth: false }} /></Tile></Grid.Root></VStack></Scenario>
      <Scenario {...multiSelectScenarios[4]}><EvidenceSurface data-testid="multi-select-options" inset="lg"><SkillsMultiSelect id="multi-select-long"><MultiSelect.Group><MultiSelect.Label>Disciplines</MultiSelect.Label>{Options()}</MultiSelect.Group><MultiSelect.Separator /><MultiSelect.Group><MultiSelect.Label>Specialties</MultiSelect.Label>{Array.from({ length: 14 }, (_, index) => <MultiSelect.Item key={index} value={`specialty-${index}`}><MultiSelect.ItemText>Specialty {index + 1}</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item>)}</MultiSelect.Group></SkillsMultiSelect></EvidenceSurface></Scenario>
      <Scenario {...multiSelectScenarios[5]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="multi-select-states"><Tile label="placeholder"><Field.Root id="multi-select-placeholder"><Field.Label>Team skills</Field.Label><MultiSelect.Root><MultiSelect.Trigger><MultiSelect.Value placeholder="Choose skills" /><MultiSelect.Icon /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport><Options /></MultiSelect.Viewport><MultiSelect.Arrow /></MultiSelect.Content></MultiSelect.Root></Field.Root></Tile><Tile label="one value"><SkillsMultiSelect id="multi-select-one" rootProps={{ defaultValue: ["design"] }} /></Tile><Tile label="custom summary"><SkillsMultiSelect countSummary id="multi-select-summary"><Options /></SkillsMultiSelect></Tile><Tile label="controlled"><Field.Root id="multi-select-controlled"><Field.Label>Team skills</Field.Label><MultiSelect.Root value={value} onValueChange={setValue} open={open} onOpenChange={setOpen}><MultiSelect.Trigger><MultiSelect.Value renderValue={(values) => `${values.length} skills selected`} /><MultiSelect.Icon /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport><Options /></MultiSelect.Viewport><MultiSelect.Arrow /></MultiSelect.Content></MultiSelect.Root><Text variant="caption">Values: {value.join(", ") || "none"}; open: {String(open)}</Text></Field.Root></Tile><Tile label="disabled"><SkillsMultiSelect id="multi-select-disabled" rootProps={{ disabled: true }} /></Tile><Tile label="read only"><SkillsMultiSelect id="multi-select-readonly" rootProps={{ readOnly: true }} /></Tile><Tile label="invalid"><Field.Root id="multi-select-invalid" invalid><Field.Label>Team skills</Field.Label><MultiSelect.Root invalid><MultiSelect.Trigger><MultiSelect.Value placeholder="Choose skills" /><MultiSelect.Icon /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport><Options /></MultiSelect.Viewport></MultiSelect.Content></MultiSelect.Root><Field.Error>Choose at least one available skill.</Field.Error></Field.Root></Tile></Grid.Root></Scenario>
      <Scenario {...multiSelectScenarios[6]}><VStack gap="4"><Grid.Root columns={2} className="forms-grid" data-testid="multi-select-forms"><Tile label="native form"><Form onReset={() => setStatus("Form reset")} onSubmit={(event) => { event.preventDefault(); setStatus(new FormData(event.currentTarget).getAll("skills").map(String).join(", ") || "No skills"); }}><Field.Root id="multi-select-form-skills" required><Field.Label>Team skills</Field.Label><MultiSelect.Root defaultValue={["design", "engineering"]} name="skills" required><MultiSelect.Trigger><MultiSelect.Value placeholder="Choose skills" /><MultiSelect.Icon /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport>{Options()}</MultiSelect.Viewport><MultiSelect.Arrow /></MultiSelect.Content></MultiSelect.Root><Field.Error>Choose at least one skill.</Field.Error></Field.Root><HStack><Button type="submit">Submit skills</Button><Button tone="neutral" type="reset">Reset</Button></HStack><output data-testid="multi-select-form-status"><Text as="span" variant="caption">{status}</Text></output></Form></Tile><Tile label="asChild trigger"><Field.Root id="multi-select-as-child"><Field.Label>Team skills</Field.Label><MultiSelect.Root defaultValue={["design"]}><MultiSelect.Trigger asChild><button type="button"><MultiSelect.Value /><MultiSelect.Icon /></button></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport>{Options()}</MultiSelect.Viewport><MultiSelect.Arrow /></MultiSelect.Content></MultiSelect.Root></Field.Root></Tile></Grid.Root><RenderedOutput label="Composed Multi Select HTML"><Field.Root id="multi-select-output"><Field.Label>Team skills</Field.Label><MultiSelect.Root defaultValue={["design", "engineering"]} name="skills"><MultiSelect.Trigger asChild><button type="button"><MultiSelect.Value /><MultiSelect.Icon /></button></MultiSelect.Trigger></MultiSelect.Root></Field.Root></RenderedOutput></VStack></Scenario>
      <Scenario {...multiSelectScenarios[7]}><VStack className="forms-evidence-stack" data-testid="multi-select-appearance"><EvidenceGroup title="Scoped appearances" description="The same closed default control uses the local light and dark semantic tokens."><Grid.Root columns={2} className="forms-scoped-grid"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><SkillsMultiSelect id="multi-select-light" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><SkillsMultiSelect id="multi-select-dark" /></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The code names the exact trigger, popup, and highlighted-item variables applied to the preview."><EvidenceSurface className="forms-customization" inset="none"><VStack gap="2"><SpecimenLabel>Customized</SpecimenLabel><Text as="h4" variant="title-sm">Multi Select CSS properties</Text><PlaygroundCodeBlock aria-label="Multi Select customization code">{`style={{
  "--brick-multi-select-trigger-background": "#eefbf5",
  "--brick-multi-select-trigger-border": "#18794e",
  "--brick-multi-select-trigger-focus-ring": "#18794e",
  "--brick-multi-select-trigger-foreground": "#0d3b2a",
  "--brick-multi-select-content-background": "#f4fff9",
  "--brick-multi-select-item-highlighted-background": "#d7f7e5",
}}`}</PlaygroundCodeBlock></VStack><div className="forms-customization__preview"><SkillsMultiSelect id="multi-select-custom" style={customTokens} /></div></EvidenceSurface></EvidenceGroup></VStack></Scenario>
      <Scenario {...multiSelectScenarios[8]}><VStack className="forms-evidence-stack" data-testid="multi-select-stress"><EvidenceGroup title="Responsive boundaries" description="Long localized labels and values remain usable inside a constrained application-owned width."><EvidenceSurface className="forms-stress-panel"><div className="multi-select-narrow"><SkillsMultiSelect id="multi-select-long-text" label="Localized team disciplines with extended wording"><MultiSelect.Item value="collaboration"><MultiSelect.ItemText>Cross-functional collaboration and systems facilitation</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item><MultiSelect.Item value="architecture"><MultiSelect.ItemText>Distributed platform architecture and reliability planning</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item></SkillsMultiSelect></div></EvidenceSurface></EvidenceGroup><EvidenceGroup title="RTL inheritance" description="The label, values, icon, popup alignment, and option indicators follow a genuine right-to-left scope."><EvidenceSurface className="forms-stress-panel"><div className="multi-select-narrow" dir="rtl"><SkillsMultiSelect id="multi-select-rtl" label="مهارات الفريق" /></div></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    </VStack>
  );
}
