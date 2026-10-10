import { useState } from "react";
import { Button, DropdownMenu } from "@flowstack-ui/brick";

function RetainedPreferences() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <DropdownMenu.CheckboxItem
        value="notifications"
        checked={checked}
        onCheckedChange={setChecked}
      >
        <DropdownMenu.ItemIndicator />
        <DropdownMenu.ItemLabel>Notifications</DropdownMenu.ItemLabel>
      </DropdownMenu.CheckboxItem>
      <DropdownMenu.Item value="finish">Done</DropdownMenu.Item>
    </>
  );
}

export function DropdownMenuLifecycle() {
  return (
    <DropdownMenu.Root unmountOnExit={false}>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Retained content
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content leadingSpace="reserve">
        <RetainedPreferences />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
