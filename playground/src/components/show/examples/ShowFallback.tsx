import { Button, Show, Text, VStack } from "@flowstack-ui/brick";
import { useState } from "react";
export function ShowFallback() {
  const [count, setCount] = useState(0);
  return (
    <VStack align="start" gap="4">
      <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
      <Show
        when={count > 2}
        fallback={<Text tone="secondary">Keep clicking…</Text>}
      >
        <Text>Ready!</Text>
      </Show>
    </VStack>
  );
}
