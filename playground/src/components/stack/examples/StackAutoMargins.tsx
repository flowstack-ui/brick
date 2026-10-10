import { HStack, Stack, Text, Button } from "@flowstack-ui/brick";

export function StackAutoMargins() {
  return (
    <Stack direction={{ initial: "column", md: "row" }} gap={3}>
      <Text>Project settings</Text>
      <Stack.Item marginInlineStart={{ initial: 0, md: "auto" }}>
        <HStack gap={2}>
          <Button variant="outline" tone="neutral">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </Stack.Item>
    </Stack>
  );
}
