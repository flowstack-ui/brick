import { Button, ToggleTip, useToggleTip } from "@flowstack-ui/brick";

export function ToggleTipStore() {
  const tip = useToggleTip();
  return (
    <ToggleTip.RootProvider value={tip}>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">Controller help</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="Controller help">
          <ToggleTip.Body>Uses the original public controller.</ToggleTip.Body>
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.RootProvider>
  );
}
