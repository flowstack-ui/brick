import { PinInput } from "@flowstack-ui/brick";

export function PinInputResponsive() {
  return (
    <PinInput.Root
      length={4}
      size={{ initial: "sm", md: "lg" }}
      variant={{ initial: "underline", md: "subtle", lg: "outline" }}
      aria-label="Responsive code"
    >
      <PinInput.Control>
        {Array.from({ length: 4 }, (_, index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
    </PinInput.Root>
  );
}
