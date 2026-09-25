import { For, Frame, Paragraph, ScrollArea, VStack } from "@flowstack-ui/brick";

export function ScrollAreaNative() {
  return (
    <Frame blockSize="12rem" asChild>
      <ScrollArea.Root>
        <ScrollArea.Viewport focusable aria-label="Native scrolling">
          <VStack gap="4">
            <For each={Array.from({ length: 10 }, (_, i) => i)}>
              {(id) => (
                <Paragraph key={id}>
                  Native mode delegates the scrollbar appearance and interaction
                  to your browser.
                </Paragraph>
              )}
            </For>
          </VStack>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </Frame>
  );
}
