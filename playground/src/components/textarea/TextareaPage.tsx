import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Field,
  Form,
  Grid,
  HStack,
  Text,
  Textarea,
  VStack,
  type TextareaShape,
  type TextareaSize,
  type TextareaVariant,
} from "@flowstack-ui/brick";
import { Code } from "@flowstack-ui/brick/code";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "../../shared/forms-evidence.playground.css";
import "./textarea.playground.css";

const variants: TextareaVariant[] = ["outline", "soft", "underline"];
const sizes: TextareaSize[] = ["sm", "md", "lg"];
const shapes: TextareaShape[] = ["sharp", "rounded"];
const sample = "Describe the workspace goals and expected result.";

const customTokens = {
  "--brick-textarea-background": "#eefbf5",
  "--brick-textarea-border": "#18794e",
  "--brick-textarea-focus-ring": "#18794e",
  "--brick-textarea-foreground": "#0d3b2a",
  "--brick-textarea-radius": "0.75rem",
} as CSSProperties;

function PreviewField({ children, id }: { children: ReactNode; id: string }) {
  return (
    <Field.Root id={id}>
      <Field.Label>Project summary</Field.Label>
      {children}
    </Field.Root>
  );
}

export const textareaScenarios = [
  { number: 1, id: "textarea.overview", title: "Overview", description: "Textarea’s canonical rendering is a full-width medium outline control with a rounded shape, three visible rows, and vertical manual resize. Field supplies its visible label." },
  { number: 2, id: "textarea.variants", title: "Variants", description: "Outline, soft, and underline change paint only. Content, size, row count, Field relationship, and behavior remain at their defaults." },
  { number: 3, id: "textarea.sizes", title: "Sizes", description: "Small, medium, and large change padding and typography only. Every specimen uses the default outline, rounded shape, three rows, and identical content." },
  { number: 4, id: "textarea.shapes", title: "Shapes", description: "Sharp and rounded change outline geometry only. Underline has intentionally fixed sharp geometry and Textarea excludes pill geometry." },
  { number: 5, id: "textarea.resize", title: "Resize and auto-resize", navigationTitle: "Resize", description: "Manual resize directions and Atom-powered content growth are separate sizing models. Auto-resize grows between its minimum and maximum rows before scrolling." },
  { number: 6, id: "textarea.states", title: "Content and states", navigationTitle: "States", description: "Value ownership, Count, disabled, read-only, required, and invalid examples retain the default visual recipe so only the named behavior changes." },
  { number: 7, id: "textarea.form", title: "Native Form and Field", navigationTitle: "Form", description: "Field and Form expose native submit, reset, external ownership, validation, generated IDs, and ARIA relationships without moving those responsibilities into Textarea." },
  { number: 8, id: "textarea.appearance", title: "Appearance and customization", navigationTitle: "Theme", description: "Adjacent appearance scopes preserve identical defaults. Public wrapper variables and native-control hooks visibly customize one exact example." },
  { number: 9, id: "textarea.stress", title: "Responsive and RTL", navigationTitle: "Stress", description: "Long localized content, narrow containment, genuine RTL direction, mobile sizing, zoom, and preference modes remain usable without clipping." },
] as const satisfies readonly ScenarioDefinition[];

