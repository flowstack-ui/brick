import {
  For,
  Sidebar,
  Surface,
  Text,
  VStack,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";

export function SidebarBorders() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <VStack gap="6">
            <For each={["transparent", "base", "raised"] as const}>
              {(surface) => (
                <Sidebar.Root
                  key={surface}
                  surface={surface}
                  bordered={false}
                  size="sm"
                >
                  <Sidebar.Panel>
                    <Sidebar.Header>
                      <Text>{surface}</Text>
                    </Sidebar.Header>
                    <Sidebar.Content>
                      <Text>Borderless</Text>
                    </Sidebar.Content>
                    <Sidebar.Footer>
                      <Text>Account</Text>
                    </Sidebar.Footer>
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
