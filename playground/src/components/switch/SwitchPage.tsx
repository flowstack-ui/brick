import { useState, type CSSProperties } from "react";
import {
  Button,
  Code,
  Field,
  Form,
  Grid,
  HStack,
  Switch,
  Text,
  VStack,
  type SwitchSize,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import "../../shared/forms-evidence.playground.css";
import "./switch.playground.css";

const sizes: SwitchSize[] = ["sm", "md", "lg"];
const customTokens = {
  "--brick-switch-checked-background": "#18794e",
  "--brick-switch-checked-border": "#18794e",
  "--brick-switch-track-inline-size": "3.25rem",
  "--brick-switch-track-block-size": "1.75rem",
  "--brick-switch-thumb-size": "1.375rem",
} as CSSProperties;

function Setting({ checked = false, disabled = false, invalid = false, label = "Weekly reports", readOnly = false, required = false, size = "md" as SwitchSize }: { checked?: boolean; disabled?: boolean; invalid?: boolean; label?: string; readOnly?: boolean; required?: boolean; size?: SwitchSize }) {
  return <HStack className="switch-setting" gap="2"><Switch.Root aria-label={label} defaultChecked={checked} disabled={disabled} invalid={invalid} readOnly={readOnly} required={required} size={size}><Switch.Thumb /></Switch.Root><Text variant="body-md">{label}</Text></HStack>;
}

export const switchScenarios = [
  { description: "Switch’s canonical rendering is one unchecked medium immediate setting with a stable visible name.", id: "switch.overview", number: 1, title: "Overview" },
  { description: "Unchecked and checked change only binary state; size, recipe, and setting name remain identical.", id: "switch.states", number: 2, title: "States" },
  { description: "Small, medium, and large change complete track, thumb, and travel geometry only.", id: "switch.sizes", number: 3, title: "Sizes" },
  { description: "Uncontrolled, controlled, and read-only examples retain identical checked content and medium geometry.", id: "switch.ownership", navigationTitle: "Ownership", number: 4, title: "State ownership" },
  { description: "Disabled artwork preserves both binary states; required and invalid remain default unchecked comparisons.", id: "switch.availability", navigationTitle: "Availability", number: 5, title: "Availability and validity" },
  { description: "Field and Form expose naming, native submission, validation, correction, reset, and external ownership.", id: "switch.form", navigationTitle: "Form", number: 6, title: "Form and Field composition" },
  { description: "Root and Thumb render/asChild paths preserve semantics, state, native props, slots, and refs.", id: "switch.composition", navigationTitle: "Compose", number: 7, title: "Composition" },
  { description: "Adjacent appearance scopes preserve defaults; public tokens visibly customize one exact specimen.", id: "switch.appearance", navigationTitle: "Theme", number: 8, title: "Appearance and customization" },
  { description: "Constrained content, genuine RTL thumb travel, touch targets, and narrow widths remain contained.", id: "switch.stress", navigationTitle: "Stress", number: 9, title: "Responsive and RTL" },
] as const satisfies readonly ScenarioDefinition[];

export function SwitchPage() {
  const [controlled, setControlled] = useState(true);
  const [status, setStatus] = useState("No form event yet");
  return <VStack className="forms-page" data-component-page="switch" data-testid="switch-workbench">
    <Scenario {...switchScenarios[0]}><EvidenceSurface className="forms-overview" data-testid="switch-overview" inset="lg"><Setting /></EvidenceSurface></Scenario>
    <Scenario {...switchScenarios[1]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="switch-states"><Cell label="unchecked"><Setting /></Cell><Cell label="checked"><Setting checked /></Cell></Grid.Root></Scenario>
    <Scenario {...switchScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="switch-sizes">{sizes.map((size) => <Cell key={size} label={size}><Setting size={size} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...switchScenarios[3]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="switch-ownership"><Cell label="uncontrolled"><Setting checked /></Cell><Cell label="controlled"><HStack className="switch-setting" gap="2"><Switch.Root aria-label="Weekly reports" checked={controlled} onCheckedChange={setControlled}><Switch.Thumb /></Switch.Root><Text variant="body-md">Weekly reports</Text></HStack></Cell><Cell label="readOnly"><Setting checked readOnly /></Cell></Grid.Root></Scenario>
    <Scenario {...switchScenarios[4]}><VStack className="forms-evidence-stack" data-testid="switch-availability"><EvidenceGroup description="Only checked state changes; both specimens remain disabled at the default medium size." title="Disabled artwork"><Grid.Root columns={2} className="forms-grid forms-grid--two"><Cell label="unchecked"><Setting disabled /></Cell><Cell label="checked"><Setting checked disabled /></Cell></Grid.Root></EvidenceGroup><EvidenceGroup description="Only the named state changes; content, unchecked state, and medium geometry remain identical." title="Validity"><Grid.Root columns={2} className="forms-grid forms-grid--two"><Cell label="required"><Setting required /></Cell><Cell label="invalid"><Setting invalid /></Cell></Grid.Root></EvidenceGroup></VStack></Scenario>
    <Scenario {...switchScenarios[5]}><VStack className="forms-evidence-stack" data-testid="switch-form"><EvidenceGroup description="One required setting composes with Field messages and native FormData." title="Submitted setting"><EvidenceSurface className="forms-overview" inset="lg"><Form aria-label="Report settings" id="switch-form-example" onReset={() => setStatus("Form reset")} onSubmit={(event) => { const data = new FormData(event.currentTarget); setStatus(`Submitted: ${String(data.get("reports") ?? "off")}`); }} preventDefaultOnSubmit><Field.Root id="weekly-reports" required><Field.Label>Weekly reports</Field.Label><Switch.Root name="reports" required value="enabled"><Switch.Thumb /></Switch.Root><Field.Description>Changes take effect immediately.</Field.Description><Field.Error>Turn on weekly reports.</Field.Error></Field.Root><HStack className="forms-actions"><Button type="submit">Save settings</Button><Button tone="neutral" type="reset">Reset</Button></HStack><output className="forms-status">{status}</output></Form></EvidenceSurface></EvidenceGroup><EvidenceGroup description="The semantic Switch can belong to a native Form elsewhere in the document." title="External form ownership"><EvidenceSurface className="forms-overview" inset="lg"><HStack className="switch-setting" gap="2"><Switch.Root aria-label="Externally owned reports" defaultChecked form="switch-form-example" name="external-reports" value="enabled"><Switch.Thumb /></Switch.Root><Text variant="body-md">Externally owned reports</Text></HStack></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...switchScenarios[6]}><VStack className="forms-evidence-stack" data-testid="switch-composition"><EvidenceGroup description="render supplies both hosts while Switch preserves semantics and live state output." title="render output"><RenderedOutput label="Rendered adapter HTML"><Switch.Root aria-label="Rendered reports" data-adapter="render-root" render={<button />}><Switch.Thumb data-adapter="render-thumb" render={<i />} /></Switch.Root></RenderedOutput></EvidenceGroup><EvidenceGroup description="asChild merges both parts into consumer hosts while preserving the same semantic switch." title="asChild output"><RenderedOutput label="Composed adapter HTML"><Switch.Root aria-label="Composed reports" asChild><button data-adapter="composed-root"><Switch.Thumb asChild><span data-adapter="composed-thumb" /></Switch.Thumb></button></Switch.Root></RenderedOutput></EvidenceGroup></VStack></Scenario>
    <Scenario {...switchScenarios[7]}><VStack className="forms-evidence-stack"><EvidenceGroup description="The same default unchecked setting composes inside adjacent local appearance scopes." title="Scoped appearances"><Grid.Root columns={2} className="forms-scoped-grid" data-testid="switch-appearance"><EvidenceSurface data-brick-appearance="light"><Code>light</Code><Setting /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Code>dark</Code><Setting /></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup description="The code names supported hooks and exactly matches the checked rendered result." title="Consumer customization"><EvidenceSurface as="article" className="forms-customization" inset="lg"><div><Text as="h4" variant="title-sm">Track and thumb properties</Text><Text as="p" tone="secondary" variant="body-sm">Public variables change checked paint and complete geometry.</Text><PlaygroundCodeBlock aria-label="Switch customization example" tabIndex={0}>{`<Switch.Root\n  aria-label="Customized reports"\n  defaultChecked\n  style={{\n    "--brick-switch-checked-background": "#18794e",\n    "--brick-switch-checked-border": "#18794e",\n    "--brick-switch-track-inline-size": "3.25rem",\n    "--brick-switch-track-block-size": "1.75rem",\n    "--brick-switch-thumb-size": "1.375rem",\n  }}\n>\n  <Switch.Thumb />\n</Switch.Root>`}</PlaygroundCodeBlock></div><EvidenceSurface className="forms-customization__preview"><Switch.Root aria-label="Customized reports" defaultChecked style={customTokens}><Switch.Thumb /></Switch.Root></EvidenceSurface></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...switchScenarios[8]}><VStack className="forms-evidence-stack" data-testid="switch-stress"><EvidenceGroup description="A long localized setting stays beside the intrinsic control inside a 20rem frame." title="Constrained-width stress"><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Setting label="Receive detailed weekly publishing and account reports" /></div></EvidenceSurface></EvidenceGroup><EvidenceGroup description="The label remains stable while logical thumb travel mirrors in genuine right-to-left direction." title="RTL inheritance"><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Setting checked label="تلقي التقارير الأسبوعية" /></div></EvidenceSurface></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
