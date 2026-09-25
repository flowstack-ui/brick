import { DropdownMenu, Button, Icon } from "@flowstack-ui/brick";
import { Plus } from "lucide-react";
export function DropdownMenuAnatomy() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Actions
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item value="new">
          <DropdownMenu.Leading aria-hidden="true">
            <Icon size="inherit">
              <Plus />
            </Icon>
          </DropdownMenu.Leading>
          <DropdownMenu.ItemLabel>New workspace</DropdownMenu.ItemLabel>
          <DropdownMenu.Description>
            Create a shared place for your team.
          </DropdownMenu.Description>
          <DropdownMenu.Shortcut>⌘N</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled value="locked">
          Locked workspace
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
