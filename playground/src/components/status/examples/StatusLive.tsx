import { useState } from "react";
import { Button, HStack, Status } from "@flowstack-ui/brick";
export function StatusLive() {
  const [saved, setSaved] = useState(false);
  return (
    <HStack gap={4} wrap="wrap">
      <Button variant="outline" onClick={() => setSaved(!saved)}>
        Toggle saved state
      </Button>
      <Status.Root
        role="status"
        aria-atomic="true"
        tone={saved ? "success" : "neutral"}
      >
        <Status.Indicator />
        {saved ? "Saved" : "Unsaved changes"}
      </Status.Root>
    </HStack>
  );
}
