import { Appearance, Button, Popover, Paragraph } from "@flowstack-ui/brick";
export function AppearancePortalled() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open dark popover</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Appearance value="dark">
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>Dark content</Popover.Title>
            </Popover.Header>
            <Popover.Body>
              <Paragraph>
                The appearance belongs to this portalled host, not its trigger.
              </Paragraph>
            </Popover.Body>
          </Popover.Content>
        </Appearance>
      </Popover.Portal>
    </Popover.Root>
  );
}
