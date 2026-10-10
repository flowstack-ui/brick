import { ContextMenu, Surface, HStack, Frame } from "@flowstack-ui/brick";
import { Copy, ClipboardPaste, Scissors } from "lucide-react";
import { Icon } from "@flowstack-ui/brick";
export function ContextMenuMixed() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        <Surface bordered inset="lg" radius="sm" tabIndex={0}>
          Actions: right-click or press Shift+F10
        </Surface>
      </ContextMenu.Trigger>
      <Frame inlineSize="15rem" asChild>
        <ContextMenu.Content>
          <HStack gap="1">
            <ContextMenu.Item layout="stack" value="cut">
              <ContextMenu.Leading>
                <Icon size="inherit">
                  <Scissors />
                </Icon>
              </ContextMenu.Leading>
              <ContextMenu.ItemLabel>Cut</ContextMenu.ItemLabel>
            </ContextMenu.Item>
            <ContextMenu.Item layout="stack" value="copy">
              <ContextMenu.Leading>
                <Icon size="inherit">
                  <Copy />
                </Icon>
              </ContextMenu.Leading>
              <ContextMenu.ItemLabel>Copy</ContextMenu.ItemLabel>
            </ContextMenu.Item>
            <ContextMenu.Item layout="stack" value="paste">
              <ContextMenu.Leading>
                <Icon size="inherit">
                  <ClipboardPaste />
                </Icon>
              </ContextMenu.Leading>
              <ContextMenu.ItemLabel>Paste</ContextMenu.ItemLabel>
            </ContextMenu.Item>
          </HStack>
          <ContextMenu.Separator />
          <ContextMenu.Item value="rename">Rename file</ContextMenu.Item>
          <ContextMenu.Item value="duplicate">Duplicate file</ContextMenu.Item>
          <ContextMenu.Item value="delete" tone="danger">
            Delete file
          </ContextMenu.Item>
        </ContextMenu.Content>
      </Frame>
    </ContextMenu.Root>
  );
}
