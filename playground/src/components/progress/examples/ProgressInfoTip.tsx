import {
  Frame,
  VStack,
  HStack,
  Text,
  Button,
  ToggleTip,
  Progress,
} from "@flowstack-ui/brick";
import { useId } from "react";

export function ProgressInfoTip() {
  const labelId = useId();
  return (
    <Frame maxInlineSize="20rem">
      <VStack gap="2">
        <HStack gap="2">
          <Text id={labelId}>Preparing files</Text>
          <ToggleTip.Root>
            <ToggleTip.Trigger asChild>
              <Button size="xs" variant="ghost">
                Info
              </Button>
            </ToggleTip.Trigger>
            <ToggleTip.Portal>
              <ToggleTip.Content aria-label="About preparation">
                <ToggleTip.Body>
                  Files are checked before they are uploaded.
                </ToggleTip.Body>
              </ToggleTip.Content>
            </ToggleTip.Portal>
          </ToggleTip.Root>
        </HStack>
        <Progress.Root value={60} aria-labelledby={labelId}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      </VStack>
    </Frame>
  );
}
