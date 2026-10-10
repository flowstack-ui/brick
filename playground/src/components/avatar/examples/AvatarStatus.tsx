import { Avatar, HStack, Text } from "@flowstack-ui/brick";

export function AvatarStatus() {
  return (
    <HStack gap="3">
      <Avatar alt="" fallback="AL" status="online" />
      <Text>Ada Lovelace · Available</Text>
    </HStack>
  );
}
