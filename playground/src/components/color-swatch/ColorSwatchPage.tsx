import type { CSSProperties } from "react";
import {
  Badge,
  Button,
  ColorSwatch,
  Grid,
  HStack,
  Text,
  VStack,
} from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { EvidenceGroup } from "../../shared/EvidenceGroup.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

const customStyle = {
  "--brick-color-swatch-border-color": "var(--brick-color-accent-border)",
  "--brick-color-swatch-radius": "var(--brick-radius-full)",
  "--brick-color-swatch-size": "2.5rem",
} as CSSProperties;
export const colorSwatchScenarios = [
  {
    id: "color-swatch.overview",
    number: 1,
    title: "Overview",
    description:
      "Solid and alpha colors keep one finished footprint while the checker reveals transparency.",
  },
  {
    id: "color-swatch.sizes",
    number: 2,
    title: "Sizes",
    description:
      "The complete sm, md, and lg size vocabulary aligns previews with nearby values.",
  },
  {
    id: "color-swatch.shapes",
    number: 3,
    title: "Shapes",
    description:
      "Sharp, rounded, and circular recipes cover palettes, fields, and compact selection controls without application CSS.",
  },
  {
    id: "color-swatch.mix",
    number: 4,
    title: "Mixed colors",
    description:
      "Two or more colors share one swatch footprint with equal visual weight.",
  },
  {
    id: "color-swatch.semantics",
    number: 5,
    title: "Semantics, appearance, and customization",
    navigationTitle: "Semantics",
    description:
      "Decorative and named previews remain explicit across themes, owner compositions, and public CSS properties.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function ColorSwatchPage() {
  return (
    <VStack data-component-page="color-swatch" gap="6">
      <Scenario {...colorSwatchScenarios[0]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="solid color">
            <HStack gap="3">
              <ColorSwatch.Root
                data-testid="color-swatch-solid"
                value="#5b5bd6"
              />
              <Text>Indigo · #5b5bd6</Text>
            </HStack>
          </Specimen>
          <Specimen label="45% alpha">
            <HStack gap="3">
              <ColorSwatch.Root
                data-testid="color-swatch-alpha"
                value="rgb(229 72 77 / 45%)"
              />
              <Text>Ruby · 45% alpha</Text>
            </HStack>
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...colorSwatchScenarios[1]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Specimen key={size} label={size}>
              <HStack align="center" gap="3">
                <ColorSwatch.Root
                  data-testid={`color-swatch-${size}`}
                  size={size}
                  value="#30a46c"
                />
                <Text>{size.toUpperCase()} swatch</Text>
              </HStack>
            </Specimen>
          ))}
        </Grid.Root>
      </Scenario>
      <Scenario {...colorSwatchScenarios[2]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          {(["sharp", "rounded", "circle"] as const).map((shape) => (
            <Specimen key={shape} label={shape}>
              <HStack gap="3">
                <ColorSwatch.Root
                  data-testid={`color-swatch-${shape}`}
                  shape={shape}
                  value="#0090ff"
                />
                <Text>{shape} swatch</Text>
              </HStack>
            </Specimen>
          ))}
        </Grid.Root>
      </Scenario>
      <Scenario {...colorSwatchScenarios[3]}>
        <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
          <Specimen label="two colors">
            <HStack gap="3">
              <ColorSwatch.Mix
                data-testid="color-swatch-mix-two"
                label="Indigo and ruby campaign colors"
                values={["#5b5bd6", "#e5484d"]}
              />
              <Text>Campaign pair</Text>
            </HStack>
          </Specimen>
          <Specimen label="three colors">
            <HStack gap="3">
              <ColorSwatch.Mix
                data-testid="color-swatch-mix-three"
                label="Indigo, ruby, and grass product palette"
                values={["#5b5bd6", "#e5484d", "#30a46c"]}
              />
              <Text>Product palette</Text>
            </HStack>
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...colorSwatchScenarios[4]}>
        <VStack gap="6">
          <EvidenceGroup
            description="Decorative swatches rely on nearby text; named swatches expose their own image label."
            title="Semantics"
          >
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="decorative preview">
                <HStack gap="3">
                  <ColorSwatch.Root data-testid="color-swatch-decorative" value="#f5d90a" />
                  <Text>Yellow · #f5d90a (text owns the name)</Text>
                </HStack>
              </Specimen>
              <Specimen label="named image">
                <HStack gap="3">
                  <ColorSwatch.Root data-testid="color-swatch-labeled" label="Ocean blue color" value="#0090ff" />
                  <Text>Ocean blue · #0090ff</Text>
                </HStack>
              </Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="The same semantic colors stay legible in both appearance scopes."
            title="Appearance"
          >
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen data-brick-appearance="light" label="light">
                <HStack gap="3"><ColorSwatch.Root value="#8e4ec6" /><Text>Plum</Text></HStack>
              </Specimen>
              <Specimen data-brick-appearance="dark" label="dark">
                <HStack gap="3"><ColorSwatch.Root value="#8e4ec6" /><Text>Plum</Text></HStack>
              </Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="An owning component supplies meaning and interaction; the swatch remains visual evidence."
            title="Compositions"
          >
            <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
              <Specimen label="inside a badge">
                <Badge><ColorSwatch.Root size="sm" value="#0090ff" /> Ocean blue</Badge>
              </Specimen>
              <Specimen label="inside a button">
                <Button tone="neutral" variant="outline"><ColorSwatch.Root value="#e5484d" /> Coral preset</Button>
              </Specimen>
            </Grid.Root>
          </EvidenceGroup>
          <EvidenceGroup
            description="Only the documented size, radius, and border properties change the live preview."
            title="Customization"
          >
            <CustomizationEvidence
              code={`--brick-color-swatch-size: 2.5rem;\n--brick-color-swatch-radius: var(--brick-radius-full);\n--brick-color-swatch-border-color: var(--brick-color-accent-border);`}
              description="The preview uses the same size, border, and radius shown in code."
              title="Color Swatch CSS properties"
            >
                <ColorSwatch.Root
                  label="Customized cyan color"
                  style={customStyle}
                  value="#12a594"
                />
            </CustomizationEvidence>
          </EvidenceGroup>
        </VStack>
      </Scenario>
    </VStack>
  );
}
