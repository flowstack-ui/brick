import { Hide, Show, Text } from "@flowstack-ui/brick";
export function HidePair() {
  return (
    <>
      <Hide from="md">
        <Text>Compact view</Text>
      </Hide>
      <Show from="md">
        <Text>Expanded view</Text>
      </Show>
    </>
  );
}
