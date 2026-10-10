import { useRef, useState } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  For,
  Hide,
  Menubar,
  Paragraph,
  Show,
  VStack,
} from "@flowstack-ui/brick";

const commands = ["New document", "Save document", "Export document"] as const;

export function MenubarResponsive() {
  const [action, setAction] = useState("No command selected");
  const desktopTrigger = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  return (
    <VStack gap="4" align="start">
      <Show from="md" asChild>
        <Menubar.Root aria-label="Responsive document commands">
          <Menubar.Menu value="file">
            <Menubar.Trigger ref={desktopTrigger}>Document</Menubar.Trigger>
            <Menubar.Content>
              <For each={commands}>
                {(command) => (
                  <Menubar.Item
                    key={command}
                    value={command}
                    onSelect={() => setAction(command)}
                  >
                    {command}
                  </Menubar.Item>
                )}
              </For>
            </Menubar.Content>
          </Menubar.Menu>
        </Menubar.Root>
      </Show>
      <Drawer.Root>
        <Hide from="md">
          <Drawer.Trigger asChild>
            <Button ref={mobileTrigger} variant="outline" tone="neutral">
              Document actions
            </Button>
          </Drawer.Trigger>
        </Hide>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Positioner>
            <Drawer.Content
              finalFocus={() =>
                desktopTrigger.current?.getClientRects().length
                  ? desktopTrigger.current
                  : mobileTrigger.current
              }
            >
              <Drawer.Header>
                <Drawer.Title>Document actions</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <VStack gap="2">
                  <For each={commands}>
                    {(command) => (
                      <Drawer.Close key={command} asChild>
                        <Button
                          variant="ghost"
                          tone="neutral"
                          onClick={() => setAction(command)}
                        >
                          {command}
                        </Button>
                      </Drawer.Close>
                    )}
                  </For>
                </VStack>
              </Drawer.Body>
              <Drawer.Close placement="corner" asChild>
                <CloseButton size="sm" />
              </Drawer.Close>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Portal>
      </Drawer.Root>
      <Paragraph tone="secondary" role="status">
        {action}
      </Paragraph>
    </VStack>
  );
}
