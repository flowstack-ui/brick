import { Code } from "@flowstack-ui/brick/code";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Grid,
  VStack,
  Text,
  Toggle,
  type ToggleShape,
  type ToggleSize,
  type ToggleVariant,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import { RenderedOutput } from "../../shared/RenderedOutput.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import "./toggle.playground.css";

const variants: ToggleVariant[] = ["solid", "soft", "outline", "ghost"];
const sizes: ToggleSize[] = ["sm", "md", "lg"];
const shapes: ToggleShape[] = ["rounded", "pill"];
const customTokens = {
  "--brick-toggle-gap": "1rem",
  "--brick-toggle-min-block-size": "3.25rem",
  "--brick-toggle-padding-inline": "1.5rem",
  "--brick-toggle-radius": "0.75rem",
  background: "var(--brick-color-accent-soft)",
  borderColor: "var(--brick-color-accent-border)",
  color: "var(--brick-color-accent-on-soft)",
} as CSSProperties;

function StarIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
      <path
        d="m10 2.5 2.2 4.45 4.91.72-3.55 3.46.84 4.89L10 13.7l-4.4 2.32.84-4.89-3.55-3.46 4.91-.72L10 2.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function EvidenceGroup({ children, description, title }: {
  children: ReactNode;
  description: string;
  title: string;
}) {
  return (
    <VStack as="section" className="toggle-evidence-group">
      <VStack className="toggle-evidence-group__heading">
        <Text as="h3" variant="title-sm">{title}</Text>
        <Text as="p" tone="secondary" variant="body-sm">{description}</Text>
      </VStack>
      {children}
    </VStack>
  );
}

function Cell({ children, label }: { children: ReactNode; label: string }) {
  return (
    <EvidenceSurface className="toggle-specimen-cell">
      <SpecimenLabel>{label}</SpecimenLabel>
      <div className="toggle-specimen-cell__preview">{children}</div>
    </EvidenceSurface>
  );
}

export const toggleScenarios = [
  {
    description:
      "Toggle’s canonical rendering is an unpressed soft command at the medium size with a rounded shape and ordinary text content. Activation persists through native aria-pressed state.",
    id: "toggle.overview",
    number: 1,
    title: "Overview",
  },
  {
    description:
      "Variant changes only the resting paint treatment. Every specimen remains unpressed with the default medium size, rounded shape, and identical content.",
    id: "toggle.variants",
    number: 2,
    title: "Variants",
  },
  {
    description:
      "This intentional variant-by-state matrix compares each resting recipe with its selected accent treatment. Content, size, and shape remain identical.",
    id: "toggle.states",
    navigationTitle: "States",
    number: 3,
    title: "Pressed states",
  },
  {
    description:
      "Size changes only target geometry, padding, gap, icon scale, and typography. Every specimen retains Toggle’s default soft, rounded, unpressed recipe.",
    id: "toggle.sizes",
    number: 4,
    title: "Sizes",
  },
  {
    description:
      "Shape changes only radius. Icon-only geometry is a separate content mode and requires a stable complete accessible name.",
    id: "toggle.shapes",
    navigationTitle: "Shapes",
    number: 5,
    title: "Shapes and icon content",
  },
  {
    description:
      "Uncontrolled and controlled state use the same native pressed command. Render and asChild replace the element without changing the finished Toggle contract.",
    id: "toggle.composition",
    navigationTitle: "Composition",
    number: 6,
    title: "State and composition",
  },
  {
    description:
      "Disabled blocks activation while preserving visible content and pressed meaning. Toggle remains a command, not a Checkbox, Switch, or loading Button.",
    id: "toggle.disabled",
    navigationTitle: "Disabled",
    number: 7,
    title: "Disabled states",
  },
  {
    description:
      "Local appearance scopes and public root, slot, style, and component-token hooks customize presentation without changing pressed behavior.",
    id: "toggle.appearance",
    navigationTitle: "Theme",
    number: 8,
    title: "Appearance and customization",
  },
  {
    description:
      "Long localized content wraps inside a constrained frame, while genuine RTL text and native focus preserve state without horizontal page overflow.",
    id: "toggle.stress",
    navigationTitle: "Stress",
    number: 9,
    title: "Responsive and RTL",
  },
] as const satisfies readonly ScenarioDefinition[];

