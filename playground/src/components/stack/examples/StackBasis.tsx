import { HStack, VStack, Stack, Surface, Text, For } from "@flowstack-ui/brick";

export function StackBasis() {
  return (
    <VStack gap={4}>
      <For
        each={
          [
            "auto",
            "content",
            "35%",
            "8rem",
            "min-content",
            "max-content",
            120,
          ] as const
        }
      >
        {(basis) => (
          <HStack key={basis} gap={3} wrap>
            <Stack.Item basis={basis}>
              <Surface inset="sm" level="subtle">
                <Text>{String(basis)}</Text>
              </Surface>
            </Stack.Item>
            <Stack.Item grow={1}>
              <Text>Remaining space</Text>
            </Stack.Item>
          </HStack>
        )}
      </For>
    </VStack>
  );
}
