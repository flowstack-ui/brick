import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuSizes() {
  return (
    <DropdownMenu.Root size="lg">
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Comfortable actions
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item value="edit">Edit record</DropdownMenu.Item>
        <DropdownMenu.Item value="duplicate">
          Duplicate record
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
