import { PinInput } from "@flowstack-ui/brick";

export function PinInputPlaceholder() {
  return (
    <PinInput.Root length={4} placeholder="–" aria-label="Pairing code">
      <PinInput.Control>
        {Array.from({ length: 4 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
