import { useState } from "react";
import { ActionBar, Checkbox, CloseButton, Input } from "@flowstack-ui/brick";
export function ActionBarRetained() {
  const [open, setOpen] = useState(false);
  return (
    <ActionBar.Root
      open={open}
      onOpenChange={setOpen}
      unmountOnExit={false}
      closeOnInteractOutside={false}
    >
      <Checkbox
        checked={open}
        onCheckedChange={(value) => setOpen(value === true)}
      >
        Edit selection note
      </Checkbox>
      <ActionBar.Portal>
        <ActionBar.Positioner>
          <ActionBar.Content aria-label="Selection note">
            <Input
              size="sm"
              aria-label="Note"
              placeholder="Draft stays when reopened"
            />
            <ActionBar.CloseTrigger asChild>
              <CloseButton size="sm" />
            </ActionBar.CloseTrigger>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Portal>
    </ActionBar.Root>
  );
}
