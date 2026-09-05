import { useState, type CSSProperties, type ReactNode } from "react";
import { Button, Field, Form, Grid, OTPField, Text, VStack, type OTPFieldLayout, type OTPFieldShape, type OTPFieldSize, type OTPFieldVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";
import "./otp-field.playground.css";

const variants: OTPFieldVariant[] = ["outline", "soft", "underline"];
const sizes: OTPFieldSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const shapes: OTPFieldShape[] = ["sharp", "rounded"];
const layouts: OTPFieldLayout[] = ["separated", "attached"];
const definitions = [
  [1, "Overview", "Canonical six-digit verification code composed with Field."],
  [2, "Variants", "Outline, soft, and underline change cell paint only."],
  [3, "Sizes and shapes", "Closed sizes and shapes retain equal cells."],
  [4, "Layouts", "Separated and attached groups express spacing only."],
  [5, "Input behavior", "Numeric filtering, paste, completion, masking, and localization remain Atom-owned."],
  [6, "States", "Controlled, disabled, read-only, required, and invalid states remain distinct."],
  [7, "Form and Field", "Native submission, reset, and validation for one labeled field."],
  [8, "Appearance and customization", "Light and dark scopes plus one documented token override."],
  [9, "Responsive and RTL", "Narrow and right-to-left evidence remains contained."],
] as const;
export const otpFieldScenarios = definitions.map(([number, title, description]) => ({ id: `otp-field.${number}`, number, title, description })) satisfies ScenarioDefinition[];

function Cells({ length = 6, separator = false }: { length?: number; separator?: boolean }) {
  const first = separator ? Math.ceil(length / 2) : length;
  return <><OTPField.Group>{Array.from({ length: first }, (_, index) => <OTPField.Input index={index} key={index} />)}</OTPField.Group>{separator ? <><OTPField.Separator /><OTPField.Group>{Array.from({ length: length - first }, (_, index) => <OTPField.Input index={index + first} key={index + first} />)}</OTPField.Group></> : null}</>;
}
function Control(props: Omit<React.ComponentProps<typeof OTPField.Root>, "children"> & { separator?: boolean }) {
  const { separator, variant, shape, ...root } = props;
  const recipe = variant === "underline" ? { variant } as const : { variant, shape };
  return <OTPField.Root {...root} {...recipe}><Cells length={root.length} separator={separator} /></OTPField.Root>;
}
function Labeled({ children, id }: { children: ReactNode; id: string }) {
  return <Field.Root id={id}><Field.Label>Verification code</Field.Label>{children}<Field.Description>Enter the code sent to your device.</Field.Description></Field.Root>;
}
const customTokens = { "--brick-otp-size": "3.25rem", "--brick-otp-radius": "1rem" } as CSSProperties;

export function OTPFieldPage() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("No form event yet");
  return <VStack className="forms-page specialized-field-page otp-field-page" data-component-page="otp-field">
    <Scenario {...otpFieldScenarios[0]}><EvidenceSurface className="forms-overview" data-testid="otp-field-overview" inset="lg"><Labeled id="otp-overview"><Control length={6} name="code" separator /></Labeled></EvidenceSurface></Scenario>
    <Scenario {...otpFieldScenarios[1]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="otp-field-variants">{variants.map(variant => <Cell key={variant} label={variant}><Labeled id={`otp-variant-${variant}`}><Control length={4} variant={variant} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...otpFieldScenarios[2]}><VStack className="forms-evidence-stack" data-testid="otp-field-sizes"><EvidenceGroup title="Sizes" description="Small, medium, and large change cell geometry while content and the default recipe stay fixed."><Grid.Root columns={3} className="forms-grid forms-grid--three">{sizes.map(size => <Cell key={size} label={size}><Labeled id={`otp-size-${size}`}><Control length={4} size={size} /></Labeled></Cell>)}</Grid.Root></EvidenceGroup><EvidenceGroup title="Shapes" description="Sharp and rounded change only the cell boundary geometry."><Grid.Root columns={2} className="forms-grid forms-grid--two">{shapes.map(shape => <Cell key={shape} label={shape}><Labeled id={`otp-shape-${shape}`}><Control length={4} shape={shape} /></Labeled></Cell>)}</Grid.Root></EvidenceGroup></VStack></Scenario>
    <Scenario {...otpFieldScenarios[3]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="otp-field-layouts">{layouts.map(layout => <Cell key={layout} label={layout}><Labeled id={`otp-layout-${layout}`}><Control layout={layout} length={4} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...otpFieldScenarios[4]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="otp-field-behavior"><Cell label="numeric entry"><Labeled id="otp-numeric"><Control length={4} /></Labeled></Cell><Cell label="masked value"><Labeled id="otp-mask"><Control length={4} mask /></Labeled></Cell><Cell label="Spanish labels"><Field.Root id="otp-localized"><Field.Label>Código</Field.Label><Control getInputLabel={(index, length) => `Dígito ${index + 1} de ${length}`} length={4} /><Field.Description>Etiquetas accesibles localizadas.</Field.Description></Field.Root></Cell></Grid.Root></Scenario>
    <Scenario {...otpFieldScenarios[5]}><Grid.Root columns={4} className="forms-grid forms-grid--four" data-testid="otp-field-states"><Cell label="controlled"><Labeled id="otp-controlled"><Control length={4} value={value} onValueChange={setValue} /><output className="forms-status"><Text as="span">Value: {value || "empty"}</Text></output></Labeled></Cell><Cell label="disabled"><Labeled id="otp-disabled"><Control disabled length={4} /></Labeled></Cell><Cell label="read-only"><Labeled id="otp-readonly"><Control defaultValue="1234" length={4} readOnly /></Labeled></Cell><Cell label="invalid and required"><Field.Root id="otp-invalid" invalid required><Field.Label>Verification code</Field.Label><Control length={4} /><Field.Error>Enter all four digits.</Field.Error></Field.Root></Cell></Grid.Root></Scenario>
    <Scenario {...otpFieldScenarios[6]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Native form and Field" description="One required OTP Field uses one Field label while submit and reset preserve native form behavior."><EvidenceSurface className="forms-overview" data-testid="otp-field-form"><Form aria-label="Verification form" preventDefaultOnSubmit validationBehavior="inline" onReset={() => setStatus("Form reset")} onSubmit={event => setStatus(`Submitted: ${new FormData(event.currentTarget).get("verification") ?? "none"}`)}><Field.Root id="otp-form-code" required><Field.Label>Security code</Field.Label><Control length={4} name="verification" /><Field.Error>Enter the security code.</Field.Error></Field.Root><Button type="submit">Verify</Button><Button type="reset" variant="outline">Reset</Button><output className="forms-status"><Text as="span">{status}</Text></output></Form></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...otpFieldScenarios[7]}><VStack className="forms-evidence-stack" data-testid="otp-field-appearance"><EvidenceGroup title="Scoped appearances" description="Compact badges identify identical OTP Field defaults inside light and dark scopes."><Grid.Root columns={2} className="forms-scoped-grid"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Labeled id="otp-light"><Control length={4} /></Labeled></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Labeled id="otp-dark"><Control length={4} /></Labeled></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The titled preview uses only the documented public variables shown beside it."><EvidenceSurface as="article" className="forms-customization" inset="lg"><div><SpecimenLabel>Customized</SpecimenLabel><Text as="h4" variant="title-sm">Verification accent</Text><Text as="p" tone="secondary" variant="body-sm">Larger cells and an accent radius are scoped to this one verification field.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-otp-size: 3.25rem;\n--brick-otp-radius: 1rem;`}</PlaygroundCodeBlock></div><EvidenceSurface className="forms-customization__preview"><Labeled id="otp-custom"><Control length={4} style={customTokens} /></Labeled></EvidenceSurface></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...otpFieldScenarios[8]}><VStack className="forms-evidence-stack" data-testid="otp-field-stress"><EvidenceGroup title="Constrained-width stress" description="Two three-cell groups wrap only at the authored separator inside a narrow application-owned frame."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Labeled id="otp-narrow"><Control length={6} separator /></Labeled></div></EvidenceSurface></EvidenceGroup><EvidenceGroup title="RTL inheritance" description="Localized labels, cell order, and focus progression remain inspectable in a genuine right-to-left scope."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Field.Root id="otp-rtl"><Field.Label>رمز التحقق</Field.Label><Control getInputLabel={(index, length) => `الرقم ${index + 1} من ${length}`} length={4} /></Field.Root></div></EvidenceSurface></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
