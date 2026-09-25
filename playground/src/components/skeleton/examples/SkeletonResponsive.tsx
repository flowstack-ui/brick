import { Frame, Skeleton } from "@flowstack-ui/brick";
export function SkeletonResponsive() {
  return (
    <Skeleton radius="surface" asChild>
      <Frame blockSize={{ initial: 100, md: 200 }} maxInlineSize={400} />
    </Skeleton>
  );
}
