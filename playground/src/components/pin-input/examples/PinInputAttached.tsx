import { PinInput } from "@flowstack-ui/brick";

export function PinInputAttached() {
  return (
    <PinInput.Root length={4} layout="attached" aria-label="Attached code">
      <PinInput.Control>
        {Array.from({ length: 4 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
