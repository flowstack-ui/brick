import { useState } from "react";
import {
  Checkbox,
  IconButton,
  Sidebar,
  Surface,
  Text,
  VStack,
  type SidebarState,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";
import { PanelLeft } from "lucide-react";

export function SidebarControlled() {
  const [state, setState] = useState<SidebarState>("expanded");
  const [disabled, setDisabled] = useState(false);
  return (
    <ScrollArea.Root orientation="horizontal">
      <ScrollArea.Viewport focusable aria-label="Sidebar example">
        <Frame minInlineSize="34rem">
          <VStack gap="4">
            <Checkbox
              checked={disabled}
              onCheckedChange={(value) => setDisabled(value === true)}
            >
              Disable sidebar controls
            </Checkbox>
            <Sidebar.Root
              size="sm"
              state={state}
              onStateChange={setState}
              disabled={disabled}
              collapsedState="rail"
            >
              <Sidebar.Panel>
                <Sidebar.Content>
                  <Text aria-label="Workspace">W</Text>
                </Sidebar.Content>
              </Sidebar.Panel>
              <Sidebar.Main asChild>
                <Surface level="transparent" inset="sm">
                  <VStack align="start" gap="3">
                    <Sidebar.Trigger asChild>
                      <IconButton
                        size="sm"
                        aria-label="Toggle controlled sidebar"
                      >
                        <PanelLeft />
                      </IconButton>
                    </Sidebar.Trigger>
                    <Text>{state}</Text>
                  </VStack>
                </Surface>
              </Sidebar.Main>
            </Sidebar.Root>
          </VStack>
        </Frame>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
