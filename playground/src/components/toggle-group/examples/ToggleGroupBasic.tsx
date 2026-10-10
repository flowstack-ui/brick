import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupBasic() {
  return (
    <ToggleGroup.Root aria-label="Formatting">
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
