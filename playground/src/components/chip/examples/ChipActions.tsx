import { useRef, useState } from "react";
import { Chip, Button, HStack } from "@flowstack-ui/brick";
export function ChipActions() {
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");
  const restore = useRef<HTMLElement>(null);
  return (
    <HStack gap={3} wrap="wrap">
      {visible && (
        <Chip.Root radius="control" tone="accent">
          <Chip.ActionTrigger onPress={() => setMessage("Alex profile opened")}>
            <Chip.Label>Alex Lee</Chip.Label>
          </Chip.ActionTrigger>
          <Chip.RemoveTrigger
            ariaLabel="Remove Alex Lee"
            onPress={() => {
              setVisible(false);
              setMessage("Alex removed");
              restore.current?.focus();
            }}
          />
        </Chip.Root>
      )}
      <Button
        size="sm"
        variant="outline"
        ref={restore}
        onPress={() => setVisible(true)}
      >
        Restore assignee
      </Button>
      <span role="status">{message}</span>
    </HStack>
  );
}
