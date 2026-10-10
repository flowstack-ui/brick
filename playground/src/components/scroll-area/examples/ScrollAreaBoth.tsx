import {
  For,
  Frame,
  Grid,
  ScrollArea,
  Surface,
  Text,
} from "@flowstack-ui/brick";

export function ScrollAreaBoth() {
  return (
    <Frame blockSize="16rem" asChild>
      <ScrollArea.Root
        orientation="both"
        scrollbar="custom"
        scrollbarVisibility="always"
      >
        <ScrollArea.Viewport focusable aria-label="Project board">
          <ScrollArea.Content>
            <Frame inlineSize="60rem">
              <Grid.Root columns={4} gap="4">
                <For each={Array.from({ length: 28 }, (_, i) => i + 1)}>
                  {(id) => (
                    <Surface key={id} inset="lg" level="subtle">
                      <Text>Project {id}</Text>
                    </Surface>
                  )}
                </For>
              </Grid.Root>
            </Frame>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
        <ScrollArea.Scrollbar orientation="horizontal" />
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </Frame>
  );
}
