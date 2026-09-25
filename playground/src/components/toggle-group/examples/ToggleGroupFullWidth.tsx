import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupFullWidth() {
  return (
    <ToggleGroup.Root fullWidth aria-label="Formatting">
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