export function TextareaPage() {
  const [controlled, setControlled] = useState(sample);
  const [status, setStatus] = useState("No form event yet");

  return (
    <VStack className="forms-page textarea-page" data-component-page="textarea" data-testid="textarea-workbench">
      <Scenario {...textareaScenarios[0]}>
        <EvidenceSurface className="forms-overview" data-testid="textarea-overview" inset="lg">
          <PreviewField id="textarea-overview-field"><Textarea.Root name="overview" /></PreviewField>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...textareaScenarios[1]}>
        <Grid.Root columns={3} className="forms-grid forms-grid--three forms-grid--preview-start" data-testid="textarea-variants">
          {variants.map((variant) => <Cell key={variant} label={variant}><PreviewField id={`textarea-variant-${variant}`}>{variant === "underline" ? <Textarea.Root defaultValue={sample} variant="underline" /> : <Textarea.Root defaultValue={sample} variant={variant} />}</PreviewField></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...textareaScenarios[2]}>
        <Grid.Root columns={3} className="forms-grid forms-grid--three forms-grid--preview-start" data-testid="textarea-sizes">
          {sizes.map((size) => <Cell key={size} label={size}><PreviewField id={`textarea-size-${size}`}><Textarea.Root defaultValue={sample} size={size} /></PreviewField></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...textareaScenarios[3]}>
        <Grid.Root columns={2} className="forms-grid forms-grid--two forms-grid--preview-start" data-testid="textarea-shapes">
          {shapes.map((shape) => <Cell key={shape} label={shape}><PreviewField id={`textarea-shape-${shape}`}><Textarea.Root defaultValue={sample} shape={shape} /></PreviewField></Cell>)}
        </Grid.Root>
      </Scenario>

      <Scenario {...textareaScenarios[4]}>
        <VStack className="forms-evidence-stack" data-testid="textarea-resize">
          <EvidenceGroup title="Manual resize" description="Each control differs only by its user-operated resize direction.">
            <Grid.Root columns={4} className="forms-grid forms-grid--four forms-grid--preview-start">
              {(["none", "vertical", "horizontal", "both"] as const).map((resize) => <Cell key={resize} label={resize}><PreviewField id={`textarea-resize-${resize}`}><Textarea.Root defaultValue={sample} resize={resize} /></PreviewField></Cell>)}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup title="Bounded auto-resize" description="Type new lines to grow from two rows through five rows; additional content scrolls inside the control.">
            <EvidenceSurface className="forms-overview"><PreviewField id="textarea-autoresize"><Textarea.Root autoResize defaultValue={sample} maxRows={5} minRows={2} /></PreviewField></EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textareaScenarios[5]}>
        <VStack className="forms-evidence-stack" data-testid="textarea-states">
          <EvidenceGroup title="Value ownership and Count" description="Both controls begin with identical text; only state ownership and the explicit Count part differ.">
            <Grid.Root columns={2} className="forms-grid forms-grid--two forms-grid--preview-start">
              <Cell label="uncontrolled"><PreviewField id="textarea-uncontrolled"><Textarea.Root defaultValue={sample} /></PreviewField></Cell>
              <Cell label="controlled + count"><VStack className="textarea-controlled-example" gap="2"><PreviewField id="textarea-controlled"><Textarea.Root maxLength={160} onValueChange={setControlled} value={controlled}><Textarea.Count /></Textarea.Root></PreviewField><output>Value: {controlled}</output></VStack></Cell>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup title="Availability and validity" description="Only the named state changes; content and default geometry remain identical.">
            <Grid.Root columns={4} className="forms-grid forms-grid--four forms-grid--preview-start">
              <Cell label="disabled"><PreviewField id="textarea-disabled"><Textarea.Root defaultValue={sample} disabled /></PreviewField></Cell>
              <Cell label="readOnly"><PreviewField id="textarea-readonly"><Textarea.Root defaultValue={sample} readOnly /></PreviewField></Cell>
              <Cell label="required"><Field.Root id="textarea-required" required><Field.Label>Project summary</Field.Label><Textarea.Root defaultValue={sample} /></Field.Root></Cell>
              <Cell label="invalid"><Field.Root id="textarea-invalid" invalid><Field.Label>Project summary</Field.Label><Textarea.Root defaultValue={sample} /><Field.Error>Project summary is invalid.</Field.Error></Field.Root></Cell>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textareaScenarios[6]}>
        <VStack className="forms-evidence-stack" data-testid="textarea-form">
          <EvidenceGroup title="Submitted summary" description="Submit empty to expose inline validation, enter a summary, submit again, and reset.">
            <EvidenceSurface className="forms-overview" inset="lg">
              <Form aria-label="Textarea project form" id="textarea-form-example" onReset={() => setStatus("Form reset")} onSubmit={(event) => { const data = new FormData(event.currentTarget); setStatus(`Submitted: ${String(data.get("summary") ?? "none")}`); }} preventDefaultOnSubmit validationBehavior="inline">
                <Field.Root id="textarea-form-summary" required><Field.Label>Project summary</Field.Label><Textarea.Root minLength={10} name="summary" required /><Field.Description>Use at least ten characters.</Field.Description><Field.Error>Enter a project summary.</Field.Error></Field.Root>
                <HStack className="forms-actions"><Button type="submit">Save summary</Button><Button tone="neutral" type="reset">Reset</Button></HStack>
                <output className="forms-status">{status}</output>
              </Form>
            </EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup title="External form ownership" description="The Textarea is outside the form visually but participates through its native form attribute.">
            <EvidenceSurface className="forms-overview"><PreviewField id="textarea-external"><Textarea.Root defaultValue="External project notes" form="textarea-form-example" name="externalNotes" /></PreviewField></EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup title="Generated relationship output" description="The live specimen and captured HTML expose generated IDs, descriptions, error, slots, and ARIA relationships.">
            <RenderedOutput label="Textarea relationship HTML"><Field.Root id="textarea-output" invalid required><Field.Label>Account notes</Field.Label><Textarea.Root maxLength={160} name="accountNotes"><Textarea.Count /></Textarea.Root><Field.Description>Visible to account owners.</Field.Description><Field.Error>Enter usable notes.</Field.Error></Field.Root></RenderedOutput>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textareaScenarios[7]}>
        <VStack className="forms-evidence-stack">
          <EvidenceGroup title="Scoped appearances" description="The same default Textarea and Field render inside adjacent local appearance scopes.">
            <Grid.Root columns={2} className="forms-scoped-grid" data-testid="textarea-appearance">
              <EvidenceSurface data-brick-appearance="light"><Code>light</Code><PreviewField id="textarea-light"><Textarea.Root defaultValue={sample} /></PreviewField></EvidenceSurface>
              <EvidenceSurface data-brick-appearance="dark"><Code>dark</Code><PreviewField id="textarea-dark"><Textarea.Root defaultValue={sample} /></PreviewField></EvidenceSurface>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup title="Consumer customization" description="The code names supported wrapper variables and native-control styling and exactly matches the live result.">
            <EvidenceSurface as="article" className="forms-customization" inset="lg">
              <div><Text as="h4" variant="title-sm">Wrapper variables and native control style</Text><Text as="p" tone="secondary" variant="body-sm">Public variables recolor and reshape the wrapper while textareaStyle changes the editable text.</Text><PlaygroundCodeBlock aria-label="Textarea customization example" tabIndex={0}>{`<Textarea.Root
  defaultValue="Customized project summary"
  textareaStyle={{ letterSpacing: "0.04em" }}
  style={{
    "--brick-textarea-background": "#eefbf5",
    "--brick-textarea-border": "#18794e",
    "--brick-textarea-focus-ring": "#18794e",
    "--brick-textarea-foreground": "#0d3b2a",
    "--brick-textarea-radius": "0.75rem",
  }}
/>`}</PlaygroundCodeBlock></div>
              <EvidenceSurface className="forms-customization__preview"><PreviewField id="textarea-custom"><Textarea.Root data-slot="custom-textarea" defaultValue="Customized project summary" style={customTokens} textareaStyle={{ letterSpacing: "0.04em" }} /></PreviewField></EvidenceSurface>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...textareaScenarios[8]}>
        <VStack className="forms-evidence-stack" data-testid="textarea-stress">
          <EvidenceGroup title="Constrained-width stress" description="Long unbroken and multi-line content remains editable inside a narrow application-owned frame."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame"><Field.Root id="textarea-long"><Field.Label>Localized recovery notes</Field.Label><Textarea.Root defaultValue={`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break\n${sample}`} /></Field.Root></div></EvidenceSurface></EvidenceGroup>
          <EvidenceGroup title="RTL inheritance" description="The control and logical Count alignment inherit genuine right-to-left direction in their own specimen."><EvidenceSurface className="forms-stress-panel"><div className="forms-phone-frame" dir="rtl"><Field.Root id="textarea-rtl"><Field.Label>ملاحظات المشروع</Field.Label><Textarea.Root defaultValue="اكتب ملخصًا واضحًا للمشروع والنتيجة المتوقعة." maxLength={160}><Textarea.Count /></Textarea.Root></Field.Root></div></EvidenceSurface></EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
