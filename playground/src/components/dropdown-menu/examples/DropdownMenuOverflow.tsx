import { DropdownMenu, Button, For, Frame } from "@flowstack-ui/brick";
export function DropdownMenuOverflow() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Actions
        </Button>
      </DropdownMenu.Trigger>
      <Frame maxBlockSize="15rem" asChild>
        <DropdownMenu.Content>
          <For each={Array.from({ length: 30 }, (_, i) => i + 1)}>
            {(index) => (
              <DropdownMenu.Item key={index} value={String(index)}>
                Workspace {index}
              </DropdownMenu.Item>
            )}
          </For>
        </DropdownMenu.Content>
      </Frame>
    </DropdownMenu.Root>
  );
}
