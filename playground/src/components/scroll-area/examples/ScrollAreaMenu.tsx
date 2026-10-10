import {
  Button,
  DropdownMenu,
  For,
  Frame,
  ScrollArea,
} from "@flowstack-ui/brick";

export function ScrollAreaMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open projects</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content ariaLabel="Projects">
          <Frame blockSize="14rem" asChild>
            <ScrollArea.Root scrollbar="custom" scrollbarGutter="stable">
              <ScrollArea.Viewport>
                <ScrollArea.Content>
                  <For each={Array.from({ length: 30 }, (_, i) => i + 1)}>
                    {(id) => (
                      <DropdownMenu.Item key={id} value={`project-${id}`}>
                        <DropdownMenu.ItemLabel>
                          Project {id}
                        </DropdownMenu.ItemLabel>
                      </DropdownMenu.Item>
                    )}
                  </For>
                </ScrollArea.Content>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar />
            </ScrollArea.Root>
          </Frame>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
