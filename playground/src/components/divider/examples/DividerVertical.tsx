import { Divider, HStack, Text } from "@flowstack-ui/brick";

export function DividerVertical() {
  return (
    <HStack gap="4">
      <Text>Overview</Text>
      <Divider orientation="vertical" stretch />
      <Text>Activity</Text>
      <Divider orientation="vertical" stretch />
      <Text>Settings</Text>
    </HStack>
  );
}
