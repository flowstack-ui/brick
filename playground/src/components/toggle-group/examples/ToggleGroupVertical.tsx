import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupVertical() {
  return (
    <ToggleGroup.Root orientation="vertical" aria-label="Formatting">
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
