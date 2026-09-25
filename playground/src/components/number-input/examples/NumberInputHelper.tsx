import { Frame } from "@flowstack-ui/brick";
import { Field, NumberInput } from "@flowstack-ui/brick";

export function NumberInputHelper() {
  return (
    <Frame maxInlineSize={200}>
      <Field.Root>
        <Field.Label>Packages</Field.Label>
        <NumberInput.Root defaultValue={3}>
          <NumberInput.Input />
          <NumberInput.Unit>boxes</NumberInput.Unit>
          <NumberInput.Control />
        </NumberInput.Root>
        <Field.Description>Packages in this shipment.</Field.Description>
      </Field.Root>
    </Frame>
  );
}
