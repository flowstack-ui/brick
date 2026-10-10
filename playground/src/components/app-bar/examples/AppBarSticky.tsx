import {
  AppBar,
  For,
  Frame,
  Paragraph,
  ScrollArea,
  Text,
  VStack,
} from "@flowstack-ui/brick";
export function AppBarSticky() {
  return (
    <Frame blockSize="16rem" asChild>
      <ScrollArea.Root>
        <ScrollArea.Viewport focusable aria-label="Sticky header example">
          <ScrollArea.Content>
            <AppBar.Root position="sticky" offset={2} elevation="low">
              <AppBar.Toolbar density="compact">
                <AppBar.Start>
                  <Text>Sticky header</Text>
                </AppBar.Start>
              </AppBar.Toolbar>
            </AppBar.Root>
            <VStack gap={6}>
              <For each={Array.from({ length: 8 }, (_, i) => i)}>
                {(i) => (
                  <Paragraph key={i}>
                    Project update {i + 1}. Scroll this region to keep its
                    header available.
                  </Paragraph>
                )}
              </For>
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </Frame>
  );
}
