import {
  For,
  Frame,
  Grid,
  Paragraph,
  ScrollArea,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function ScrollAreaVisibility() {
  return (
    <Grid.Root columns={{ initial: 1, md: 3 }} gap="6">
      <For each={["auto", "always", "interaction"] as const}>
        {(visibility) => (
          <VStack key={visibility} gap="3">
            <Text>{visibility}</Text>
            <Frame blockSize="10rem" asChild>
              <ScrollArea.Root
                scrollbar="custom"
                scrollbarVisibility={visibility}
              >
                <ScrollArea.Viewport
                  focusable
                  aria-label={`${visibility} scrolling`}
                >
                  <ScrollArea.Content>
                    <VStack gap="4">
                      <For each={Array.from({ length: 8 }, (_, i) => i)}>
                        {(id) => (
                          <Paragraph key={id}>
                            Hover, focus or scroll this region to reveal its
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
