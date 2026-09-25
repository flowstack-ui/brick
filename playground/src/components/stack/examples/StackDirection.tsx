import { VStack, Stack, Surface, Text, For } from "@flowstack-ui/brick";

export function StackDirection() {
  return (
    <VStack gap={5}>
      <For each={["row", "row-reverse", "column", "column-reverse"] as const}>
        {(direction) => (
          <VStack key={direction} gap={2}>
            <Text>{direction}</Text>
            <Stack direction={direction} justify="flex-start" gap={2}>
              <For each={["One", "Two", "Three"]}>
                {(label) => (
                  <Surface key={label} level="subtle" inset="sm">
                    <Text>{label}</Text>
                  </Surface>
                )}
              </For>
            </Stack>
          </VStack>
        )}
      </For>
      <Stack direction={{ initial: "column", md: "row" }} gap={3}>
        <Text>Column on narrow screens</Text>
        <Text>Row from md</Text>
      </Stack>
    </VStack>
  );
}
