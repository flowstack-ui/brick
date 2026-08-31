import type { CSSProperties } from "react";
import { Grid, Kbd, Text, VStack } from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const kbdScenarios = [
  {
    id: "kbd.overview",
    number: 1,
    title: "Overview",
    description:
      "Native keyboard-input notation stays compact inside meaningful copy.",
  },
  {
    id: "kbd.recipes",
    number: 2,
    title: "Variants and sizes",
    navigationTitle: "Recipes",
    description:
      "Four closed appearances and three sizes cover ordinary key notation without becoming controls.",
  },
  {
    id: "kbd.sequence",
    number: 3,
    title: "Sequences and native output",
    navigationTitle: "Sequences",
    description:
      "Each key keeps its own native host while authored separators and wrapping remain visible and selectable.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function KbdPage() {
  return (
    <VStack data-component-page="kbd" gap="6">
      <Scenario {...kbdScenarios[0]}>
        <Specimen
          data-testid="kbd-overview"
          inset="lg"
          label="keyboard input notation"
        >
          <Text as="p">
            Press <Kbd>F12</Kbd> to open developer tools.
          </Text>
        </Specimen>
      </Scenario>
      <Scenario {...kbdScenarios[1]}>
        <VStack data-testid="kbd-recipes" gap="4">
          <Specimen label="raised">
            <Text as="p">
              Press <Kbd>Enter</Kbd>
            </Text>
          </Specimen>
          <Specimen label="outline">
            <Text as="p">
              Press <Kbd variant="outline">Enter</Kbd>
            </Text>
          </Specimen>
          <Specimen label="subtle">
            <Text as="p">
              Press <Kbd variant="subtle">Enter</Kbd>
            </Text>
          </Specimen>
          <Specimen label="plain">
            <Text as="p">
              Press <Kbd variant="plain">Enter</Kbd>
            </Text>
          </Specimen>
          <Specimen label="sm · md · lg">
            <Text as="p">
              <Kbd size="sm">Esc</Kbd> <Kbd>Tab</Kbd> <Kbd size="lg">Enter</Kbd>
            </Text>
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...kbdScenarios[2]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light">
              <Text>
                Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
              </Text>
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Text>
                Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
              </Text>
            </Specimen>
          </Grid.Root>
          <Specimen
            data-testid="kbd-sequence"
            inset="lg"
            label="separate native keys + RTL wrapping"
          >
            <Text as="p">
              Open commands with{" "}
              <Kbd
                aria-label="Control key"
                className="consumer-kbd"
                data-owner="playground"
                slot="key"
              >
                Ctrl
              </Kbd>{" "}
              + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>.
            </Text>
            <Text as="p" dir="rtl" lang="ar">
              اضغط <Kbd>Ctrl</Kbd> + <Kbd>P</Kbd> لفتح الأوامر.
            </Text>
          </Specimen>
          <CustomizationEvidence
            code={`--brick-kbd-background: var(--brick-color-accent-soft);\n--brick-kbd-radius: var(--brick-radius-full);`}
            description="The live key uses the same background and pill radius shown in code."
            title="Kbd CSS properties"
          >
            <Text>
              Press{" "}
              <Kbd
                style={
                  {
                    "--brick-kbd-background": "var(--brick-color-accent-soft)",
                    "--brick-kbd-radius": "var(--brick-radius-full)",
                  } as CSSProperties
                }
              >
                Enter
              </Kbd>
            </Text>
          </CustomizationEvidence>
        </VStack>
      </Scenario>
    </VStack>
  );
}
