import { HStack, Spinner, Text } from "@flowstack-ui/brick";
export function SpinnerInherited() {
  return (
    <Text variant="body-xl">
      <HStack as="span" gap="3">
        <Spinner size="inherit" />
        Preparing your report…
      </HStack>
    </Text>
  );
}
