import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Button,
  Field,
  Form,
  Grid,
  PinInput,
  usePinInput,
  HStack,
  Input,
  Text,
  VStack,
  type PinInputLayout,
  type PinInputShape,
  type PinInputSize,
  type PinInputVariant,
} from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import {
  FormEvidenceCell as Cell,
  FormEvidenceGroup as EvidenceGroup,
} from "../../shared/FormEvidence.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import "../../shared/forms-evidence.playground.css";
import "./pin-input.playground.css";

const variants: PinInputVariant[] = ["outline", "soft", "underline"];
const sizes: PinInputSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const shapes: PinInputShape[] = ["sharp", "rounded"];
const layouts: PinInputLayout[] = ["separated", "attached"];
const definitions = [
  [1, "Overview", "Canonical six-digit verification code composed with Field."],
  [2, "Variants", "Outline, soft, and underline change cell paint only."],
  [3, "Sizes and shapes", "Closed sizes and shapes retain equal cells."],
  [4, "Layouts", "Separated and attached groups express spacing only."],
  [
    5,
    "Input behavior",
    "Numeric filtering, paste, completion, masking, and localization remain Atom-owned.",
  ],
  [
    6,
    "States",
    "Controlled, disabled, read-only, required, and invalid states remain distinct.",
  ],
  [
    7,
    "Form and Field",
    "Native submission, reset, and validation for one labeled field.",
  ],
  [
    8,
    "Appearance and customization",
    "Light and dark scopes plus one documented token override.",
  ],
  [
    9,
    "Responsive and RTL",
    "Narrow and right-to-left evidence remains contained.",
  ],
  [10, "Character types and acceptance", "ASCII types, custom patterns, sanitized paste and atomic rejection."],
  [11, "Controller and sparse values", "Public store, editable empty positions and dynamic length without joining away cells."],
  [12, "Focus, completion and platform policy", "Optional selection, completion blur and deliberate native submission. Physical OTP acquisition remains a manual check."],
] as const;
export const pinInputScenarios = definitions.map(
  ([number, title, description]) => ({
    id: `pin-input.${number}`,
    number,
    title,
    description,
  }),
) satisfies ScenarioDefinition[];

function Cells({
  length = 6,
  separator = false,
}: {
  length?: number;
  separator?: boolean;
}) {
  const first = separator ? Math.ceil(length / 2) : length;
  return (
    <>
      <PinInput.Group>
        {Array.from({ length: first }, (_, index) => (
          <PinInput.Input index={index} key={index} />
        ))}
      </PinInput.Group>
      {separator ? (
        <>
          <PinInput.Separator />
          <PinInput.Group>
            {Array.from({ length: length - first }, (_, index) => (
              <PinInput.Input index={index + first} key={index + first} />
            ))}
          </PinInput.Group>
        </>
      ) : null}
    </>
  );
}
function Control(
  props: Omit<React.ComponentProps<typeof PinInput.Root>, "children"> & {
    separator?: boolean;
  },
) {
  const { separator, variant, shape, radius, ...root } = props;
  const recipe =
    variant === "underline" ? ({ variant } as const) : radius === undefined ? { variant, shape } : { variant, radius };
  return (
    <PinInput.Root {...root} {...recipe}>
      <Cells length={root.length} separator={separator} />
    </PinInput.Root>
  );
}
function Labeled({ children, id }: { children: ReactNode; id: string }) {
  return (
    <Field.Root id={id}>
      <Field.Label>Verification code</Field.Label>
      {children}
      <Field.Description>Enter the code sent to your device.</Field.Description>
    </Field.Root>
  );
}
const customTokens = {
  "--brick-pin-input-size": "3.25rem",
  "--brick-pin-input-radius": "1rem",
} as CSSProperties;

