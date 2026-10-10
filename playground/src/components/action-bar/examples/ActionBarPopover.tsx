import { useState } from "react";
import {
  ActionBar,
  Button,
  Checkbox,
  CloseButton,
  Popover,
  Text,
} from "@flowstack-ui/brick";
export function ActionBarPopover() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <ActionBar.Root
      open={open}
      onOpenChange={setOpen}
      closeOnInteractOutside={false}
    >
      <Checkbox
        checked={open}
        onCheckedChange={(value) => setOpen(value === true)}
      >
        Select projects to share
      </Checkbox>
      <ActionBar.Portal>
        <ActionBar.Positioner>
          <ActionBar.Content aria-label="Sharing actions">
            <Popover.Root>
              <Popover.Trigger asChild>
                <ActionBar.SelectionTrigger>
                  2 selected
                </ActionBar.SelectionTrigger>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content>
                  <Popover.Header>
                    <Popover.Title>Selected projects</Popover.Title>
                  </Popover.Header>
                  <Popover.Body>
                    <Text>Website redesign and mobile application</Text>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <ActionBar.Separator />
            <Button
              size="sm"
              variant="outline"
              onPress={() => setMessage("Projects shared.")}
            >
              Share
            </Button>
            <ActionBar.CloseTrigger asChild>
              <CloseButton size="sm" />
            </ActionBar.CloseTrigger>
            {message && (
              <Text role="status" variant="body-sm">
                {message}
              </Text>
            )}
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Portal>
    </ActionBar.Root>
  );
}
