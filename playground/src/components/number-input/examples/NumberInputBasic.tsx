import { Frame } from "@flowstack-ui/brick";
import { NumberInput } from "@flowstack-ui/brick";

export function NumberInputBasic() {
  return (
    <Frame maxInlineSize={200}>
      <NumberInput.Root defaultValue={3}>
        <NumberInput.Input aria-label="Quantity" />
        <NumberInput.Control />
      </NumberInput.Root>
    </Frame>
  );
}
