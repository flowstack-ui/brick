import { DropdownMenu, Toolbar, Tooltip } from "@flowstack-ui/brick";
export function ToolbarComposition() {
  return (
    <Toolbar.Root aria-label="Document actions">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Toolbar.Button>Save</Toolbar.Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>Save this document</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Toolbar.Separator />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Toolbar.Button>More</Toolbar.Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item value="duplicate">Duplicate</DropdownMenu.Item>
          <DropdownMenu.Item value="archive">Archive</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Toolbar.Root>
  );
}
