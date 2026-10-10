import { Avatar, Blockquote, HStack, Text } from "@flowstack-ui/brick";
export function BlockquoteAvatar() {
  return (
    <Blockquote.Root variant="surface" tone="accent">
      <Blockquote.Icon />
      <Blockquote.Content>
        Good design makes the right choice easier to discover, understand, and
        repeat.
      </Blockquote.Content>
      <Blockquote.Caption>
        <HStack gap="3">
          <Avatar size="sm" alt="" fallback="ML" />
          <Text variant="body-sm">Morgan Lee</Text>
        </HStack>
      </Blockquote.Caption>
    </Blockquote.Root>
  );
}
