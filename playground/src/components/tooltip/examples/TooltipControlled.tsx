import { useState } from "react";
import { Button, HStack, Tooltip } from "@flowstack-ui/brick";
export function TooltipControlled() {
  const [open, setOpen] = useState(false);
  return (
    <HStack gap="4">
      <Button variant="outline" tone="neutral" onClick={() => setOpen(!open)}>
        Toggle hint
      </Button>
      <Tooltip.Root
        open={open}
        onOpenChange={setOpen}
        closeOnClick={false}
        closeOnPointerDown={false}
      >
        <Tooltip.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Controlled target
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>Application-controlled hint</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </HStack>
  );
}
