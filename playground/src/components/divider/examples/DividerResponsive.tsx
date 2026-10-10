import { Divider, Stack, Text } from "@flowstack-ui/brick";

export function DividerResponsive() {
  return (
    <Stack direction={{ initial: "column", md: "row" }} gap="4">
      <Text>Account</Text>
      <Divider orientation={{ md: "vertical" }} stretch />
      <Text>Preferences</Text>
    </Stack>
  );
}
