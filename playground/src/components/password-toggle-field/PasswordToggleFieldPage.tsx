import { useState, type CSSProperties, type ReactNode } from "react";
import { Badge, Button, Field, Form, Grid, PasswordToggleField, Text, VStack, type PasswordToggleFieldInputProps, type PasswordToggleFieldShape, type PasswordToggleFieldSize, type PasswordToggleFieldVariant } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { FormEvidenceCell as Cell, FormEvidenceGroup as EvidenceGroup } from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";
import "./password-toggle-field.playground.css";

const variants: PasswordToggleFieldVariant[] = ["outline", "soft", "underline"];
const sizes: PasswordToggleFieldSize[] = ["sm", "md", "lg"];
const shapes: PasswordToggleFieldShape[] = ["sharp", "rounded", "pill"];
const definitions = [
  [1, "Overview", "Canonical hidden password composed with Field."],
  [2, "Variants", "Outline, soft, and underline change paint only."],
  [3, "Sizes", "Small, medium, and large change complete control geometry."],
  [4, "Shapes", "Sharp, rounded, and pill change geometry only."],
  [5, "Visibility and localization", "The action toggles visibility with state-aware localized names and replaceable art."],
  [6, "States", "Controlled visibility, disabled, read-only, required, and invalid states remain distinct."],
  [7, "Form and Field", "Native submission restores password type while reset clears one labeled field."],
  [8, "Appearance and customization", "Light and dark scopes plus one documented token override."],
  [9, "Responsive and RTL", "Long localized content and RTL remain logically contained."],
] as const;
export const passwordToggleFieldScenarios = definitions.map(([number, title, description]) => ({ id: `password-toggle-field.${number}`, number, title, description })) satisfies ScenarioDefinition[];

type ControlProps = Omit<PasswordToggleFieldInputProps, "size"> & { variant?: PasswordToggleFieldVariant; size?: PasswordToggleFieldSize; shape?: PasswordToggleFieldShape; fullWidth?: boolean; showLabel?: string; hideLabel?: string; defaultVisible?: boolean; visible?: boolean; onVisibleChange?: (visible: boolean) => void; disabled?: boolean; readOnly?: boolean; required?: boolean; invalid?: boolean; className?: string; style?: CSSProperties };
function Control(props: ControlProps) {
  const { variant, size, shape, fullWidth, showLabel, hideLabel, defaultVisible, visible, onVisibleChange, disabled, readOnly, required, invalid, className, style, ...input } = props;
  const recipe = variant === "underline" ? { variant } as const : { variant, shape };
  return <PasswordToggleField.Root {...recipe} {...{ size, fullWidth, showLabel, hideLabel, defaultVisible, visible, onVisibleChange, disabled, readOnly, required, invalid, className, style }}><PasswordToggleField.Input {...input} /><PasswordToggleField.Toggle /></PasswordToggleField.Root>;
}
function Labeled({ children, id }: { children: ReactNode; id: string }) {
  return <Field.Root id={id}><Field.Label>Password</Field.Label>{children}<Field.Description>Use at least twelve characters.</Field.Description></Field.Root>;
}
const customTokens = { "--brick-password-height": "3.5rem", "--brick-password-radius": "1rem" } as CSSProperties;

