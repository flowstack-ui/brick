import { useRef, useState } from "react";
import { Minus } from "lucide-react";
import { Chip, Icon, Button, HStack } from "@flowstack-ui/brick";
export function ChipCustomRemove() {
  const [visible, setVisible] = useState(true);
  const restore = useRef<HTMLElement>(null);
  return (
    <HStack gap={3}>
      {visible && (
        <Chip.Root radius="control">
          <Chip.Label>Archived</Chip.Label>
          <Chip.RemoveTrigger
            ariaLabel="Remove Archived"
            onPress={() => {
              setVisible(false);
              restore.current?.focus();
            }}
          >
            <Icon>
              <Minus />
            </Icon>
          </Chip.RemoveTrigger>
        </Chip.Root>
      )}
      <Button
        ref={restore}
        size="sm"
        variant="outline"
        onPress={() => setVisible(true)}
      >
        Restore archive filter
      </Button>
    </HStack>
  );
}
