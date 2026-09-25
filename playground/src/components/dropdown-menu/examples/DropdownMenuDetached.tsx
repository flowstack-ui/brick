import {
  Button,
  DropdownMenu,
  Frame,
  Paragraph,
  ScrollArea,
  VStack,
} from "@flowstack-ui/brick";

export function DropdownMenuDetached() {
  return (
    <Frame blockSize="10rem" maxInlineSize="24rem" asChild>
      <ScrollArea.Root>
        <ScrollArea.Viewport aria-label="Detached anchor demonstration">
          <ScrollArea.Content>
            <VStack gap="4" align="start">
              <DropdownMenu.Root
                positioning={{ strategy: "fixed", hideWhenDetached: true }}
              >
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline" tone="neutral">
                    Scrollable anchor
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item value="edit">
                    Edit record
                  </DropdownMenu.Item>
                  <DropdownMenu.Item value="duplicate">
                    Duplicate record
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              <Frame minBlockSize="22rem">
                <Paragraph tone="secondary">
                  Open the menu, then scroll this area. The popup hides while
                  its anchor is outside the scroll viewport and returns when the
                  anchor is visible again.
                </Paragraph>
              </Frame>
            </VStack>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </Frame>
  );
}
