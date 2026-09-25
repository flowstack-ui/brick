import { Icon, HStack, VStack, Text } from "@flowstack-ui/brick";

export function IconTones() {
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Icon tone="success">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </Icon>
        <Text>Backup complete</Text>
      </HStack>
      <HStack gap={2}>
        <Icon tone="warning" emphasis="solid">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 23 22H1z" />
          </svg>
        </Icon>
        <Text>Storage almost full</Text>
      </HStack>
      <HStack gap={2}>
        <Icon tone="danger">
          <svg viewBox="0 0 24 24">
            <path fill="#7c3aed" d="M3 3h12v12H3z" />
            <circle fill="#22c55e" cx="17" cy="17" r="5" />
          </svg>
        </Icon>
        <Text>Authored brand colors stay intact</Text>
      </HStack>
    </VStack>
  );
}
