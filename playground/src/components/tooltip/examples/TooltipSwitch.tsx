import { Switch, Tooltip } from "@flowstack-ui/brick";
export function TooltipSwitch() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Switch.Root aria-label="Notifications">
          <Switch.Thumb />
        </Switch.Root>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>Enable notifications</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
