import { ChevronDown } from "lucide-react";
import { Button, Icon, Popover } from "@flowstack-ui/brick";
export function PopoverIndicator() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          endIcon={
            <Popover.Indicator>
              <Icon size="sm">
                <ChevronDown />
              </Icon>
            </Popover.Indicator>
          }
        >
          Settings
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <Popover.Body>
            <Popover.Title>Optional indicator</Popover.Title>
          </Popover.Body>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
