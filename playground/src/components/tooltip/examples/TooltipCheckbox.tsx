import { Checkbox, Tooltip } from "@flowstack-ui/brick";
export function TooltipCheckbox() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Checkbox>Weekly summary</Checkbox>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>Receive a weekly project summary.</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
