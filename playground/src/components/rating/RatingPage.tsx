import type { CSSProperties, ComponentProps, ReactNode } from "react";
import { Badge, Field, Grid, Rating, VStack } from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import "../../shared/forms-evidence.playground.css";
import "./rating.playground.css";
const values=[1,2,3,4,5]; const customStyle={"--brick-rating-fill-color":"#7c3aed","--brick-rating-empty-color":"#c4b5fd","--brick-rating-item-size":"2rem"} as CSSProperties; const customCode="--brick-rating-fill-color: #7c3aed;\n--brick-rating-empty-color: #c4b5fd;\n--brick-rating-item-size: 2rem;";
function Example({label="Product rating",art,...props}:{label?:string;art?:ReactNode}&ComponentProps<typeof Rating.Root>){return <Field.Root><Field.Label>{label}</Field.Label><Rating.Root defaultValue={3} {...props}>{values.map(v=><Rating.Item key={v} value={v}>{art}</Rating.Item>)}</Rating.Root></Field.Root>}
export const ratingScenarios=[
 {id:"rating.overview",number:1,title:"Overview",description:"A labelled five-item Rating presents one keyboard-focusable slider and decorative star artwork."},
 {id:"rating.values",number:2,title:"Values and precision",navigationTitle:"Values",description:"Empty, full, and half-step values update proportional fill and accessible value text."},
 {id:"rating.recipes",number:3,title:"Sizes, tones, and variants",navigationTitle:"Recipes",description:"Closed visual recipes preserve one interaction model and 44px item targets."},
 {id:"rating.states",number:4,title:"Field and control states",navigationTitle:"States",description:"Invalid, disabled, required, and focusable read-only states work alone or through Field."},
 {id:"rating.input",number:5,title:"Pointer and keyboard input",navigationTitle:"Input",description:"Click, drag, arrow, Home, End, and direction-aware keyboard input share one value."},
 {id:"rating.artwork",number:6,title:"Custom artwork",navigationTitle:"Artwork",description:"Consumer-provided decorative artwork receives the same proportional empty and fill layers."},
 {id:"rating.form",number:7,title:"Form and rendered output",navigationTitle:"Form",description:"A named Rating submits one value, resets, and exposes its generated Field relationship."},
 {id:"rating.appearance",number:8,title:"Appearance and customization",navigationTitle:"Theme",description:"Light and dark previews use compact badges; the custom example includes a title, description, badge, and exact properties."},
 {id:"rating.stress",number:9,title:"Responsive and accessibility",navigationTitle:"Stress",description:"Narrow layouts, long labels, RTL, zoom, reduced motion, forced colors, and coarse pointers remain stable."},
] as const satisfies readonly ScenarioDefinition[];
export function RatingPage(){return <VStack className="forms-page rating-page" data-component-page="rating">
 <Scenario {...ratingScenarios[0]}><EvidenceSurface inset="lg" data-testid="rating-overview"><Example/></EvidenceSurface></Scenario>
 <Scenario {...ratingScenarios[1]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="rating-values"><Cell label="empty"><Example defaultValue={0}/></Cell><Cell label="three"><Example/></Cell><Cell label="half"><Example defaultValue={3.5} step={0.5}/></Cell></Grid.Root></Scenario>
 <Scenario {...ratingScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="rating-recipes">{(["sm","md","lg"] as const).map(size=><Cell key={size} label={size}><Example size={size}/></Cell>)}<Cell label="neutral"><Example tone="neutral"/></Cell><Cell label="outline"><Example variant="outline"/></Cell></Grid.Root></Scenario>
 <Scenario {...ratingScenarios[3]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="rating-states"><Cell label="invalid"><Example invalid/></Cell><Cell label="disabled"><Example disabled/></Cell><Cell label="read only"><Example readOnly/></Cell><Cell label="required"><Example required/></Cell></Grid.Root></Scenario>
 <Scenario {...ratingScenarios[4]}><EvidenceSurface inset="lg" data-testid="rating-input"><Example label="Try pointer or arrow keys" defaultValue={2}/></EvidenceSurface></Scenario>
 <Scenario {...ratingScenarios[5]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="rating-artwork"><Cell label="stars"><Example/></Cell><Cell label="diamonds"><Example art={<span aria-hidden="true">◆</span>}/></Cell></Grid.Root></Scenario>
 <Scenario {...ratingScenarios[6]}><RenderedOutput label="Named Rating HTML"><Example name="rating"/></RenderedOutput></Scenario>
 <Scenario {...ratingScenarios[7]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Scoped appearances" description="The same rating follows semantic surface and accent tokens."><Grid.Root columns={2} className="forms-scoped-grid" data-testid="rating-appearance"><EvidenceSurface data-brick-appearance="light"><Badge size="sm">light</Badge><Example/></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Badge size="sm">dark</Badge><Example/></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="Violet fill, lavender empty artwork, and larger stars come from the exact properties shown."><EvidenceSurface className="forms-customization" data-testid="rating-customization" inset="lg"><Badge size="sm">custom</Badge><PlaygroundCodeBlock aria-label="Rating customization code">{customCode}</PlaygroundCodeBlock><Example style={customStyle}/></EvidenceSurface></EvidenceGroup></VStack></Scenario>
 <Scenario {...ratingScenarios[8]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="rating-stress"><Cell label="narrow and long"><div className="rating-phone"><Example label="Overall experience with international delivery"/></div></Cell><Cell label="RTL"><div dir="rtl"><Example dir="rtl" label="تقييم الخدمة" defaultValue={3.5} step={0.5}/></div></Cell></Grid.Root></Scenario>
</VStack>}
