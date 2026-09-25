import { Icon, HStack, Text } from "@flowstack-ui/brick";

export function IconCustom() {
  return (
    <HStack gap={2}>
      <Icon asChild>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 16h20m-8-8 8 8-8 8" />
        </svg>
      </Icon>
      <Text>Continue to review</Text>
    </HStack>
  );
}
