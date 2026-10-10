import { useState } from "react";
import {
  Button,
  For,
  Frame,
  Paragraph,
  ScrollArea,
  VStack,
} from "@flowstack-ui/brick";

export function ScrollAreaDynamic() {
  const [expanded, setExpanded] = useState(false);
  return (
    <VStack gap="4">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Show less" : "Show more"}
      </Button>
      <Frame blockSize="12rem" asChild>
        <ScrollArea.Root scrollbar="custom" scrollbarVisibility="always">
          <ScrollArea.Viewport focusable aria-label="Dynamic content">
            <ScrollArea.Content>
              <VStack gap="4">
                <For
                  each={Array.from({ length: expanded ? 18 : 2 }, (_, i) => i)}
                >
                  {(id) => (
                    <Paragraph key={id}>
                      The thumb updates when content changes.
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
  );
}
