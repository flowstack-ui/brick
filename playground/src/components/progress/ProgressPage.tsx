import type { CSSProperties, ComponentProps } from "react";
import { Code, Grid, Progress, Text, VStack, type ProgressShape, type ProgressSize, type ProgressTone } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import "../../shared/forms-evidence.playground.css";
import "./progress.playground.css";

const sizes: ProgressSize[] = ["xs", "sm", "md", "lg", "xl"];
const shapes: ProgressShape[] = ["square", "rounded", "pill"];
const tones: ProgressTone[] = ["neutral", "accent", "info", "success", "warning", "danger"];
const customStyle = { "--brick-progress-track-background": "#ede9fe", "--brick-progress-indicator-background": "#6d28d9", "--brick-progress-thickness": "0.875rem", "--brick-progress-radius": "0.375rem" } as CSSProperties;
const customCode = "--brick-progress-track-background: #ede9fe;\n--brick-progress-indicator-background: #6d28d9;\n--brick-progress-thickness: 0.875rem;\n--brick-progress-radius: 0.375rem;";

function LinearProgress({ label = "Upload files", value = 64, ...props }: { label?: string; value?: number | null } & Omit<ComponentProps<typeof Progress.Root>, "children" | "value">) {
  return <Progress.Root value={value} {...props}><Progress.Label>{label}</Progress.Label><Progress.Value /><Progress.Track>{props.bufferValue !== undefined ? <Progress.Buffer /> : null}<Progress.Indicator /></Progress.Track></Progress.Root>;
}

export const progressScenarios = [
  { id: "progress.overview", number: 1, title: "Overview", description: "Progress defaults to an indeterminate, horizontal, medium, rounded, accent bar; the visible label supplies its accessible name." },
  { id: "progress.states", number: 2, title: "Values and states", navigationTitle: "States", description: "Only value changes across empty, active, complete, and indeterminate task progress." },
  { id: "progress.tones", number: 3, title: "Tones", description: "Each semantic tone changes the indicator color while size, shape, content, and value remain at their defaults." },
  { id: "progress.sizes", number: 4, title: "Sizes", description: "Five sizes change only track thickness; the same value, label, tone, and rounded shape remain controlled." },
  { id: "progress.geometry", number: 5, title: "Shapes and orientation", navigationTitle: "Geometry", description: "Shape controls track ends, while orientation changes the progress axis and announces the correct ARIA orientation." },
  { id: "progress.buffer", number: 6, title: "Buffer and value display", navigationTitle: "Buffer", description: "Buffer communicates secondary loaded progress visually, while custom visible value content leaves the task's accessible current value unchanged." },
  { id: "progress.composition", number: 7, title: "Naming and rendered output", navigationTitle: "Output", description: "Visible-label and explicit-name compositions expose their generated relationship and normalized range in live rendered HTML." },
  { id: "progress.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic tokens adapt through light and dark appearances; the custom preview exactly matches the shown component properties." },
  { id: "progress.stress", number: 9, title: "Responsive and accessibility", navigationTitle: "Stress", description: "Constrained width, long copy, RTL fill direction, vertical geometry, zoom, reduced motion, and forced colors remain readable and contained." },
] as const satisfies readonly ScenarioDefinition[];

export function ProgressPage() {
  return <VStack className="forms-page progress-page" data-component-page="progress" data-testid="progress-workbench">
    <Scenario {...progressScenarios[0]}><EvidenceSurface inset="lg" data-testid="progress-overview"><LinearProgress value={null} /></EvidenceSurface></Scenario>
    <Scenario {...progressScenarios[1]}><Grid.Root columns={4} className="forms-grid forms-grid--four" data-testid="progress-states"><Cell label="empty"><LinearProgress value={0} /></Cell><Cell label="active"><LinearProgress /></Cell><Cell label="complete"><LinearProgress value={100} /></Cell><Cell label="indeterminate"><LinearProgress value={null} /></Cell></Grid.Root></Scenario>
    <Scenario {...progressScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="progress-tones">{tones.map((tone) => <Cell key={tone} label={tone}><LinearProgress tone={tone} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...progressScenarios[3]}><Grid.Root columns={5} className="forms-grid progress-grid--five" data-testid="progress-sizes">{sizes.map((size) => <Cell key={size} label={size}><LinearProgress size={size} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...progressScenarios[4]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Shapes" description="Only the track and indicator ends change."><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="progress-shapes">{shapes.map((shape) => <Cell key={shape} label={shape}><LinearProgress shape={shape} /></Cell>)}</Grid.Root></EvidenceGroup><EvidenceGroup title="Orientation" description="Horizontal follows inline direction; vertical fills from the block end."><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="progress-orientation"><Cell label="horizontal"><LinearProgress /></Cell><Cell label="vertical"><LinearProgress orientation="vertical" /></Cell></Grid.Root></EvidenceGroup></VStack></Scenario>
    <Scenario {...progressScenarios[5]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="progress-buffer"><Cell label="buffered transfer"><LinearProgress bufferValue={82} value={46} /></Cell><Cell label="custom value"><Progress.Root value={3} min={1} max={5}><Progress.Label>Setup tasks</Progress.Label><Progress.Value>{({ value, max }) => `${value} of ${max}`}</Progress.Value><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root></Cell></Grid.Root></Scenario>
    <Scenario {...progressScenarios[6]}><Grid.Root columns={2} className="progress-output-grid" data-testid="progress-output"><RenderedOutput label="Visible label Progress HTML"><LinearProgress /></RenderedOutput><RenderedOutput label="Explicit name Progress HTML"><Progress.Root aria-label="Background sync" value={28}><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root></RenderedOutput></Grid.Root></Scenario>
    <Scenario {...progressScenarios[7]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Scoped appearances" description="The same defaults use semantic track, text, and accent tokens."><Grid.Root columns={2} className="forms-scoped-grid" data-testid="progress-appearance"><EvidenceSurface data-brick-appearance="light"><Code>light</Code><LinearProgress /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Code>dark</Code><LinearProgress /></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The purple indicator, lavender track, thicker height, and tighter radius come from the exact properties shown."><EvidenceSurface className="forms-customization" inset="lg"><PlaygroundCodeBlock aria-label="Progress customization code">{customCode}</PlaygroundCodeBlock><LinearProgress style={customStyle} /></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...progressScenarios[8]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="progress-stress"><Cell label="narrow and long"><div className="progress-phone"><LinearProgress label="Preparing a carefully localized workspace archive" /></div></Cell><Cell label="RTL horizontal"><div dir="rtl"><LinearProgress label="تحميل الملفات" /></div></Cell><Cell label="vertical RTL"><div dir="rtl"><LinearProgress label="مزامنة البيانات" orientation="vertical" /></div></Cell><Cell label="loading region"><section aria-busy="true" aria-label="Report content"><Text tone="secondary" variant="body-sm">The application owns the busy region.</Text><Progress.Root aria-label="Loading report" value={null}><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root></section></Cell></Grid.Root></Scenario>
  </VStack>;
}
