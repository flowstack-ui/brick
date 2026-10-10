import { HStack, Stack, Surface, Text, For } from "@flowstack-ui/brick";

export function StackBasic() {
  return (
    <HStack gap={3}>
      <For each={["Design", "Build", "Ship"]}>
        {(label) => (
          <Stack.Item key={label} flex={1}>
            <Surface level="subtle" inset="sm">
              <Text align="center">{label}</Text>
            </Surface>
          </Stack.Item>
        )}
      </For>
    </HStack>
  );
}
