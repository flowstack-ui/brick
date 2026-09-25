import { Hide, Text } from "@flowstack-ui/brick";
export function HideBasic() {
  return (
    <Hide from="lg">
      <Text>Compact content: hidden from lg upward.</Text>
    </Hide>
  );
}
