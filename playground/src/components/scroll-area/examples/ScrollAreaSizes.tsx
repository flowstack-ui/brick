import {
  For,
  Frame,
  Grid,
  Paragraph,
  ScrollArea,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function ScrollAreaSizes() {
  return (
    <Grid.Root columns={{ initial: 1, sm: 2 }} gap="6">
      <For each={["xs", "sm", "md", "lg"] as const}>
        {(size) => (
          <VStack key={size} gap="3">
            <Text>{size}</Text>
            <Frame blockSize="10rem" asChild>
              <ScrollArea.Root
                scrollbar="custom"
                scrollbarVisibility="always"
                size={size}
              >
                <ScrollArea.Viewport
                  focusable
                  aria-label={`${size} release notes`}
                >
                  <ScrollArea.Content>
                    <VStack gap="4">
                      <For each={Array.from({ length: 10 }, (_, i) => i)}>
                        {(id) => (
                          <Paragraph key={id}>
                            Build accessible interfaces with consistent
                            components and predictable behavior.
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
