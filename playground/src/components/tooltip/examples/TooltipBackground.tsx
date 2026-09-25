import type { CSSProperties } from "react";
import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipBackground() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Button variant="outline" tone="neutral">
          Custom background
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          style={
            {
              "--brick-tooltip-background": "var(--brick-color-accent-solid)",
              "--brick-tooltip-foreground":
                "var(--brick-color-accent-on-solid)",
            } as CSSProperties
          }
        >
          Coordinated accent colors
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
