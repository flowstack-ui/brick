import { Frame } from "@flowstack-ui/brick";
import { NumberInput } from "@flowstack-ui/brick";

export function NumberInputWheel() {
  return (
    <Frame maxInlineSize={200}>
      <NumberInput.Root defaultValue={3} allowMouseWheel>
        <NumberInput.Input aria-label="Wheel quantity" />
        <NumberInput.Control />
      </NumberInput.Root>
    </Frame>
  );
}
