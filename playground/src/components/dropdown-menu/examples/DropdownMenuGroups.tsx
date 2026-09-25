import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuGroups() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Workspace actions
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Label>Workspace</DropdownMenu.Label>
          <DropdownMenu.Item value="new">New workspace</DropdownMenu.Item>
          <DropdownMenu.Item value="switch">Switch workspace</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Label>Account</DropdownMenu.Label>
          <DropdownMenu.Item value="settings">Settings</DropdownMenu.Item>
          <DropdownMenu.Item value="sign-out">Sign out</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
