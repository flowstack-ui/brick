import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupDisabledSelection() {
  return (
    <ToggleGroup.Root aria-label="Formatting" defaultValue="bold">
      <ToggleGroup.Item value="bold" disabled>
        Bold
      </ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
