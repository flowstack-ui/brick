import { Grid, Text, Toolbar, VStack, type ToolbarSize, type ToolbarVariant } from "@flowstack-ui/brick";
import { type CSSProperties, type ReactNode } from "react";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./toolbar.playground.css";

const variants: ToolbarVariant[] = ["plain", "soft", "outline"];
const sizes: ToolbarSize[] = ["sm", "md", "lg"];
const customStyle = {
  "--brick-toolbar-border-color": "var(--brick-color-accent-border)",
  "--brick-toolbar-item-selected-background": "var(--brick-color-accent-subtle)",
  "--brick-toolbar-radius": "1rem",
  "--brick-toolbar-separator-color": "var(--brick-color-accent-solid)",
} as CSSProperties;
const customCode = `--brick-toolbar-border-color: var(--brick-color-accent-border);\n--brick-toolbar-item-selected-background: var(--brick-color-accent-subtle);\n--brick-toolbar-radius: 1rem;\n--brick-toolbar-separator-color: var(--brick-color-accent-solid);`;

export const toolbarScenarios = [
  { id: "toolbar.overview", number: 1, title: "Overview", description: "A finished document toolbar combines commands, pressed choices, a separator, and navigation in one keyboard entry point." },
  { id: "toolbar.anatomy", number: 2, title: "Anatomy and semantics", navigationTitle: "Anatomy", description: "The six public parts preserve native command, link, separator, group, and pressed-button semantics." },
  { id: "toolbar.variants", number: 3, title: "Variants", description: "Plain, soft, and outline change only the containing surface." },
  { id: "toolbar.sizes", number: 4, title: "Sizes", description: "Small, medium, and large coordinate every control target and label." },
  { id: "toolbar.content", number: 5, title: "Commands, links, and disabled state", navigationTitle: "Content", description: "Commands, destinations, separators, and unavailable actions remain visually coordinated." },
  { id: "toolbar.toggles", number: 6, title: "Toggle selection", navigationTitle: "Toggles", description: "Single and multiple groups preserve Atom-owned pressed state." },
  { id: "toolbar.orientation", number: 7, title: "Orientation and keyboard order", navigationTitle: "Orientation", description: "Horizontal and vertical toolbars use their matching arrow-key axis." },
  { id: "toolbar.appearance", number: 8, title: "Appearance and customization", navigationTitle: "Theme", description: "Semantic colors adapt in light and dark scopes and documented variables customize paint." },
  { id: "toolbar.stress", number: 9, title: "Responsive overflow and RTL", navigationTitle: "Stress", description: "No-wrap main-axis overflow keeps every authored control reachable while RTL reverses logical navigation." },
] as const satisfies readonly ScenarioDefinition[];

function Standard({ compact = false, size, style, variant }: { compact?: boolean; size?: ToolbarSize; style?: CSSProperties; variant?: ToolbarVariant }) {
  return <Toolbar.Root ariaLabel="Document tools" size={size} style={style} variant={variant}><Toolbar.Button>Undo</Toolbar.Button><Toolbar.Button>Redo</Toolbar.Button><Toolbar.Separator orientation="vertical" /><Toolbar.ToggleGroup ariaLabel="Text style" defaultValue={["bold"]} type="multiple"><Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem><Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem></Toolbar.ToggleGroup>{!compact && <Toolbar.Link href="#toolbar-help">Help</Toolbar.Link>}</Toolbar.Root>;
}
function Cell({ label, children }: { label: string; children: ReactNode }) {
  return <EvidenceSurface className="toolbar-cell"><SpecimenLabel>{label}</SpecimenLabel><div className="toolbar-cell__preview">{children}</div></EvidenceSurface>;
}
function EvidenceGroup({ children, description, title }: { children: ReactNode; description: string; title: string }) {
  return <VStack as="section" className="toolbar-evidence-group" gap="4"><VStack gap="2"><Text as="h3" variant="title-sm">{title}</Text><Text as="p" tone="secondary" variant="body-sm">{description}</Text></VStack>{children}</VStack>;
}
function RtlToolbar() {
  return <Toolbar.Root ariaLabel="أدوات المستند"><Toolbar.Button>تراجع</Toolbar.Button><Toolbar.Button>إعادة</Toolbar.Button><Toolbar.Separator orientation="vertical" /><Toolbar.ToggleGroup ariaLabel="نمط النص" defaultValue={["bold"]} type="multiple"><Toolbar.ToggleItem value="bold">عريض</Toolbar.ToggleItem><Toolbar.ToggleItem value="italic">مائل</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Link href="#toolbar-help">مساعدة</Toolbar.Link></Toolbar.Root>;
}

