import { useState } from "react";
import { ContextMenu, Surface, VStack, Text } from "@flowstack-ui/brick";
export function ContextMenuControlled() {
  const [open, setOpen] = useState(false);
  return (
    <VStack gap="3">
      <ContextMenu.Root open={open} onOpenChange={setOpen}>
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Actions: right-click or press Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item value="new">New file</ContextMenu.Item>
          <ContextMenu.Item value="open">Open file</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item value="delete" tone="danger">
            Delete file
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <Text role="status" tone="secondary">
        {open ? "Open" : "Closed"}
      </Text>
    </VStack>
  );
}
