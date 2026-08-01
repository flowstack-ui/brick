import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Button, Code, Container, Grid, HStack, NavList, ScrollArea, Sidebar, Text, VStack, type SidebarSize, type SidebarVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./sidebar.playground.css";

const variants: SidebarVariant[] = ["docked", "floating"];
const sizes: SidebarSize[] = ["sm", "md", "lg"];

function Navigation({ compact = false }: { compact?: boolean }) {
  return <NavList.Root aria-label={compact ? "Compact workspace navigation" : "Workspace navigation"} size="sm"><NavList.List><NavList.Item><NavList.Link active aria-label="Overview" href="#sidebar-overview">{compact ? "O" : "Overview"}</NavList.Link></NavList.Item><NavList.Item><NavList.Link aria-label="Projects" href="#sidebar-projects">{compact ? "P" : "Projects"}</NavList.Link></NavList.Item><NavList.Item><NavList.Link aria-label="Settings" href="#sidebar-settings">{compact ? "S" : "Settings"}</NavList.Link></NavList.Item></NavList.List></NavList.Root>;
}

function Shell({ compact = false, main = "Project dashboard", ...props }: { compact?: boolean; main?: string } & React.ComponentProps<typeof Sidebar.Root>) {
  return <Sidebar.Root {...props}><Sidebar.Panel aria-label="Workspace sidebar"><Sidebar.Header><Text weight="semibold">{compact ? "FS" : "Flowstack"}</Text></Sidebar.Header><Sidebar.Content><Navigation compact={compact} /></Sidebar.Content><Sidebar.Footer><Badge>{compact ? "WD" : "Will Donin"}</Badge></Sidebar.Footer></Sidebar.Panel><Sidebar.Main asChild><VStack as="section" className="sidebar-main-demo" gap="3"><Text as="h3" variant="title-sm">{main}</Text><Text tone="secondary" variant="body-sm">Main content remains contained beside the panel.</Text></VStack></Sidebar.Main></Sidebar.Root>;
}

function Cell({ children, label }: { children: ReactNode; label: string }) { return <EvidenceSurface className="sidebar-cell"><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>; }
function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) { return <VStack as="section" gap="3"><VStack gap="1"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>; }

export const sidebarScenarios = [
  { id: "sidebar.overview", number: 1, title: "Overview", description: "Sidebar’s canonical rendering is an expanded, docked, medium, static panel on the left with coordinated main content." },
  { id: "sidebar.states", number: 2, title: "States", description: "Expanded, rail, and offcanvas change only available panel width and Atom accessibility state." },
  { id: "sidebar.variants", number: 3, title: "Variants", description: "Docked and floating change only panel attachment and surface treatment." },
  { id: "sidebar.sizes", number: 4, title: "Sizes", description: "Small, medium, and large change only the closed expanded and rail widths." },
  { id: "sidebar.placement", number: 5, title: "Sides and position", navigationTitle: "Placement", description: "Physical side and static or sticky presentation coordinate panel and main tracks without changing content." },
  { id: "sidebar.regions", number: 6, title: "Panel regions and composition", navigationTitle: "Regions", description: "Header, flexible Content, Footer, composed hosts, refs, and Scroll Area preserve the seven-part contract." },
  { id: "sidebar.behavior", number: 7, title: "Behavior and output", navigationTitle: "Behavior", description: "Controlled state, disabled requests, exact targets, generated relationships, and offcanvas attributes remain inspectable." },
  { id: "sidebar.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic surfaces adapt to appearance while public variables visibly customize width, gap, and offset." },
  { id: "sidebar.stress", number: 9, title: "Responsive and stress", navigationTitle: "Stress", description: "Narrow floating layout, long localized content, right placement, low height, and named rail controls remain usable." },
] as const satisfies readonly ScenarioDefinition[];

