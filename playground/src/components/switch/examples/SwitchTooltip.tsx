import { Switch, Tooltip } from "@flowstack-ui/brick";

export function SwitchTooltip() {
  return (
    <Switch.Field name="mute-alerts">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Switch.Control aria-label="Mute workspace alerts" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>Mute workspace alerts</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <Switch.HiddenInput />
    </Switch.Field>
  );
}
