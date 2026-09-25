import type { CSSProperties } from "react";
import { Chip } from "@flowstack-ui/brick";
export function ChipCustomPalette() {
  const palette = {
    "--brick-chip-tone-solid": "var(--brick-color-info-solid)",
    "--brick-chip-tone-on-solid": "var(--brick-color-info-on-solid)",
    "--brick-chip-tone-soft": "var(--brick-color-info-soft)",
    "--brick-chip-tone-on-soft": "var(--brick-color-info-on-soft)",
    "--brick-chip-tone-border": "var(--brick-color-info-border)",
    "--brick-chip-tone-text": "var(--brick-color-info-text)",
  } as CSSProperties;
  return (
    <Chip.Root radius="control" variant="surface" style={palette}>
      <Chip.Label>Research category</Chip.Label>
    </Chip.Root>
  );
}