export function SidebarPage() {
  const [state, setState] = useState<"expanded" | "rail" | "offcanvas">("expanded");
  const panelRef = useRef<HTMLElement>(null);
  const custom = { "--brick-sidebar-expanded-width-md": "12rem", "--brick-sidebar-panel-gap": "1.5rem", "--brick-sidebar-sticky-offset": "1rem" } as CSSProperties;
  return <VStack className="sidebar-page" data-component-page="sidebar">
    <Scenario {...sidebarScenarios[0]}><EvidenceSurface data-testid="sidebar-overview" inset="none"><Shell /></EvidenceSurface></Scenario>
    <Scenario {...sidebarScenarios[1]}><Grid.Root columns={1} className="sidebar-grid"><Cell label="expanded"><Shell /></Cell><Cell label="rail"><Shell compact defaultState="rail" collapsedState="rail" /></Cell><Cell label="offcanvas"><Shell defaultState="offcanvas" /></Cell></Grid.Root></Scenario>
    <Scenario {...sidebarScenarios[2]}><Grid.Root columns={2} className="sidebar-grid">{variants.map((variant) => <Cell key={variant} label={variant}><Shell variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...sidebarScenarios[3]}><Grid.Root columns={1} className="sidebar-grid">{sizes.map((size) => <Cell key={size} label={size}><Shell size={size} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...sidebarScenarios[4]}><Grid.Root columns={2} className="sidebar-grid"><Cell label="left static"><Shell /></Cell><Cell label="right sticky"><div className="sidebar-sticky-stage"><Shell position="sticky" side="right" /></div></Cell></Grid.Root></Scenario>
    <Scenario {...sidebarScenarios[5]}><VStack gap="4"><Cell label="scrollable content"><Sidebar.Root><Sidebar.Panel aria-label="Activity" ref={panelRef}><Sidebar.Header><Text weight="semibold">Activity</Text></Sidebar.Header><Sidebar.Content><ScrollArea.Root className="sidebar-region-scroll" scrollbarVisibility="always"><ScrollArea.Viewport aria-label="Project updates" focusable><VStack gap="2">{Array.from({ length: 8 }, (_, index) => <Text key={index} variant="body-sm">Project update {index + 1}</Text>)}</VStack></ScrollArea.Viewport></ScrollArea.Root></Sidebar.Content><Sidebar.Footer><Text variant="caption">8 updates</Text></Sidebar.Footer></Sidebar.Panel><Sidebar.Main asChild><div className="sidebar-main-demo">Main</div></Sidebar.Main></Sidebar.Root></Cell><RenderedOutput label="Composed Sidebar HTML"><Sidebar.Root asChild><section><Sidebar.Panel asChild><aside aria-label="Composed tools">Tools</aside></Sidebar.Panel><Sidebar.Main asChild><div>Composed main</div></Sidebar.Main></section></Sidebar.Root></RenderedOutput></VStack></Scenario>
    <Scenario {...sidebarScenarios[6]}><VStack gap="4"><EvidenceSurface><HStack gap="3" wrap><Sidebar.Root collapsedState="rail" onStateChange={setState} state={state}><Sidebar.Trigger aria-label="Toggle controlled sidebar">Toggle</Sidebar.Trigger><Sidebar.Panel aria-label="Controlled workspace"><Sidebar.Content><Navigation compact={state === "rail"} /></Sidebar.Content></Sidebar.Panel><Sidebar.Main asChild><div><Text>Controlled state: <Code>{state}</Code></Text></div></Sidebar.Main></Sidebar.Root></HStack></EvidenceSurface><RenderedOutput label="Offcanvas Sidebar HTML"><Sidebar.Root state="offcanvas"><Sidebar.Trigger toState="expanded">Open</Sidebar.Trigger><Sidebar.Panel aria-label="Hidden tools">Hidden tools</Sidebar.Panel><Sidebar.Main asChild><div>Main</div></Sidebar.Main></Sidebar.Root></RenderedOutput><Cell label="disabled"><Sidebar.Root disabled><Sidebar.Trigger>Disabled toggle</Sidebar.Trigger><Sidebar.Panel>Panel</Sidebar.Panel><Sidebar.Main asChild><div>Main</div></Sidebar.Main></Sidebar.Root></Cell></VStack></Scenario>
    <Scenario {...sidebarScenarios[7]}><VStack gap="4"><Grid.Root columns={2} className="sidebar-grid"><EvidenceSurface className="sidebar-cell" data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Shell /></EvidenceSurface><EvidenceSurface className="sidebar-cell" data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Shell /></EvidenceSurface></Grid.Root><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="playground-customization-layout" columns={2} gap="0"><VStack gap="2"><SpecimenLabel>Customized</SpecimenLabel><Text as="h3" variant="title-sm">Sidebar CSS properties</Text><Text tone="secondary" variant="body-sm">A narrower panel, larger gap, and sticky offset use the documented variables shown here.</Text><PlaygroundCodeBlock tabIndex={0}>{`.custom-sidebar {
  --brick-sidebar-expanded-width-md: 12rem;
  --brick-sidebar-panel-gap: 1.5rem;
  --brick-sidebar-sticky-offset: 1rem;
}`}</PlaygroundCodeBlock></VStack><div className="playground-customization-preview"><div className="sidebar-sticky-stage"><Shell position="sticky" style={custom} variant="floating" /></div></div></Grid.Root></EvidenceSurface></VStack></Scenario>
    <Scenario {...sidebarScenarios[8]}><Container gutter="sm" measure="narrow"><VStack gap="6"><EvidenceGroup title="Responsive boundaries" description="A floating panel and its main region remain usable inside a constrained application-owned width."><Cell label="narrow floating"><Shell main="Project dashboard with deliberately long content" style={{ "--brick-sidebar-expanded-width-md": "10rem" } as CSSProperties} variant="floating" /></Cell></EvidenceGroup><EvidenceGroup title="RTL inheritance" description="Right placement and authored content follow a genuine right-to-left scope while the panel remains coordinated with main content."><div dir="rtl"><Cell label="RTL right placement"><Shell main="لوحة المشروع ذات المحتوى الطويل" side="right" style={{ "--brick-sidebar-expanded-width-md": "10rem" } as CSSProperties} variant="floating" /></Cell></div></EvidenceGroup><EvidenceGroup title="Rail controls" description="Compact visible labels retain complete accessible names when the panel uses its rail state."><Cell label="named rail controls"><Shell compact defaultState="rail" collapsedState="rail" /></Cell></EvidenceGroup></VStack></Container></Scenario>
  </VStack>;
}
