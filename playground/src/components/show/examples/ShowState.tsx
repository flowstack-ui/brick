import { Button, Show, Text, VStack } from "@flowstack-ui/brick";
import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <Button onClick={() => setCount(count + 1)}>Local count: {count}</Button>
  );
}
export function ShowState() {
  const [visible, setVisible] = useState(true);
  return (
    <VStack align="start" gap="4">
      <Button variant="outline" onClick={() => setVisible(!visible)}>
        Toggle conditional counter
      </Button>
      <Show when={visible}>
        <Counter />
      </Show>
      <Text tone="secondary">
        The conditional counter resets after removal. The responsive counter
        retains its state across resizing.
      </Text>
      <Show from="md">
        <Counter />
      </Show>
    </VStack>
  );
}
