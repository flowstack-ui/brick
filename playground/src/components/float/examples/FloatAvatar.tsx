import { Avatar, Badge, Float, HStack, Text } from "@flowstack-ui/brick";
export function FloatAvatar() {
  return (
    <HStack gap={6}>
      <Float.Anchor inline>
        <Avatar alt="Avery Morgan" fallback="AM" size="3xl" />
        <Float.Root placement="bottom-end" offset="12%">
          <Badge tone="success" variant="solid">
            Online
          </Badge>
        </Float.Root>
      </Float.Anchor>
      <Text>Avery Morgan</Text>
    </HStack>
  );
}
