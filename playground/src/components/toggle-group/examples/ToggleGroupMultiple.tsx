import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupMultiple() {
  return (
    <ToggleGroup.Root
      type="multiple"
      defaultValue={["bold", "italic"]}
      aria-label="Formatting"
    >
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
