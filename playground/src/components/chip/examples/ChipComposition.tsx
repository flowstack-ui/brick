import { useState } from "react";
import { Chip, Button, HStack } from "@flowstack-ui/brick";
export function ChipComposition() {
  const [opened, setOpened] = useState(false);
  return (
    <HStack gap={3}>
      <Chip.Root radius="control">
        <Chip.Label asChild>
          <strong>Projected label</strong>
        </Chip.Label>
      </Chip.Root>
      <Chip.Root unstyled>
        <Chip.ActionTrigger asChild unstyled>
          <Button variant="outline" size="sm" onPress={() => setOpened(true)}>
            Open project
          </Button>
        </Chip.ActionTrigger>
      </Chip.Root>
      <span role="status">{opened ? "Project opened" : ""}</span>
    </HStack>
  );
}
