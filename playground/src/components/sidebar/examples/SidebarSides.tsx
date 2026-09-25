import {
  For,
  Sidebar,
  Surface,
  Text,
  VStack,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";

export function SidebarSides() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <VStack gap="6">
            <For each={["ltr", "rtl"] as const}>
              {(dir) => (
                <Sidebar.Root key={dir} dir={dir} side="right" size="sm">
                  <Sidebar.Panel>
                    <Sidebar.Content>
                      <Text>{dir}: right panel</Text>
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
