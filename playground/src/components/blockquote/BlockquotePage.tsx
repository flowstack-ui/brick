import { Blockquote, Text, VStack } from "@flowstack-ui/brick";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";

export const blockquoteScenarios = [
  { id: "blockquote.overview", number: 1, title: "Overview", description: "A self-contained quotation keeps its source and attribution in the correct semantic structure." },
  { id: "blockquote.recipes", number: 2, title: "Variants and alignment", navigationTitle: "Recipes", description: "Three closed appearances and logical alignment cover ordinary editorial quotation needs." },
  { id: "blockquote.adaptation", number: 3, title: "Semantics and adaptation", navigationTitle: "Adaptation", description: "Native parts, long localized copy, and writing direction remain inspectable and resilient." },
] as const satisfies readonly ScenarioDefinition[];

export function BlockquotePage() {
  return (
    <VStack data-component-page="blockquote" gap="6">
      <Scenario {...blockquoteScenarios[0]}>
        <EvidenceSurface data-testid="blockquote-overview" inset="lg">
          <Blockquote.Root>
            <Blockquote.Icon />
            <Blockquote.Content cite="https://example.com/durable-systems">A system should make the correct decision easier to repeat.</Blockquote.Content>
            <Blockquote.Caption>Pat Lee, <Blockquote.Cite>Designing Durable Systems</Blockquote.Cite></Blockquote.Caption>
          </Blockquote.Root>
        </EvidenceSurface>
      </Scenario>
      <Scenario {...blockquoteScenarios[1]}>
        <VStack data-testid="blockquote-recipes" gap="4">
          <EvidenceSurface inset="lg"><Blockquote.Root variant="accent"><Blockquote.Content>Accent keeps a strong logical cue.</Blockquote.Content><Blockquote.Caption>— Mina Park</Blockquote.Caption></Blockquote.Root></EvidenceSurface>
          <EvidenceSurface inset="lg"><Blockquote.Root align="center" variant="surface"><Blockquote.Icon /><Blockquote.Content>Surface supports a more contained editorial moment.</Blockquote.Content><Blockquote.Caption>— Rowan Chen</Blockquote.Caption></Blockquote.Root></EvidenceSurface>
          <EvidenceSurface inset="lg"><Blockquote.Root align="end" variant="plain"><Blockquote.Content>Plain keeps the semantic structure with minimal paint.</Blockquote.Content><Blockquote.Caption>— Alex Morgan</Blockquote.Caption></Blockquote.Root></EvidenceSurface>
        </VStack>
      </Scenario>
      <Scenario {...blockquoteScenarios[2]}>
        <EvidenceSurface data-testid="blockquote-adaptation" inset="lg">
          <Blockquote.Root className="consumer-blockquote" data-owner="playground" dir="rtl" lang="ar">
            <Blockquote.Icon slot="quote-mark" />
            <Blockquote.Content cite="https://example.com/ar">النظام الجيد يجعل القرار الصحيح واضحًا وقابلًا للتكرار عبر سياقات وشاشات متعددة.</Blockquote.Content>
            <Blockquote.Caption>سلمى أحمد، <Blockquote.Cite>دليل الأنظمة</Blockquote.Cite></Blockquote.Caption>
          </Blockquote.Root>
          <Text as="p" tone="muted">Inspect the direct native children and the source URL in developer tools.</Text>
        </EvidenceSurface>
      </Scenario>
    </VStack>
  );
}
