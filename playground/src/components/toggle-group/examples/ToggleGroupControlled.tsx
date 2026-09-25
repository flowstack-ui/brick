import { ToggleGroup } from "@flowstack-ui/brick";

import { useState } from "react";
export function ToggleGroupControlled() {
  const [value, setValue] = useState("bold");
  return (
    <ToggleGroup.Root
      aria-label="Formatting"
      value={value}
      onValueChange={setValue}
    >
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
