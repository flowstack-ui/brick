import { Blockquote, Paragraph } from "@flowstack-ui/brick";
export function BlockquoteTypography() {
  return (
    <Blockquote.Root variant="plain">
      <Blockquote.Content>
        <Paragraph
          variant={{ initial: "body-lg", lg: "body-xl" }}
          weight="medium"
        >
          Good design makes the right choice easier to discover, understand, and
          repeat.
        </Paragraph>
      </Blockquote.Content>
      <Blockquote.Caption>— Morgan Lee</Blockquote.Caption>
    </Blockquote.Root>
  );
}
