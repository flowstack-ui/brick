import { Radiomark, HStack, Text, Icon } from "@flowstack-ui/brick";
export function RadiomarkArtwork() {
  return (
    <HStack gap={6}>
      <Radiomark checked>
        <Icon size="inherit" asChild>
          <svg viewBox="0 0 24 24">
            <path
              d="m5 12 4 4 10-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </Icon>
      </Radiomark>
      <Radiomark>
        <Icon size="inherit" asChild>
          <svg viewBox="0 0 24 24">
            <path
              d="m5 12 4 4 10-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </Icon>
      </Radiomark>
      <Text variant="body-sm">Artwork appears only when selected</Text>
    </HStack>
  );
}
