import { For, Section, Surface, Text, VStack } from "@flowstack-ui/brick";

export function SectionRhythm() {
  return (
    <VStack gap="4">
      <For each={["none", "sm", "md", "lg", "xl", "2xl"] as const}>
        {(spacing) => (
          <Surface key={spacing} bordered level="transparent" asChild>
            <Section as="div" spacing={spacing}>
              <Text>{spacing}</Text>
            </Section>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
