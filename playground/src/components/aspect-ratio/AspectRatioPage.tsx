import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AspectRatio,
  Badge,
  Button,
  Grid,
  HStack,
  Skeleton,
  Surface,
  Text,
  VStack,
  type AspectRatioRadius,
} from "@flowstack-ui/brick";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./aspect-ratio.playground.css";

const ratios = [["1:1", 1], ["4:3", 4 / 3], ["16:9", 16 / 9], ["21:9", 21 / 9], ["3:4", 3 / 4]] as const;
const radii: AspectRatioRadius[] = ["none", "sm", "md", "lg", "full"];
const customStyle = {
  "--brick-aspect-ratio-background": "var(--brick-color-accent-subtle)",
  "--brick-aspect-ratio-border-color": "var(--brick-color-accent-border)",
  "--brick-aspect-ratio-radius": "1rem",
} as CSSProperties;

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <VStack className="aspect-ratio-cell" gap="3"><SpecimenLabel>{label}</SpecimenLabel>{children}</VStack>;
}

function Frame({ children, ...props }: React.ComponentProps<typeof AspectRatio.Root>) {
  return <AspectRatio.Root {...props} className={`aspect-ratio-frame ${props.className ?? ""}`}><div className="aspect-ratio-content">{children ?? <><Text as="span" variant="title-sm">Release preview</Text><Text tone="secondary" variant="body-sm">Stable authored geometry</Text></>}</div></AspectRatio.Root>;
}

function Appearance({ appearance }: { appearance: "light" | "dark" }) {
  return <Surface bordered className="aspect-ratio-appearance" data-brick-appearance={appearance} inset="md"><Badge size="sm" tone="neutral" variant="soft">{appearance}</Badge><Frame radius="lg" variant="outline" /></Surface>;
}

export const aspectRatioScenarios = [
  { id: "aspect-ratio.overview", number: 1, title: "Overview", description: "The default 16:9 Root reserves one stable layout box with plain paint, no radius, hidden overflow, and no invented semantics." },
  { id: "aspect-ratio.anatomy", number: 2, title: "Anatomy and semantics", description: "One Root preserves child-owned image and iframe semantics without adding a role or content wrapper." },
  { id: "aspect-ratio.ratios", number: 3, title: "Ratios", description: "Identical content isolates square, landscape, ultrawide, and portrait numeric geometry." },
  { id: "aspect-ratio.variants", number: 4, title: "Variants", description: "Plain, subtle, and outline change frame paint only." },
  { id: "aspect-ratio.radius-overflow", number: 5, title: "Radius and overflow", description: "Five radii and the two overflow recipes expose clipping and rounded-edge behavior." },
  { id: "aspect-ratio.content", number: 6, title: "Content composition", description: "Image-like content, iframe, Skeleton, and passive layout retain independent ownership." },
  { id: "aspect-ratio.native", number: 7, title: "Native and composition", description: "Native props, refs, asChild, render, invalid fallback, and child-owned sizing remain observable." },
  { id: "aspect-ratio.appearance", number: 8, title: "Appearance and customization", description: "Light and dark badges identify appearance scopes; a titled and described accent specimen demonstrates only documented variables." },
  { id: "aspect-ratio.stress", number: 9, title: "Responsive, localization, RTL, and preferences", description: "Narrow, localized, RTL, forced-color, zoom, and reduced-motion evidence preserves direction-neutral geometry and containment." },
] as const satisfies readonly ScenarioDefinition[];

