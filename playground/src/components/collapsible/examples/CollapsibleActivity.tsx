import { Collapsible, Input, Paragraph, VStack } from "@flowstack-ui/brick";
import { useEffect, useState } from "react";

function RetainedDraft() {
  const [ticks, setTicks] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTicks((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <VStack gap={3} align="stretch">
      <Input aria-label="Activity draft" placeholder="Write a draft" />
      <Paragraph>Effect ticks: {ticks}</Paragraph>
    </VStack>
  );
}

export function CollapsibleActivity() {
  return (
    <Collapsible.Root
      lazyMount={false}
      unmountOnExit={false}
      hideMode="activity"
    >
      <Collapsible.Trigger>
        Activity-retained draft
        <Collapsible.Indicator />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Collapsible.ContentInner>
          <RetainedDraft />
        </Collapsible.ContentInner>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
import * as React from "react";
