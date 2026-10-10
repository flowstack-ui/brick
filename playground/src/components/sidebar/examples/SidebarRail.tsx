import {
  Sidebar,
  IconButton,
  Surface,
  Text,
  useSidebarContext,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";
import { PanelLeft } from "lucide-react";

function RailLabel() {
  const { state } = useSidebarContext();
  return (
    <Text aria-label="Workspace navigation">
      {state === "rail" ? "W" : "Workspace navigation"}
    </Text>
  );
}

export function SidebarRail() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <Sidebar.Root collapsedState="rail" size="sm">
            <Sidebar.Panel>
              <Sidebar.Content>
                <RailLabel />
              </Sidebar.Content>
            </Sidebar.Panel>
            <Sidebar.Main asChild>
              <Surface level="transparent" inset="sm">
                <Sidebar.Trigger asChild>
                  <IconButton size="sm" aria-label="Toggle rail">
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
