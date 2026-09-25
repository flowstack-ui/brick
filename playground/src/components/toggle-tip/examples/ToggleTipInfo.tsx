import { IconButton, ToggleTip } from "@flowstack-ui/brick";
import { Info } from "lucide-react";
export function ToggleTipInfo() {
  return (
    <ToggleTip.Root>
      <ToggleTip.Trigger asChild>
        <IconButton
          aria-label="About storage"
          size="xs"
          variant="ghost"
          tone="neutral"
        >
          <Info />
        </IconButton>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="About storage">
          <ToggleTip.Body>
            Storage is shared across your workspace.
          </ToggleTip.Body>
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.Root>
  );
}
