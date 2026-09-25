import { Button, DropdownMenu, Frame } from "@flowstack-ui/brick";

export function DropdownMenuSameWidth() {
  return (
    <DropdownMenu.Root positioning={{ sameWidth: true }}>
      <DropdownMenu.Trigger asChild>
        <Frame inlineSize="15rem" asChild>
          <Button variant="outline" tone="neutral">
            Workspace actions
          </Button>
        </Frame>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item value="edit">Edit workspace</DropdownMenu.Item>
        <DropdownMenu.Item value="duplicate">Duplicate</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
