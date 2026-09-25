import {
  Button,
  DropdownMenu,
  HStack,
  useDropdownMenu,
} from "@flowstack-ui/brick";
export function DropdownMenuStore() {
  const menu = useDropdownMenu();
  return (
    <HStack gap="4">
      <Button variant="ghost" tone="neutral" onClick={() => menu.setOpen(true)}>
        Open externally
      </Button>
      <DropdownMenu.RootProvider value={menu} variant="plain">
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Menu anchor
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item value="new">New file</DropdownMenu.Item>
          <DropdownMenu.Item value="open">Open file</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.RootProvider>
    </HStack>
  );
}
