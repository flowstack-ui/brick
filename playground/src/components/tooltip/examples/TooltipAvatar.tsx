import { Avatar, Tooltip } from "@flowstack-ui/brick";
export function TooltipAvatar() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <Avatar alt="Sam Adams" fallback="SA" tabIndex={0} />
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content>Sam Adams · Designer</Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