export function AspectRatioPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [refResult, setRefResult] = useState("Not inspected");
  return <VStack className="aspect-ratio-page" data-component-page="aspect-ratio" gap="6">
    <Scenario {...aspectRatioScenarios[0]}><Surface className="aspect-ratio-overview"><Frame data-testid="aspect-ratio-default" /></Surface></Scenario>
    <Scenario {...aspectRatioScenarios[1]}><Grid.Root className="aspect-ratio-grid" columns={2} gap="4"><Cell label="image semantics"><AspectRatio.Root aria-label="Release image frame" ratio={4 / 3} radius="md" variant="outline"><img alt="Release dashboard preview" className="aspect-ratio-media" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480'%3E%3Crect width='640' height='480' fill='%2388aacc'/%3E%3C/svg%3E" /></AspectRatio.Root></Cell><Cell label="iframe semantics"><AspectRatio.Root ratio={4 / 3} radius="md" variant="outline"><iframe className="aspect-ratio-media" src="about:blank" title="Product tour" /></AspectRatio.Root></Cell></Grid.Root></Scenario>
    <Scenario {...aspectRatioScenarios[2]}><Grid.Root className="aspect-ratio-grid aspect-ratio-grid--ratios" columns={5} data-testid="aspect-ratio-ratios" gap="3">{ratios.map(([label, ratio]) => <Cell key={label} label={label}><Frame ratio={ratio} variant="outline" /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...aspectRatioScenarios[3]}><Grid.Root className="aspect-ratio-grid" columns={3} data-testid="aspect-ratio-variants" gap="4">{(["plain", "subtle", "outline"] as const).map(variant => <Cell key={variant} label={variant}><Frame variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...aspectRatioScenarios[4]}><VStack gap="5"><Grid.Root className="aspect-ratio-grid aspect-ratio-grid--radii" columns={5} data-testid="aspect-ratio-radii" gap="3">{radii.map(radius => <Cell key={radius} label={radius}><Frame radius={radius} variant="outline" /></Cell>)}</Grid.Root><Grid.Root className="aspect-ratio-grid" columns={2} data-testid="aspect-ratio-overflow" gap="4"><Cell label="hidden"><Frame className="aspect-ratio-overflow-marker" overflow="hidden" radius="lg" variant="outline" /></Cell><Cell label="visible"><Frame className="aspect-ratio-overflow-marker" overflow="visible" radius="lg" variant="outline" /></Cell></Grid.Root></VStack></Scenario>
    <Scenario {...aspectRatioScenarios[5]}><Grid.Root className="aspect-ratio-grid" columns={4} data-testid="aspect-ratio-content" gap="4"><Cell label="authored media"><AspectRatio.Root ratio={1} radius="md"><div className="aspect-ratio-photo" role="img" aria-label="Abstract release artwork" /></AspectRatio.Root></Cell><Cell label="semantic iframe"><AspectRatio.Root ratio={1} radius="md" variant="outline"><iframe className="aspect-ratio-media" src="about:blank" title="Office map" /></AspectRatio.Root></Cell><Cell label="skeleton"><AspectRatio.Root ratio={1} radius="md"><Skeleton height="100%" width="100%" /></AspectRatio.Root></Cell><Cell label="passive layout"><Frame ratio={1}><Text variant="body-sm">3 checks ready</Text></Frame></Cell></Grid.Root></Scenario>
    <Scenario {...aspectRatioScenarios[6]}><VStack gap="4"><RenderedOutput label="Aspect Ratio rendered output"><AspectRatio.Root aria-label="Native preview" data-evidence="native" ratio={1} ref={ref} render={(props) => <article {...props}><Text variant="body-sm">Rendered article</Text></article>} /></RenderedOutput><HStack gap="3"><Button onClick={() => setRefResult(ref.current?.tagName ?? "Missing")} size="sm" variant="outline">Inspect ref</Button><Text aria-live="polite" variant="body-sm">Ref host: {refResult}</Text></HStack><AspectRatio.Root asChild ratio={1}><section aria-label="Composed square" className="aspect-ratio-composed" /></AspectRatio.Root><AspectRatio.Root data-testid="aspect-ratio-invalid" ratio={0}><div /></AspectRatio.Root></VStack></Scenario>
    <Scenario {...aspectRatioScenarios[7]}><VStack data-testid="aspect-ratio-appearance" gap="4"><Grid.Root className="aspect-ratio-grid" columns={2} gap="4"><Appearance appearance="light" /><Appearance appearance="dark" /></Grid.Root><Surface bordered className="aspect-ratio-customization" inset="md"><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">Aspect Ratio CSS properties</Text><Text tone="secondary" variant="body-sm">Accent frame paint and a one-rem radius come only from public variables.</Text><Grid.Root className="aspect-ratio-grid" columns={1} gap="4"><Frame style={customStyle} variant="outline" /><PlaygroundCodeBlock aria-label="Aspect Ratio customization example">{`.preview {\n  --brick-aspect-ratio-background: var(--brick-color-accent-subtle);\n  --brick-aspect-ratio-border-color: var(--brick-color-accent-border);\n  --brick-aspect-ratio-radius: 1rem;\n}`}</PlaygroundCodeBlock></Grid.Root></Surface></VStack></Scenario>
    <Scenario {...aspectRatioScenarios[8]}><Grid.Root className="aspect-ratio-grid aspect-ratio-stress" columns={3} data-testid="aspect-ratio-stress" gap="4"><Cell label="narrow"><Frame ratio={3 / 4}><Text variant="body-sm">Localized release details remain inside the available inline size.</Text></Frame></Cell><Cell label="rtl"><div dir="rtl"><Frame ratio={4 / 3}><Text variant="body-sm">معاينة إصدار مستقرة</Text></Frame></div></Cell><Cell label="focus"><Frame overflow="visible" ratio={4 / 3} variant="outline"><Button size="sm">Review release</Button></Frame></Cell></Grid.Root></Scenario>
  </VStack>;
}
