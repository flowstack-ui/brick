import { Menubar, For } from "@flowstack-ui/brick";
export function MenubarOverflow() {
  return (
    <Menubar.Root aria-label="Actions">
      <Menubar.Menu value="file">
        <Menubar.Trigger>Actions</Menubar.Trigger>
        <Menubar.Content>
          <For each={Array.from({ length: 30 }, (_, i) => i + 1)}>
            {(index) => (
              <Menubar.Item key={index} value={String(index)}>
                Workspace {index}
              </Menubar.Item>
            )}
          </For>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Content>
          <Menubar.Item value="undo">Undo</Menubar.Item>
          <Menubar.Item disabled value="redo">
            Redo
          </Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar.Root>
  );
}
