import type { CSSProperties } from "react";
import { Status } from "@flowstack-ui/brick";
export function StatusCustomization() {
  return (
    <Status.Root
      style={
        {
          "--brick-status-indicator-size": "0.8em",
          "--brick-status-gap": "var(--brick-space-3)",
        } as CSSProperties
      }
      tone="accent"
    >
      <Status.Indicator />
      Scheduled
    </Status.Root>
  );
}
