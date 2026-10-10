import {
  For,
  Frame,
  Grid,
  Paragraph,
  ScrollArea,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function ScrollAreaGutter() {
  return (
    <Grid.Root columns={{ initial: 1, sm: 2 }} gap="6">
      <For each={["auto", "stable"] as const}>
        {(gutter) => (
          <VStack key={gutter} gap="3">
            <Text>{gutter}</Text>
            <Frame blockSize="10rem" asChild>
              <ScrollArea.Root
                scrollbar="custom"
                scrollbarGutter={gutter}
                scrollbarVisibility="always"
              >
                <ScrollArea.Viewport focusable aria-label={`${gutter} gutter`}>
                  <ScrollArea.Content>
                    <VStack gap="4">
                      <For each={Array.from({ length: 8 }, (_, i) => i)}>
                        {(id) => (
                          <Paragraph key={id}>
                            Stable gutter reserves room beside the text for the
                            scrollbar.
                          </Paragraph>
                        )}
                      </For>
                    </VStack>
                  </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar />
              </ScrollArea.Root>
            </Frame>
          </VStack>
        )}
      </For>
    </Grid.Root>
  );
}
