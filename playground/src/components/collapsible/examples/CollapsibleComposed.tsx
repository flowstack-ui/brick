import {
  Button,
  Collapsible,
  IconButton,
  Paragraph,
  VStack,
} from "@flowstack-ui/brick";
import { ChevronDown } from "lucide-react";

export function CollapsibleComposed() {
  return (
    <VStack gap="4">
      <Collapsible.Root unstyled>
        <Collapsible.Trigger unstyled asChild>
          <Button variant="outline">Button-owned appearance</Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.ContentInner>
            <Paragraph>
              One button, one visual recipe, Atom disclosure behavior.
            </Paragraph>
          </Collapsible.ContentInner>
        </Collapsible.Content>
      </Collapsible.Root>
      <Collapsible.Root unstyled>
        <Collapsible.Trigger unstyled asChild>
          <IconButton aria-label="Show compact details" variant="ghost">
            <ChevronDown />
          </IconButton>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Collapsible.ContentInner>
            <Paragraph>
              IconButton supplies its own target size and focus style.
            </Paragraph>
          </Collapsible.ContentInner>
        </Collapsible.Content>
      </Collapsible.Root>
    </VStack>
  );
}
