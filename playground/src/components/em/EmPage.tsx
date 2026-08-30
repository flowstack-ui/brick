import { Em, Heading, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const emScenarios = [
  {
    id: "em.overview",
    number: 1,
    title: "Overview",
    description: "Native stress emphasis stays inside a complete sentence and inherits its surrounding visual recipe.",
  },
  {
    id: "em.context",
    number: 2,
    title: "Typography contexts",
    navigationTitle: "Contexts",
    description: "The same Em owner inherits body, heading, muted, and RTL contexts without introducing its own type scale.",
  },
  {
    id: "em.native",
    number: 3,
    title: "Native output and stress",
    navigationTitle: "Native",
    description: "Native attributes, public hooks, selection, and copy remain on the single em host.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function EmPage() {
  return (
    <VStack data-component-page="em" gap="6">
      <Scenario {...emScenarios[0]}>
        <EvidenceSurface data-testid="em-overview" inset="lg">
          <Text as="p">Review the migration <Em>before</Em> publishing.</Text>
        </EvidenceSurface>
      </Scenario>
      <Scenario {...emScenarios[1]}>
        <VStack data-testid="em-context" gap="4">
          <EvidenceSurface inset="lg"><Text as="p">This is <Em>especially</Em> important.</Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Heading level={3} variant="title-md">Read this <Em>first</Em></Heading></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p" tone="secondary">Keep the <Em>exact</Em> released version.</Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p" dir="rtl" lang="ar">راجع هذا <Em>قبل</Em> النشر.</Text></EvidenceSurface>
        </VStack>
      </Scenario>
      <Scenario {...emScenarios[2]}>
        <EvidenceSurface data-testid="em-native" inset="lg">
          <Text as="p">Select <Em aria-label="native emphasis" className="consumer-em" data-owner="playground" slot="stress">this emphasized phrase</Em> and copy it.</Text>
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
