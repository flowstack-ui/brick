import { useState, type CSSProperties } from "react";
import { Button, Grid, Skeleton, Surface, Text, VStack, type SkeletonAnimation, type SkeletonVariant } from "@flowstack-ui/brick";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import "../../shared/forms-evidence.playground.css";
import "./skeleton.playground.css";

const variants: SkeletonVariant[] = ["text", "circular", "rectangular", "rounded"];
const animations: SkeletonAnimation[] = ["pulse", "wave", "none"];
const customStyle = { "--brick-skeleton-background": "#d8b4fe", "--brick-skeleton-highlight": "#f3e8ff", "--brick-skeleton-radius": "1rem" } as CSSProperties;

export const skeletonScenarios = [
  { id: "skeleton.overview", number: 1, title: "Overview", description: "Skeleton defaults to one full-width text placeholder with pulse animation and no accessibility announcement." },
  { id: "skeleton.variants", number: 2, title: "Variants", description: "Text, circular, rectangular, and rounded change geometry only while dimensions stay deliberate." },
  { id: "skeleton.animation", number: 3, title: "Animation", description: "Pulse, wave, and none provide distinct motion recipes that become static under reduced-motion preferences." },
  { id: "skeleton.dimensions", number: 4, title: "Dimensions", description: "Number, string, style, and public variables size placeholders without introducing a component size scale." },
  { id: "skeleton.lines", number: 5, title: "Text lines", description: "Standalone text placeholders render one or several consistent rows with a shorter final line." },
  { id: "skeleton.loading", number: 6, title: "Content loading", navigationTitle: "Loading", description: "Wrapped content preserves its exact geometry, remains noninteractive while hidden, and returns through the same root." },
  { id: "skeleton.composition", number: 7, title: "Composition", description: "Skeleton composes real Brick layouts and controls without taking their loading state, semantics, or data ownership." },
  { id: "skeleton.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic surfaces adapt by appearance; one exact custom example matches the shown supported variables." },
  { id: "skeleton.stress", number: 9, title: "Responsive and accessibility", navigationTitle: "Stress", description: "Narrow, RTL, zoom, forced-color, and reduced-motion conditions retain geometry without focusable placeholder UI." },
] as const satisfies readonly ScenarioDefinition[];

export function SkeletonPage() {
  const [loading, setLoading] = useState(true);
  return <VStack className="forms-page skeleton-page" data-component-page="skeleton" data-testid="skeleton-workbench">
    <Scenario {...skeletonScenarios[0]}><EvidenceSurface inset="lg" data-testid="skeleton-overview"><Skeleton /></EvidenceSurface></Scenario>
    <Scenario {...skeletonScenarios[1]}><Grid.Root columns={4} className="forms-grid forms-grid--four" data-testid="skeleton-variants">{variants.map((variant) => <Cell key={variant} label={variant}><Skeleton variant={variant} width={variant === "circular" ? 56 : "100%"} height={variant === "text" ? "1em" : 56} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...skeletonScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="skeleton-animation">{animations.map((animation) => <Cell key={animation} label={animation}><Skeleton animation={animation} variant="rounded" height={64} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...skeletonScenarios[3]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="skeleton-dimensions"><Cell label="number"><Skeleton width={144} height={40} variant="rounded" /></Cell><Cell label="css length"><Skeleton width="10rem" height="2.5rem" variant="rounded" /></Cell><Cell label="consumer style"><Skeleton style={{ width: "75%", height: "2.5rem" }} variant="rounded" /></Cell></Grid.Root></Scenario>
    <Scenario {...skeletonScenarios[4]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="skeleton-lines"><Cell label="one line"><Skeleton /></Cell><Cell label="three lines"><Skeleton lines={3} /></Cell><Cell label="five lines"><Skeleton animation="wave" lines={5} /></Cell></Grid.Root></Scenario>
    <Scenario {...skeletonScenarios[5]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="skeleton-loading"><Cell label="loading content"><Skeleton loading><Button>Save project</Button></Skeleton></Cell><Cell label="interactive toggle"><VStack gap="2"><Skeleton loading={loading} variant="rounded"><Surface bordered inset="md"><Text weight="semibold">Project ready</Text><Text tone="secondary" variant="body-sm">Content keeps this exact geometry.</Text></Surface></Skeleton><Button onPress={() => setLoading((value) => !value)} variant="outline">{loading ? "Show content" : "Show skeleton"}</Button></VStack></Cell></Grid.Root></Scenario>
    <Scenario {...skeletonScenarios[6]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="skeleton-composition"><Cell label="avatar row"><VStack gap="2"><Skeleton variant="circular" width={48} height={48} /><Skeleton lines={2} width="12rem" /></VStack></Cell><Cell label="card preview"><Surface bordered inset="md"><VStack gap="3"><Skeleton variant="rounded" height={96} /><Skeleton lines={3} /></VStack></Surface></Cell></Grid.Root></Scenario>
    <Scenario {...skeletonScenarios[7]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Scoped appearances" description="The same defaults adapt through semantic surface tokens."><Grid.Root columns={2} className="forms-scoped-grid" data-testid="skeleton-appearance"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Skeleton lines={3} /></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Skeleton lines={3} /></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The shown variables exactly produce the purple rounded wave placeholder."><EvidenceSurface className="forms-customization" inset="lg"><PlaygroundCodeBlock aria-label="Skeleton customization code">{`style={{\n  "--brick-skeleton-background": "#d8b4fe",\n  "--brick-skeleton-highlight": "#f3e8ff",\n  "--brick-skeleton-radius": "1rem",\n}}`}</PlaygroundCodeBlock><Skeleton animation="wave" height={80} style={customStyle} variant="rounded" /></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...skeletonScenarios[8]}><VStack className="forms-evidence-stack" data-testid="skeleton-stress"><EvidenceGroup title="Narrow and RTL" description="Logical width remains bounded and placeholder geometry has no text direction to mirror."><EvidenceSurface><div className="skeleton-phone" dir="rtl"><Skeleton lines={4} /></div></EvidenceSurface></EvidenceGroup><EvidenceGroup title="Region ownership" description="The application marks the updating region busy; decorative placeholders stay hidden from assistive technology."><EvidenceSurface><section aria-busy="true" aria-label="Loading profile"><VStack gap="2"><Skeleton variant="circular" /><Skeleton lines={3} /></VStack></section></EvidenceSurface></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
