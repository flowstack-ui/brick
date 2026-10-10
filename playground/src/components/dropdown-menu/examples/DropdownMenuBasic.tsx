import { DropdownMenu, Button } from "@flowstack-ui/brick";
export function DropdownMenuBasic() {
  return (
    <DropdownMenu.Root>
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
  );
}
