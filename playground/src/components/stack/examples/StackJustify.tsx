import { HStack, VStack, Surface, Text, For } from "@flowstack-ui/brick";

export function StackJustify() {
  return (
    <VStack gap={5}>
      <For each={["start", "center", "end", "between"] as const}>
        {(justify) => (
          <VStack key={justify} gap={2}>
            <Text>{justify}</Text>
            <HStack justify={justify} gap={2}>
              <Surface level="subtle" inset="sm">
                <Text>First</Text>
              </Surface>
              <Surface level="subtle" inset="sm">
                <Text>Last</Text>
              </Surface>
            </HStack>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
