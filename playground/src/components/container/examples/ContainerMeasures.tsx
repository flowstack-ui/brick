import { Container, For, Surface, Text, VStack } from "@flowstack-ui/brick";

const measures = [
  { measure: "narrow", label: "narrow — 42rem" },
  { measure: "medium", label: "medium — 64rem" },
  { measure: "wide", label: "wide — 72rem" },
  { measure: "max", label: "max — 90rem" },
  { measure: "full", label: "full — no maximum" },
] as const;

export function ContainerMeasures() {
  return (
    <VStack gap="4">
      <For each={measures}>
        {({ measure, label }) => (
          <Container key={measure} measure={measure}>
            <Surface level="subtle" inset="md" radius="none">
              <Text>{label}</Text>
            </Surface>
          </Container>
        )}
      </For>
    </VStack>
  );
}
