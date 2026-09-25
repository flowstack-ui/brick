import { ToggleGroup } from "@flowstack-ui/brick";

export function ToggleGroupResponsive() {
  return (
    <ToggleGroup.Root
      size={{ initial: "sm", lg: "lg" }}
      aria-label="Formatting"
    >
      <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
      <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
