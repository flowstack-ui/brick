import { useRef } from "react";
import {
  Button,
  Field,
  Frame,
  HStack,
  Textarea,
  VStack,
} from "@flowstack-ui/brick";

export function TextareaRef() {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <Frame maxInlineSize="32rem">
      <VStack gap="3">
        <Field.Root>
          <Field.Label>Feedback</Field.Label>
          <Textarea.Root ref={ref} placeholder="Tell us what could improve" />
        </Field.Root>
        <HStack>
          <Button variant="outline" onClick={() => ref.current?.focus()}>
            Focus textarea
          </Button>
        </HStack>
      </VStack>
    </Frame>
  );
}
