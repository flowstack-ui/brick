import { PinInput } from "@flowstack-ui/brick";

export function PinInputBasic() {
  return (
    <PinInput.Root length={4} aria-label="Access code">
      <PinInput.Control>
        {Array.from({ length: 4 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
