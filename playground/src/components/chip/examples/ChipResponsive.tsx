import { Chip } from "@flowstack-ui/brick";
export function ChipResponsive() {
  return (
    <Chip.Root
      radius="control"
      size={{ sm: "sm", md: "lg", xl: "md" }}
      density={{ initial: "compact", lg: "comfortable" }}
      variant={{ initial: "surface", md: "solid", xl: "outline" }}
      tone="accent"
    >
      <Chip.Label>Responsive design team</Chip.Label>
    </Chip.Root>
  );
}
