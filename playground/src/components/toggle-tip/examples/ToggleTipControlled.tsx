import { Button, ToggleTip } from "@flowstack-ui/brick";
import { useState } from "react";
export function ToggleTipControlled() {
  const [open, setOpen] = useState(false);
  return (
    <ToggleTip.Root open={open} onOpenChange={setOpen}>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">Controlled help</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="Controlled help">
          <ToggleTip.Body>Your files are encrypted at rest.</ToggleTip.Body>
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.Root>
  );
}
