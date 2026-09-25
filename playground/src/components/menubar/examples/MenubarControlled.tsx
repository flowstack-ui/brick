import { useState } from "react";
import { Menubar, VStack, Text } from "@flowstack-ui/brick";
export function MenubarControlled() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <VStack gap="3">
      <Menubar.Root aria-label="Actions" value={value} onValueChange={setValue}>
        <Menubar.Menu value="file">
          <Menubar.Trigger>Actions</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item value="new">New file</Menubar.Item>
            <Menubar.Item value="open">Open file</Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item value="delete" tone="danger">
              Delete file
            </Menubar.Item>
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
      <Text role="status" tone="secondary">
        {value ? `Open: ${value}` : "Closed"}
      </Text>
    </VStack>
  );
}
