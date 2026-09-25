import { Button, ToggleTip, VStack, Link } from "@flowstack-ui/brick";

export function ToggleTipLink() {
  return (
    <ToggleTip.Root>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">Storage details</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="Storage details">
          <ToggleTip.Body>
            <VStack align="start" gap="2">
              <ToggleTip.Title>Storage policy</ToggleTip.Title>
              <ToggleTip.Description>
                Files count toward your workspace allowance.
              </ToggleTip.Description>
              <Link href="#usage">Read the usage guide</Link>
            </VStack>
          </ToggleTip.Body>
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.Root>
  );
}
