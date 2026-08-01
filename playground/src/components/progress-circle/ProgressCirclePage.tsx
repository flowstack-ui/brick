import type { CSSProperties, ComponentProps } from "react";
import { Grid, ProgressCircle, Text, VStack, type ProgressCircleSize, type ProgressCircleTone } from "@flowstack-ui/brick";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import "../../shared/forms-evidence.playground.css";
import "./progress-circle.playground.css";

const sizes: ProgressCircleSize[] = ["xs", "sm", "md", "lg", "xl"];
const tones: ProgressCircleTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const customStyle = { "--brick-progress-circle-track": "#ede9fe", "--brick-progress-circle-indicator": "#6d28d9", "--brick-progress-circle-size": "5.5rem", "--brick-progress-circle-stroke": 7 } as CSSProperties;
const customCode = "--brick-progress-circle-track: #ede9fe;\n--brick-progress-circle-indicator: #6d28d9;\n--brick-progress-circle-size: 5.5rem;\n--brick-progress-circle-stroke: 7;";

function CircleProgress({ label = "Export report", value = 64, ...props }: { label?: string; value?: number | null } & Omit<ComponentProps<typeof ProgressCircle.Root>, "children" | "value">) {
  return <ProgressCircle.Root value={value} {...props}><ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle><ProgressCircle.Value /><ProgressCircle.Label>{label}</ProgressCircle.Label></ProgressCircle.Root>;
}

export const progressCircleScenarios = [
  { id: "progress-circle.overview", number: 1, title: "Overview", description: "Progress Circle defaults to an indeterminate, medium, regular, round-capped accent ring with a visible accessible label." },
  { id: "progress-circle.states", number: 2, title: "Values and states", navigationTitle: "States", description: "Only value changes across empty, active, complete, and indeterminate circular task progress." },
  { id: "progress-circle.tones", number: 3, title: "Tones", description: "Each semantic tone changes only the active ring while geometry, content, and value remain controlled." },
  { id: "progress-circle.sizes", number: 4, title: "Sizes", description: "Five sizes change ring diameter while SVG scaling preserves the regular stroke proportion and task progress." },
  { id: "progress-circle.geometry", number: 5, title: "Thickness and caps", navigationTitle: "Geometry", description: "Thickness changes stroke weight and caps change only indicator ends." },
  { id: "progress-circle.values", number: 6, title: "Labels and value display", navigationTitle: "Content", description: "Visible labels name the progressbar and optional visible value content supports localized percentages or task-specific ranges." },
  { id: "progress-circle.output", number: 7, title: "Rendered output", navigationTitle: "Output", description: "The live SVG geometry, generated naming relationship, and normalized range remain directly inspectable." },
  { id: "progress-circle.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic ring tokens adapt by appearance; one exact custom example matches the shown component properties." },
  { id: "progress-circle.stress", number: 9, title: "Responsive and accessibility", navigationTitle: "Stress", description: "Narrow layouts, long labels, RTL, zoom, reduced motion, forced colors, and loading-region composition remain stable." },
] as const satisfies readonly ScenarioDefinition[];

export function ProgressCirclePage() {
  return <VStack className="forms-page progress-circle-page" data-component-page="progress-circle" data-testid="progress-circle-workbench">
    <Scenario {...progressCircleScenarios[0]}><EvidenceSurface inset="lg" data-testid="progress-circle-overview"><CircleProgress value={null} /></EvidenceSurface></Scenario>
    <Scenario {...progressCircleScenarios[1]}><Grid.Root columns={4} className="forms-grid forms-grid--four" data-testid="progress-circle-states"><Cell label="empty"><CircleProgress value={0} /></Cell><Cell label="active"><CircleProgress /></Cell><Cell label="complete"><CircleProgress value={100} /></Cell><Cell label="indeterminate"><CircleProgress value={null} /></Cell></Grid.Root></Scenario>
    <Scenario {...progressCircleScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="progress-circle-tones">{tones.map((tone) => <Cell key={tone} label={tone}><CircleProgress tone={tone} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...progressCircleScenarios[3]}><Grid.Root columns={5} className="forms-grid progress-circle-grid--five" data-testid="progress-circle-sizes">{sizes.map((size) => <Cell key={size} label={size}><CircleProgress size={size} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...progressCircleScenarios[4]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Thickness" description="Only stroke weight changes."><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="progress-circle-thickness">{(["thin", "regular", "thick"] as const).map((thickness) => <Cell key={thickness} label={thickness}><CircleProgress thickness={thickness} /></Cell>)}</Grid.Root></EvidenceGroup><EvidenceGroup title="Indicator caps" description="Round and butt alter arc ends without changing the track."><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="progress-circle-caps"><Cell label="round"><CircleProgress cap="round" /></Cell><Cell label="butt"><CircleProgress cap="butt" /></Cell></Grid.Root></EvidenceGroup></VStack></Scenario>
    <Scenario {...progressCircleScenarios[5]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="progress-circle-content"><Cell label="localized percent"><CircleProgress locale="en-US" /></Cell><Cell label="task range"><ProgressCircle.Root min={1} max={5} value={3}><ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle><ProgressCircle.Value>{({ value, max }) => `${value}/${max}`}</ProgressCircle.Value><ProgressCircle.Label>Setup tasks</ProgressCircle.Label></ProgressCircle.Root></Cell></Grid.Root></Scenario>
    <Scenario {...progressCircleScenarios[6]}><RenderedOutput label="Progress Circle HTML"><CircleProgress /></RenderedOutput></Scenario>
    <Scenario {...progressCircleScenarios[7]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Scoped appearances" description="The same defaults use semantic track, text, and accent tokens."><Grid.Root columns={2} className="forms-scoped-grid" data-testid="progress-circle-appearance"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><CircleProgress /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><CircleProgress /></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The larger purple ring, lavender track, and custom stroke come from the exact properties shown."><EvidenceSurface className="forms-customization" inset="lg"><PlaygroundCodeBlock aria-label="Progress Circle customization code">{customCode}</PlaygroundCodeBlock><CircleProgress style={customStyle} /></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...progressCircleScenarios[8]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="progress-circle-stress"><Cell label="narrow and long"><div className="progress-circle-phone"><CircleProgress label="Preparing a carefully localized workspace archive" size="lg" /></div></Cell><Cell label="RTL clockwise"><div dir="rtl"><CircleProgress label="تصدير التقرير" /></div></Cell><Cell label="indeterminate RTL"><div dir="rtl"><CircleProgress label="تحميل المحتوى" value={null} /></div></Cell><Cell label="loading region"><section aria-busy="true" aria-label="Analytics content"><Text tone="secondary" variant="body-sm">The application owns the busy region.</Text><ProgressCircle.Root aria-label="Loading analytics" value={null}><ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle></ProgressCircle.Root></section></Cell></Grid.Root></Scenario>
  </VStack>;
}
