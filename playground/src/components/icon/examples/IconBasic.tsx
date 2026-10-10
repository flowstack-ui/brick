import { Icon, HStack, Text } from "@flowstack-ui/brick";

export function IconBasic() {
  return (
    <HStack gap={2}>
      <Icon>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </Icon>
      <Text>Changes saved</Text>
    </HStack>
  );
}
