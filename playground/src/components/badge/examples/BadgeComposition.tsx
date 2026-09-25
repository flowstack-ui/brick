import { Badge, HStack, Text } from "@flowstack-ui/brick";
export function BadgeComposition() {
  return (
    <HStack gap={4} wrap>
      <Badge tone="success" variant="solid">
        <Text tone="inherit" variant="body-sm">
          Published
        </Text>
      </Badge>
      <Badge asChild>
        <strong>Important</strong>
      </Badge>
    </HStack>
  );
}
