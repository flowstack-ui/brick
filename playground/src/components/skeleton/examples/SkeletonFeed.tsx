import { Frame, HStack, Skeleton, VStack } from "@flowstack-ui/brick";
export function SkeletonFeed() {
  return (
    <Frame maxInlineSize={400}>
      <VStack gap="4">
        <HStack gap="4">
          <Skeleton variant="circular" size={48} />
          <Skeleton lines={2} />
        </HStack>
        <Skeleton lines={3} />
        <Skeleton variant="rounded" height={200} />
      </VStack>
    </Frame>
  );
}
