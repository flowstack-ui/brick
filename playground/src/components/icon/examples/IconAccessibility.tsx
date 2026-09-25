import { Icon, IconButton, HStack, VStack, Text } from "@flowstack-ui/brick";

export function IconAccessibility() {
  return (
    <VStack gap={4}>
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
        <Text>Saved — text supplies the meaning</Text>
      </HStack>
      <Icon label="Sync complete" tone="success">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m5 12 4 4L19 6" />
        </svg>
      </Icon>
      <HStack gap={2}>
        <Text id="icon-sync-label">Up to date</Text>
        <Icon aria-labelledby="icon-sync-label">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </Icon>
      </HStack>
      <IconButton aria-label="Confirm changes">
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
      </IconButton>
    </VStack>
  );
}
