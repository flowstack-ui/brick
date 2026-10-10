import { useRef } from "react";
import { Button, Tooltip } from "@flowstack-ui/brick";
export function TooltipVirtual() {
  const target = useRef<HTMLButtonElement>(null);
  return (
    <Tooltip.Root
      positioning={{
        getAnchorRect: () => {
          const rect = target.current?.getBoundingClientRect();
          return rect
            ? { x: rect.right, y: rect.top, width: 0, height: rect.height }
            : null;
        },
        placement: "right",
        animationFrame: true,
      }}
    >
      <Tooltip.Trigger asChild>
        <Button ref={target} variant="outline" tone="neutral">
          Custom anchor
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>
          Anchored to the right edge
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
