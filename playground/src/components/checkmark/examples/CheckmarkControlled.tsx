import { useState } from "react";
import { Checkmark, Button, HStack } from "@flowstack-ui/brick";
export function CheckmarkControlled() {
  const [checked, setChecked] = useState(false);
  return (
    <Button
      variant="outline"
      tone="neutral"
      aria-pressed={checked}
      onClick={() => setChecked(!checked)}
    >
      <HStack as="span" gap={2}>
        <Checkmark checked={checked} size="sm" />
        Include archived files
      </HStack>
    </Button>
  );
}
