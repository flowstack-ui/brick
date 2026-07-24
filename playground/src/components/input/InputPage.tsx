import { useState, type CSSProperties } from "react";
import {
  Button,
  Field,
  Form,
  Input,
  Text,
  type InputShape,
  type InputSize,
  type InputVariant,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
  FormRenderedOutput as RenderedOutput,
} from "../../shared/FormEvidence.js";
import { SearchIcon } from "../../shared/icons.js";
import "../../shared/forms-evidence.playground.css";
import "./input.playground.css";

const variants: InputVariant[] = ["outline", "soft", "underline"];
const sizes: InputSize[] = ["sm", "md", "lg"];
const shapes: InputShape[] = ["sharp", "rounded", "pill"];

const customInputTokens = {
  "--brick-input-background": "#eefbf5",
  "--brick-input-border": "#18794e",
  "--brick-input-focus-ring": "#18794e",
  "--brick-input-foreground": "#0d3b2a",
  "--brick-input-radius": "0.75rem",
} as CSSProperties;

function PreviewField({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <Field.Root id={id}>
      <Field.Label>Project name</Field.Label>
      {children}
    </Field.Root>
  );
}

export const inputScenarios = [
  {
    description:
      "Input’s canonical rendering is a full-width medium outline control with a rounded shape. Field supplies the visible label while Atom owns native input behavior and relationships.",
    id: "input.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Outline, soft, and underline change container paint only. Size, content, shape where applicable, Field relationship, and native behavior remain at their defaults.",
    id: "input.variants",
    number: 2,
    title: "Variants",
  },
  {
    description:
      "Small, medium, and large change complete control geometry only. Every specimen uses the default outline, rounded shape, and identical content.",
    id: "input.sizes",
    number: 3,
    title: "Sizes",
  },
  {
    description:
      "Sharp, rounded, and pill change outline geometry only. Every specimen keeps the medium size and identical content; underline has intentionally fixed sharp geometry.",
    id: "input.shapes",
    number: 4,
    title: "Shapes",
  },
  {
    description:
      "Logical start and end adornments and the opt-in clear action change only the named content feature. Clear uses Atom value state and restores input focus.",
    id: "input.adornments",
    navigationTitle: "Content",
    number: 5,
    title: "Adornments and Clear",
  },
  {
    description:
      "Value ownership, disabled, read-only, required, and invalid examples retain the default visual recipe so only the named state or interaction changes.",
    id: "input.states",
    number: 6,
    title: "Content and states",
  },
  {
    description:
      "Field and Form expose native submit, reset, external ownership, validation, generated IDs, and ARIA relationships without moving those responsibilities into Input.",
    id: "input.form",
    navigationTitle: "Form",
    number: 7,
    title: "Native Form and Field",
  },
  {
    description:
      "Adjacent appearance scopes preserve the same defaults. Public root/input hooks and Input variables visibly customize one exact example.",
    id: "input.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Long values, narrow containment, real right-to-left direction, logical adornments, mobile sizing, zoom, and preference modes remain usable without clipping.",
    id: "input.stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function InputPage() {
  const [controlledValue, setControlledValue] = useState("Brick workspace");
  const [status, setStatus] = useState("No form event yet");

  return (
    <div
      className="forms-page input-page"
      data-component-page="input"
      data-testid="input-workbench"
    >
      <Scenario {...inputScenarios[0]}>
        <div className="forms-overview" data-testid="input-overview">
          <PreviewField id="input-overview-field">
            <Input name="overview" />
          </PreviewField>
        </div>
      </Scenario>

      <Scenario {...inputScenarios[1]}>
        <div className="forms-grid forms-grid--three" data-testid="input-variants">
          {variants.map((variant) => (
            <Cell key={variant} label={variant}>
              <PreviewField id={`input-variant-${variant}`}>
                <Input defaultValue="Brick workspace" variant={variant} />
              </PreviewField>
            </Cell>
          ))}
        </div>
      </Scenario>

      <Scenario {...inputScenarios[2]}>
        <div className="forms-grid forms-grid--three" data-testid="input-sizes">
          {sizes.map((size) => (
            <Cell key={size} label={size}>
              <PreviewField id={`input-size-${size}`}>
                <Input defaultValue="Brick workspace" size={size} />
              </PreviewField>
            </Cell>
          ))}
        </div>
      </Scenario>

      <Scenario {...inputScenarios[3]}>
        <div className="forms-grid forms-grid--three" data-testid="input-shapes">
          {shapes.map((shape) => (
            <Cell key={shape} label={shape}>
              <PreviewField id={`input-shape-${shape}`}>
                <Input defaultValue="Brick workspace" shape={shape} />
              </PreviewField>
            </Cell>
          ))}
        </div>
      </Scenario>

      <Scenario {...inputScenarios[4]}>
        <div className="forms-grid forms-grid--three forms-grid--preview-start" data-testid="input-adornments">
          <Cell label="start adornment">
            <PreviewField id="input-start-adornment">
              <Input
                defaultValue="Brick workspace"
                startAdornment={<SearchIcon />}
              />
            </PreviewField>
          </Cell>
          <Cell label="end adornment">
            <PreviewField id="input-end-adornment">
              <Input defaultValue="Brick workspace" endAdornment={<span>USD</span>} />
            </PreviewField>
          </Cell>
          <Cell label="clearable">
            <PreviewField id="input-clearable">
              <Input
                clearLabel="Clear project name"
                clearable
                defaultValue="Brick workspace"
              />
            </PreviewField>
          </Cell>
        </div>
      </Scenario>

      <Scenario {...inputScenarios[5]}>
        <div className="forms-evidence-stack" data-testid="input-states">
          <EvidenceGroup
            description="Uncontrolled and controlled examples begin with identical content; only state ownership changes."
            title="Value ownership"
          >
            <div className="forms-grid forms-grid--two forms-grid--preview-start">
              <Cell label="uncontrolled">
                <PreviewField id="input-uncontrolled">
                  <Input defaultValue="Brick workspace" />
                </PreviewField>
              </Cell>
              <Cell label="controlled">
                <div className="input-controlled-example">
                  <PreviewField id="input-controlled">
                    <Input
                      onValueChange={setControlledValue}
                      value={controlledValue}
                    />
                  </PreviewField>
                  <output>Value: {controlledValue}</output>
                </div>
              </Cell>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Only the named availability or validity state changes; content and default geometry remain identical."
            title="Availability and validity"
          >
            <div className="forms-grid forms-grid--four forms-grid--preview-start">
              <Cell label="disabled">
                <PreviewField id="input-disabled">
                  <Input defaultValue="Brick workspace" disabled />
                </PreviewField>
              </Cell>
              <Cell label="readOnly">
                <PreviewField id="input-readonly">
                  <Input defaultValue="Brick workspace" readOnly />
                </PreviewField>
              </Cell>
              <Cell label="required">
                <Field.Root id="input-required" required>
                  <Field.Label>Project name</Field.Label>
                  <Input defaultValue="Brick workspace" />
                </Field.Root>
              </Cell>
              <Cell label="invalid">
                <Field.Root id="input-invalid" invalid>
                  <Field.Label>Project name</Field.Label>
                  <Input defaultValue="Brick workspace" />
                  <Field.Error>Project name is invalid.</Field.Error>
                </Field.Root>
              </Cell>
            </div>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...inputScenarios[6]}>
        <div className="forms-evidence-stack" data-testid="input-form">
          <EvidenceGroup
            description="Submit empty to expose inline validation, enter an email, submit again, and reset to restore the default."
            title="Submitted email"
          >
            <div className="forms-overview">
              <Form
                aria-label="Input account form"
                id="input-form-example"
                onReset={() => setStatus("Form reset")}
                onSubmit={(event) => {
                  const data = new FormData(event.currentTarget);
                  setStatus(`Submitted: ${String(data.get("email") ?? "none")}`);
                }}
                preventDefaultOnSubmit
                validationBehavior="inline"
              >
                <Field.Root id="input-form-email" required>
                  <Field.Label>Email</Field.Label>
                  <Input name="email" required type="email" />
                  <Field.Description>Use a valid work address.</Field.Description>
                  <Field.Error>Enter a valid email address.</Field.Error>
                </Field.Root>
                <div className="forms-actions">
                  <Button type="submit">Save email</Button>
                  <Button tone="neutral" type="reset">
                    Reset
                  </Button>
                </div>
                <output className="forms-status">{status}</output>
              </Form>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="The Input is outside the form visually but participates through its native form attribute."
            title="External form ownership"
          >
            <div className="forms-overview">
              <Field.Root id="input-external">
                <Field.Label>External project</Field.Label>
                <Input
                  defaultValue="Brick"
                  form="input-form-example"
                  name="project"
                />
              </Field.Root>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="The live specimen and captured HTML expose the generated label, description, error, native input, slots, and ARIA relationships."
            title="Generated relationship output"
          >
            <RenderedOutput label="Input relationship HTML">
              <Field.Root id="input-output" invalid required>
                <Field.Label>Account email</Field.Label>
                <Input name="accountEmail" type="email" />
                <Field.Description>Used for account notices.</Field.Description>
                <Field.Error>Enter a valid address.</Field.Error>
              </Field.Root>
            </RenderedOutput>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...inputScenarios[7]}>
        <div className="forms-evidence-stack">
          <EvidenceGroup
            description="The same default Input and Field render inside adjacent local appearance scopes."
            title="Scoped appearances"
          >
            <div className="forms-scoped-grid" data-testid="input-appearance">
              <div data-brick-appearance="light">
                <code>light</code>
                <PreviewField id="input-light">
                  <Input defaultValue="Brick workspace" />
                </PreviewField>
              </div>
              <div data-brick-appearance="dark">
                <code>dark</code>
                <PreviewField id="input-dark">
                  <Input defaultValue="Brick workspace" />
                </PreviewField>
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="The code names supported wrapper variables and native-input hooks and exactly matches the live result."
            title="Consumer customization"
          >
            <article className="forms-customization">
              <div>
                <Text as="h4" variant="title-sm">Wrapper variables and native control style</Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Public Input variables recolor and reshape the wrapper while
                  inputStyle changes native letter spacing.
                </Text>
                <pre aria-label="Input customization example" tabIndex={0}>
                  <code>{`<Input
  data-slot="custom-input"
  defaultValue="Customized input"
  inputStyle={{ letterSpacing: "0.08em" }}
  style={{
    "--brick-input-background": "#eefbf5",
    "--brick-input-border": "#18794e",
    "--brick-input-focus-ring": "#18794e",
    "--brick-input-foreground": "#0d3b2a",
    "--brick-input-radius": "0.75rem",
  }}
/>`}</code>
                </pre>
              </div>
              <div className="forms-customization__preview">
                <Field.Root id="input-custom">
                  <Field.Label>Customized input</Field.Label>
                  <Input
                    data-slot="custom-input"
                    defaultValue="Customized input"
                    inputStyle={{ letterSpacing: "0.08em" }}
                    style={customInputTokens}
                  />
                </Field.Root>
              </div>
            </article>
          </EvidenceGroup>
        </div>
      </Scenario>

      <Scenario {...inputScenarios[8]}>
        <div className="forms-evidence-stack" data-testid="input-stress">
          <EvidenceGroup
            description="A long value remains editable inside a 20rem application-owned frame without widening the page."
            title="Constrained-width stress"
          >
            <div className="forms-stress-panel">
              <div className="forms-phone-frame">
                <Field.Root id="input-long">
                  <Field.Label>Localized account recovery address</Field.Label>
                  <Input defaultValue="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-without-a-natural-break@example.com" type="email" />
                </Field.Root>
              </div>
            </div>
          </EvidenceGroup>
          <EvidenceGroup
            description="Logical start/end content and the clear action inherit genuine right-to-left direction in their own specimen."
            title="RTL inheritance"
          >
            <div className="forms-stress-panel">
              <div className="forms-phone-frame" dir="rtl">
                <Field.Root id="input-rtl">
                  <Field.Label>البحث في الحساب</Field.Label>
                  <Input
                    clearLabel="مسح البحث"
                    clearable
                    defaultValue="بحث"
                    endAdornment={<span>⌘K</span>}
                    startAdornment={<SearchIcon />}
                    type="search"
                  />
                </Field.Root>
              </div>
            </div>
          </EvidenceGroup>
        </div>
      </Scenario>
    </div>
  );
}
