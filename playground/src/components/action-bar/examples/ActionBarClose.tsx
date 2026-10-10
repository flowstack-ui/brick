import { useState } from "react";
import { ActionBar, Button, Checkbox, CloseButton } from "@flowstack-ui/brick";
export function ActionBarClose() {
  const [open, setOpen] = useState(false);
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
        Select two files
      </Checkbox>
      <ActionBar.Portal>
        <ActionBar.Positioner>
          <ActionBar.Content aria-label="Dismissible actions">
            <ActionBar.SelectionTrigger>2 selected</ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Button size="sm" variant="outline" onPress={() => setOpen(false)}>
              Archive
            </Button>
            <ActionBar.CloseTrigger asChild>
              <CloseButton size="sm" aria-label="Dismiss actions" />
            </ActionBar.CloseTrigger>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Portal>
    </ActionBar.Root>
  );
}
