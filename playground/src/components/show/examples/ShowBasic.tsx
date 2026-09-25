import { Button, Show, Text, VStack } from "@flowstack-ui/brick";
import { useState } from "react";
export function ShowBasic() {
  const [visible, setVisible] = useState(false);
  return (
    <VStack align="start" gap="4">
      <Button onClick={() => setVisible(!visible)}>Toggle content</Button>
      <Show when={visible}>
        <Text>Hello from Show</Text>
      </Show>
    </VStack>
  );
}
