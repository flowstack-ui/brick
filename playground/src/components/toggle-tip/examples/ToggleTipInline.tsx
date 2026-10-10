import { Button, ToggleTip } from "@flowstack-ui/brick";

export function ToggleTipInline() {
  return (
    <ToggleTip.Root portalled={false}>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">Inline portal</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Content aria-label="Inline portal">
        <ToggleTip.Body>This content stays in the local DOM.</ToggleTip.Body>
      </ToggleTip.Content>
    </ToggleTip.Root>
  );
}
