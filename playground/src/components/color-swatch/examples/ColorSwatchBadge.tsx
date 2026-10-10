import { ColorSwatch, Badge } from "@flowstack-ui/brick";
export function ColorSwatchBadge() {
  return (
    <Badge variant="surface">
      <ColorSwatch.Root value="#9333ea" size="2xs" /> Purple
    </Badge>
  );
}
