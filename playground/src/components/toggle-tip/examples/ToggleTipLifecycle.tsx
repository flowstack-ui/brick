import { Button, ToggleTip } from "@flowstack-ui/brick";

export function ToggleTipLifecycle() {
  return (
    <ToggleTip.Root lazyMount unmountOnExit={false}>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">Retained help</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="Retained help">
          <ToggleTip.Body>
            The content remains mounted but hidden after closing.
          </ToggleTip.Body>
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.Root>
  );
}
