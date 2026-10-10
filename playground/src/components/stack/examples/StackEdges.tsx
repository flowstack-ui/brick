import { VStack, Stack, Surface, Text, For } from "@flowstack-ui/brick";

export function StackEdges() {
  return (
    <VStack gap={4}>
      <For each={["ltr", "rtl"] as const}>
        {(dir) => (
          <Surface key={dir} bordered level="canvas">
            <Stack
              dir={dir}
              direction="row-reverse"
              justify="flex-start"
              startSpacing={8}
              endSpacing={2}
            >
              <Text>{dir}: row-reverse</Text>
            </Stack>
          </Surface>
        )}
      </For>
    </VStack>
  );
}
