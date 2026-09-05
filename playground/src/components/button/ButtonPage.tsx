import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Grid,
  VStack,
  Button,
  Field,
  Form,
  Input,
  Text,
  type ButtonShape,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { ArrowIcon } from "../../shared/icons.js";
import "./button.playground.css";

const variants: ButtonVariant[] = ["solid", "soft", "outline", "ghost"];
const tones: ButtonTone[] = [
  "neutral",
  "contrast",
  "accent",
  "info",
  "success",
  "warning",
  "danger",
];
const sizes: ButtonSize[] = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
const shapes: ButtonShape[] = ["sharp", "rounded", "pill"];

const tokenCustomization = {
  "--brick-button-background": "#6b2f88",
  "--brick-button-background-hover": "#7d3b9c",
  "--brick-button-background-pressed": "#58266f",
  "--brick-button-foreground": "#ffffff",
} as CSSProperties;

function EvidenceGroup({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <VStack as="section" className="button-evidence-group">
      <VStack className="button-evidence-group__heading">
        <Text as="h3" variant="title-sm">
          {title}
        </Text>
        <Text as="p" tone="secondary" variant="body-sm">
          {description}
        </Text>
      </VStack>
      {children}
    </VStack>
  );
}

function SpecimenCell({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <EvidenceSurface className="button-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="button-specimen-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

export const buttonScenarios = [
  {
    description:
      "Button’s canonical rendering is a solid accent action at the comfortable large size with a rounded shape. Activate it to confirm the default native interaction and status feedback.",
    id: "button.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Variants express action hierarchy without changing Button semantics. Compare their emphasis, boundaries, and interactive affordance using the default accent tone.",
    id: "button.variants",
    number: 2,
    title: "Variants",
  },
  {
    description:
      "Tone carries semantic meaning while variant controls visual emphasis. Review every supported tone across all four variants for a complete recipe matrix.",
    id: "button.tones",
    number: 3,
    title: "Tones",
  },
  {
    description:
      "The seven-size scale supports dense interfaces through prominent calls to action. Compare control height, spacing, label treatment, visual weight, and one sparse mobile-first responsive recipe change.",
    id: "button.sizes",
    number: 4,
    title: "Sizes",
  },
  {
    description:
      "Shape is a closed visual recipe, while fullWidth is an explicit layout option. Review each shape independently from the width behavior.",
    id: "button.shape-width",
    navigationTitle: "Shape",
    number: 5,
    title: "Shape and width",
  },
  {
    description:
      "Button can render or compose native links without losing its finished appearance. Compare each supported composition path and its resulting link semantics.",
    id: "button.composition",
    navigationTitle: "Links",
    number: 6,
    title: "Links and composition",
  },
  {
    description:
      "Content slots and interaction states must preserve intrinsic sizing, accessible names, and native behavior. Form actions separately verify submit and reset semantics.",
    id: "button.states",
    navigationTitle: "States",
    number: 7,
    title: "Content and states",
  },
  {
    description:
      "Appearance can be scoped locally, and public styling hooks support deliberate consumer customization. Compare each technique with its rendered result.",
    id: "button.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Button must remain contained with long labels and inherit logical direction from its environment. Review constrained-width stress separately from genuine RTL content.",
    id: "button.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function ButtonPage() {
  const [pressCount, setPressCount] = useState(0);
  const [formStatus, setFormStatus] = useState(
    "Edit the project name, then submit or reset the form.",
  );

  return (
    <VStack
      className="button-page"
      data-component-page="button"
      data-testid="button-workbench"
    >
      <Scenario {...buttonScenarios[0]}>
        <EvidenceSurface
          className="button-overview"
          data-testid="button-overview"
          inset="lg"
        >
          <Button onPress={() => setPressCount((value) => value + 1)}>
            Publish project
          </Button>
          <span aria-atomic="true" className="press-status" role="status">
            Pressed {pressCount} {pressCount === 1 ? "time" : "times"}
          </span>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...buttonScenarios[1]}>
        <Grid.Root
          columns={4}
          className="button-specimen-grid button-specimen-grid--four"
          data-testid="button-variants"
        >
          {variants.map((variant) => (
            <SpecimenCell key={variant} label={variant}>
              <Button variant={variant}>Action</Button>
            </SpecimenCell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...buttonScenarios[2]}>
        <VStack className="button-evidence-stack" data-testid="button-tones">
          {variants.map((variant) => (
            <EvidenceGroup
              description={`All semantic tones using the ${variant} treatment.`}
              key={variant}
              title={`${variant[0].toUpperCase()}${variant.slice(1)} tones`}
            >
              <Grid.Root
                columns={6}
                className="button-specimen-grid button-specimen-grid--six"
              >
                {tones.map((tone) => (
                  <SpecimenCell key={tone} label={tone}>
                    <Button tone={tone} variant={variant}>
                      Action
                    </Button>
                  </SpecimenCell>
                ))}
              </Grid.Root>
            </EvidenceGroup>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...buttonScenarios[3]}>
        <VStack align="stretch" gap="6">
          <Grid.Root
            columns={7}
            className="button-specimen-grid button-specimen-grid--seven"
            data-testid="button-sizes"
          >
            {sizes.map((size) => (
              <SpecimenCell key={size} label={size}>
                <Button size={size}>Action</Button>
              </SpecimenCell>
            ))}
          </Grid.Root>

          <EvidenceGroup
            description="One semantic Button changes its complete size recipe at the shared lg breakpoint."
            title="Responsive size"
          >
            <SpecimenCell label="default lg → md at lg">
              <Button
                data-testid="button-responsive-size"
                size={{ lg: "md" }}
              >
                Responsive action
              </Button>
            </SpecimenCell>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...buttonScenarios[4]}>
        <EvidenceGroup
          description="Shape changes corner geometry without changing the Button’s size, tone, or semantic role."
          title="Shape recipes"
        >
          <Grid.Root
            columns={3}
            className="button-specimen-grid button-specimen-grid--three"
            data-testid="button-shapes"
          >
            {shapes.map((shape) => (
              <SpecimenCell key={shape} label={shape}>
                <Button shape={shape}>Action</Button>
              </SpecimenCell>
            ))}
          </Grid.Root>
        </EvidenceGroup>

        <EvidenceGroup
          description="The public fullWidth prop fills the available inline size. Resize the browser to confirm that it follows its container without overflow."
          title="Full-width behavior"
        >
          <div className="button-width-demo">
            <div className="button-width-frame">
              <Button fullWidth>Explicit full width</Button>
            </div>
          </div>
        </EvidenceGroup>
      </Scenario>

      <Scenario {...buttonScenarios[5]}>
        <Grid.Root
          className="playground-output-stack"
          data-testid="button-composition"
          id="composition"
        >
          <RenderedOutput label="href Button HTML">
            <Button
              data-testid="button-link-href"
              href="#scenario-button-states"
            >
              Action
            </Button>
          </RenderedOutput>
          <RenderedOutput label="asChild Button HTML">
            <Button asChild>
              <a
                data-testid="button-link-as-child"
                href="#scenario-button-states"
              >
                Action
              </a>
            </Button>
          </RenderedOutput>
          <RenderedOutput label="render Button HTML">
            <Button
              data-testid="button-link-render"
              render={<a href="#scenario-button-states" />}
            >
              Action
            </Button>
          </RenderedOutput>
        </Grid.Root>
      </Scenario>

      <Scenario {...buttonScenarios[6]}>
        <EvidenceGroup
          description="Optional content and unavailable states retain intrinsic Button dimensions and expose the expected accessible state."
          title="Content and state specimens"
        >
          <Grid.Root
            columns={5}
            className="button-specimen-grid button-specimen-grid--five"
            data-testid="button-states"
          >
            <SpecimenCell label="startIcon">
              <Button
                data-testid="button-start-icon"
                startIcon={<ArrowIcon direction="start" />}
              >
                Action
              </Button>
            </SpecimenCell>
            <SpecimenCell label="endIcon">
              <Button data-testid="button-end-icon" endIcon={<ArrowIcon />}>
                Action
              </Button>
            </SpecimenCell>
            <SpecimenCell label="disabled">
              <Button data-testid="button-disabled" disabled>
                Action
              </Button>
            </SpecimenCell>
            <SpecimenCell label="loading">
              <Button data-testid="button-loading" loading>
                Action
              </Button>
            </SpecimenCell>
            <SpecimenCell label="disabled + loading">
              <Button data-testid="button-disabled-loading" disabled loading>
                Action
              </Button>
            </SpecimenCell>
          </Grid.Root>
        </EvidenceGroup>

        <EvidenceGroup
          description="Submit and reset remain native form behaviors; Button supplies styling and forwards the selected type."
          title="Native form behavior"
        >
          <Form
            aria-label="Button native form example"
            className="button-form-demo"
            onReset={() => {
              setFormStatus('Reset to "Mobile storefront".');
            }}
            onSubmit={(event) => {
              const project = new FormData(event.currentTarget).get("project");
              setFormStatus(`Submitted "${String(project)}".`);
            }}
            preventDefaultOnSubmit
          >
            <Field.Root id="button-project">
              <Field.Label>Project name</Field.Label>
              <Input
                defaultValue="Mobile storefront"
                id="button-project-control"
                name="project"
              />
            </Field.Root>
            <Button type="submit">Save form</Button>
            <Button tone="neutral" type="reset">
              Reset
            </Button>
            <Text
              aria-live="polite"
              className="button-form-status"
              role="status"
              variant="body-sm"
            >
              {formStatus}
            </Text>
          </Form>
        </EvidenceGroup>
      </Scenario>

      <Scenario {...buttonScenarios[7]}>
        <EvidenceGroup
          description="These adjacent scopes prove that appearance can be overridden locally without changing the document-wide review setting."
          title="Scoped appearances"
        >
          <Grid.Root columns={2} className="button-appearance-grid">
            <EvidenceSurface
              className="button-appearance-panel"
              data-brick-appearance="light"
            >
              <span>Light scope</span>
              <Button>Action</Button>
            </EvidenceSurface>
            <EvidenceSurface
              className="button-appearance-panel"
              data-brick-appearance="dark"
            >
              <span>Dark scope</span>
              <Button>Action</Button>
            </EvidenceSurface>
          </Grid.Root>
        </EvidenceGroup>

        <EvidenceGroup
          description="Each row names the supported customization mechanism, shows the minimal consumer code, and renders the resulting Button."
          title="Consumer customization"
        >
          <div className="button-customization-list">
            <EvidenceSurface
              as="article"
              className="button-customization"
              inset="lg"
            >
              <div>
                <Text as="h4" variant="title-sm">
                  Component CSS properties
                </Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  Public Button tokens replace the solid recipe colors within
                  this instance only.
                </Text>
                <PlaygroundCodeBlock
                  aria-label="Button component token example"
                  tabIndex={0}
                >{`style={{
  "--brick-button-background": "#6b2f88",
  "--brick-button-background-hover": "#7d3b9c",
  "--brick-button-background-pressed": "#58266f",
  "--brick-button-foreground": "#ffffff"
}}`}</PlaygroundCodeBlock>
              </div>
              <div className="button-customization__preview">
                <Button
                  data-testid="button-token-customization"
                  style={tokenCustomization}
                >
                  Action
                </Button>
              </div>
            </EvidenceSurface>

            <EvidenceSurface
              as="article"
              className="button-customization"
              inset="lg"
            >
              <div>
                <Text as="h4" variant="title-sm">
                  Consumer hooks
                </Text>
                <Text as="p" tone="secondary" variant="body-sm">
                  className, style, and data-slot pass through for local
                  targeting without changing the Button API.
                </Text>
                <PlaygroundCodeBlock
                  aria-label="Button consumer hook example"
                  tabIndex={0}
                >{`.button-page .dashed-action {
  --brick-button-background: transparent;
  --brick-button-background-hover: var(--brick-color-accent-soft);
  --brick-button-background-pressed: var(--brick-color-accent-soft-pressed);
  --brick-button-border-color: var(--brick-color-accent-border);
  --brick-button-foreground: var(--brick-color-accent-text);
  border-style: dashed;
}

<Button
  className="dashed-action"
  style={{ letterSpacing: "0.04em" }}
  data-slot="custom-action"
>
  Action
</Button>`}</PlaygroundCodeBlock>
              </div>
              <div className="button-customization__preview">
                <Button
                  className="dashed-action"
                  data-slot="custom-action"
                  style={{ letterSpacing: "0.04em" }}
                >
                  Action
                </Button>
              </div>
            </EvidenceSurface>
          </div>
        </EvidenceGroup>
      </Scenario>

      <Scenario {...buttonScenarios[8]}>
        <VStack className="button-evidence-stack" data-testid="button-stress">
          <EvidenceGroup
            description="A long localized label wraps inside a 20rem frame. The control may grow vertically but must not clip or overflow."
            title="Constrained-width stress"
          >
            <EvidenceSurface className="button-stress-panel">
              <div className="phone-frame">
                <Text as="p" variant="body-sm">
                  20rem constrained canvas
                </Text>
                <Button fullWidth>
                  Continue with the carefully selected delivery preferences
                </Button>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>

          <EvidenceGroup
            description="Button has no RTL mode or prop. It inherits direction from the surrounding context, including logical content and icon placement."
            title="RTL inheritance"
          >
            <EvidenceSurface className="button-stress-panel">
              <div className="phone-frame" dir="rtl">
                <Text as="p" variant="body-sm">
                  Genuine right-to-left content
                </Text>
                <Button endIcon={<ArrowIcon />}>
                  متابعة إعداد مساحة العمل
                </Button>
              </div>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
