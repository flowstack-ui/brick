import { Frame } from "@flowstack-ui/brick";
import { NumberInput } from "@flowstack-ui/brick";

export function NumberInputStepper() {
  return (
    <Frame maxInlineSize={200}>
      <NumberInput.Root layout="stepper" defaultValue={3} min={0}>
        <NumberInput.Decrement aria-label="Remove seat" />
        <NumberInput.ValueText />
        <NumberInput.Increment aria-label="Add seat" />
      </NumberInput.Root>
    </Frame>
  );
}
