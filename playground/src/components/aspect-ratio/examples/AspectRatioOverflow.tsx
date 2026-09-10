import { AspectRatio, Center, For, Frame, Grid, Surface, Text, VStack } from "@flowstack-ui/brick";

export function AspectRatioOverflow() {
  return <Grid.Root columns={{ initial: 1, sm: 2 }} gap={10}>
    <For each={["hidden", "visible"] as const}>{overflow =>
      <VStack key={overflow} gap={10} endSpacing={6}>
        <Text variant="body-sm" tone="secondary">{overflow}</Text>
        <AspectRatio.Root ratio={2} overflow={overflow} variant="outline">
          <Center><Frame inlineSize="110%" blockSize="120%" asChild>
            <Surface asChild level="subtle" inset="sm"><Center><Text>Oversized content</Text></Center></Surface>
          </Frame></Center>
        </AspectRatio.Root>
      </VStack>
    }</For>
  </Grid.Root>;
}
