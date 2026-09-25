import { useState } from "react";
import { Button, Text, VStack, toast } from "@flowstack-ui/brick";
export function ToastLifecycle() {
  const [status, setStatus] = useState("Not created");
  return (
    <VStack gap={3} align="start">
      <Button
        variant="outline"
        onClick={() =>
          toast("Lifecycle example", {
            duration: 3000,
            onStatusChange: (detail) => setStatus(detail.status),
          })
        }
      >
        Observe lifecycle
      </Button>
      <Text tone="secondary">{status}</Text>
    </VStack>
  );
}
