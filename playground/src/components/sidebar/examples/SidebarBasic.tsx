import {
  IconButton,
  Heading,
  NavList,
  Paragraph,
  Sidebar,
  Surface,
  Text,
  VStack,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";
import { PanelLeft } from "lucide-react";

export function SidebarBasic() {
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <Sidebar.Root size="sm">
            <Sidebar.Panel aria-label="Example navigation">
              <Sidebar.Header>
                <Text weight="semibold">Workspace</Text>
              </Sidebar.Header>
              <Sidebar.Content>
                <NavList.Root aria-label="Example pages" size="sm">
                  <NavList.List>
                    <NavList.Item>
                      <NavList.Link href="#usage">Overview</NavList.Link>
                    </NavList.Item>
                    <NavList.Item>
                      <NavList.Link href="#examples">Projects</NavList.Link>
                    </NavList.Item>
                  </NavList.List>
                </NavList.Root>
              </Sidebar.Content>
            </Sidebar.Panel>
            <Sidebar.Main asChild>
              <Surface level="transparent" inset="md">
                <VStack align="start" gap="3">
                  <Sidebar.Trigger asChild>
                    <IconButton size="sm" aria-label="Toggle sidebar">
                      <PanelLeft />
                    </IconButton>
                  </Sidebar.Trigger>
                  <Heading level={3} variant="title-sm">
                    Project dashboard
                  </Heading>
                  <Paragraph tone="secondary">
                    The reopening control stays outside the hidden panel.
                  </Paragraph>
                </VStack>
              </Surface>
            </Sidebar.Main>
          </Sidebar.Root>
        </Frame>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
