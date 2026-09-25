import { Button, Collapsible, Paragraph, VStack } from "@flowstack-ui/brick";
import { useState } from "react";

export function CollapsibleControlled() {
  const [open, setOpen] = useState(false);
  return (
    <VStack gap="3">
      <Paragraph tone="secondary">State: {open ? "open" : "closed"}</Paragraph>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger>
          Controlled details
          <Collapsible.Indicator />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.ContentInner>
            <Button onPress={() => setOpen(false)}>Done</Button>
          </Collapsible.ContentInner>
        </Collapsible.Content>
      </Collapsible.Root>
    </VStack>
  );
}
