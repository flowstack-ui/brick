import { PinInput } from "@flowstack-ui/brick";

export function PinInputMask() {
  return (
    <PinInput.Root length={4} mask aria-label="Private PIN">
      <PinInput.Control>
        {Array.from({ length: 4 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
