import { HStack, Spinner } from "@flowstack-ui/brick";
export function SpinnerColors() {
  return (
    <HStack gap="6">
      <Spinner tone="accent" />
      <Spinner tone="info" />
      <Spinner tone="success" />
    </HStack>
  );
}
