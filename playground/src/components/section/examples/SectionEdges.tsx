import { Section, Surface, Text } from "@flowstack-ui/brick";

export function SectionEdges() {
  return (
    <Surface bordered level="transparent" asChild>
      <Section as="div" startSpacing="none" endSpacing="sm">
        <Text>Only the end has spacing.</Text>
      </Section>
    </Surface>
  );
}
