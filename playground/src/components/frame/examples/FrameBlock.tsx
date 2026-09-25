import { Frame, Surface, Text, VStack } from "@flowstack-ui/brick";
export function FrameBlock() {
  return (
    <VStack gap="4">
      <Frame blockSize="6rem" asChild>
        <Surface inset="md" level="subtle">
          <Text>Fixed block size: 6rem</Text>
        </Surface>
      </Frame>
      <Frame minBlockSize="8rem" asChild>
        <Surface inset="md" level="subtle">
          <Text>
            Minimum block size: 8rem. Additional content can grow this region.
          </Text>
        </Surface>
      </Frame>
    </VStack>
  );
}