export function TogglePage() {
  const [controlled, setControlled] = useState(false);
  return (
    <VStack className="toggle-page" data-component-page="toggle" data-testid="toggle-workbench">
      <Scenario {...toggleScenarios[0]}>
        <EvidenceSurface className="toggle-overview" data-testid="toggle-overview" inset="lg">
          <Toggle>
            <StarIcon /> Favorite
          </Toggle>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...toggleScenarios[1]}>
        <Grid.Root columns={4} className="toggle-specimen-grid toggle-specimen-grid--four" data-testid="toggle-variants">
          {variants.map((variant) => (
            <Cell key={variant} label={variant}>
              <Toggle variant={variant}>Preview</Toggle>
            </Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...toggleScenarios[2]}>
        <VStack className="toggle-evidence-stack" data-testid="toggle-recipes">
          {variants.map((variant) => (
            <EvidenceGroup
              description={`The ${variant} recipe in its two native pressed states.`}
              key={variant}
              title={`${variant[0].toUpperCase()}${variant.slice(1)} states`}
            >
              <Grid.Root columns={2} className="toggle-specimen-grid toggle-specimen-grid--two">
                <Cell label="unpressed"><Toggle variant={variant}>Preview</Toggle></Cell>
                <Cell label="pressed"><Toggle defaultPressed variant={variant}>Preview</Toggle></Cell>
              </Grid.Root>
            </EvidenceGroup>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...toggleScenarios[3]}>
        <Grid.Root columns={3} className="toggle-specimen-grid toggle-specimen-grid--three" data-testid="toggle-sizes">
          {sizes.map((size) => (
            <Cell key={size} label={size}><Toggle size={size}>Preview</Toggle></Cell>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...toggleScenarios[4]}>
        <VStack className="toggle-evidence-stack" data-testid="toggle-shapes-icons">
          <EvidenceGroup description="Both shapes use identical default content and state." title="Shapes">
            <Grid.Root columns={2} className="toggle-specimen-grid toggle-specimen-grid--two">
              {shapes.map((shape) => (
                <Cell key={shape} label={shape}><Toggle shape={shape}>Preview</Toggle></Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="Square geometry removes text padding; the authored name remains mandatory." title="Icon-only">
            <Grid.Root columns={3} className="toggle-specimen-grid toggle-specimen-grid--three">
              {sizes.map((size) => (
                <Cell key={size} label={size}>
                  <Toggle ariaLabel={`Pin project ${size}`} iconOnly size={size}><StarIcon /></Toggle>
                </Cell>
              ))}
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...toggleScenarios[5]}>
        <VStack className="toggle-evidence-stack" data-testid="toggle-composition">
          <EvidenceGroup description="State ownership changes without changing Toggle’s default recipe." title="State ownership">
            <Grid.Root columns={2} className="toggle-specimen-grid toggle-specimen-grid--two">
              <Cell label="uncontrolled"><Toggle defaultPressed>Preview</Toggle></Cell>
              <Cell label="controlled"><Toggle onPressedChange={setControlled} pressed={controlled}>Preview</Toggle></Cell>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="The live result and actual host markup expose the element, slot, pressed state, and adapter path together." title="Host composition output">
            <Grid.Root className="playground-output-stack">
              <RenderedOutput label="Rendered Toggle HTML"><Toggle data-testid="toggle-render" render={<button type="button" />}>Preview</Toggle></RenderedOutput>
              <RenderedOutput label="Composed Toggle HTML"><Toggle asChild data-testid="toggle-as-child"><button type="button">Preview</button></Toggle></RenderedOutput>
            </Grid.Root>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...toggleScenarios[6]}>
        <Grid.Root columns={2} className="toggle-specimen-grid toggle-specimen-grid--two" data-testid="toggle-disabled">
          <Cell label="disabled · unpressed"><Toggle disabled>Preview</Toggle></Cell>
          <Cell label="disabled · pressed"><Toggle defaultPressed disabled>Preview</Toggle></Cell>
        </Grid.Root>
      </Scenario>

      <Scenario {...toggleScenarios[7]}>
        <VStack className="toggle-evidence-stack">
          <EvidenceGroup description="Adjacent light and dark scopes preserve the default recipe." title="Scoped appearances">
            <Grid.Root columns={2} className="toggle-scoped-grid" data-testid="toggle-appearance">
              <EvidenceSurface data-brick-appearance="light"><Code>light</Code><Toggle>Preview</Toggle></EvidenceSurface>
              <EvidenceSurface data-brick-appearance="dark"><Code>dark</Code><Toggle>Preview</Toggle></EvidenceSurface>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup description="The code names supported hooks and exactly matches the rendered result." title="Consumer customization">
            <EvidenceSurface as="article" className="toggle-customization" inset="lg">
              <div>
                <Text as="h4" variant="title-sm">Root and component CSS properties</Text>
                <Text as="p" tone="secondary" variant="body-sm">Native style, slot, and public Toggle geometry tokens visibly customize the control itself.</Text>
                <PlaygroundCodeBlock aria-label="Toggle customization example" tabIndex={0}>{`<Toggle
  data-slot="custom-toggle"
  style={{
    "--brick-toggle-gap": "1rem",
    "--brick-toggle-min-block-size": "3.25rem",
    "--brick-toggle-padding-inline": "1.5rem",
    "--brick-toggle-radius": "0.75rem",
    background: "var(--brick-color-accent-soft)",
    borderColor: "var(--brick-color-accent-border)",
    color: "var(--brick-color-accent-on-soft)",
  }}
>
  <StarIcon /> Favorite
</Toggle>`}</PlaygroundCodeBlock>
              </div>
              <EvidenceSurface className="toggle-customization__preview">
                <Toggle data-slot="custom-toggle" style={customTokens}>
                  <StarIcon /> Favorite
                </Toggle>
              </EvidenceSurface>
            </EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>

      <Scenario {...toggleScenarios[8]}>
        <VStack className="toggle-evidence-stack" data-testid="toggle-stress">
          <EvidenceGroup description="Long content wraps within a 20rem application-owned frame." title="Constrained-width stress">
            <EvidenceSurface className="toggle-stress-panel"><div className="toggle-phone-frame">
              <Toggle>Awaiting detailed workspace verification</Toggle>
            </div></EvidenceSurface>
          </EvidenceGroup>
          <EvidenceGroup description="Toggle inherits direction from genuine right-to-left content." title="RTL inheritance">
            <EvidenceSurface className="toggle-stress-panel"><div className="toggle-phone-frame" dir="rtl">
              <Toggle defaultPressed>إظهار المشاريع المكتملة</Toggle>
            </div></EvidenceSurface>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
