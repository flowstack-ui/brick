import { useState } from "react";
import { ContextMenu, Surface, VStack, Text } from "@flowstack-ui/brick";
export function ContextMenuChoices() {
  const [notifications, setNotifications] = useState(true);
  return (
    <VStack gap="4">
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Notifications: right-click or Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Content leadingSpace="reserve">
          <ContextMenu.CheckboxItem
            value="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          >
            <ContextMenu.ItemIndicator />
            <ContextMenu.ItemLabel>Notifications</ContextMenu.ItemLabel>
          </ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <Text role="status" tone="secondary">
        Notifications {notifications ? "on" : "off"}
      </Text>
    </VStack>
  );
}
