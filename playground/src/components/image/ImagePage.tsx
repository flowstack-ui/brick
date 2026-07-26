import { useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  type ImageFit,
  type ImagePosition,
  type ImageRadius,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./image.playground.css";

const source = "/assets/image/workspace-landscape.png";
const fits: ImageFit[] = ["cover", "contain", "fill", "none", "scale-down"];
const verticalPositions: ImagePosition[] = ["center", "top", "bottom"];
const logicalPositions: ImagePosition[] = ["start", "end"];
const radii: ImageRadius[] = ["none", "sm", "md", "lg", "full"];
const customStyle = {
  "--brick-image-frame-background": "var(--brick-color-accent-soft)",
  "--brick-image-frame-border": "var(--brick-color-accent-border)",
  "--brick-image-fallback-foreground": "var(--brick-color-accent-solid)",
  "--brick-image-fallback-inset": "var(--brick-space-6)",
} as CSSProperties;

function Photo({ alt = "Designers reviewing the workspace", ...props }: { alt?: string } & Omit<ComponentProps<typeof Image.Root>, "children">) {
  return <Image.Root src={source} {...props}><Image.Content alt={alt} height={675} width={1200} /><Image.Fallback>Image unavailable</Image.Fallback></Image.Root>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="image-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>;
}

function SourceStates() {
  const [mode, setMode] = useState<"loaded" | "broken" | "absent">("loaded");
  const selectedSource = mode === "loaded" ? source : mode === "broken" ? "/assets/image/missing.svg" : undefined;
  return <VStack gap="4"><HStack gap="2" wrap><Button onPress={() => setMode("loaded")} size="sm">Loaded</Button><Button onPress={() => setMode("broken")} size="sm" tone="neutral" variant="outline">Broken</Button><Button onPress={() => setMode("absent")} size="sm" tone="neutral" variant="outline">Absent</Button></HStack><Image.Root data-testid="image-state" frame="subtle" ratio={16 / 9} src={selectedSource}><Image.Content alt="Designers reviewing the workspace" height={675} width={1200} /><Image.Fallback when="loading">Loading image</Image.Fallback><Image.Fallback when={["idle", "error"]}>Image unavailable</Image.Fallback></Image.Root><Text aria-live="polite" variant="body-sm">Selected source: {mode}</Text></VStack>;
}

export const imageScenarios = [
  { id: "image.overview", number: 1, title: "Overview", description: "Image’s canonical rendering uses the authored source and alt with cover, center, square corners, no frame, and intrinsic dimensions." },
  { id: "image.accessibility", number: 2, title: "Accessibility", description: "Informative, decorative, and named-action examples keep the same default visual recipe while the author controls alternative text." },
  { id: "image.fits", number: 3, title: "Fits", description: "The same source and frame isolate all five object-fit recipes inside identical aspect-ratio fixtures." },
  { id: "image.positions", number: 4, title: "Positions", description: "The same cover source isolates center, top, bottom, logical start, and logical end focal positions." },
  { id: "image.geometry", number: 5, title: "Radius and frame", navigationTitle: "Geometry", description: "Radius and frame are separate visual dimensions: radius clips corners, while frame changes only the canvas and border." },
  { id: "image.native", number: 6, title: "Responsive attributes and output", navigationTitle: "Native output", description: "Native intrinsic, responsive, loading, decoding, priority, slot, and rendered image attributes remain consumer-authored." },
  { id: "image.states", number: 7, title: "Loading and fallback", navigationTitle: "States", description: "Loaded, broken, and absent sources preserve one box and mutually exclusive authored Content or Fallback." },
  { id: "image.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "A subtle frame adapts to light and dark scopes while documented variables visibly customize only frame and fallback paint." },
  { id: "image.stress", number: 9, title: "Responsive and stress", navigationTitle: "Stress", description: "Narrow containers, tall frames, long fallback content, RTL logical position, zoom, and forced colors remain contained." },
] as const satisfies readonly ScenarioDefinition[];

export function ImagePage() {
  return <VStack className="image-page" data-component-page="image" gap="6">
    <Scenario {...imageScenarios[0]}><EvidenceSurface className="image-overview"><Photo /></EvidenceSurface></Scenario>
    <Scenario {...imageScenarios[1]}><VStack gap="4"><Grid.Root className="image-grid image-grid--three" columns={3} gap="4"><Cell label="informative"><Photo /></Cell><Cell label="decorative"><Photo alt="" /></Cell><Cell label="named action"><Button aria-label="Open workspace preview" className="image-action"><Image.Root asChild src={source}><span><Image.Content alt="" height={675} width={1200} /><Image.Fallback aria-hidden="true">Image unavailable</Image.Fallback></span></Image.Root></Button></Cell></Grid.Root><RenderedOutput label="Informative Image HTML"><Photo /></RenderedOutput></VStack></Scenario>
    <Scenario {...imageScenarios[2]}><Grid.Root className="image-grid image-grid--fits" columns={3} gap="4">{fits.map((fit) => <Cell key={fit} label={fit}><Photo fit={fit} frame="subtle" ratio={4 / 3} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...imageScenarios[3]}><VStack gap="5"><VStack gap="3"><Text as="h3" variant="title-sm">Vertical focal position</Text><Grid.Root className="image-grid image-grid--positions" columns={3} gap="4">{verticalPositions.map((position) => <Cell key={position} label={position}><Photo position={position} ratio={4} /></Cell>)}</Grid.Root></VStack><VStack gap="3"><Text as="h3" variant="title-sm">Logical horizontal position</Text><Grid.Root className="image-grid image-grid--positions" columns={2} gap="4">{logicalPositions.map((position) => <Cell key={position} label={position}><Photo position={position} ratio={1.2} /></Cell>)}</Grid.Root></VStack></VStack></Scenario>
    <Scenario {...imageScenarios[4]}><VStack gap="5"><VStack gap="3"><Text as="h3" variant="title-sm">Radius</Text><Grid.Root className="image-grid image-grid--radii" columns={3} gap="4">{radii.map((radius) => <Cell key={radius} label={radius}><Photo radius={radius} ratio={16 / 9} /></Cell>)}</Grid.Root></VStack><VStack gap="3"><Text as="h3" variant="title-sm">Frame</Text><Grid.Root className="image-grid image-grid--two" columns={2} gap="4"><Cell label="none"><Photo fit="contain" ratio={16 / 9} /></Cell><Cell label="subtle"><Photo fit="contain" frame="subtle" ratio={16 / 9} /></Cell></Grid.Root></VStack></VStack></Scenario>
    <Scenario {...imageScenarios[5]}><VStack gap="4"><Image.Root data-evidence="native" data-slot="project-image" src={source}><Image.Content alt="Workspace dashboard" decoding="async" fetchPriority="high" height={675} loading="eager" sizes="(max-width: 48rem) 100vw, 60vw" srcSet={`${source} 1200w`} width={1200} /><Image.Fallback>Workspace unavailable</Image.Fallback></Image.Root><RenderedOutput label="Responsive Image HTML"><Image.Root data-evidence="native" data-slot="project-image" src={source}><Image.Content alt="Workspace dashboard" decoding="async" fetchPriority="high" height={675} loading="eager" sizes="(max-width: 48rem) 100vw, 60vw" srcSet={`${source} 1200w`} width={1200} /><Image.Fallback>Workspace unavailable</Image.Fallback></Image.Root></RenderedOutput></VStack></Scenario>
    <Scenario {...imageScenarios[6]}><SourceStates /></Scenario>
    <Scenario {...imageScenarios[7]}><VStack gap="5"><Grid.Root className="image-grid image-grid--two" columns={2} gap="4"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><Photo fit="contain" frame="subtle" ratio={16 / 9} /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><Photo fit="contain" frame="subtle" ratio={16 / 9} /></EvidenceSurface></Grid.Root><EvidenceSurface><Grid.Root className="image-customization" columns={2} gap="5"><VStack gap="2"><Text as="h3" variant="title-sm">Image CSS properties</Text><Text tone="secondary" variant="body-sm">The preview changes the frame canvas, border, fallback foreground, and inset shown in code.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-image-frame-background: var(--brick-color-accent-soft);\n--brick-image-frame-border: var(--brick-color-accent-border);\n--brick-image-fallback-foreground: var(--brick-color-accent-solid);\n--brick-image-fallback-inset: var(--brick-space-6);`}</PlaygroundCodeBlock></VStack><Image.Root frame="subtle" ratio={16 / 9} style={customStyle}><Image.Fallback>Customized fallback</Image.Fallback></Image.Root></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...imageScenarios[8]}><Grid.Root className="image-grid image-grid--stress" columns={2} gap="4"><Cell label="narrow"><div className="image-narrow"><Photo ratio={3 / 4} /></div></Cell><Cell label="long fallback"><Image.Root frame="subtle" ratio={16 / 9}><Image.Fallback>This carefully authored fallback remains readable without escaping the media frame.</Image.Fallback></Image.Root></Cell><Cell label="LTR start"><Photo position="start" ratio={1.2} /></Cell><Cell label="RTL start"><div dir="rtl"><Photo position="start" ratio={1.2} /></div></Cell></Grid.Root></Scenario>
  </VStack>;
}
