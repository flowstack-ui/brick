import { Button, ToggleTip } from "@flowstack-ui/brick";

export function ToggleTipArrow() {
  return (
    <ToggleTip.Root>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">With arrow</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="With arrow">
          <ToggleTip.Body>Your files are encrypted at rest.</ToggleTip.Body>
          <ToggleTip.Arrow />
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.Root>
  );
}
