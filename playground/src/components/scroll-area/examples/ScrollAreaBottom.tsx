import { useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  For,
  Frame,
  HStack,
  Paragraph,
  ScrollArea,
  useScrollArea,
  VStack,
} from "@flowstack-ui/brick";

export function ScrollAreaBottom() {
  const scroll = useScrollArea();
  const [count, setCount] = useState(12);
  const follow = useRef(true);
  useLayoutEffect(() => {
    if (follow.current) scroll.scrollToEdge({ edge: "bottom" });
  }, [count, scroll]);
  return (
    <VStack gap="4">
      <HStack gap="3" wrap="wrap">
        <Button
          size="sm"
          onClick={() => {
            follow.current = scroll.isAtBottom;
            setCount((value) => value + 1);
          }}
        >
          Add message
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            follow.current = true;
            scroll.scrollToEdge({ edge: "bottom" });
          }}
        >
          Latest
        </Button>
      </HStack>
      <Frame blockSize="14rem" asChild>
        <ScrollArea.RootProvider value={scroll} scrollbar="custom">
          <ScrollArea.Viewport focusable aria-label="Conversation">
            <ScrollArea.Content>
              <VStack gap="4">
                <For each={Array.from({ length: count }, (_, i) => i + 1)}>
                  {(id) => (
                    <Paragraph key={id}>
                      Message {id}: the project review is ready.
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
