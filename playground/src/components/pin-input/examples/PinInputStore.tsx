import {
  PinInput,
  VStack,
  HStack,
  Button,
  usePinInput,
} from "@flowstack-ui/brick";

export function PinInputStore() {
  const api = usePinInput({ length: 4, "aria-label": "Store code" });
  return (
    <VStack gap={4}>
      <PinInput.RootProvider value={api}>
        <PinInput.Control>
          {Array.from({ length: 4 }, (_, index) => (
            <PinInput.Input key={index} index={index} />
          ))}
        </PinInput.Control>
      </PinInput.RootProvider>
      <HStack gap={3}>
        <Button
          variant="outline"
          onClick={() => api.setValue(["1", "2", "3", "4"])}
        >
          Set code
        </Button>
        <Button variant="outline" onClick={() => api.clearValue()}>
          Clear code
        </Button>
      </HStack>
    </VStack>
  );
}
