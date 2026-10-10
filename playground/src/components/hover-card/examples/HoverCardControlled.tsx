import { useState } from "react";
import { HoverCard, Link, Text, VStack } from "@flowstack-ui/brick";
export function HoverCardControlled() {
  const [open, setOpen] = useState(false);
  return (
    <VStack align="start" gap={4}>
      <HoverCard.Root open={open} onOpenChange={setOpen}>
        <HoverCard.Trigger asChild>
          <Link href="/hover-card/destination?resource=controlled">
            Controlled preview
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Portal>
          <HoverCard.Content>
            State belongs to the application.
            <HoverCard.Arrow />
          </HoverCard.Content>
        </HoverCard.Portal>
      </HoverCard.Root>
      <Text tone="secondary" variant="body-sm">
        {open ? "Preview open" : "Preview closed"}
      </Text>
    </VStack>
  );
}
