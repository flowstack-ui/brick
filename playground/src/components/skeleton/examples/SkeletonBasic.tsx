import { Frame, HStack, Skeleton, VStack } from "@flowstack-ui/brick";
export function SkeletonBasic() {
  return (
    <Frame maxInlineSize={320}>
      <VStack gap="6">
        <HStack gap="4">
          <Skeleton variant="circular" size={40} />
          <Skeleton lines={2} />
        </HStack>
        <Skeleton variant="rounded" height={200} />
      </VStack>
    </Frame>
  );
}
