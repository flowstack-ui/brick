import { useState } from "react";
import { ContextMenu, Surface, For, VStack, Text } from "@flowstack-ui/brick";
export function ContextMenuRadio() {
  const [density, setDensity] = useState("comfortable");
  return (
    <VStack gap="4">
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
          <Surface bordered inset="lg" radius="sm" tabIndex={0}>
            Density: right-click or Shift+F10
          </Surface>
        </ContextMenu.Trigger>
        <ContextMenu.Content leadingSpace="reserve">
          <ContextMenu.RadioGroup value={density} onValueChange={setDensity}>
            <ContextMenu.Label>Density</ContextMenu.Label>
            <For each={["compact", "comfortable"]}>
              {(value) => (
                <ContextMenu.RadioItem key={value} value={value}>
                  <ContextMenu.ItemIndicator />
                  <ContextMenu.ItemLabel>{value}</ContextMenu.ItemLabel>
                </ContextMenu.RadioItem>
              )}
            </For>
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu.Root>
      <Text role="status" tone="secondary">
        Density: {density}
      </Text>
    </VStack>
  );
}
