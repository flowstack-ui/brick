import { Frame } from "@flowstack-ui/brick";
import { NumberInput } from "@flowstack-ui/brick";

export function NumberInputResponsive() {
  return (
    <Frame maxInlineSize={200}>
      <NumberInput.Root
        defaultValue={3}
        size={{ lg: "xl" }}
        stepperVisibility="hover"
      >
        <NumberInput.Input aria-label="Responsive quantity" />
        <NumberInput.Control />
      </NumberInput.Root>
    </Frame>
  );
}
