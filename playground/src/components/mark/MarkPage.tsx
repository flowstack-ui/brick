import type { CSSProperties } from "react";
import { Grid, Heading, Mark, Text, VStack } from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const markScenarios = [
  {
    id: "mark.overview",
    number: 1,
    title: "Overview",
    description:
      "Static relevance stays native and readable inside a complete sentence.",
  },
  {
    id: "mark.recipes",
    number: 2,
    title: "Variants and tones",
    navigationTitle: "Recipes",
    description:
      "Closed visual recipes change emphasis without changing Mark ownership or semantics.",
  },
  {
    id: "mark.native",
    number: 3,
    title: "Native output and wrapping",
    navigationTitle: "Native",
    description:
      "Native attributes, public hooks, selection, copy, localization, and wrapping remain on one mark host.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function MarkPage() {
  return (
    <VStack data-component-page="mark" gap="6">
      <Scenario {...markScenarios[0]}>
        <Specimen
          data-testid="mark-overview"
          inset="lg"
          label="author-selected relevance"
        >
          <Text as="p">
            Deploy during the <Mark>approved window</Mark>.
          </Text>
        </Specimen>
      </Scenario>
      <Scenario {...markScenarios[1]}>
        <VStack data-testid="mark-recipes" gap="4">
          <Specimen label="subtle accent">
            <Text as="p">
              <Mark>Relevance</Mark> inside body copy.
            </Text>
          </Specimen>
          <Specimen label="solid accent">
            <Text as="p">
              <Mark variant="solid">Relevance</Mark> inside body copy.
            </Text>
          </Specimen>
          <Specimen label="subtle neutral">
            <Text as="p">
              <Mark tone="neutral">Relevance</Mark> inside body copy.
            </Text>
          </Specimen>
          <Specimen label="solid neutral">
            <Text as="p">
              <Mark tone="neutral" variant="solid">
                Relevance
              </Mark>{" "}
              inside body copy.
            </Text>
          </Specimen>
          <Specimen label="plain">
            <Heading level={3} variant="title-md">
              Semantic <Mark variant="plain">relevance</Mark>
            </Heading>
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...markScenarios[2]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light">
              <Text>
                Approved <Mark>window</Mark>.
              </Text>
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Text>
                Approved <Mark>window</Mark>.
              </Text>
            </Specimen>
          </Grid.Root>
          <Specimen
            data-testid="mark-native"
            inset="lg"
            label="native mark host + long RTL wrapping"
          >
            <Text as="p">
              Select and copy{" "}
              <Mark
                aria-label="native marked phrase"
                className="consumer-mark"
                data-owner="playground"
                slot="result"
              >
                a deliberately long marked phrase that wraps naturally with the
                surrounding localized sentence
              </Mark>{" "}
              before publishing.
            </Text>
            <Text as="p" dir="rtl" lang="ar">
              انشر خلال <Mark>الفترة المعتمدة</Mark> فقط.
            </Text>
          </Specimen>
          <CustomizationEvidence
            code={`--brick-mark-background: var(--brick-color-success-soft);\n--brick-mark-radius: var(--brick-radius-full);`}
            description="The live static mark uses the same success background and radius shown in code."
            title="Mark CSS properties"
          >
            <Text>
              Deploy in the{" "}
              <Mark
                style={
                  {
                    "--brick-mark-background":
                      "var(--brick-color-success-soft)",
                    "--brick-mark-radius": "var(--brick-radius-full)",
                  } as CSSProperties
                }
              >
                approved window
              </Mark>
              .
            </Text>
          </CustomizationEvidence>
        </VStack>
      </Scenario>
    </VStack>
  );
}
