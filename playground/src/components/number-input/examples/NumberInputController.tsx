import { Frame } from "@flowstack-ui/brick";
import {
  Button,
  NumberInput,
  Text,
  VStack,
  useNumberInput,
} from "@flowstack-ui/brick";

export function NumberInputController() {
  const controller = useNumberInput({ defaultValue: 3, min: 0 });
  return (
    <Frame maxInlineSize={200}>
      <VStack gap="4">
        <NumberInput.RootProvider value={controller}>
          <NumberInput.Label>Items</NumberInput.Label>
          <NumberInput.Group>
            <NumberInput.Input />
            <NumberInput.Control />
          </NumberInput.Group>
        </NumberInput.RootProvider>
        <Button variant="outline" onClick={() => controller.setToMin()}>
          Set to minimum
        </Button>
        <Text>{controller.valueAsNumber} items</Text>
      </VStack>
    </Frame>
  );
}
