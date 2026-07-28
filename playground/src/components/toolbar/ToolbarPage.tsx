import { Grid, Text, Toolbar, VStack, type ToolbarSize, type ToolbarVariant } from "@flowstack-ui/brick";
import type { ReactNode } from "react";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./toolbar.playground.css";

const variants: ToolbarVariant[] = ["plain", "soft", "outline"];
const sizes: ToolbarSize[] = ["sm", "md", "lg"];
export const toolbarScenarios = [
 {id:"toolbar.overview",number:1,title:"Overview",description:"A finished document toolbar combines commands, pressed choices, a separator, and navigation in one keyboard entry point."},
 {id:"toolbar.anatomy",number:2,title:"Anatomy and semantics",navigationTitle:"Anatomy",description:"The six public parts preserve native command, link, separator, group, and pressed-button semantics."},
 {id:"toolbar.variants",number:3,title:"Variants",description:"Plain, soft, and outline change only the containing surface."},
 {id:"toolbar.sizes",number:4,title:"Sizes",description:"Small, medium, and large coordinate every control target and label."},
 {id:"toolbar.content",number:5,title:"Commands, links, and disabled state",navigationTitle:"Content",description:"Commands, destinations, separators, and unavailable actions remain visually coordinated."},
 {id:"toolbar.toggles",number:6,title:"Toggle selection",navigationTitle:"Toggles",description:"Single and multiple groups preserve Atom-owned pressed state."},
 {id:"toolbar.orientation",number:7,title:"Orientation and keyboard order",navigationTitle:"Orientation",description:"Horizontal and vertical toolbars use their matching arrow-key axis."},
 {id:"toolbar.appearance",number:8,title:"Appearance and customization",navigationTitle:"Theme",description:"Semantic colors adapt in light and dark scopes and documented variables customize paint."},
 {id:"toolbar.stress",number:9,title:"Responsive overflow and RTL",navigationTitle:"Stress",description:"No-wrap main-axis overflow keeps every authored control reachable while RTL reverses logical navigation."},
] as const satisfies readonly ScenarioDefinition[];

function Standard({size,variant}:{size?:ToolbarSize;variant?:ToolbarVariant}) { return <Toolbar.Root ariaLabel="Document tools" size={size} variant={variant}><Toolbar.Button>Undo</Toolbar.Button><Toolbar.Button>Redo</Toolbar.Button><Toolbar.Separator orientation="vertical"/><Toolbar.ToggleGroup ariaLabel="Text style" defaultValue={["bold"]} type="multiple"><Toolbar.ToggleItem value="bold">Bold</Toolbar.ToggleItem><Toolbar.ToggleItem value="italic">Italic</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Link href="#toolbar-help">Help</Toolbar.Link></Toolbar.Root>; }
function Cell({label,children}:{label:string;children:ReactNode}) { return <EvidenceSurface><SpecimenLabel>{label}</SpecimenLabel>{children}</EvidenceSurface>; }
export function ToolbarPage(){return <VStack className="toolbar-page" data-component-page="toolbar" gap="6">
 <Scenario {...toolbarScenarios[0]}><EvidenceSurface><Standard/></EvidenceSurface></Scenario>
 <Scenario {...toolbarScenarios[1]}><Cell label="six public parts"><Standard variant="outline"/></Cell></Scenario>
 <Scenario {...toolbarScenarios[2]}><Grid.Root columns={3} gap="4">{variants.map(v=><Cell key={v} label={v}><Standard variant={v}/></Cell>)}</Grid.Root></Scenario>
 <Scenario {...toolbarScenarios[3]}><Grid.Root columns={3} gap="4">{sizes.map(s=><Cell key={s} label={s}><Standard size={s}/></Cell>)}</Grid.Root></Scenario>
 <Scenario {...toolbarScenarios[4]}><Cell label="mixed controls"><Toolbar.Root ariaLabel="Release tools"><Toolbar.Button>Publish</Toolbar.Button><Toolbar.Button disabled>Archive</Toolbar.Button><Toolbar.Separator orientation="vertical"/><Toolbar.Link href="#release-notes">Release notes</Toolbar.Link></Toolbar.Root></Cell></Scenario>
 <Scenario {...toolbarScenarios[5]}><Grid.Root columns={2} gap="4"><Cell label="single"><Toolbar.Root ariaLabel="View tools"><Toolbar.ToggleGroup ariaLabel="View" defaultValue="list"><Toolbar.ToggleItem value="list">List</Toolbar.ToggleItem><Toolbar.ToggleItem value="grid">Grid</Toolbar.ToggleItem></Toolbar.ToggleGroup></Toolbar.Root></Cell><Cell label="multiple"><Standard/></Cell></Grid.Root></Scenario>
 <Scenario {...toolbarScenarios[6]}><Grid.Root columns={2} gap="4"><Cell label="horizontal"><Standard/></Cell><Cell label="vertical"><Toolbar.Root ariaLabel="Alignment" orientation="vertical"><Toolbar.Button>Top</Toolbar.Button><Toolbar.Separator orientation="horizontal"/><Toolbar.Button>Bottom</Toolbar.Button></Toolbar.Root></Cell></Grid.Root></Scenario>
 <Scenario {...toolbarScenarios[7]}><Grid.Root columns={3} gap="4"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>light</SpecimenLabel><Standard/></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>dark</SpecimenLabel><Standard/></EvidenceSurface><Cell label="custom"><Standard variant="outline"/></Cell></Grid.Root></Scenario>
 <Scenario {...toolbarScenarios[8]}><VStack gap="4"><Text tone="secondary" variant="body-sm">Scroll the constrained toolbar; every command remains in DOM order.</Text><div className="toolbar-narrow"><Standard/></div><div dir="rtl"><Standard/></div></VStack></Scenario>
 </VStack>}
