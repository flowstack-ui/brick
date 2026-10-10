import { VStack, Stack, Surface, Text, Frame, For } from "@flowstack-ui/brick";

export function StackWrapping() {
  return (
    <VStack gap={5}>
      <For each={["nowrap", "wrap", "wrap-reverse"] as const}>
        {(wrap) => (
          <VStack key={wrap} gap={2}>
            <Text>{wrap}</Text>
            <Frame maxInlineSize="20rem" asChild>
              <Stack direction="row" wrap={wrap} gap={2}>
                <For each={["Design", "Build", "Review"]}>
                  {(label) => (
                    <Stack.Item key={label} basis="8rem">
                      <Surface inset="sm" level="subtle">
                        <Text>{label}</Text>
                      </Surface>
                    </Stack.Item>
                  )}
                </For>
              </Stack>
            </Frame>
          </VStack>
        )}
      </For>
    </VStack>
  );
}
