import { AspectRatio, Center, For, Grid, Text } from "@flowstack-ui/brick";

export function AspectRatioVariants() {
  return <Grid.Root columns={{ initial: 1, sm: 3 }} gap={6}>
    <For each={["plain", "subtle", "outline"] as const}>{variant =>
      <AspectRatio.Root key={variant} ratio={1} variant={variant}>
        <Center><Text>{variant}</Text></Center>
      </AspectRatio.Root>
    }</For>
  </Grid.Root>;
}
