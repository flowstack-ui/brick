import {
  For,
  Frame,
  ScrollArea,
  Sidebar,
  Surface,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function SidebarScrolling() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <Sidebar.Root size="sm">
            <Sidebar.Panel>
              <Sidebar.Header>
                <Text>Destinations</Text>
              </Sidebar.Header>
              <Sidebar.Content>
                <Frame blockSize="12rem" asChild>
                  <ScrollArea.Root>
                    <ScrollArea.Viewport focusable aria-label="Destinations">
                      <VStack gap="3">
                        <For
                          each={Array.from(
                            { length: 20 },
                            (_, index) => index + 1,
                          )}
                        >
                          {(number) => (
                            <Text key={number}>Destination {number}</Text>
                          )}
                        </For>
                      </VStack>
                    </ScrollArea.Viewport>
                  </ScrollArea.Root>
                </Frame>
              </Sidebar.Content>
            </Sidebar.Panel>
            <Sidebar.Main asChild>
              <Surface level="transparent" inset="sm">
                <Text>Main remains stationary.</Text>
              </Surface>
            </Sidebar.Main>
          </Sidebar.Root>
        </Frame>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
