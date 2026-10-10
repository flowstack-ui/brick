import { For, Frame, Paragraph, ScrollArea, VStack } from "@flowstack-ui/brick";
const updates = Array.from({ length: 12 }, (_, index) => index + 1);
export function FrameScroll() {
  return (
    <Frame blockSize="12rem" asChild>
      <ScrollArea.Root>
        <ScrollArea.Viewport aria-label="Project updates" focusable>
          <VStack gap="4">
            <For each={updates}>
              {(number) => (
                <Paragraph key={number}>
                  Update {number}: reviewed layout, documentation and
                  accessibility.
                </Paragraph>
              )}
            </For>
          </VStack>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </Frame>
  );
}
