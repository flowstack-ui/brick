import { PinInput } from "@flowstack-ui/brick";

export function PinInputOtp() {
  return (
    <PinInput.Root length={4} otp aria-label="One-time code">
      <PinInput.Control>
        {Array.from({ length: 4 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
