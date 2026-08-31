import type { CSSProperties } from "react";
import { Grid, Highlight, Text, VStack } from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const highlightScenarios = [
  {
    id: "highlight.overview",
    number: 1,
    title: "Overview",
    description:
      "Exact Atom matching becomes finished, selectable semantic relevance inside Brick typography.",
  },
  {
    id: "highlight.recipes",
    number: 2,
    title: "Matching and recipes",
    navigationTitle: "Recipes",
    description:
      "Literal multi-query matching and closed appearance recipes remain separate responsibilities.",
  },
  {
    id: "highlight.adaptation",
    number: 3,
    title: "Adaptation and exact output",
    navigationTitle: "Adaptation",
    description:
      "Unicode boundaries, source order, narrow wrapping, and writing direction remain deterministic.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function HighlightPage() {
  return (
    <VStack data-component-page="highlight" gap="6">
      <Scenario {...highlightScenarios[0]}>
        <Specimen
          data-testid="highlight-overview"
          inset="lg"
          label="literal query match"
        >
          <Text as="p">
            <Highlight
              query="durable"
              text="Build durable interfaces with exact package guidance."
            />
          </Text>
        </Specimen>
      </Scenario>
      <Scenario {...highlightScenarios[1]}>
        <VStack data-testid="highlight-recipes" gap="4">
          <Specimen label="subtle accent + multiple queries">
            <Text as="p">
              <Highlight
                query={["system", "design system"]}
                text="A design system makes system decisions repeatable."
              />
            </Text>
          </Specimen>
          <Specimen label="solid accent">
            <Text as="p">
              <Highlight
                query="release"
                text="Release guidance should match the release."
                variant="solid"
              />
            </Text>
          </Specimen>
          <Specimen label="underline accent">
            <Text as="p">
              <Highlight
                query="literal.*query"
                text="A literal.*query is never executable syntax."
                variant="underline"
              />
            </Text>
          </Specimen>
          <Specimen label="subtle neutral">
            <Text as="p">
              <Highlight
                query="neutral"
                text="Neutral matching remains visually distinct."
                tone="neutral"
              />
            </Text>
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...highlightScenarios[2]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light">
              <Highlight query="match" text="A light match." />
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Highlight query="match" text="A dark match." />
            </Specimen>
          </Grid.Root>
          <Specimen
            data-testid="highlight-adaptation"
            inset="lg"
            label="exact, case-sensitive, first match + RTL"
          >
            <Text as="p">
              <Highlight
                className="consumer-highlight"
                data-owner="playground"
                exactMatch
                ignoreCase={false}
                matchAll={false}
                query="Flow"
                text="flow Flow Flowstack"
              />
            </Text>
            <Text as="p" dir="rtl" lang="ar">
              <Highlight
                exactMatch
                query="النظام"
                text="يبقى النظام الجيد واضحًا عبر الشاشات والسياقات المختلفة."
                variant="underline"
              />
            </Text>
          </Specimen>
          <CustomizationEvidence
            code={`--brick-highlight-background: var(--brick-color-warning-soft);\n--brick-highlight-radius: var(--brick-radius-full);`}
            description="The live result uses the same background and radius shown in code."
            title="Highlight CSS properties"
          >
            <Text>
              <Highlight
                query="custom"
                style={
                  {
                    "--brick-highlight-background":
                      "var(--brick-color-warning-soft)",
                    "--brick-highlight-radius": "var(--brick-radius-full)",
                  } as CSSProperties
                }
                text="A custom literal match."
              />
            </Text>
          </CustomizationEvidence>
        </VStack>
      </Scenario>
    </VStack>
  );
}
