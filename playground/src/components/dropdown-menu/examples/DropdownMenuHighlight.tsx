import { useState } from "react";
import {
  Button,
  DropdownMenu,
  Paragraph,
  VStack,
  type DropdownMenuRootProps,
} from "@flowstack-ui/brick";
export function DropdownMenuHighlight() {
  const [highlight, setHighlight] =
    useState<DropdownMenuRootProps["highlightedValue"]>(null);
  return (
    <VStack gap="4" align="start">
      <DropdownMenu.Root
        highlightedValue={highlight}
        onHighlightChange={({ highlightedValue }) =>
          setHighlight(highlightedValue)
        }
      >
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" tone="neutral">
            Controlled highlight
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item value="new">New file</DropdownMenu.Item>
          <DropdownMenu.Item value="open">Open file</DropdownMenu.Item>
          <DropdownMenu.Item value="archive" disabled>
            Archive unavailable
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Paragraph tone="secondary">
        Highlighted: {typeof highlight === "string" ? highlight : "none"}.
      </Paragraph>
    </VStack>
  );
}
