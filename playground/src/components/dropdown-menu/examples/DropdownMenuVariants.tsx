import { Button, DropdownMenu } from "@flowstack-ui/brick";

export function DropdownMenuVariants() {
  return (
    <DropdownMenu.Root variant="plain">
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Plain highlight
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
