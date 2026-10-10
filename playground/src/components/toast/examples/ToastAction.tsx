import { useState } from "react";
import { Button, Text, VStack, toast } from "@flowstack-ui/brick";
export function ToastActionExample() {
  const [message, setMessage] = useState("No action yet");
  return (
    <VStack gap={3} align="start">
      <Button
        variant="outline"
        onClick={() =>
          toast("File archived", {
            action: {
              label: "Undo",
              onClick: () => setMessage("File restored"),
            },
          })
        }
      >
        Archive file
      </Button>
      <Text tone="secondary">{message}</Text>
    </VStack>
  );
}
