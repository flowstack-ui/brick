import { Checkmark, HStack, Text } from "@flowstack-ui/brick";
export function CheckmarkResponsive() {
  return (
    <HStack gap={4}>
      <Checkmark
        checked
        size={{ initial: "sm", md: "lg" }}
        variant={{ initial: "outline", md: "solid", lg: "subtle" }}
      />
      <Text variant="body-sm">Adapts size and recipe at wider breakpoints</Text>
    </HStack>
  );
}
