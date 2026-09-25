import { Section, Surface, Text } from "@flowstack-ui/brick";

export function SurfaceComposition() {
  return (
    <Surface level="subtle" asChild>
      <Section spacing="sm">
        <Text>Section rhythm on the same painted host.</Text>
      </Section>
    </Surface>
  );
}
