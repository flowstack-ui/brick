import { HStack, VStack, Surface, Text, Frame, For } from "@flowstack-ui/brick";

export function StackAlign() {
  return (
    <VStack gap={5}>
      <For each={["start", "center", "end", "stretch", "baseline"] as const}>
        {(align) => (
          <VStack key={align} gap={2}>
            <Text>{align}</Text>
            <Frame minBlockSize="5rem" asChild>
              <HStack align={align} gap={3}>
                <Surface inset="sm" level="subtle">
                  <Text variant="body-xl">Large</Text>
                </Surface>
                <Surface inset="sm" level="subtle">
                  <Text>Small</Text>
                  <Text>Second line</Text>
                </Surface>
              </HStack>
            </Frame>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