export function PasswordToggleFieldPage() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("No form event yet");
  return <VStack className="forms-page specialized-field-page" data-component-page="password-toggle-field">
    <Scenario {...passwordToggleFieldScenarios[0]}><EvidenceSurface className="forms-overview" data-testid="password-toggle-field-overview" inset="lg"><Labeled id="password-overview"><Control defaultValue="correct horse" name="password" /></Labeled></EvidenceSurface></Scenario>
    <Scenario {...passwordToggleFieldScenarios[1]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="password-toggle-field-variants">{variants.map(variant => <Cell key={variant} label={variant}><Labeled id={`password-variant-${variant}`}><Control defaultValue="correct horse" variant={variant} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...passwordToggleFieldScenarios[2]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="password-toggle-field-sizes">{sizes.map(size => <Cell key={size} label={size}><Labeled id={`password-size-${size}`}><Control defaultValue="correct horse" size={size} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...passwordToggleFieldScenarios[3]}><Grid.Root columns={3} className="forms-grid forms-grid--three" data-testid="password-toggle-field-shapes">{shapes.map(shape => <Cell key={shape} label={shape}><Labeled id={`password-shape-${shape}`}><Control defaultValue="correct horse" shape={shape} /></Labeled></Cell>)}</Grid.Root></Scenario>
    <Scenario {...passwordToggleFieldScenarios[4]}><Grid.Root columns={2} className="forms-grid forms-grid--two" data-testid="password-toggle-field-visibility"><Cell label="default visibility action"><Labeled id="password-default"><Control defaultValue="correct horse" /></Labeled></Cell><Cell label="Spanish labels"><Field.Root id="password-localized"><Badge size="sm">Spanish</Badge><Field.Label>Contraseña</Field.Label><Control defaultValue="caballo correcto" hideLabel="Ocultar contraseña" showLabel="Mostrar contraseña" /><Field.Description>Nombres accesibles localizados.</Field.Description></Field.Root></Cell></Grid.Root></Scenario>
    <Scenario {...passwordToggleFieldScenarios[5]}><Grid.Root columns={4} className="forms-grid forms-grid--four" data-testid="password-toggle-field-states"><Cell label="controlled"><Labeled id="password-controlled"><Control defaultValue="correct horse" visible={visible} onVisibleChange={setVisible} /><output className="forms-status"><Text as="span">Visibility: {visible ? "shown" : "hidden"}</Text></output></Labeled></Cell><Cell label="disabled"><Labeled id="password-disabled"><Control defaultValue="correct horse" disabled /></Labeled></Cell><Cell label="read-only"><Labeled id="password-readonly"><Control defaultValue="correct horse" readOnly /></Labeled></Cell><Cell label="invalid and required"><Field.Root id="password-invalid" invalid required><Field.Label>Password</Field.Label><Control /><Field.Error>Enter a password.</Field.Error></Field.Root></Cell></Grid.Root></Scenario>
    <Scenario {...passwordToggleFieldScenarios[6]}><VStack className="forms-evidence-stack"><EvidenceGroup title="Native form and Field" description="One required Password Toggle Field uses one Field label while submission and reset preserve native behavior."><EvidenceSurface className="forms-overview" data-testid="password-toggle-field-form"><Form aria-label="Password form" preventDefaultOnSubmit validationBehavior="inline" onReset={() => setStatus("Form reset")} onSubmit={event => { const input = event.currentTarget.elements.namedItem("account-password") as HTMLInputElement; setStatus(`Submitted type: ${input.type}`); }}><Field.Root id="password-form-field" required><Field.Label>Account password</Field.Label><Control name="account-password" /><Field.Error>Enter an account password.</Field.Error></Field.Root><Button type="submit">Save password</Button><Button type="reset" variant="outline">Reset</Button><output className="forms-status"><Text as="span">{status}</Text></output></Form></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...passwordToggleFieldScenarios[7]}><VStack className="forms-evidence-stack" data-testid="password-toggle-field-appearance"><EvidenceGroup title="Scoped appearances" description="Compact badges identify identical Password Toggle Field defaults inside light and dark scopes."><Grid.Root columns={2} className="forms-scoped-grid"><EvidenceSurface data-brick-appearance="light"><SpecimenLabel>Light</SpecimenLabel><Labeled id="password-light"><Control defaultValue="correct horse" /></Labeled></EvidenceSurface><EvidenceSurface data-brick-appearance="dark"><SpecimenLabel>Dark</SpecimenLabel><Labeled id="password-dark"><Control defaultValue="correct horse" /></Labeled></EvidenceSurface></Grid.Root></EvidenceGroup><EvidenceGroup title="Consumer customization" description="The titled preview uses only the documented public wrapper variables shown beside it."><EvidenceSurface as="article" className="forms-customization" inset="lg"><div><SpecimenLabel>Customized</SpecimenLabel><Text as="h4" variant="title-sm">Security geometry</Text><Text as="p" tone="secondary" variant="body-sm">A taller control and larger radius remain scoped to one password field.</Text><PlaygroundCodeBlock tabIndex={0}>{`--brick-password-height: 3.5rem;\n--brick-password-radius: 1rem;`}</PlaygroundCodeBlock></div><EvidenceSurface className="forms-customization__preview"><Labeled id="password-custom"><Control defaultValue="correct horse" style={customTokens} /></Labeled></EvidenceSurface></EvidenceSurface></EvidenceGroup></VStack></Scenario>
    <Scenario {...passwordToggleFieldScenarios[8]}><VStack className="forms-evidence-stack" data-testid="password-toggle-field-stress"><EvidenceGroup title="Long localization stress" description="An extended label and visibility action remain contained inside a narrow application-owned frame."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Field.Root id="password-long"><Field.Label>Administrative credential with extended description</Field.Label><Control defaultValue="a very long secret phrase" hideLabel="Conceal administrative credential" showLabel="Reveal administrative credential" /></Field.Root></div></EvidenceSurface></EvidenceGroup><EvidenceGroup title="RTL inheritance" description="The label, input, and logical visibility action inherit genuine right-to-left direction."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Field.Root id="password-rtl"><Field.Label>كلمة المرور</Field.Label><Control defaultValue="كلمة مرور آمنة" hideLabel="إخفاء كلمة المرور" showLabel="إظهار كلمة المرور" /></Field.Root></div></EvidenceSurface></EvidenceGroup></VStack></Scenario>
  </VStack>;
}
