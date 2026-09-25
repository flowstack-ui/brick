import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuInsets() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Compact panel
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content inset="none">
        <DropdownMenu.Item value="edit">Edit record</DropdownMenu.Item>
        <DropdownMenu.Item value="duplicate">
          Duplicate record
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
