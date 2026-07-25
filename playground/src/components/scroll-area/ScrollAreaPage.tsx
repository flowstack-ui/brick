import { useRef, useState, type ReactNode } from "react";
import { Badge, Button, Grid, HStack, ScrollArea, Surface, Text, VStack, type ScrollAreaOrientation, type ScrollAreaScrollbarVisibility } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./scroll-area.playground.css";

const orientations: ScrollAreaOrientation[] = ["vertical", "horizontal", "both"];
const visibility: ScrollAreaScrollbarVisibility[] = ["auto", "always", "interaction"];

function Items({ orientation = "vertical" }: { orientation?: ScrollAreaOrientation }) {
  const className = orientation === "vertical" ? "scroll-area-items" : `scroll-area-items scroll-area-items--${orientation}`;
  const count = orientation === "both" ? 30 : 12;
  return <VStack className={className} gap="2">{Array.from({ length: count }, (_, index) => <Surface bordered inset="sm" key={index}><Text>Project activity {String(index + 1).padStart(2, "0")}</Text></Surface>)}</VStack>;
}

function Demo({ children, focusable = true, label, orientation = "vertical", scrollbarGutter, scrollbarVisibility, testId }: { children?: ReactNode; focusable?: boolean; label: string; orientation?: ScrollAreaOrientation; scrollbarGutter?: "auto" | "stable"; scrollbarVisibility?: ScrollAreaScrollbarVisibility; testId?: string }) {
  return <ScrollArea.Root className="scroll-area-demo" data-testid={testId} orientation={orientation} scrollbarGutter={scrollbarGutter} scrollbarVisibility={scrollbarVisibility}><ScrollArea.Viewport aria-label={focusable ? label : undefined} focusable={focusable}>{children ?? <Items orientation={orientation} />}</ScrollArea.Viewport></ScrollArea.Root>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="scroll-area-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

export const scrollAreaScenarios = [
  { id: "scroll-area.overview", number: 1, title: "Overview", description: "The canonical Scroll Area is a constrained vertical native viewport with automatic scrollbar visibility and explicit keyboard focusability." },
  { id: "scroll-area.orientations", number: 2, title: "Orientations", description: "Vertical, horizontal, and both change only the enabled native scroll axes around identical content." },
  { id: "scroll-area.constraints", number: 3, title: "Layout constraints", navigationTitle: "Constraints", description: "Application layout supplies block, inline, or two-axis constraints; Scroll Area introduces no sizing recipe." },
  { id: "scroll-area.gutter", number: 4, title: "Scrollbar gutter", navigationTitle: "Gutter", description: "Stable gutter reserves classic-scrollbar space without changing content, orientation, or operating-system overlay policy." },
  { id: "scroll-area.visibility", number: 5, title: "Scrollbar visibility", navigationTitle: "Visibility", description: "Auto stays native, always requests a persistent track, and interaction reveals authored scrollbar color on hover or keyboard focus." },
  { id: "scroll-area.semantics", number: 6, title: "Focus and semantics", navigationTitle: "Semantics", description: "Plain content opts into focus and a specific region name; interactive descendants can provide reachability without an extra viewport stop." },
  { id: "scroll-area.composition", number: 7, title: "Composition and output", navigationTitle: "Composition", description: "Root and Viewport preserve Atom render/asChild composition, native attributes, refs, and exact rendered output." },
  { id: "scroll-area.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic native scrollbar colors, focus, and exact public variables adapt across light, dark, and forced colors." },
  { id: "scroll-area.stress", number: 9, title: "Responsive and RTL", navigationTitle: "Stress", description: "Touch widths, long content, horizontal RTL, vertical writing, zoom, and nested scroll handoff remain native and contained." },
] as const satisfies readonly ScenarioDefinition[];

export function ScrollAreaPage() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [refName, setRefName] = useState("not inspected");
  return <VStack className="scroll-area-page" data-component-page="scroll-area" gap="6">
    <Scenario {...scrollAreaScenarios[0]}><EvidenceSurface inset="lg"><Demo label="Recent project activity" testId="scroll-area-default" /></EvidenceSurface></Scenario>
    <Scenario {...scrollAreaScenarios[1]}><Grid.Root className="scroll-area-grid" columns={3}>{orientations.map((orientation) => <Cell key={orientation} label={orientation}><Demo label={`${orientation} activity`} orientation={orientation} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...scrollAreaScenarios[2]}><Grid.Root className="scroll-area-grid" columns={3}><Cell label="block constrained"><Demo label="Block constrained activity" /></Cell><Cell label="inline constrained"><Demo label="Inline constrained activity" orientation="horizontal" /></Cell><Cell label="both axes"><Demo label="Two-axis activity" orientation="both" /></Cell></Grid.Root></Scenario>
    <Scenario {...scrollAreaScenarios[3]}><Grid.Root className="scroll-area-grid" columns={2}><Cell label="auto"><Demo label="Automatic gutter activity" scrollbarGutter="auto" /></Cell><Cell label="stable"><Demo label="Stable gutter activity" scrollbarGutter="stable" /></Cell></Grid.Root></Scenario>
    <Scenario {...scrollAreaScenarios[4]}><Grid.Root className="scroll-area-grid" columns={3}>{visibility.map((value) => <Cell key={value} label={value}><Demo label={`${value} scrollbar activity`} scrollbarVisibility={value} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...scrollAreaScenarios[5]}><Grid.Root className="scroll-area-grid" columns={2}><Cell label="plain named region"><Demo label="Keyboard-scrollable project notes" /></Cell><Cell label="interactive descendants"><Demo focusable={false} label="Actions"><VStack gap="3"><Text>Viewport adds no tab stop or landmark.</Text>{Array.from({ length: 8 }, (_, index) => <Button key={index} size="sm" tone="neutral" variant="outline">Open project {index + 1}</Button>)}</VStack></Demo></Cell></Grid.Root></Scenario>
    <Scenario {...scrollAreaScenarios[6]}><VStack gap="4"><RenderedOutput label="Composed Scroll Area HTML"><ScrollArea.Root asChild orientation="horizontal"><section className="scroll-area-demo"><ScrollArea.Viewport asChild aria-label="Composed timeline" focusable ref={viewportRef}><article><Items orientation="horizontal" /></article></ScrollArea.Viewport></section></ScrollArea.Root></RenderedOutput><Surface bordered inset="md"><HStack gap="3"><Button onClick={() => setRefName(viewportRef.current?.tagName ?? "missing")} tone="neutral" variant="outline">Inspect viewport ref</Button><Text>Ref host: {refName}</Text></HStack></Surface></VStack></Scenario>
    <Scenario {...scrollAreaScenarios[7]}><VStack gap="4"><Grid.Root className="scroll-area-grid" columns={2}><EvidenceSurface data-brick-appearance="light"><Demo label="Light activity" /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Demo label="Dark activity" /></EvidenceSurface></Grid.Root><EvidenceSurface className="scroll-area-customization" inset="lg"><VStack gap="2"><Text as="h3" variant="title-sm">Scrollbar CSS properties</Text><Text tone="secondary" variant="body-sm">Accent thumb and soft track change only the documented native scrollbar colors.</Text><pre tabIndex={0}><code>--brick-scroll-area-scrollbar-thumb; --brick-scroll-area-scrollbar-track</code></pre></VStack><Demo label="Customized activity" scrollbarVisibility="always" testId="scroll-area-custom" /></EvidenceSurface></VStack></Scenario>
    <Scenario {...scrollAreaScenarios[8]}><Grid.Root className="scroll-area-grid" columns={2}><Cell label="mobile and RTL"><div className="scroll-area-phone" dir="rtl"><Demo label="RTL project timeline" orientation="horizontal"><HStack className="scroll-area-rtl-row" gap="3">{Array.from({ length: 8 }, (_, index) => <Badge key={index}>المشروع {index + 1}</Badge>)}</HStack></Demo></div></Cell><Cell label="vertical writing"><div className="scroll-area-vertical-writing"><Demo label="Vertical project notes" orientation="horizontal"><Text>縦書きのプロジェクト履歴を横方向に読み進めるための領域です。</Text></Demo></div></Cell></Grid.Root></Scenario>
  </VStack>;
}
