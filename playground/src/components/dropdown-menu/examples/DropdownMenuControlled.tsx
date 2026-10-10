import { useState } from "react";
import { DropdownMenu, Button, VStack, Text } from "@flowstack-ui/brick";
export function DropdownMenuControlled() {
  const [open, setOpen] = useState(false);
  return (
    <VStack gap="3" align="start">
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Actions
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item value="new">New file</DropdownMenu.Item>
          <DropdownMenu.Item value="open">Open file</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item value="delete" tone="danger">
            Delete file
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Text role="status" tone="secondary">
        {open ? "Open" : "Closed"}
      </Text>
    </VStack>
  );
}
