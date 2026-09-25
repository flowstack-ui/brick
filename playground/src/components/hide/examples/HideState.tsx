import { Button, Hide, Text, VStack } from "@flowstack-ui/brick";
import { useState } from "react";
export function HideState() {
  const [count, setCount] = useState(0);
  return (
    <VStack align="start" gap="4">
      <Text tone="secondary">
        Resize below lg, increment, then resize away and back. The count
        remains.
      </Text>
      <Hide from="lg">
        <Button onClick={() => setCount(count + 1)}>
          Retained count: {count}
        </Button>
      </Hide>
    </VStack>
  );
}
