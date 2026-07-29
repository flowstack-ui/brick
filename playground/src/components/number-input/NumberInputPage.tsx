import { useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Button, Field, Form, Grid, NumberInput, Text, VStack, type NumberInputShape, type NumberInputSize, type NumberInputVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";
import "./number-input.playground.css";

const variants: NumberInputVariant[] = ["outline", "soft", "underline"];
const sizes: NumberInputSize[] = ["sm", "md", "lg"];
const shapes: NumberInputShape[] = ["sharp", "rounded", "pill"];
const definitions = [
  [1, "Overview", "Canonical medium outline Number Input composed with Field."],
  [2, "Variants", "Outline, soft, and underline change paint only."],
  [3, "Sizes", "Small, medium, and large change complete control geometry."],
  [4, "Shapes", "Sharp, rounded, and pill change geometry only."],
  [5, "Stepping and bounds", "Pointer and keyboard stepping respect decimal precision and boundaries."],
  [6, "States", "Controlled, disabled, read-only, required, and invalid states remain distinct."],
  [7, "Form and Field", "Native submission, reset, validation, and external ownership for one labeled field."],
  [8, "Appearance and customization", "Light and dark scopes retain defaults while one badged specimen uses public tokens."],
  [9, "Responsive and RTL", "Narrow and right-to-left layouts preserve logical actions and containment."],
] as const;
export const numberInputScenarios = definitions.map(([number, title, description]) => ({ id: `number-input.${number}`, number, title, description })) satisfies ScenarioDefinition[];

function Control(props: React.ComponentProps<typeof NumberInput.Root>) {
  return <NumberInput.Root {...props}><NumberInput.Input /><NumberInput.Increment aria-label="Increase quantity" /><NumberInput.Decrement aria-label="Decrease quantity" /></NumberInput.Root>;
}
function Labeled({ children, id = "quantity" }: { children: ReactNode; id?: string }) {
  return <Field.Root id={id}><Field.Label>Quantity</Field.Label>{children}<Field.Description>Packages in this shipment.</Field.Description></Field.Root>;
}
const customTokens = { "--brick-number-input-background": "#eefbf5", "--brick-number-input-border": "#18794e", "--brick-number-input-radius": "0.75rem" } as CSSProperties;

export function NumberInputPage() {
  const [value, setValue] = useState<number | null>(4);
  const [status, setStatus] = useState("No form event yet");
  return <VStack className="forms-page specialized-field-page" data-component-page="number-input">
    <Scenario {...numberInputScenarios[0]}><EvidenceSurface className="forms-overview" data-testid="number-input-overview" inset="lg"><Labeled id="number-input-overview-field"><Control defaultValue={3} name="quantity" /></Labeled></EvidenceSurface></Scenario>
    <Scenario {...numberInputScenarios[1]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="number-input-variants">{variants.map(variant => <Cell key={variant} label={variant}><Labeled id={`number-variant-${variant}`}><Control defaultValue={3} variant={variant} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...numberInputScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="number-input-sizes">{sizes.map(size => <Cell key={size} label={size}><Labeled id={`number-size-${size}`}><Control defaultValue={3} size={size} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...numberInputScenarios[3]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="number-input-shapes">{shapes.map(shape => <Cell key={shape} label={shape}><Labeled id={`number-shape-${shape}`}><Control defaultValue={3} shape={shape} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...numberInputScenarios[4]}><div data-testid="number-input-stepping"><Cell label="decimal step with bounds"><Labeled id="number-step"><Control defaultValue={1.5} min={0} max={2} precision={1} step={0.5} /></Labeled></Cell></div></Scenario>
    <Scenario {...numberInputScenarios[5]}><Grid.Root columns={4} className="forms-grid forms-grid--four" data-testid="number-input-states"><Cell label="controlled"><Labeled id="number-controlled"><Control value={value} onValueChange={setValue} /><output className="forms-status"><Text as="span">Value: {value ?? "empty"}</Text></output></Labeled></Cell><Cell label="disabled"><Labeled id="number-disabled"><Control defaultValue={3} disabled /></Labeled></Cell><Cell label="read-only"><Labeled id="number-readonly"><Control defaultValue={3} readOnly /></Labeled></Cell><Cell label="invalid and required"><Field.Root id="number-invalid" invalid required><Field.Label>Quantity</Field.Label><Control /><Field.Error>Enter a quantity.</Field.Error></Field.Root></Cell></Grid.Root></Scenario>
    <Scenario {...numberInputScenarios[6]}><VStack className="forms-evidence-stack" data-testid="number-input-form"><EvidenceGroup title="Native form and Field" description="One required Number Input uses one Field label while submit and reset remain native form events."><EvidenceSurface className="forms-overview"><Form aria-label="Quantity form" id="quantity-form" preventDefaultOnSubmit validationBehavior="inline" onReset={() => setStatus("Form reset")} onSubmit={event => setStatus(`Submitted: ${new FormData(event.currentTarget).get("units") ?? "none"}`)}><Field.Root id="number-form-field" required><Field.Label>Units</Field.Label><Control name="units" min={1} /><Field.Error>Enter at least one unit.</Field.Error></Field.Root><Button type="submit">Save quantity</Button><Button type="reset" variant="outline">Reset</Button><output className="forms-status"><Text as="span">{status}</Text></output></Form></EvidenceSurface></EvidenceGroup><EvidenceGroup title="External form ownership" description="This field stays outside the form visually and participates through the native form attribute."><EvidenceSurface className="forms-overview"><Field.Root id="number-external"><Field.Label>External units</Field.Label><Control defaultValue={2} form="quantity-form" name="external-units" /></Field.Root></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...numberInputScenarios[7]}><VStack className="forms-evidence-stack" data-testid="number-input-appearance"><EvidenceGroup title="Scoped appearances" description="Compact badges identify identical Number Input and Field defaults inside light and dark scopes."><Grid.Root columns={2} className="forms-scoped-grid"><EvidenceSurface data-brick-appearance="light"><Badge size="sm">Light</Badge><Labeled id="number-light"><Control defaultValue={3} /></Labeled></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><Badge size="sm">Dark</Badge><Labeled id="number-dark"><Control defaultValue={3} /></Labeled></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The titled preview uses only the documented public wrapper variables shown beside it."><EvidenceSurface as="article" className="forms-customization" inset="lg"><div><Badge size="sm" tone="accent">Customized</Badge><Text as="h4" variant="title-sm">Inventory accent</Text><Text as="p" tone="secondary" variant="body-sm">The green surface, border, and radius are scoped to one Number Input.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-number-input-background: #eefbf5;\n--brick-number-input-border: #18794e;\n--brick-number-input-radius: 0.75rem;`}</PlaygroundCodeBlock></div><EvidenceSurface className="forms-customization__preview"><Labeled id="number-custom"><Control defaultValue={3} style={customTokens} /></Labeled></EvidenceSurface></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...numberInputScenarios[8]}><VStack className="forms-evidence-stack" data-testid="number-input-stress"><EvidenceGroup title="Constrained-width stress" description="A large value and both step actions remain inside a narrow application-owned frame."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Labeled id="number-narrow"><Control defaultValue={123456} /></Labeled></div></EvidenceSurface></EvidenceGroup><EvidenceGroup title="RTL inheritance" description="The label, value, and logical step-action edge inherit genuine right-to-left direction."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Field.Root id="number-rtl"><Field.Label>الكمية</Field.Label><Control aria-label="الكمية" defaultValue={3} /></Field.Root></div></EvidenceSurface></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
