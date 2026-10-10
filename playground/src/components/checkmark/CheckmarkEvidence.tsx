import { useState } from "react";
import {
  Button,
  Checkmark,
  For,
  HStack,
  Text,
  VStack,
} from "../../../../src/index.js";
import { Scenario } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const checkmarkScenarios = [
  {
    id: "checkmark.recipes",
    number: 1,
    title: "States and recipes",
    description:
      "Passive state marks keep square geometry across recipes and sizes.",
  },
  {
    id: "checkmark.sizes",
    number: 2,
    title: "Sizes",
    description: "The same checked state at each size.",
  },
  {
    id: "checkmark.variants",
    number: 3,
    title: "Variants",
    description: "Unchecked, checked and mixed states for each recipe.",
  },
  {
    id: "checkmark.tones",
    number: 4,
    title: "Semantic tones",
    description: "Consistent geometry across semantic colors.",
  },
  {
    id: "checkmark.controlled",
    number: 5,
    title: "Parent-driven state",
    description:
      "The button owns interaction; the mark only depicts its state.",
  },
] as const;

export function CheckmarkEvidence() {
  const [checked, setChecked] = useState(false);
  return (
    <VStack data-component-page="checkmark" gap="6">
      <Scenario {...checkmarkScenarios[0]}>
        <Specimen label="Checked, mixed, and disabled">
          <HStack data-testid="checkmark-output" gap="4">
            <Checkmark checked />
            <Checkmark indeterminate variant="outline" />
            <Checkmark checked variant="soft" tone="success" size="sm" />
            <Checkmark disabled />
          </HStack>
        </Specimen>
      </Scenario>
      <Scenario {...checkmarkScenarios[1]}>
        <HStack gap="4" wrap>
          <For each={["xs", "sm", "md", "lg"] as const}>
            {(size) => (
              <Specimen key={size} label={size}>
                <Checkmark size={size} checked />
              </Specimen>
            )}
          </For>
        </HStack>
      </Scenario>
      <Scenario {...checkmarkScenarios[2]}>
        <VStack gap="4">
          <For
            each={["solid", "outline", "soft", "plain", "inverted"] as const}
          >
            {(variant) => (
              <Specimen key={variant} label={variant}>
                <HStack gap="6" wrap>
                  <VStack gap="2" align="start">
                    <Checkmark variant={variant} />
                    <Text variant="body-sm">Unchecked</Text>
                  </VStack>
                  <VStack gap="2" align="start">
                    <Checkmark variant={variant} checked />
                    <Text variant="body-sm">Checked</Text>
                  </VStack>
                  <VStack gap="2" align="start">
                    <Checkmark variant={variant} indeterminate />
                    <Text variant="body-sm">Mixed</Text>
                  </VStack>
                  <VStack gap="2" align="start">
                    <Checkmark variant={variant} checked disabled />
                    <Text variant="body-sm">Disabled</Text>
                  </VStack>
                </HStack>
              </Specimen>
            )}
          </For>
          <Specimen label="Filled unchecked">
            <Checkmark filled />
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...checkmarkScenarios[3]}>
        <HStack gap="4" wrap>
          <For
            each={
              [
                "accent",
                "neutral",
                "info",
                "success",
                "warning",
                "danger",
              ] as const
            }
          >
            {(tone) => (
              <Specimen key={tone} label={tone}>
                <Checkmark tone={tone} checked />
              </Specimen>
            )}
          </For>
        </HStack>
      </Scenario>
      <Scenario {...checkmarkScenarios[4]}>
        <Specimen label="Toggle button">
          <Button
            variant="outline"
            tone="neutral"
            aria-pressed={checked}
            onClick={() => setChecked(!checked)}
          >
            <HStack as="span" gap={2}>
              <Checkmark checked={checked} size="sm" />
              Include archived files
            </HStack>
          </Button>
        </Specimen>
      </Scenario>
    </VStack>
  );
}
