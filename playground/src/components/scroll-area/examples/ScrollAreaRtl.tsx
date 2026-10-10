import {
  Button,
  For,
  Frame,
  HStack,
  ScrollArea,
  Text,
  useScrollArea,
  VStack,
} from "@flowstack-ui/brick";

export function ScrollAreaRtl() {
  const scroll = useScrollArea({ orientation: "horizontal" });
  return (
    <VStack gap="4">
      <HStack gap="3" wrap="wrap">
        <Button
          size="sm"
          variant="outline"
          onClick={() => scroll.scrollToEdge({ edge: "left" })}
        >
          Left edge
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scroll.scrollToEdge({ edge: "right" })}
        >
          Right edge
        </Button>
      </HStack>
      <Frame blockSize="8rem" asChild>
        <ScrollArea.RootProvider
          value={scroll}
          dir="rtl"
          scrollbar="custom"
          scrollbarVisibility="always"
        >
          <ScrollArea.Viewport focusable aria-label="RTL project timeline">
            <ScrollArea.Content>
              <Frame inlineSize="70rem">
                <HStack gap="6">
                  <For
                    each={[
                      "البحث",
                      "التصميم",
                      "التطوير",
                      "المراجعة",
                      "التسليم",
                    ]}
                  >
                    {(label) => <Text key={label}>{label}</Text>}
                  </For>
                </HStack>
              </Frame>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="horizontal" />
        </ScrollArea.RootProvider>
      </Frame>
    </VStack>
  );
}
