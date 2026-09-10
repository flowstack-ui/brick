import { Alert, Badge, HStack, Stack, Text } from "@flowstack-ui/brick";

/** Static docs guidance; add a real destination only when it is ready. */
export function PlaygroundAiTip() {
  return (
    <Stack.Item align="start">
      <Alert.Root size="sm" status="neutral" tone="warning" variant="surface" data-playground-ai-tip>
        <HStack gap="2">
          <Badge size="sm" tone="warning" variant="solid">AI Tip</Badge>
          <Alert.Description asChild>
            <Text variant="body-sm" tone="inherit">
              Want to skip the docs? Use our{" "}
              <Text variant="body-sm" tone="inherit" weight="medium">Agent Skills</Text>
            </Text>
          </Alert.Description>
        </HStack>
      </Alert.Root>
    </Stack.Item>
  );
}
