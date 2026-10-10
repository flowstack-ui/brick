import {
  Button,
  For,
  Frame,
  HStack,
  Paragraph,
  ScrollArea,
  Text,
  useScrollArea,
  VStack,
} from "@flowstack-ui/brick";

export function ScrollAreaControllerExample() {
  const scroll = useScrollArea();
  return (
    <VStack gap="4">
      <HStack wrap="wrap" gap="3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => scroll.scrollToEdge({ edge: "top" })}
        >
          Top
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            scroll.scrollToEdge({
              edge: "bottom",
              duration: 500,
              easing: (t) => 1 - (1 - t) ** 3,
            })
          }
        >
          Bottom
        </Button>
        <Text tone="secondary">
          {Math.round(scroll.getScrollProgress().y * 100)}% read
        </Text>
      </HStack>
      <Frame blockSize="16rem" asChild>
        <ScrollArea.RootProvider
          value={scroll}
          scrollbar="custom"
          scrollShadow="vertical"
        >
          <ScrollArea.Viewport focusable aria-label="Scrollable article">
            <ScrollArea.Content>
              <VStack gap="4">
                <For each={Array.from({ length: 24 }, (_, i) => i + 1)}>
                  {(id) => (
                    <Paragraph key={id}>
                      Section {id}. Native scrolling remains available while the
                      controller provides optional programmatic navigation.
                    </Paragraph>
                  )}
                </For>
              </VStack>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar />
        </ScrollArea.RootProvider>
      </Frame>
    </VStack>
  );
}
