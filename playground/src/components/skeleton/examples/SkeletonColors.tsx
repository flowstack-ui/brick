import type { CSSProperties } from "react";
import { Frame, Skeleton } from "@flowstack-ui/brick";
export function SkeletonColors() {
  return (
    <Frame maxInlineSize={400}>
      <Skeleton
        animation="wave"
        height={80}
        style={
          {
            "--brick-skeleton-background": "var(--brick-color-accent-soft)",
            "--brick-skeleton-highlight": "var(--brick-color-accent-solid)",
          } as CSSProperties
        }
      />
    </Frame>
  );
}