export function ToolbarPage() {
  return <VStack className="toolbar-page" data-component-page="toolbar" gap="6">
    <Scenario {...toolbarScenarios[0]}><EvidenceSurface className="toolbar-overview" inset="lg"><Standard /></EvidenceSurface></Scenario>
    <Scenario {...toolbarScenarios[1]}><RenderedOutput label="Rendered Toolbar HTML"><Standard variant="outline" /></RenderedOutput></Scenario>
    <Scenario {...toolbarScenarios[2]}><Grid.Root className="toolbar-grid" columns={3} gap="4">{variants.map((variant) => <Cell key={variant} label={variant}><Standard compact variant={variant} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...toolbarScenarios[3]}><Grid.Root className="toolbar-grid" columns={3} gap="4">{sizes.map((size) => <Cell key={size} label={size}><Standard compact size={size} /></Cell>)}</Grid.Root></Scenario>
    <Scenario {...toolbarScenarios[4]}><Cell label="mixed controls"><Toolbar.Root ariaLabel="Release tools"><Toolbar.Button>Publish</Toolbar.Button><Toolbar.Button disabled>Archive</Toolbar.Button><Toolbar.Separator orientation="vertical" /><Toolbar.ToggleGroup ariaLabel="Unavailable view" defaultValue="preview" tone="neutral" variant="solid"><Toolbar.ToggleItem disabled value="preview">Preview</Toolbar.ToggleItem><Toolbar.ToggleItem value="code">Code</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Link href="#release-notes">Release notes</Toolbar.Link></Toolbar.Root></Cell></Scenario>
    <Scenario {...toolbarScenarios[5]}><Grid.Root className="toolbar-grid" columns={3} gap="4"><Cell label="single"><Toolbar.Root ariaLabel="View tools"><Toolbar.ToggleGroup ariaLabel="View" defaultValue="list"><Toolbar.ToggleItem value="list">List</Toolbar.ToggleItem><Toolbar.ToggleItem value="grid">Grid</Toolbar.ToggleItem></Toolbar.ToggleGroup></Toolbar.Root></Cell><Cell label="multiple"><Standard /></Cell><Cell label="neutral solid"><Toolbar.Root ariaLabel="Preview tools"><Toolbar.ToggleGroup ariaLabel="Preview mode" defaultValue="preview" tone="neutral" variant="solid"><Toolbar.ToggleItem value="preview">Preview</Toolbar.ToggleItem><Toolbar.ToggleItem value="code">Code</Toolbar.ToggleItem></Toolbar.ToggleGroup></Toolbar.Root></Cell></Grid.Root></Scenario>
    <Scenario {...toolbarScenarios[6]}><Grid.Root className="toolbar-grid toolbar-grid--two" columns={2} gap="4"><Cell label="horizontal"><Standard /></Cell><Cell label="vertical"><Toolbar.Root ariaLabel="Alignment" orientation="vertical"><Toolbar.Button>Top</Toolbar.Button><Toolbar.Separator orientation="horizontal" /><Toolbar.Button>Bottom</Toolbar.Button></Toolbar.Root></Cell></Grid.Root></Scenario>
    <Scenario {...toolbarScenarios[7]}><VStack gap="6"><EvidenceGroup title="Scoped appearances" description="The same default soft Toolbar uses semantic colors in adjacent light and dark scopes."><Grid.Root className="toolbar-grid toolbar-grid--two" columns={2} gap="4"><EvidenceSurface className="toolbar-cell" data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><div className="toolbar-cell__preview"><Standard /></div></EvidenceSurface><EvidenceSurface className="toolbar-cell" data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><div className="toolbar-cell__preview"><Standard /></div></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The accent border, selected surface, rounded corners, and separator use the exact documented properties shown in code."><EvidenceSurface className="playground-customization-evidence" inset="none"><Grid.Root className="toolbar-customization playground-customization-layout" columns={2} gap="0"><VStack gap="2"><Text as="h4" variant="title-sm">Toolbar CSS properties</Text><Text as="p" tone="secondary" variant="body-sm">Only paint and radius change; keyboard behavior and control geometry remain the same.</Text><PlaygroundCodeBlock>{customCode}</PlaygroundCodeBlock></VStack><div className="toolbar-customization__preview"><Standard style={customStyle} variant="outline" /></div></Grid.Root></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...toolbarScenarios[8]}><VStack gap="6"><EvidenceGroup title="Constrained-width overflow" description="Scroll the 20rem frame along its inline axis; the Toolbar does not wrap or remove authored controls."><Cell label="responsive overflow"><div className="toolbar-narrow"><Standard /></div></Cell></EvidenceGroup><EvidenceGroup title="RTL direction" description="Arabic content begins at the logical start and horizontal arrow order mirrors in a genuine right-to-left context without changing the recipe."><Cell label="right-to-left"><div className="toolbar-rtl" dir="rtl"><RtlToolbar /></div></Cell></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
