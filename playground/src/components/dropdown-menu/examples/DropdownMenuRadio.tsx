import { useState } from "react";
import { Button, DropdownMenu, For } from "@flowstack-ui/brick";

export function DropdownMenuRadio() {
  const [density, setDensity] = useState("Comfortable");
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Density
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content leadingSpace="reserve">
        <DropdownMenu.RadioGroup value={density} onValueChange={setDensity}>
          <DropdownMenu.Label>Density</DropdownMenu.Label>
          <For each={["Compact", "Comfortable", "Spacious"]}>
            {(value) => (
              <DropdownMenu.RadioItem key={value} value={value}>
                <DropdownMenu.ItemIndicator />
                <DropdownMenu.ItemLabel>{value}</DropdownMenu.ItemLabel>
              </DropdownMenu.RadioItem>
            )}
          </For>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
