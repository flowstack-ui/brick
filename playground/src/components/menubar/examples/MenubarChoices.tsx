import { useState } from "react";
import { Menubar, VStack, Text } from "@flowstack-ui/brick";
export function MenubarChoices() {
  const [notifications, setNotifications] = useState(true);
  return (
    <VStack gap="4">
      <Menubar.Root aria-label="Actions">
        <Menubar.Menu value="file">
          <Menubar.Trigger>Actions</Menubar.Trigger>
          <Menubar.Content leadingSpace="reserve">
            <Menubar.CheckboxItem
              value="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            >
              <Menubar.ItemIndicator />
              <Menubar.ItemLabel>Notifications</Menubar.ItemLabel>
            </Menubar.CheckboxItem>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="edit">
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item value="undo">Undo</Menubar.Item>
            <Menubar.Item disabled value="redo">
              Redo
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      </Menubar.Root>
      <Text role="status" tone="secondary">
        Notifications {notifications ? "on" : "off"}
      </Text>
    </VStack>
  );
}
