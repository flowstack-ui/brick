import { useState, type CSSProperties } from "react";
import { Badge, Button, Field, Fieldset, Form, Grid, NumberInput, Text, VStack, type NumberInputShape, type NumberInputSize, type NumberInputVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";
import "./number-input.playground.css";

const variants:NumberInputVariant[]=["outline","soft","underline"]; const sizes:NumberInputSize[]=["sm","md","lg"]; const shapes:NumberInputShape[]=["sharp","rounded","pill"];
const scenarios=[
 [1,"Overview","Canonical medium outline Number Input composed with Field."],
 [2,"Variants","Outline, soft, and underline change paint only."],
 [3,"Sizes","Small, medium, and large change complete control geometry."],
 [4,"Shapes","Sharp, rounded, and pill change geometry only."],
 [5,"Stepping and bounds","Pointer and keyboard stepping respect decimal precision and boundaries."],
 [6,"States","Controlled, disabled, read-only, required, and invalid states remain distinct."],
 [7,"Form, Fieldset, and Field","Native submission, reset, validation, external ownership, and inherited group state."],
 [8,"Appearance and customization","Light and dark scopes retain defaults while one badged specimen uses public tokens."],
 [9,"Responsive and RTL","Narrow and right-to-left layouts preserve logical actions and containment."],
] as const;
export const numberInputScenarios=scenarios.map(([number,title,description])=>({id:`number-input.${number}`,number,title,description})) satisfies ScenarioDefinition[];
function Control(props:React.ComponentProps<typeof NumberInput.Root>){return <NumberInput.Root {...props}><NumberInput.Input/><NumberInput.Increment aria-label="Increase quantity"/><NumberInput.Decrement aria-label="Decrease quantity"/></NumberInput.Root>}
function Labeled({id="quantity",children}:{id?:string;children:React.ReactNode}){return <Field.Root id={id}><Field.Label>Quantity</Field.Label>{children}<Field.Description>Packages in this shipment.</Field.Description></Field.Root>}
const custom={"--brick-number-input-background":"#eefbf5","--brick-number-input-border":"#18794e","--brick-number-input-radius":"0.75rem"} as CSSProperties;
export function NumberInputPage(){const [value,setValue]=useState<number|null>(4);const [status,setStatus]=useState("No form event yet");return <VStack className="forms-page specialized-field-page" data-component-page="number-input">
 <Scenario {...numberInputScenarios[0]}><EvidenceSurface data-testid="number-input-overview" inset="lg"><Labeled id="number-input-overview-field"><Control defaultValue={3} name="quantity"/></Labeled></EvidenceSurface></Scenario>
 <Scenario {...numberInputScenarios[1]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="number-input-variants">{variants.map(v=><Labeled id={`number-variant-${v}`} key={v}><Control defaultValue={3} variant={v}/></Labeled>)}</Grid.Root></Scenario>
 <Scenario {...numberInputScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="number-input-sizes">{sizes.map(s=><Labeled id={`number-size-${s}`} key={s}><Control defaultValue={3} size={s}/></Labeled>)}</Grid.Root></Scenario>
 <Scenario {...numberInputScenarios[3]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="number-input-shapes">{shapes.map(s=><Labeled id={`number-shape-${s}`} key={s}><Control defaultValue={3} shape={s}/></Labeled>)}</Grid.Root></Scenario>
 <Scenario {...numberInputScenarios[4]}><EvidenceSurface data-testid="number-input-stepping" inset="lg"><Labeled id="number-step"><Control defaultValue={1.5} min={0} max={2} precision={1} step={0.5}/></Labeled></EvidenceSurface></Scenario>
 <Scenario {...numberInputScenarios[5]}><Grid.Root columns={4} className="forms-grid forms-grid--four" data-testid="number-input-states"><Labeled id="number-controlled"><Control value={value} onValueChange={setValue}/><output><Text as="span">Value: {value??"empty"}</Text></output></Labeled><Labeled id="number-disabled"><Control defaultValue={3} disabled/></Labeled><Labeled id="number-readonly"><Control defaultValue={3} readOnly/></Labeled><Field.Root id="number-invalid" invalid required><Field.Label>Quantity</Field.Label><Control/><Field.Error>Enter a quantity.</Field.Error></Field.Root></Grid.Root></Scenario>
 <Scenario {...numberInputScenarios[6]}><EvidenceSurface data-testid="number-input-form" inset="lg"><Form aria-label="Quantity form" id="quantity-form" preventDefaultOnSubmit validationBehavior="inline" onReset={()=>setStatus("Form reset")} onSubmit={e=>setStatus(`Submitted: ${new FormData(e.currentTarget).get("units")??"none"}`)}><Fieldset.Root required><Fieldset.Legend>Shipment</Fieldset.Legend><Field.Root id="number-form-field"><Field.Label>Units</Field.Label><Control name="units" min={1}/><Field.Error>Enter at least one unit.</Field.Error></Field.Root></Fieldset.Root><Button type="submit">Save quantity</Button><Button type="reset" variant="outline">Reset</Button><output><Text as="span">{status}</Text></output></Form><Field.Root id="number-external"><Field.Label>External units</Field.Label><Control defaultValue={2} form="quantity-form" name="external-units"/></Field.Root></EvidenceSurface></Scenario>
 <Scenario {...numberInputScenarios[7]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="number-input-appearance"><EvidenceSurface data-brick-appearance="light" inset="md"><Badge size="sm" variant="soft">Light</Badge><Labeled id="number-light"><Control defaultValue={3}/></Labeled></EvidenceSurface><EvidenceSurface data-brick-appearance="dark" inset="md"><Badge size="sm" variant="soft">Dark</Badge><Labeled id="number-dark"><Control defaultValue={3}/></Labeled></EvidenceSurface><EvidenceSurface inset="md"><Badge size="sm" variant="soft">Customized</Badge><Text as="h3" variant="title-sm">Inventory accent</Text><Text>Public variables scope one example.</Text><Labeled id="number-custom"><Control defaultValue={3} style={custom}/></Labeled></EvidenceSurface></Grid.Root></Scenario>
 <Scenario {...numberInputScenarios[8]}><Grid.Root columns={2} className="forms-grid forms-grid--two specialized-stress" data-testid="number-input-stress"><div><Badge size="sm" variant="soft">Narrow</Badge><Labeled id="number-narrow"><Control defaultValue={123456}/></Labeled></div><div dir="rtl"><Badge size="sm" variant="soft">RTL</Badge><Field.Root id="number-rtl"><Field.Label>الكمية</Field.Label><Control aria-label="الكمية" defaultValue={3}/></Field.Root></div></Grid.Root></Scenario>
 </VStack>}
