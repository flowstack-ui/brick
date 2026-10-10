import { Icon, HStack, VStack, Text } from "@flowstack-ui/brick";

export function IconDirection() {
  return (
    <VStack gap={4}>
      <HStack gap={3} dir="rtl">
        <Icon directional>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 12h16m-6-6 6 6-6 6" />
          </svg>
        </Icon>
        <Text>التالي</Text>
        <Icon>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="8" />
            <path d="M12 7v5l3 2" />
          </svg>
        </Icon>
        <Text>الوقت</Text>
      </HStack>
    </VStack>
  );
}
