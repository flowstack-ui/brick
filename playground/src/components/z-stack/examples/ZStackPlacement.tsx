import { Badge, For, Frame, Grid, Surface, ZStack } from "@flowstack-ui/brick";
const positions = ["start", "center", "end"] as const;
export function ZStackPlacement() {
  return (
    <Grid.Root columns={{ initial: 1, sm: 3 }} gap="3">
      <For each={positions}>
        {(align) => (
          <For key={align} each={positions}>
            {(justify) => (
              <Frame key={justify} blockSize="6rem" asChild>
                <ZStack.Root align={align} justify={justify} asChild>
                  <Surface level="subtle" inset="sm">
                    <Badge>
                      {align} / {justify}
                    </Badge>
                  </Surface>
                </ZStack.Root>
              </Frame>
            )}
          </For>
        )}
      </For>
    </Grid.Root>
  );
}
