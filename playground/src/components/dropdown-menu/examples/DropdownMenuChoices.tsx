import { useState } from "react";
import { DropdownMenu, Button } from "@flowstack-ui/brick";
export function DropdownMenuChoices() {
  const [notifications, setNotifications] = useState(true);
  const [inherited, setInherited] = useState<boolean | "indeterminate">(
    "indeterminate",
  );
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Preferences
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content leadingSpace="reserve">
        <DropdownMenu.CheckboxItem
          value="notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
        >
          <DropdownMenu.ItemIndicator />
          <DropdownMenu.ItemLabel>Notifications</DropdownMenu.ItemLabel>
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem
          value="inherited"
          checked={inherited}
          onCheckedChange={setInherited}
        >
          <DropdownMenu.ItemIndicator />
          <DropdownMenu.ItemLabel>Inherited permissions</DropdownMenu.ItemLabel>
        </DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
