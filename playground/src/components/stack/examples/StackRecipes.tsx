import { HStack, VStack, Stack, Surface, Text, For } from "@flowstack-ui/brick";

export function StackRecipes() {
  return (
    <VStack gap={5}>
      <For each={["content", "fixed", "auto", 2] as const}>
        {(flex) => (
          <HStack key={flex} gap={3}>
            <Stack.Item flex={flex}>
              <Surface level="subtle" inset="sm">
                <Text>{String(flex)}</Text>
              </Surface>
            </Stack.Item>
            <Stack.Item flex={1}>
              <Surface level="subtle" inset="sm">
                <Text>Peer: 1</Text>
              </Surface>
            </Stack.Item>
          </HStack>
        )}
      </For>
      <HStack gap={3}>
        <Stack.Item grow={1} shrink={1} basis={0}>
          <Surface level="subtle" inset="sm">
            <Text>Flexible</Text>
          </Surface>
        </Stack.Item>
        <Stack.Item shrink={0} basis="6rem">
          <Surface level="subtle" inset="sm">
            <Text>Fixed basis</Text>
          </Surface>
        </Stack.Item>
      </HStack>
    </VStack>
  );
}
