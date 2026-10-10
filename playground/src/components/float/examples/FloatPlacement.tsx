import {
  Badge,
  Float,
  For,
  Grid,
  Frame,
  Surface,
  Text,
  VStack,
  type FloatPlacement,
} from "@flowstack-ui/brick";
const placements: FloatPlacement[] = [
  "top-start",
  "top-center",
  "top-end",
  "middle-start",
  "middle-center",
  "middle-end",
  "bottom-start",
  "bottom-center",
  "bottom-end",
];
export function FloatPlacement() {
  return (
    <Grid.Root columns={{ initial: 1, sm: 2, lg: 3 }} gap={8}>
      <For each={placements}>
        {(placement) => (
          <VStack key={placement} gap={4}>
            <Text>{placement}</Text>
            <Float.Anchor asChild>
              <Surface level="subtle">
                <Frame blockSize="4rem" />
                <Float.Root placement={placement}>
                  <Badge tone="accent" variant="solid">
                    3
                  </Badge>
                </Float.Root>
              </Surface>
            </Float.Anchor>
          </VStack>
        )}
      </For>
    </Grid.Root>
  );
}
