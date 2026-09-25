import { PinInput } from "@flowstack-ui/brick";

export function PinInputLocale() {
  return (
    <PinInput.Root
      length={4}
      dir="rtl"
      aria-label="رمز التحقق"
      getInputLabel={(index, length) => `الرقم ${index + 1} من ${length}`}
    >
      <PinInput.Control>
        {Array.from({ length: 4 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
