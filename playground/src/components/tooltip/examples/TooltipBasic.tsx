import { IconButton, Tooltip } from "@flowstack-ui/brick";
import { InfoIcon } from "lucide-react";
export function TooltipBasic() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <IconButton
          aria-label="Project information"
          variant="ghost"
          tone="neutral"
        >
          <InfoIcon />
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>View project information</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
