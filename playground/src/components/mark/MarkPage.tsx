import { Heading, Mark, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const markScenarios = [
  {
    id: "mark.overview",
    number: 1,
    title: "Overview",
    description: "Static relevance stays native and readable inside a complete sentence.",
  },
  {
    id: "mark.recipes",
    number: 2,
    title: "Variants and tones",
    navigationTitle: "Recipes",
    description: "Closed visual recipes change emphasis without changing Mark ownership or semantics.",
  },
  {
    id: "mark.native",
    number: 3,
    title: "Native output and wrapping",
    navigationTitle: "Native",
    description: "Native attributes, public hooks, selection, copy, localization, and wrapping remain on one mark host.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function MarkPage() {
  return (
    <VStack data-component-page="mark" gap="6">
      <Scenario {...markScenarios[0]}>
        <EvidenceSurface data-testid="mark-overview" inset="lg">
          <Text as="p">Deploy during the <Mark>approved window</Mark>.</Text>
        </EvidenceSurface>
      </Scenario>
      <Scenario {...markScenarios[1]}>
        <VStack data-testid="mark-recipes" gap="4">
          <EvidenceSurface inset="lg"><Text as="p">Subtle accent <Mark>relevance</Mark> inside body copy.</Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p">Solid accent <Mark variant="solid">relevance</Mark> inside body copy.</Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p">Subtle neutral <Mark tone="neutral">relevance</Mark> inside body copy.</Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p">Solid neutral <Mark tone="neutral" variant="solid">relevance</Mark> inside body copy.</Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Heading level={3} variant="title-md">Plain semantic <Mark variant="plain">relevance</Mark></Heading></EvidenceSurface>
        </VStack>
      </Scenario>
      <Scenario {...markScenarios[2]}>
        <EvidenceSurface data-testid="mark-native" inset="lg">
          <Text as="p">Select and copy <Mark aria-label="native marked phrase" className="consumer-mark" data-owner="playground" slot="result">a deliberately long marked phrase that wraps naturally with the surrounding localized sentence</Mark> before publishing.</Text>
          <Text as="p" dir="rtl" lang="ar">انشر خلال <Mark>الفترة المعتمدة</Mark> فقط.</Text>
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
