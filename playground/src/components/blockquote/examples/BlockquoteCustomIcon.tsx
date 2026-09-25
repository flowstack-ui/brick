import { Blockquote } from "@flowstack-ui/brick";
import { Quote } from "lucide-react";
export function BlockquoteCustomIcon() {
  return (
    <Blockquote.Root tone="accent" variant="solid">
      <Blockquote.Icon asChild>
        <Quote />
      </Blockquote.Icon>
      <Blockquote.Content>
        Good design makes the right choice easier to discover, understand, and
        repeat.
      </Blockquote.Content>
      <Blockquote.Caption>— Morgan Lee</Blockquote.Caption>
    </Blockquote.Root>
  );
}
