import { Button, ToggleTip } from "@flowstack-ui/brick";

export function ToggleTipBasic() {
  return (
    <ToggleTip.Root>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">More information</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="More information">
          <ToggleTip.Body>Your files are encrypted at rest.</ToggleTip.Body>
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.Root>
  );
}
