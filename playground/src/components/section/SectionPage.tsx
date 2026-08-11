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
        <Text as="h3" variant="title-sm">{title}</Text>
        <Text tone="secondary" variant="body-sm">
          Section owns block rhythm; Container owns inline measure.
        </Text>
      </VStack>
    </Container>
  );
}

export const sectionScenarios = [
  { id: "section.overview", number: 1, title: "Overview", description: "The default semantic root applies medium themeable block rhythm and no other layout or paint." },
  { id: "section.scale", number: 2, title: "Rhythm scale", description: "Identical content compares every closed page-region spacing recipe." },
  { id: "section.responsive", number: 3, title: "Responsive rhythm", description: "One mobile-first value changes at the documented Brick breakpoints." },
  { id: "section.edges", number: 4, title: "Independent edges", description: "Start and end overrides change only their named logical edge." },
  { id: "section.semantics", number: 5, title: "Semantic hosts", description: "Section preserves the authored native meaning without adding roles or wrappers." },
  { id: "section.composition", number: 6, title: "Surface and Container", description: "Paint can cover the complete Section host or remain contained inside its rhythm." },
  { id: "section.customization", number: 7, title: "Theme and escape hatch", description: "Named theme variables remain primary while one resolved edge can accept a scoped advanced override." },
  { id: "section.stress", number: 8, title: "Responsive and logical stress", description: "Narrow, RTL, vertical-writing, long-content, focus, and appearance evidence stays in flow." },
] as const satisfies readonly ScenarioDefinition[];

export function SectionPage() {
  return (
    <VStack className="section-page" data-component-page="section" gap="6">
      <Scenario {...sectionScenarios[0]}>
        <div className="section-stage">
          <Section data-testid="section-default"><SectionContent /></Section>
        </div>
      </Scenario>

      <Scenario {...sectionScenarios[1]}>
        <VStack data-testid="section-scale" gap="4">
          {spacing.map((value) => (
            <VStack className="section-boundary" gap="2" key={value}>
              <SpecimenLabel>{value}</SpecimenLabel>
              <Section spacing={value}><SectionContent title={`${value} rhythm`} /></Section>
            </VStack>
          ))}
        </VStack>
      </Scenario>

      <Scenario {...sectionScenarios[2]}>
        <div className="section-boundary" data-testid="section-responsive">
          <Section spacing={{ initial: "sm", md: "lg", xl: "2xl" }}>
            <SectionContent title="Responsive section" />
          </Section>
        </div>
      </Scenario>

      <Scenario {...sectionScenarios[3]}>
        <Grid.Root data-testid="section-edges" gap="4" minItemSize="md">
          <div className="section-boundary"><Section endSpacing="none" spacing="lg"><SectionContent title="No end spacing" /></Section></div>
          <div className="section-boundary"><Section spacing="lg" startSpacing="none"><SectionContent title="No start spacing" /></Section></div>
        </Grid.Root>
      </Scenario>

      <Scenario {...sectionScenarios[4]}>
        <Grid.Root data-testid="section-hosts" gap="3" minItemSize="sm">
          {hosts.map((as) => (
            <VStack className="section-boundary" gap="2" key={as}>
              <SpecimenLabel>{as}</SpecimenLabel>
              <Section as={as} spacing="sm"><SectionContent title={`${as} host`} /></Section>
            </VStack>
          ))}
        </Grid.Root>
      </Scenario>

      <Scenario {...sectionScenarios[5]}>
        <VStack data-testid="section-composition" gap="4">
          <Surface asChild level="subtle" radius="none">
            <Section spacing="lg"><SectionContent title="Full-width painted section" /></Section>
          </Surface>
          <Section spacing="lg">
            <Container gutter="sm" measure="medium">
              <Surface bordered inset="lg" level="raised">
                <Text as="h3" variant="title-sm">Contained painted panel</Text>
              </Surface>
            </Container>
          </Section>
        </VStack>
      </Scenario>

      <Scenario {...sectionScenarios[6]}>
        <div className="section-boundary" data-testid="section-customization">
          <Section spacing="md" style={customStyle}><SectionContent title="Custom start edge" /></Section>
        </div>
      </Scenario>

      <Scenario {...sectionScenarios[7]}>
        <Grid.Root className="section-stress-grid" columns={2} data-testid="section-stress" gap="4">
          <div className="section-boundary" dir="rtl">
            <Section as="div" spacing="sm"><SectionContent title="مساحة منطقية متجاوبة" /></Section>
          </div>
          <div className="section-boundary section-vertical">
            <Section as="div" endSpacing="lg" spacing="sm"><Text>Logical block rhythm</Text></Section>
          </div>
        </Grid.Root>
      </Scenario>
    </VStack>
  );
}