export function PinInputPage() {
  const [value, setValue] = useState<string[]>([]);
  const [status, setStatus] = useState("No form event yet");
  return (
    <VStack
      className="forms-page specialized-field-page pin-input-page"
      data-component-page="pin-input"
    >
      <Scenario {...pinInputScenarios[0]}>
        <EvidenceSurface
          className="forms-overview"
          data-testid="pin-input-overview"
          inset="lg"
        >
          <Labeled id="otp-overview">
            <Control length={6} name="code" separator otp />
          </Labeled>
        </EvidenceSurface>
      </Scenario>
      <Scenario {...pinInputScenarios[1]}>
        <Grid.Root
          columns={3}
          className="forms-grid forms-grid--three"
          data-testid="pin-input-variants"
        >
          {variants.map((variant) => (
            <Cell key={variant} label={variant}>
              <Labeled id={`otp-variant-${variant}`}>
                <Control length={4} variant={variant} />
              </Labeled>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>
      <Scenario {...pinInputScenarios[2]}>
        <VStack className="forms-evidence-stack" data-testid="pin-input-sizes">
          <EvidenceGroup
            title="Sizes"
            description="Seven shared sizes change geometry and type. Adjacent ordinary inputs use the same size."
          >
            <Grid.Root columns={3} className="forms-grid forms-grid--three">
              {sizes.map((size) => (
                <Cell key={size} label={size}>
                  <Labeled id={`otp-size-${size}`}>
                    <Control length={4} size={size} />
                    <Input size={size} aria-label={`${size} comparison input`} placeholder="Same size" />
                  </Labeled>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            title="Shapes"
            description="Sharp and rounded change only the cell boundary geometry."
          >
            <Grid.Root columns={2} className="forms-grid forms-grid--two">
              {shapes.map((shape) => (
                <Cell key={shape} label={shape}>
                  <Labeled id={`otp-shape-${shape}`}>
                    <Control length={4} shape={shape} />
                  </Labeled>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>
      <Scenario {...pinInputScenarios[3]}>
        <Grid.Root
          columns={2}
          className="forms-grid forms-grid--two"
          data-testid="pin-input-layouts"
        >
          {layouts.map((layout) => (
            <Cell key={layout} label={layout}>
              <Labeled id={`otp-layout-${layout}`}>
                <Control layout={layout} length={4} />
              </Labeled>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>
      <Scenario {...pinInputScenarios[4]}>
        <Grid.Root
          columns={3}
          className="forms-grid forms-grid--three"
          data-testid="pin-input-behavior"
        >
          <Cell label="numeric entry">
            <Labeled id="otp-numeric">
              <Control length={4} />
            </Labeled>
          </Cell>
          <Cell label="masked value">
            <Labeled id="otp-mask">
              <Control length={4} mask />
            </Labeled>
          </Cell>
          <Cell label="Spanish labels">
            <Field.Root id="otp-localized">
              <Field.Label>Código</Field.Label>
              <Control
                getInputLabel={(index, length) =>
                  `Dígito ${index + 1} de ${length}`
                }
                length={4}
              />
              <Field.Description>
                Etiquetas accesibles localizadas.
              </Field.Description>
            </Field.Root>
          </Cell>
        </Grid.Root>
      </Scenario>
      <Scenario {...pinInputScenarios[5]}>
        <Grid.Root
          columns={4}
          className="forms-grid forms-grid--four"
          data-testid="pin-input-states"
        >
          <Cell label="controlled">
            <Labeled id="otp-controlled">
              <Control length={4} value={value} onValueChange={({value}) => setValue(value)} />
              <output className="forms-status">
                <Text as="span">Value: {value.join("") || "empty"}</Text>
              </output>
            </Labeled>
          </Cell>
          <Cell label="disabled">
            <Labeled id="otp-disabled">
              <Control disabled length={4} />
            </Labeled>
          </Cell>
          <Cell label="read-only">
            <Labeled id="otp-readonly">
              <Control defaultValue={["1", "2", "3", "4"]} length={4} readOnly />
            </Labeled>
          </Cell>
          <Cell label="invalid and required">
            <Field.Root id="otp-invalid" invalid required>
              <Field.Label>Verification code</Field.Label>
              <Control length={4} />
              <Field.Error>Enter all four digits.</Field.Error>
            </Field.Root>
          </Cell>
        </Grid.Root>
      </Scenario>
      <Scenario {...pinInputScenarios[6]}>
        <VStack className="forms-evidence-stack">
          <EvidenceGroup
            title="Native form and Field"
            description="One required Pin Input uses one Field label while submit and reset preserve native form behavior."
          >
            <EvidenceSurface
              className="forms-overview"
              data-testid="pin-input-form"
            >
              <Form
                aria-label="Verification form"
                preventDefaultOnSubmit
                validationBehavior="inline"
                onReset={() => setStatus("Form reset")}
                onSubmit={(event) =>
                  setStatus(
                    `Submitted: ${new FormData(event.currentTarget).get("verification") ?? "none"}`,
                  )
                }
              >
                <Field.Root id="otp-form-code" required>
                  <Field.Label>Security code</Field.Label>
                  <Control length={4} name="verification" otp />
                  <Field.Error>Enter the security code.</Field.Error>
                </Field.Root>
                <Button type="submit">Verify</Button>
                <Button type="reset" variant="outline">
                  Reset
                </Button>
                <output className="forms-status">
                  <Text as="span">{status}</Text>
                </output>
              </Form>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
      <Scenario {...pinInputScenarios[7]}>
        <VStack
          className="forms-evidence-stack"
          data-testid="pin-input-appearance"
        >
          <EvidenceGroup
            title="Scoped appearances"
            description="Compact badges identify identical Pin Input defaults inside light and dark scopes."
          >
            <Grid.Root columns={2} className="forms-scoped-grid">
              <EvidenceSurface data-brick-appearance="light">
                <SpecimenLabel>Light</SpecimenLabel>
                <Labeled id="otp-light">
                  <Control length={4} />
                </Labeled>
              </EvidenceSurface>
              <EvidenceSurface data-brick-appearance="dark">
                <SpecimenLabel>Dark</SpecimenLabel>
                <Labeled id="otp-dark">
                  <Control length={4} />
                </Labeled>
              </EvidenceSurface>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            title="Consumer customization"
            description="The titled preview uses only the documented public variables shown beside it."
          >
            <EvidenceSurface
              as="article"
              className="forms-customization"
              inset="lg"
            >
              <div>
                <SpecimenLabel>Customized</SpecimenLabel>
                <Text as="h4" variant="title-sm">
                  Verification accent
                </Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Larger cells and an accent radius are scoped to this one
                  verification field.
                </Text>
                <PlaygroundCodeBlock
                  tabIndex={0}
                >{`--brick-pin-input-size: 3.25rem;\n--brick-pin-input-radius: 1rem;`}</PlaygroundCodeBlock>
              </div>
              <EvidenceSurface className="forms-customization__preview">
                <Labeled id="otp-custom">
                  <Control length={4} style={customTokens} />
                </Labeled>
              </EvidenceSurface>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
      <Scenario {...pinInputScenarios[8]}>
        <VStack className="forms-evidence-stack" data-testid="pin-input-stress">
          <EvidenceGroup
            title="Constrained-width stress"
            description="Two three-cell groups wrap only at the authored separator inside a narrow application-owned frame."
          >
            <EvidenceSurface className="forms-stress-panel">
              <div className="forms-phone-frame">
                <Labeled id="otp-narrow">
                  <Control length={6} separator />
                </Labeled>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup
            title="RTL inheritance"
            description="Localized labels, cell order, and focus progression remain inspectable in a genuine right-to-left scope."
          >
            <EvidenceSurface className="forms-stress-panel">
              <div className="forms-phone-frame" dir="rtl">
                <Field.Root id="otp-rtl">
                  <Field.Label>رمز التحقق</Field.Label>
                  <Control
                    dir="rtl"
                    getInputLabel={(index, length) =>
                      `الرقم ${index + 1} من ${length}`
                    }
                    length={4}
                  />
                </Field.Root>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
      <Scenario {...pinInputScenarios[9]}><AcceptanceExamples /></Scenario>
      <Scenario {...pinInputScenarios[10]}><ControllerExample /></Scenario>
      <Scenario {...pinInputScenarios[11]}><PolicyExamples /></Scenario>
    </VStack>
  );
}

function AcceptanceExamples() {
  const [invalid, setInvalid] = useState("No rejected values");
  return <VStack gap="6" data-testid="pin-input-acceptance">
    <Grid.Root columns={{initial:1,md:2}} gap="6">
      <Cell label="General PIN · no OTP autofill"><Control length={4} aria-label="General PIN" /></Cell>
      <Cell label="Alphabetic"><Control length={4} type="alphabetic" aria-label="Letters" /></Cell>
      <Cell label="Alphanumeric"><Control length={4} type="alphanumeric" aria-label="Letters and digits" /></Cell>
      <Cell label="Custom hexadecimal"><Control length={4} pattern={/^[A-F0-9]$/i} aria-label="Hex code" /></Cell>
      <Cell label="Formatted OTP · paste 01-23"><Control length={4} otp aria-label="Formatted OTP" sanitizeValue={value => value.replace(/-/g, "").trim()} onValueInvalid={({value}) => setInvalid(`Rejected: ${value}`)} /><Text role="status">{invalid}</Text></Cell>
      <Cell label="Custom visual mask / placeholder"><Control length={4} mask="*" placeholder="_" defaultValue={["0","7"]} aria-label="Visual-only mask" /></Cell>
    </Grid.Root>
  </VStack>;
}
function ControllerExample() {
  const [length, setLength] = useState(4);
  const api = usePinInput({length, defaultValue:["1","","3","4"]});
  return <VStack gap="4" data-testid="pin-input-controller">
    <PinInput.RootProvider value={api} size={{lg:"xl"}}>
      <PinInput.Label>Access PIN</PinInput.Label>
      <PinInput.Control><Cells length={length} /></PinInput.Control>
      <PinInput.Context>{state => <output><Text as="span" variant="body-sm">Cells: {JSON.stringify(state.value)} · {state.complete ? "complete" : "incomplete"}</Text></output>}</PinInput.Context>
    </PinInput.RootProvider>
    <HStack gap="2" wrap><Button onClick={() => api.setValueAtIndex(1,"2")}>Fill second</Button><Button variant="outline" onClick={() => api.clearValue()}>Clear PIN</Button><Button variant="outline" onClick={() => api.focus()}>Focus PIN</Button><Button variant="outline" onClick={() => setLength(value => value === 4 ? 6 : 4)}>Toggle length</Button></HStack>
  </VStack>;
}
function PolicyExamples() {
  const [result, setResult] = useState("No automatic submission");
  const [complete, setComplete] = useState("Waiting for four digits");
  const [showFocus, setShowFocus] = useState(false);
  return <VStack gap="6" data-testid="pin-input-policy">
    <Grid.Root columns={{initial:1,md:2}} gap="6">
      <Cell label="No selection on focus"><Control length={4} selectOnFocus={false} defaultValue={["1","2"]} aria-label="No automatic selection" /></Cell>
      <Cell label="Blur after completion"><Control length={4} blurOnComplete onComplete={value => setComplete(`Completed: ${value}`)} aria-label="Blur on completion" /><Text role="status">{complete}</Text></Cell>
      <Cell label="Explicit autofocus"><Button onClick={() => setShowFocus(value => !value)}>Toggle autofocus example</Button>{showFocus && <Control length={4} autoFocus aria-label="Autofocused PIN" />}</Cell>
      <Cell label="External form and deliberate autosubmit"><VStack gap="3"><Form id="pin-auto-form" aria-label="Automatic code form" preventDefaultOnSubmit onSubmit={event => setResult(`Automatic: ${new FormData(event.currentTarget).get("pin")}`)}><Button type="reset" variant="outline">Reset external PIN</Button></Form><Control length={4} form="pin-auto-form" name="pin" otp required autoSubmit aria-label="Automatic OTP" /><Text role="status">{result}</Text></VStack></Cell>
    </Grid.Root>
    <Text tone="secondary" variant="body-sm">Native password masking and one-time-code autocomplete attributes are inspectable here. Actual SMS suggestions, password-manager integration, physical IME, touch, screen readers and browser zoom still require manual device checks; they are not simulated passes.</Text>
  </VStack>;
}
