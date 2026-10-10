import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ActionBar, Button, Checkbox, Dialog } from "@flowstack-ui/brick";
export function ActionBarDialog() {
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
        Select two projects
      </Checkbox>
      <ActionBar.Portal>
        <ActionBar.Positioner>
          <ActionBar.Content aria-label="Project actions">
            <ActionBar.SelectionTrigger>
              2 projects selected
            </ActionBar.SelectionTrigger>
            <ActionBar.Separator />
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button
                  size="sm"
                  variant="surface"
                  tone="danger"
                  startIcon={<Trash2 />}
                >
                  Delete projects
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Delete projects?</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Dialog.Description>
                      This will permanently delete the two selected projects.
                    </Dialog.Description>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close asChild>
                      <Button variant="outline" tone="neutral">
                        Cancel
                      </Button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <Button tone="danger" onPress={() => setOpen(false)}>
                        Delete
                      </Button>
                    </Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </ActionBar.Portal>
    </ActionBar.Root>
  );
}
