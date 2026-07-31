import { useState, type ReactNode } from "react";
import {
  Button,
  Grid,
  HStack,
  Icon,
  Text,
  VisuallyHidden,
  VStack,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./visually-hidden.playground.css";

function SearchGraphic() {
  return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2"/><path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"/></svg>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return <EvidenceSurface className="visually-hidden-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="visually-hidden-cell__preview">{children}</div></EvidenceSurface>;
}

function NamedAction({ label = "Search projects" }: { label?: string }) {
  return <Button aria-label={undefined} data-testid="visually-hidden-action"><Icon><SearchGraphic /></Icon><VisuallyHidden.Root>{label}</VisuallyHidden.Root></Button>;
}

export const visuallyHiddenScenarios = [
  { id: "visually-hidden.overview", number: 1, title: "Overview", description: "The default span contributes a concise accessible name while remaining absent from the visual layout." },
  { id: "visually-hidden.naming", number: 2, title: "Accessible naming", navigationTitle: "Naming", description: "Hidden text can name an icon-only action or add context to visible text without duplicating visual content." },
  { id: "visually-hidden.output", number: 3, title: "Rendered output", navigationTitle: "Output", description: "The default host and Atom-owned inline hiding styles remain inspectable in the generated HTML." },
  { id: "visually-hidden.composition", number: 4, title: "Composition", description: "render and asChild can change the semantic host while preserving the exact hiding behavior and authored content." },
  { id: "visually-hidden.native", number: 5, title: "Native props and slots", navigationTitle: "Native props", description: "Consumer classes, data attributes, authored slots, styles, and refs pass through the single Root part." },
  { id: "visually-hidden.stress", number: 6, title: "Responsive and stress", navigationTitle: "Stress", description: "Long names, RTL, appearance, narrow layouts, and zoom do not create a visible footprint or horizontal overflow." },
] as const;

export function VisuallyHiddenPage() {
  const [host, setHost] = useState("not inspected");
  return <VStack className="visually-hidden-page" data-component-page="visually-hidden">
    <Scenario {...visuallyHiddenScenarios[0]}><EvidenceSurface className="visually-hidden-hero"><NamedAction /></EvidenceSurface></Scenario>
    <Scenario {...visuallyHiddenScenarios[1]}><Grid.Root columns={2} className="visually-hidden-grid"><Cell label="icon-only name"><NamedAction label="Search projects" /></Cell><Cell label="supplemental context"><Button tone="danger">Delete<VisuallyHidden.Root> project permanently</VisuallyHidden.Root></Button></Cell></Grid.Root></Scenario>
    <Scenario {...visuallyHiddenScenarios[2]}><RenderedOutput label="Visually Hidden HTML"><span className="visually-hidden-output-host"><Icon><SearchGraphic /></Icon><VisuallyHidden.Root>Search projects</VisuallyHidden.Root></span></RenderedOutput></Scenario>
    <Scenario {...visuallyHiddenScenarios[3]}><VStack gap="4"><Grid.Root columns={2} className="visually-hidden-grid"><Cell label="render host"><VisuallyHidden.Root render={(props) => <strong {...props} data-adapter="render" />}>Urgent context</VisuallyHidden.Root></Cell><Cell label="asChild host"><VisuallyHidden.Root asChild><em data-adapter="as-child">Emphasized context</em></VisuallyHidden.Root></Cell></Grid.Root><RenderedOutput label="Composed Visually Hidden HTML"><VisuallyHidden.Root asChild><em data-adapter="as-child">Composed context</em></VisuallyHidden.Root></RenderedOutput></VStack></Scenario>
    <Scenario {...visuallyHiddenScenarios[4]}><EvidenceSurface><HStack gap="4" wrap><VisuallyHidden.Root className="consumer-hidden" data-purpose="context" data-slot="private-context" ref={(node) => { if (node && host === "not inspected") setHost(node.tagName); }}>Native context</VisuallyHidden.Root><Button onClick={() => setHost(document.querySelector("[data-purpose=context]")?.tagName ?? "missing")} tone="neutral" variant="outline">Inspect ref host</Button><Text data-testid="visually-hidden-ref-result">Ref host: {host}</Text></HStack></EvidenceSurface></Scenario>
    <Scenario {...visuallyHiddenScenarios[5]}><Grid.Root columns={2} className="visually-hidden-grid" data-testid="visually-hidden-stress-grid"><EvidenceSurface className="visually-hidden-stress-panel" data-brick-appearance="dark"><SpecimenLabel>dark appearance</SpecimenLabel><NamedAction label="Open the shared workspace search with a deliberately long accessible name" /></EvidenceSurface><EvidenceSurface className="visually-hidden-stress-panel" dir="rtl"><SpecimenLabel>RTL narrow frame</SpecimenLabel><div className="visually-hidden-narrow"><NamedAction label="البحث في المشاريع المشتركة" /></div></EvidenceSurface></Grid.Root></Scenario>
  </VStack>;
}
