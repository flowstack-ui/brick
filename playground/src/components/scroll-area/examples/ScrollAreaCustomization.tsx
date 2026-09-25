import type { CSSProperties } from "react";
import { For, Frame, Paragraph, ScrollArea, VStack } from "@flowstack-ui/brick";

export function ScrollAreaCustomization() {
  return (
    <Frame blockSize="12rem" asChild>
      <ScrollArea.Root
        scrollbar="custom"
        scrollbarVisibility="always"
        style={
          {
            "--brick-scroll-area-scrollbar-thumb":
              "var(--brick-color-accent-solid)",
            "--brick-scroll-area-scrollbar-track":
              "var(--brick-color-accent-soft)",
          } as CSSProperties
        }
      >
        <ScrollArea.Viewport focusable aria-label="Customized scrollbar">
          <ScrollArea.Content>
            <VStack gap="4">
              <For each={Array.from({ length: 10 }, (_, i) => i)}>
                {(id) => (
                  <Paragraph key={id}>
                    Public component tokens customize presentation without
                    replacing scrolling behavior.
                  </Paragraph>
                )}
              </For>
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
      </ScrollArea.Root>
    </Frame>
  );
}
