import type { CSSProperties } from "react";
import { Button, Popover } from "@flowstack-ui/brick";
export function PopoverBackground() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Custom background</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          style={
            {
              "--brick-popover-background": "var(--brick-color-surface-canvas)",
            } as CSSProperties
          }
        >
          <Popover.Body>
            <Popover.Title>The arrow follows the panel</Popover.Title>
          </Popover.Body>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
