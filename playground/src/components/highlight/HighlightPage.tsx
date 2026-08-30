import { Highlight, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const highlightScenarios = [
  { id: "highlight.overview", number: 1, title: "Overview", description: "Exact Atom matching becomes finished, selectable semantic relevance inside Brick typography." },
  { id: "highlight.recipes", number: 2, title: "Matching and recipes", navigationTitle: "Recipes", description: "Literal multi-query matching and closed appearance recipes remain separate responsibilities." },
  { id: "highlight.adaptation", number: 3, title: "Adaptation and exact output", navigationTitle: "Adaptation", description: "Unicode boundaries, source order, narrow wrapping, and writing direction remain deterministic." },
] as const satisfies readonly ScenarioDefinition[];

export function HighlightPage() {
  return (
    <VStack data-component-page="highlight" gap="6">
      <Scenario {...highlightScenarios[0]}>
        <EvidenceSurface data-testid="highlight-overview" inset="lg">
          <Text as="p"><Highlight query="durable" text="Build durable interfaces with exact package guidance." /></Text>
        </EvidenceSurface>
      </Scenario>
      <Scenario {...highlightScenarios[1]}>
        <VStack data-testid="highlight-recipes" gap="4">
          <EvidenceSurface inset="lg"><Text as="p"><Highlight query={["system", "design system"]} text="A design system makes system decisions repeatable." /></Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p"><Highlight query="release" text="Release guidance should match the release." variant="solid" /></Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p"><Highlight query="literal.*query" text="A literal.*query is never executable syntax." variant="underline" /></Text></EvidenceSurface>
          <EvidenceSurface inset="lg"><Text as="p"><Highlight query="neutral" text="Neutral matching remains visually distinct." tone="neutral" /></Text></EvidenceSurface>
        </VStack>
      </Scenario>
      <Scenario {...highlightScenarios[2]}>
        <EvidenceSurface data-testid="highlight-adaptation" inset="lg">
          <Text as="p"><Highlight className="consumer-highlight" data-owner="playground" exactMatch ignoreCase={false} matchAll={false} query="Flow" text="flow Flow Flowstack" /></Text>
          <Text as="p" dir="rtl" lang="ar"><Highlight exactMatch query="النظام" text="يبقى النظام الجيد واضحًا عبر الشاشات والسياقات المختلفة." variant="underline" /></Text>
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
