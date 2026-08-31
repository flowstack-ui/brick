import { type CSSProperties } from "react";
import {
  Container,
  Grid,
  Section,
  Surface,
  Text,
  VStack,
  type SectionElement,
  type SectionSpacing,
} from "@flowstack-ui/brick";
import { Scenario, type ScenarioDefinition } from "../../shared/Scenario.js";
import { EvidenceSurface } from "../../shared/EvidenceSurface.js";
import { PlaygroundCodeBlock } from "../../shared/PlaygroundCodeBlock.js";
import { Specimen } from "../../shared/Specimen.js";
import { SpecimenLabel } from "../../shared/SpecimenLabel.js";
import "./section.playground.css";

const spacing: SectionSpacing[] = ["none", "sm", "md", "lg", "xl", "2xl"];
const hosts: SectionElement[] = ["section", "div", "article", "aside"];
const customStyle = {
  "--brick-section-start-spacing": "clamp(4rem, 9vw, 8rem)",
} as CSSProperties;

function SectionContent({ title = "Measured region" }: { title?: string }) {
  return (
    <Container gutter="sm" measure="medium">
      <VStack gap="2">
        <Text as="h3" variant="title-sm">
          {title}
        </Text>
        <Text tone="secondary" variant="body-sm">
          Section owns block rhythm; Container owns inline measure.
        </Text>
      </VStack>
    </Container>
  );
}

export const sectionScenarios = [
  {
    id: "section.overview",
    number: 1,
    title: "Overview",
    description:
      "The default semantic root applies medium themeable block rhythm and no other layout or paint.",
  },
  {
    id: "section.scale",
    number: 2,
    title: "Rhythm scale",
    description:
      "Identical content compares every closed page-region spacing recipe.",
  },
  {
    id: "section.responsive",
    number: 3,
    title: "Responsive rhythm",
    description:
      "One mobile-first value changes at the documented Brick breakpoints.",
  },
  {
    id: "section.edges",
    number: 4,
    title: "Independent edges",
    description:
      "Start and end overrides change only their named logical edge.",
  },
  {
    id: "section.semantics",
    number: 5,
    title: "Semantic hosts",
    description:
      "Section preserves the authored native meaning without adding roles or wrappers.",
  },
  {
    id: "section.composition",
    number: 6,
    title: "Surface and Container",
    description:
      "Paint can cover the complete Section host or remain contained inside its rhythm.",
  },
  {
    id: "section.customization",
    number: 7,
    title: "Theme and escape hatch",
    description:
      "Named theme variables remain primary while one resolved edge can accept a scoped advanced override.",
  },
  {
    id: "section.stress",
    number: 8,
    title: "Responsive and logical stress",
    description:
      "Narrow, RTL, vertical-writing, long-content, focus, and appearance evidence stays in flow.",
  },
] as const satisfies readonly ScenarioDefinition[];

export function SectionPage() {
  return (
    <VStack className="section-page" data-component-page="section" gap="6">
      <Scenario {...sectionScenarios[0]}>
        <Specimen className="section-stage" label="default medium rhythm">
          <Section data-testid="section-default">
            <SectionContent />
          </Section>
        </Specimen>
      </Scenario>

      <Scenario {...sectionScenarios[1]}>
        <VStack data-testid="section-scale" gap="4">
          {spacing.map((value) => (
            <Specimen className="section-boundary" key={value} label={value}>
              <Section spacing={value}>
                <SectionContent title={`${value} rhythm`} />
              </Section>
            </Specimen>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...sectionScenarios[2]}>
        <Specimen
          className="section-boundary"
          data-testid="section-responsive"
          label="sm → lg → 2xl"
        >
          <Section spacing={{ initial: "sm", md: "lg", xl: "2xl" }}>
            <SectionContent title="Responsive section" />
          </Section>
        </Specimen>
      </Scenario>

      <Scenario {...sectionScenarios[3]}>
        <Grid.Root data-testid="section-edges" gap="4" minItemSize="md">
          <Specimen className="section-boundary" label="end: none">
            <Section endSpacing="none" spacing="lg">
              <SectionContent title="No end spacing" />
            </Section>
          </Specimen>
          <Specimen className="section-boundary" label="start: none">
            <Section spacing="lg" startSpacing="none">
              <SectionContent title="No start spacing" />
            </Section>
          </Specimen>
        </Grid.Root>
      </Scenario>

      <Scenario {...sectionScenarios[4]}>
        <Grid.Root data-testid="section-hosts" gap="3" minItemSize="sm">
          {hosts.map((as) => (
            <Specimen className="section-boundary" key={as} label={as}>
              <Section as={as} spacing="sm">
                <SectionContent title={`${as} host`} />
              </Section>
            </Specimen>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...sectionScenarios[5]}>
        <VStack data-testid="section-composition" gap="4">
          <SpecimenLabel>paint covers the Section host</SpecimenLabel>
          <Surface asChild level="subtle" radius="none">
            <Section spacing="lg">
              <SectionContent title="Full-width painted section" />
            </Section>
          </Surface>
          <SpecimenLabel>paint stays inside Section rhythm</SpecimenLabel>
          <Section spacing="lg">
            <Container gutter="sm" measure="medium">
              <Surface bordered inset="lg" level="raised">
                <Text as="h3" variant="title-sm">
                  Contained painted panel
                </Text>
              </Surface>
            </Container>
          </Section>
        </VStack>
      </Scenario>

      <Scenario {...sectionScenarios[6]}>
        <EvidenceSurface
          className="playground-customization-evidence"
          data-testid="section-customization"
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
                Section CSS property
              </Text>
              <Text tone="secondary" variant="body-sm">
                Only the logical start edge changes in the live region.
              </Text>
              <PlaygroundCodeBlock>{`--brick-section-start-spacing: clamp(4rem, 9vw, 8rem);`}</PlaygroundCodeBlock>
            </VStack>
            <VStack className="playground-customization-preview">
              <Section spacing="md" style={customStyle}>
                <SectionContent title="Custom start edge" />
              </Section>
            </VStack>
          </Grid.Root>
        </EvidenceSurface>
      </Scenario>

      <Scenario {...sectionScenarios[7]}>
        <Grid.Root
          className="section-stress-grid"
          columns={2}
          data-testid="section-stress"
          gap="4"
        >
          <Specimen className="section-boundary" dir="rtl" label="RTL">
            <Section as="div" spacing="sm">
              <SectionContent title="مساحة منطقية متجاوبة" />
            </Section>
          </Specimen>
          <Specimen
            className="section-boundary section-vertical"
            label="vertical writing"
          >
            <Section as="div" endSpacing="lg" spacing="sm">
              <Text>Logical block rhythm</Text>
            </Section>
          </Specimen>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
