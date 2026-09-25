import { Frame } from "@flowstack-ui/brick";
import { NumberInput } from "@flowstack-ui/brick";

export function NumberInputSteps() {
  return (
    <Frame maxInlineSize={200}>
      <NumberInput.Root
        defaultValue={1}
        step={0.1}
        largeStep={1}
        smallStep={0.01}
      >
        <NumberInput.Input aria-label="Stepped quantity" />
        <NumberInput.Control />
      </NumberInput.Root>
    </Frame>
  );
}
