import {
  IconButton,
  Sidebar,
  Surface,
  Text,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";
import { PanelLeft } from "lucide-react";

export function SidebarFloating() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <Sidebar.Root variant="floating" size="sm">
            <Sidebar.Panel>
              <Sidebar.Content>
                <Text>Floating panel</Text>
              </Sidebar.Content>
            </Sidebar.Panel>
            <Sidebar.Main asChild>
              <Surface level="transparent" inset="sm">
                <Sidebar.Trigger asChild>
                  <IconButton size="sm" aria-label="Toggle floating panel">
                    <PanelLeft />
                  </IconButton>
                </Sidebar.Trigger>
              </Surface>
            </Sidebar.Main>
          </Sidebar.Root>
        </Frame>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
