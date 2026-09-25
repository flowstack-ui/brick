import { HStack, Stack, Paragraph, Button } from "@flowstack-ui/brick";

export function StackShrink() {
  return (
    <HStack gap={3}>
      <Stack.Item grow={1} shrink={1} basis="24rem">
        <Paragraph>
          Long project names and translated descriptions may wrap here without
          clipping the action.
        </Paragraph>
      </Stack.Item>
      <Stack.Item asChild shrink={0}>
        <Button>Save</Button>
      </Stack.Item>
    </HStack>
  );
}
