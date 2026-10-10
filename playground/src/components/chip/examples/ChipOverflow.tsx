import { useRef, useState } from "react";
import { Button, Chip, Frame, VStack } from "@flowstack-ui/brick";
export function ChipOverflow() {
  const [visible, setVisible] = useState(true);
  const restore = useRef<HTMLElement>(null);
  return (
    <VStack gap={3} align="start">
      <Frame inlineSize="16rem" maxInlineSize="100%">
        {visible && (
          <Chip.Root radius="control">
            <Chip.Label title="International design systems working group">
              International design systems working group
            </Chip.Label>
            <Chip.RemoveTrigger
              ariaLabel="Remove International design systems working group"
              onPress={() => {
                setVisible(false);
                restore.current?.focus();
              }}
            />
          </Chip.Root>
        )}
      </Frame>
      <Button
        ref={restore}
        size="sm"
        variant="outline"
        onPress={() => setVisible(true)}
      >
        Restore group
      </Button>
    </VStack>
  );
}
