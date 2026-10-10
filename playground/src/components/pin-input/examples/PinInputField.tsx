import { PinInput, Field } from "@flowstack-ui/brick";

export function PinInputField() {
  return (
    <Field.Root required invalid>
      <Field.Label>Verification code</Field.Label>
      <PinInput.Root length={4} name="code">
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.Root>
      <Field.Error>Enter all four digits.</Field.Error>
    </Field.Root>
  );
}
