import { Icon, HStack, Text } from "@flowstack-ui/brick";

export function IconResponsive() {
  return (
    <HStack gap={3}>
      <Icon size={{ initial: "sm", md: "xl", lg: "md", xl: "inherit" }}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </Icon>
      <Text>Compact on phones, prominent on tablets</Text>
    </HStack>
  );
}
