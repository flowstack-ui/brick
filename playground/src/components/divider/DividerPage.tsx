import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Button, Container, Divider, Grid, HStack, Surface, Text, VStack, type DividerInset, type DividerLabelAlign, type DividerThickness, type DividerVariant } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./divider.playground.css";

const variants: DividerVariant[] = ["solid", "dashed", "dotted"];
const thicknesses: DividerThickness[] = ["subtle", "regular", "strong"];
const insets: DividerInset[] = ["none", "start", "both"];
const labelAlignments: DividerLabelAlign[] = ["start", "center", "end"];

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="divider-cell"><SpecimenLabel>{label}</SpecimenLabel><VStack className="divider-cell__preview" gap="3">{children}</VStack></EvidenceSurface>;
}

function ContentPair({ divider }: { divider: ReactNode }) {
  return <VStack gap="3"><Text>Current workspace</Text>{divider}<Text tone="secondary">Archived workspace</Text></VStack>;
}

export const dividerScenarios = [
  { id: "divider.overview", number: 1, title: "Overview", description: "Divider’s canonical rendering is a decorative horizontal solid line with subtle thickness and no inset." },
  { id: "divider.orientation", number: 2, title: "Orientation", description: "Orientation changes only the line axis. The vertical example uses explicit stretch inside the same row geometry." },
  { id: "divider.variants", number: 3, title: "Variants", description: "Solid, dashed, and dotted change only native border style." },
  { id: "divider.thickness", number: 4, title: "Thickness", description: "Thickness changes only line weight while content and every other default remain identical." },
  { id: "divider.inset", number: 5, title: "Inset", description: "Logical inset changes only available line extent and mirrors start in RTL." },
  { id: "divider.labels", number: 6, title: "Labels", description: "Horizontal labeled dividers align identical visible content at logical start, center, or end." },
  { id: "divider.semantics", number: 7, title: "Semantics and composition", navigationTitle: "Semantics", description: "Decorative and named semantic output remain Atom-owned; render and asChild preserve the finished root contract." },
  { id: "divider.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic tokens adapt to light, dark, forced colors, and exact public CSS-variable overrides." },
  { id: "divider.stress", number: 9, title: "Responsive and RTL", navigationTitle: "Stress", description: "Long localized labels, narrow width, RTL start inset, and vertical stretch remain contained." },
] as const satisfies readonly ScenarioDefinition[];

export function DividerPage() {
  const ref = useRef<HTMLHRElement | HTMLDivElement>(null);
  const [refName, setRefName] = useState("not inspected");
  const customStyle = { "--brick-divider-color": "var(--brick-color-accent-border)", "--brick-divider-inset": "2rem", "--brick-divider-label-gap": "1rem" } as CSSProperties;
  return <VStack className="divider-page" data-component-page="divider">
    <Scenario {...dividerScenarios[0]}><EvidenceSurface className="divider-overview" data-testid="divider-overview" inset="lg"><ContentPair divider={<Divider data-testid="divider-default" />} /></EvidenceSurface></Scenario>
    <Scenario {...dividerScenarios[1]}><Grid.Root columns={2} className="divider-grid" data-testid="divider-orientations"><Cell label="horizontal"><ContentPair divider={<Divider />} /></Cell><Cell label="vertical"><HStack className="divider-row" gap="4"><Text>Current</Text><Divider orientation="vertical" stretch /><Text tone="secondary">Archived</Text></HStack></Cell></Grid.Root></Scenario>
    <Scenario {...dividerScenarios[2]}><Grid.Root columns={3} className="divider-grid" data-testid="divider-variants">{variants.map((variant) => <Cell key={variant} label={variant}><ContentPair divider={<Divider variant={variant} />} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...dividerScenarios[3]}><Grid.Root columns={3} className="divider-grid" data-testid="divider-thicknesses">{thicknesses.map((thickness) => <Cell key={thickness} label={thickness}><ContentPair divider={<Divider thickness={thickness} />} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...dividerScenarios[4]}><Grid.Root columns={3} className="divider-grid" data-testid="divider-insets">{insets.map((inset) => <Cell key={inset} label={inset}><ContentPair divider={<Divider inset={inset} />} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...dividerScenarios[5]}><Grid.Root columns={3} className="divider-grid" data-testid="divider-labels">{labelAlignments.map((labelAlign) => <Cell key={labelAlign} label={labelAlign}><Divider labelAlign={labelAlign}>or continue with</Divider></Cell>)}</Grid.Root></Scenario>
    <Scenario {...dividerScenarios[6]}><VStack gap="4" data-testid="divider-semantics"><Grid.Root columns={2} className="divider-grid"><Cell label="decorative"><Divider /></Cell><Cell label="named semantic"><Divider aria-label="Archived workspace" decorative={false} /></Cell></Grid.Root><RenderedOutput label="Composed Divider HTML"><Divider asChild><div>Composed section boundary</div></Divider></RenderedOutput><Surface bordered inset="md"><HStack gap="3"><Button onClick={() => setRefName(ref.current?.tagName ?? "missing")} tone="neutral" variant="outline">Inspect ref</Button><Text>Ref host: {refName}</Text><Divider ref={ref} /></HStack></Surface></VStack></Scenario>
    <Scenario {...dividerScenarios[7]}><VStack gap="4" data-testid="divider-appearance"><Grid.Root columns={2} className="divider-grid"><EvidenceSurface data-brick-appearance="light"><ContentPair divider={<Divider />} /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><ContentPair divider={<Divider />} /></EvidenceSurface></Grid.Root><EvidenceSurface as="article" className="divider-customization" inset="lg"><VStack gap="2"><Text as="h3" variant="title-sm">Divider CSS properties</Text><Text tone="secondary" variant="body-sm">Accent color, larger inset, and label gap use documented public variables.</Text><pre tabIndex={0}><code>--brick-divider-color; --brick-divider-inset; --brick-divider-label-gap</code></pre></VStack><EvidenceSurface level="canvas"><Divider style={customStyle}>custom boundary</Divider></EvidenceSurface></EvidenceSurface></VStack></Scenario>
    <Scenario {...dividerScenarios[8]}><Container gutter="sm" measure="narrow"><Grid.Root columns={2} className="divider-grid" data-testid="divider-stress"><Cell label="long localized label"><Divider>International project workspace boundary that remains readable at narrow widths</Divider></Cell><Cell label="RTL and vertical"><VStack dir="rtl" gap="4"><Divider inset="start" /><HStack className="divider-row" gap="3"><Badge>الأول</Badge><Divider orientation="vertical" stretch variant="dashed" /><Badge>الثاني</Badge></HStack></VStack></Cell></Grid.Root></Container></Scenario>
  </VStack>;
}
