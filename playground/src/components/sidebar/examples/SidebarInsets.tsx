import { Sidebar, Surface, Text, Frame, ScrollArea } from "@flowstack-ui/brick";

export function SidebarInsets() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <Sidebar.Root size="sm">
            <Sidebar.Panel>
              <Sidebar.Header>
                <Text>Default header</Text>
              </Sidebar.Header>
              <Sidebar.Content inset="none">
                <Surface level="transparent" inset="sm">
                  <Text>Surface owns this inset</Text>
                </Surface>
              </Sidebar.Content>
            </Sidebar.Panel>
            <Sidebar.Main asChild>
              <Surface level="transparent" inset="sm">
                <Text>Main</Text>
              </Surface>
            </Sidebar.Main>
          </Sidebar.Root>
        </Frame>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
