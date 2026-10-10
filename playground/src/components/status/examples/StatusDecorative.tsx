import { HStack, Status, Text } from "@flowstack-ui/brick";
export function StatusDecorative() {
  return (
    <HStack gap={2}>
      <Status.Root aria-hidden="true" tone="accent">
        <Status.Indicator />
      </Status.Root>
      <Text>Unread notification</Text>
    </HStack>
  );
}
