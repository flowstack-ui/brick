import { Stat, IconButton, ToggleTip } from "@flowstack-ui/brick";
import { Info } from "lucide-react";

export function StatInfoTip() {
  return (
    <Stat.Root>
      <Stat.Label>
        Unique visitors
        <ToggleTip.Root>
          <ToggleTip.Trigger asChild>
            <IconButton
              size="xs"
              variant="ghost"
              tone="neutral"
              aria-label="About unique visitors"
            >
              <Info />
            </IconButton>
          </ToggleTip.Trigger>
          <ToggleTip.Portal>
            <ToggleTip.Content aria-label="Unique visitors">
              <ToggleTip.Body>
                People who visited at least once in the last 30 days.
              </ToggleTip.Body>
            </ToggleTip.Content>
          </ToggleTip.Portal>
        </ToggleTip.Root>
      </Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
    </Stat.Root>
  );
}
