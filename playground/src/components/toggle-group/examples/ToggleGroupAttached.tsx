import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupAttached() {
  return (
    <ToggleGroup.Root attached variant="outline" aria-label="Formatting">
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
