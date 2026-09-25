import type { CSSProperties } from "react";
import {
  Frame,
  Paragraph,
  ScrollArea,
  Sidebar,
  Surface,
  Text,
} from "@flowstack-ui/brick";

export function SidebarSticky() {
  return (
    <Frame blockSize="18rem" asChild>
      <ScrollArea.Root orientation="both">
        <ScrollArea.Viewport focusable aria-label="Sticky sidebar example">
          <Frame minInlineSize="34rem" asChild>
            <Sidebar.Root
              size="sm"
              position="sticky"
              style={
                {
                  "--brick-sidebar-available-block-size": "18rem",
                } as CSSProperties
              }
            >
              <Sidebar.Panel>
                <Sidebar.Content>
                  <Text>Sticky navigation</Text>
                </Sidebar.Content>
              </Sidebar.Panel>
              <Sidebar.Main asChild>
                <Frame minBlockSize="36rem">
                  <Surface level="transparent" inset="sm">
                    <Paragraph>
                      Scroll this bounded example. The panel stays at the top of
                      the scrollport.
                    </Paragraph>
                  </Surface>
                </Frame>
              </Sidebar.Main>
            </Sidebar.Root>
          </Frame>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </Frame>
  );
}
