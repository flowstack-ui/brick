import { Frame } from "@flowstack-ui/brick";
import { NumberInput } from "@flowstack-ui/brick";

export function NumberInputBounds() {
  return (
    <Frame maxInlineSize={200}>
      <NumberInput.Root min={0} max={10} defaultValue={10}>
        <NumberInput.Input aria-label="Limited quantity" />
        <NumberInput.Control />
      </NumberInput.Root>
    </Frame>
  );
}
