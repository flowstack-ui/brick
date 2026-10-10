import { Blockquote, Float } from "@flowstack-ui/brick";
export function BlockquoteIcon() {
  return (
    <Float.Anchor asChild>
      <Blockquote.Root variant="plain" tone="accent">
        <Float.Root placement="top-start" offsetInline="-6" offsetBlock="2">
          <Blockquote.Icon />
        </Float.Root>
        <Blockquote.Content>
          Good design makes the right choice easier to discover, understand, and
          repeat.
        </Blockquote.Content>
        <Blockquote.Caption>— Morgan Lee</Blockquote.Caption>
      </Blockquote.Root>
    </Float.Anchor>
  );
}
