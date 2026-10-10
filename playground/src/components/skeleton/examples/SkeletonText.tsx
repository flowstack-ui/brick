import { Frame, Skeleton } from "@flowstack-ui/brick";
export function SkeletonText() {
  return (
    <Frame maxInlineSize={400}>
      <Skeleton lines={3} height={16} gap={12} lastLineWidth="80%" />
    </Frame>
  );
}
