import { Button, ToggleTip, Text, VStack } from "@flowstack-ui/brick";

export function ToggleTipEscape() {
  return (
    <ToggleTip.Root closeOnEscape={false}>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">Keep open on Escape</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="Keep open on Escape">
          <ToggleTip.Body>
            <VStack gap="2" align="start">
              <Text variant="caption">
                Escape dismissal is disabled. Use Done or click outside.
              </Text>
              <ToggleTip.Close asChild>
                <Button size="xs" variant="ghost">
                  Done
                </Button>
              </ToggleTip.Close>
            </VStack>
          </ToggleTip.Body>
        </ToggleTip.Content>
      </ToggleTip.Portal>
    </ToggleTip.Root>
  );
}
