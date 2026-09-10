import { AspectRatio, Center, For, Grid, Text } from "@flowstack-ui/brick";

export function AspectRatioRadius() {
  return <Grid.Root columns={{ initial: 1, sm: 4 }} gap={6}>
    <For each={["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "subtle", "control", "surface", "overlay", "full"] as const}>{radius =>
      <AspectRatio.Root key={radius} ratio={1} radius={radius} variant="subtle">
        <Center><Text>radius {radius}</Text></Center>
      </AspectRatio.Root>
    }</For>
  </Grid.Root>;
}
