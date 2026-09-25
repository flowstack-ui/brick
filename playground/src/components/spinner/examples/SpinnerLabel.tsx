import { Spinner, Text, VStack } from "@flowstack-ui/brick";
export function SpinnerLabel() {
  return (
    <VStack gap="3" align="center">
      <Spinner tone="accent" />
      <Text role="status" tone="secondary">
        Loading your workspace…
      </Text>
    </VStack>
  );
}
