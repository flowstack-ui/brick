import { Button, ToggleTip, Text, VStack } from "@flowstack-ui/brick";

export function ToggleTipOutside() {
  return (
    <ToggleTip.Root closeOnInteractOutside={false}>
      <ToggleTip.Trigger asChild>
        <Button variant="outline">Keep open outside</Button>
      </ToggleTip.Trigger>
      <ToggleTip.Portal>
        <ToggleTip.Content aria-label="Keep open outside">
          <ToggleTip.Body>
            <VStack gap="2" align="start">
              <Text variant="caption">
                Outside dismissal is disabled. Press Escape or use Done.
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
