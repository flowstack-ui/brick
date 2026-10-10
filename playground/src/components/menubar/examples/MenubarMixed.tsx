import { Menubar, HStack, Frame } from "@flowstack-ui/brick";
import { Copy, ClipboardPaste, Scissors } from "lucide-react";
import { Icon } from "@flowstack-ui/brick";
export function MenubarMixed() {
  return (
    <Menubar.Root aria-label="Actions">
      <Menubar.Menu value="file">
        <Menubar.Trigger>Actions</Menubar.Trigger>
        <Frame inlineSize="15rem" asChild>
          <Menubar.Content>
            <HStack gap="1">
              <Menubar.Item layout="stack" value="cut">
                <Menubar.Leading>
                  <Icon size="inherit">
                    <Scissors />
                  </Icon>
                </Menubar.Leading>
                <Menubar.ItemLabel>Cut</Menubar.ItemLabel>
              </Menubar.Item>
              <Menubar.Item layout="stack" value="copy">
                <Menubar.Leading>
                  <Icon size="inherit">
                    <Copy />
                  </Icon>
                </Menubar.Leading>
                <Menubar.ItemLabel>Copy</Menubar.ItemLabel>
              </Menubar.Item>
              <Menubar.Item layout="stack" value="paste">
                <Menubar.Leading>
                  <Icon size="inherit">
                    <ClipboardPaste />
                  </Icon>
                </Menubar.Leading>
                <Menubar.ItemLabel>Paste</Menubar.ItemLabel>
              </Menubar.Item>
            </HStack>
            <Menubar.Separator />
            <Menubar.Item value="rename">Rename file</Menubar.Item>
            <Menubar.Item value="duplicate">Duplicate file</Menubar.Item>
            <Menubar.Item value="delete" tone="danger">
              Delete file
            </Menubar.Item>
          </Menubar.Content>
        </Frame>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="undo">Undo</Menubar.Item>
          <Menubar.Item disabled value="redo">
            Redo
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
