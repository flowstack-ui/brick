import type { CSSProperties } from "react";
import { DataList, Grid, Link, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";

const customStyle = {
  "--brick-data-list-gap": "var(--brick-space-6)",
  "--brick-data-list-divider-color": "var(--brick-color-accent-border)",
} as CSSProperties;
export const dataListScenarios = [
  {
    id: "data-list.overview",
    number: 1,
    title: "Overview",
    description:
      "Native term-and-value facts use finished Brick rhythm and text roles.",
  },
  {
    id: "data-list.orientation",
    number: 2,
    title: "Responsive orientation",
    navigationTitle: "Orientation",
    description:
      "Vertical, horizontal, and responsive layouts preserve one semantic description list.",
  },
  {
    id: "data-list.recipes",
    number: 3,
    title: "Recipes, appearance, and stress",
    navigationTitle: "Recipes",
    description:
      "All sizes, label measures, dividers, themes, public properties, and long values remain readable.",
  },
] as const satisfies readonly ScenarioDefinition[];
function ProfileFacts({
  divide = false,
  style,
}: {
  divide?: boolean;
  style?: CSSProperties;
}) {
  return (
    <DataList.Root divide={divide} style={style}>
      <DataList.Item>
        <DataList.Label>Role</DataList.Label>
        <DataList.Value>Product designer</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Location</DataList.Label>
        <DataList.Value>Brooklyn, New York</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Email</DataList.Label>
        <DataList.Value>
          <Link href="mailto:maya@example.com">maya@example.com</Link>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
export function DataListPage() {
  return (
    <VStack data-component-page="data-list" gap="6">
      <Scenario {...dataListScenarios[0]}>
        <Specimen label="default">
          <ProfileFacts />
        </Specimen>
      </Scenario>
      <Scenario {...dataListScenarios[1]}>
        <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
          <Specimen label="vertical">
            <ProfileFacts />
          </Specimen>
          <Specimen label="horizontal">
            <DataList.Root labelWidth="md" orientation="horizontal">
              <DataList.Item>
                <DataList.Label>Organization</DataList.Label>
                <DataList.Value>Northstar Studio</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Member since</DataList.Label>
                <DataList.Value>May 2024</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Specimen>
          <Specimen label="responsive">
            <DataList.Root
              data-testid="data-list-responsive"
              labelWidth="md"
              orientation={{ initial: "vertical", md: "horizontal" }}
            >
              <DataList.Item>
                <DataList.Label>Plan</DataList.Label>
                <DataList.Value>Team</DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Renewal</DataList.Label>
                <DataList.Value>August 31</DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Specimen>
        </Grid.Root>
      </Scenario>
      <Scenario {...dataListScenarios[2]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 3 }} gap="4">
            {(["sm", "md", "lg"] as const).map((size) => (
              <Specimen key={size} label={size}>
                <DataList.Root size={size}>
                  <DataList.Item>
                    <DataList.Label>{size.toUpperCase()} label</DataList.Label>
                    <DataList.Value>{size.toUpperCase()} value</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </Specimen>
            ))}
          </Grid.Root>
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen label="divided rows">
              <ProfileFacts divide />
            </Specimen>
            <Specimen label="long RTL value" dir="rtl">
              <DataList.Root divide labelWidth="lg" orientation="horizontal">
                <DataList.Item>
                  <DataList.Label>تفاصيل المؤسسة الدولية</DataList.Label>
                  <DataList.Value>
                    قيمة طويلة تلتف دون كسر العلاقة الدلالية بين المصطلح والوصف
                  </DataList.Value>
                </DataList.Item>
              </DataList.Root>
            </Specimen>
            <Specimen data-brick-appearance="light" label="light">
              <ProfileFacts />
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <ProfileFacts />
            </Specimen>
          </Grid.Root>
          <EvidenceSurface
            className="playground-customization-evidence"
            inset="none"
          >
            <Grid.Root
              className="playground-customization-layout"
              columns={2}
              gap="0"
            >
              <VStack gap="2">
                <SpecimenLabel>customized</SpecimenLabel>
                <Text as="h3" variant="title-sm">
                  Data List CSS properties
                </Text>
                <Text tone="secondary" variant="body-sm">
                  Row spacing and divider color change without changing native
                  dl, dt, and dd output.
                </Text>
                <PlaygroundCodeBlock>{`--brick-data-list-gap: var(--brick-space-6);\n--brick-data-list-divider-color: var(--brick-color-accent-border);`}</PlaygroundCodeBlock>
              </VStack>
              <VStack className="playground-customization-preview">
                <ProfileFacts divide style={customStyle} />
              </VStack>
            </Grid.Root>
          </EvidenceSurface>
        </VStack>
      </Scenario>
    </VStack>
  );
}
