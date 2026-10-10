import { Icon, IconPropsProvider, HStack, Text } from "@flowstack-ui/brick";

export function IconProvider() {
  return (
    <IconPropsProvider value={{ size: "lg", tone: "success" }}>
      <HStack gap={4} wrap>
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
          <Text>Uploaded</Text>
        </HStack>
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
          <Text>Verified</Text>
        </HStack>
        <HStack gap={2}>
          <Icon size="sm" tone="inherit">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
          </Icon>
          <Text>Archived</Text>
        </HStack>
      </HStack>
    </IconPropsProvider>
  );
}
