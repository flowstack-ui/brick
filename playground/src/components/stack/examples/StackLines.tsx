import { VStack, Stack, Surface, Text, Frame, For } from "@flowstack-ui/brick";

export function StackLines() {
  return (
    <VStack gap={5}>
      <For each={["start", "center", "space-between", "stretch"] as const}>
        {(alignContent) => (
          <VStack key={alignContent} gap={2}>
            <Text>{alignContent}</Text>
            <Frame blockSize="12rem" maxInlineSize="24rem" asChild>
              <Stack direction="row" wrap alignContent={alignContent} gap={2}>
                <For each={["Design", "Build", "Review"]}>
                  {(label) => (
                    <Stack.Item key={label} basis="45%" asChild>
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
