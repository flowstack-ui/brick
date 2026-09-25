import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupFocus() {
  return (
    <ToggleGroup.Root
      focusRing="inside"
      variant="outline"
      aria-label="Formatting"
    >
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
