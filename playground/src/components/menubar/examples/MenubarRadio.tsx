import { useState } from "react";
import { Menubar, For, VStack, Text } from "@flowstack-ui/brick";
export function MenubarRadio() {
  const [density, setDensity] = useState("comfortable");
  return (
    <VStack gap="4">
      <Menubar.Root aria-label="Actions">
        <Menubar.Menu value="file">
          <Menubar.Trigger>Actions</Menubar.Trigger>
          <Menubar.Content leadingSpace="reserve">
            <Menubar.RadioGroup value={density} onValueChange={setDensity}>
              <Menubar.Label>Density</Menubar.Label>
              <For each={["compact", "comfortable"]}>
                {(value) => (
                  <Menubar.RadioItem key={value} value={value}>
                    <Menubar.ItemIndicator />
                    <Menubar.ItemLabel>{value}</Menubar.ItemLabel>
                  </Menubar.RadioItem>
                )}
              </For>
            </Menubar.RadioGroup>
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
        Density: {density}
      </Text>
    </VStack>
  );
}
