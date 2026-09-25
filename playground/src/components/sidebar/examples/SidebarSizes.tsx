import {
  For,
  Sidebar,
  Surface,
  Text,
  VStack,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";

export function SidebarSizes() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <VStack gap="6">
            <For each={["sm", "md", "lg"] as const}>
              {(size) => (
                <Sidebar.Root key={size} size={size}>
                  <Sidebar.Panel>
                    <Sidebar.Content>
                      <Text>{size}</Text>
                    </Sidebar.Content>
                  </Sidebar.Panel>
                  <Sidebar.Main asChild>
                    <Surface level="transparent" inset="sm">
                      <Text>Main</Text>
                    </Surface>
                  </Sidebar.Main>
                </Sidebar.Root>
              )}
            </For>
          </VStack>
        </Frame>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
