import { useState } from "react";
import { Radiomark, Button, HStack } from "@flowstack-ui/brick";
export function RadiomarkControlled() {
  const [checked, setChecked] = useState(false);
  return (
    <Button
      variant="outline"
      tone="neutral"
      aria-pressed={checked}
      onClick={() => setChecked(!checked)}
    >
      <HStack as="span" gap={2}>
        <Radiomark checked={checked} size="sm" />
        Use express delivery
      </HStack>
    </Button>
  );
}
