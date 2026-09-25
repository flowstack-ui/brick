import { DropdownMenu, Button, HStack, Frame } from "@flowstack-ui/brick";
import { Copy, ClipboardPaste, Scissors } from "lucide-react";
import { Icon } from "@flowstack-ui/brick";
export function DropdownMenuMixed() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Actions
        </Button>
      </DropdownMenu.Trigger>
      <Frame inlineSize="15rem" asChild>
        <DropdownMenu.Content>
          <HStack gap="1">
            <DropdownMenu.Item layout="stack" value="cut">
              <DropdownMenu.Leading>
                <Icon size="inherit">
                  <Scissors />
                </Icon>
              </DropdownMenu.Leading>
              <DropdownMenu.ItemLabel>Cut</DropdownMenu.ItemLabel>
            </DropdownMenu.Item>
            <DropdownMenu.Item layout="stack" value="copy">
              <DropdownMenu.Leading>
                <Icon size="inherit">
                  <Copy />
                </Icon>
              </DropdownMenu.Leading>
              <DropdownMenu.ItemLabel>Copy</DropdownMenu.ItemLabel>
            </DropdownMenu.Item>
            <DropdownMenu.Item layout="stack" value="paste">
              <DropdownMenu.Leading>
                <Icon size="inherit">
                  <ClipboardPaste />
                </Icon>
              </DropdownMenu.Leading>
              <DropdownMenu.ItemLabel>Paste</DropdownMenu.ItemLabel>
            </DropdownMenu.Item>
          </HStack>
          <DropdownMenu.Separator />
          <DropdownMenu.Item value="look-up">Look up</DropdownMenu.Item>
          <DropdownMenu.Item value="translate">Translate</DropdownMenu.Item>
          <DropdownMenu.Item value="share">Share</DropdownMenu.Item>
        </DropdownMenu.Content>
      </Frame>
    </DropdownMenu.Root>
  );
}
