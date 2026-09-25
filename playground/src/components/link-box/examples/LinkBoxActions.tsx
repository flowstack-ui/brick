import { useState } from "react";
import {
  Button,
  Heading,
  Link,
  LinkBox,
  Paragraph,
  Surface,
  VStack,
} from "@flowstack-ui/brick";

export function LinkBoxActions() {
  const [saved, setSaved] = useState(false);
  return (
    <LinkBox.Root>
      <Surface bordered inset="lg">
        <VStack gap="4">
          <Heading level={3} variant="title-sm">
            <LinkBox.Link href="#usage">Team workspace</LinkBox.Link>
          </Heading>
          <Paragraph tone="secondary">
            Open the workspace, or use an independent action.
          </Paragraph>
          <LinkBox.Action>
            <Button
              variant="outline"
              aria-pressed={saved}
              onClick={() => setSaved(!saved)}
            >
              {saved ? "Saved" : "Save"}
            </Button>
          </LinkBox.Action>
          <LinkBox.Action>
            <Link href="#examples">View author</Link>
          </LinkBox.Action>
        </VStack>
      </Surface>
    </LinkBox.Root>
  );
}
