import {
  Drawer,
  Button,
  CloseButton,
  Paragraph,
  HStack,
  Stack,
} from "@flowstack-ui/brick";
export function DrawerHeaderActions() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Header actions
        </Button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Positioner>
          <Drawer.Content size="md">
            <Drawer.Header>
              <HStack gap="3">
                <Drawer.Close asChild>
                  <CloseButton aria-label="Close drawer" />
                </Drawer.Close>
                <Stack.Item grow={1}>
                  <Drawer.Title>Project</Drawer.Title>
                </Stack.Item>
                <Drawer.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Drawer.Close>
                <Button>Save</Button>
              </HStack>
            </Drawer.Header>
            <Drawer.Body>
              <Paragraph>
                Use this panel for a focused task without leaving the current
                page.
              </Paragraph>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
