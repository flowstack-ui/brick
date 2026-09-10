import { AspectRatio, For, Grid, Surface, Text, VStack } from "@flowstack-ui/brick";

export function AspectRatioContentLayout() {
  return <Grid.Root columns={{ initial: 1, sm: 2 }} gap={6}>
    <For each={["fill", "flow"] as const}>{contentLayout =>
      <VStack key={contentLayout} gap={3}>
        <Text variant="body-sm" tone="secondary">{contentLayout}</Text>
        <AspectRatio.Root ratio={1} contentLayout={contentLayout} variant="outline">
          <Surface level="subtle" inset="sm"><Text>The same short content.</Text></Surface>
        </AspectRatio.Root>
      </VStack>
    }</For>
  </Grid.Root>;
}
