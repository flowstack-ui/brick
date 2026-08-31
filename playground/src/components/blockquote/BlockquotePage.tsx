import type { CSSProperties } from "react";
import { Blockquote, Grid, Text, VStack } from "@flowstack-ui/brick";
import { CustomizationEvidence } from "../../shared/CustomizationEvidence.js";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { Specimen } from "../../shared/Specimen.js";

export const blockquoteScenarios = [
  {
    id: "blockquote.overview",
    number: 1,
    title: "Overview",
    description:
      "A self-contained quotation keeps its source and attribution in the correct semantic structure.",
  },
  {
    id: "blockquote.recipes",
    number: 2,
    title: "Variants and alignment",
    navigationTitle: "Recipes",
    description:
      "Three closed appearances and logical alignment cover ordinary editorial quotation needs.",
  },
  {
    id: "blockquote.adaptation",
    number: 3,
    title: "Semantics and adaptation",
    navigationTitle: "Adaptation",
    description:
      "Native parts, long localized copy, and writing direction remain inspectable and resilient.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function BlockquotePage() {
  return (
    <VStack data-component-page="blockquote" gap="6">
      <Scenario {...blockquoteScenarios[0]}>
        <Specimen
          data-testid="blockquote-overview"
          inset="lg"
          label="quote + attribution + cited work"
        >
          <Blockquote.Root>
            <Blockquote.Icon />
            <Blockquote.Content cite="https://example.com/durable-systems">
              A system should make the correct decision easier to repeat.
            </Blockquote.Content>
            <Blockquote.Caption>
              Pat Lee,{" "}
              <Blockquote.Cite>Designing Durable Systems</Blockquote.Cite>
            </Blockquote.Caption>
          </Blockquote.Root>
        </Specimen>
      </Scenario>
      <Scenario {...blockquoteScenarios[1]}>
        <VStack data-testid="blockquote-recipes" gap="4">
          <Specimen label="accent · start">
            <Blockquote.Root variant="accent">
              <Blockquote.Icon />
              <Blockquote.Content>
                Accent keeps a strong logical cue.
              </Blockquote.Content>
              <Blockquote.Caption>— Mina Park</Blockquote.Caption>
            </Blockquote.Root>
          </Specimen>
          <Specimen label="surface · center">
            <Blockquote.Root align="center" variant="surface">
              <Blockquote.Icon />
              <Blockquote.Content>
                Surface supports a more contained editorial moment.
              </Blockquote.Content>
              <Blockquote.Caption>— Rowan Chen</Blockquote.Caption>
            </Blockquote.Root>
          </Specimen>
          <Specimen label="plain · end">
            <Blockquote.Root align="end" variant="plain">
              <Blockquote.Icon />
              <Blockquote.Content>
                Plain keeps the semantic structure with minimal paint.
              </Blockquote.Content>
              <Blockquote.Caption>— Alex Morgan</Blockquote.Caption>
            </Blockquote.Root>
          </Specimen>
        </VStack>
      </Scenario>
      <Scenario {...blockquoteScenarios[2]}>
        <VStack gap="5">
          <Grid.Root columns={{ initial: 1, md: 2 }} gap="4">
            <Specimen data-brick-appearance="light" label="light">
              <Blockquote.Root variant="surface">
                <Blockquote.Icon />
                <Blockquote.Content>
                  Readable in light appearance.
                </Blockquote.Content>
              </Blockquote.Root>
            </Specimen>
            <Specimen data-brick-appearance="dark" label="dark">
              <Blockquote.Root variant="surface">
                <Blockquote.Icon />
                <Blockquote.Content>
                  Readable in dark appearance.
                </Blockquote.Content>
              </Blockquote.Root>
            </Specimen>
          </Grid.Root>
          <Specimen
            data-testid="blockquote-adaptation"
            dir="rtl"
            inset="lg"
            label="RTL native figure structure"
          >
            <Blockquote.Root
              className="consumer-blockquote"
              data-owner="playground"
              dir="rtl"
              lang="ar"
            >
              <Blockquote.Icon slot="quote-mark" />
              <Blockquote.Content cite="https://example.com/ar">
                النظام الجيد يجعل القرار الصحيح واضحًا وقابلًا للتكرار عبر
                سياقات وشاشات متعددة.
              </Blockquote.Content>
              <Blockquote.Caption>
                سلمى أحمد، <Blockquote.Cite>دليل الأنظمة</Blockquote.Cite>
              </Blockquote.Caption>
            </Blockquote.Root>
            <Text as="p" tone="muted">
              The single opening quote is decorative. The browser and assistive
              technology already know where the quotation ends.
            </Text>
          </Specimen>
          <CustomizationEvidence
            code={`--brick-blockquote-accent: var(--brick-color-success-border);\n--brick-blockquote-icon-size: 3rem;`}
            description="The live quotation uses the same logical accent and icon size shown in code."
            title="Blockquote CSS properties"
          >
            <Blockquote.Root
              style={
                {
                  "--brick-blockquote-accent":
                    "var(--brick-color-success-border)",
                  "--brick-blockquote-icon-size": "3rem",
                } as CSSProperties
              }
            >
              <Blockquote.Icon />
              <Blockquote.Content>
                Customization keeps the semantic figure structure intact.
              </Blockquote.Content>
              <Blockquote.Caption>— Release team</Blockquote.Caption>
            </Blockquote.Root>
          </CustomizationEvidence>
        </VStack>
      </Scenario>
    </VStack>
  );
}
