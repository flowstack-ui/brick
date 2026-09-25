import { For, Frame, Paragraph, ScrollArea, VStack } from "@flowstack-ui/brick";

export function ScrollAreaBasic() {
  return (
    <Frame blockSize="16rem" maxInlineSize="32rem" asChild>
      <ScrollArea.Root scrollbar="custom">
        <ScrollArea.Viewport focusable aria-label="Release notes">
          <ScrollArea.Content>
            <VStack gap="4">
              <For each={Array.from({ length: 12 }, (_, i) => i + 1)}>
                {(version) => (
                  <Paragraph key={version}>
                    Release {version}: improved performance, accessibility and
                    component documentation.
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
