import { ColorSwatch, HStack } from "@flowstack-ui/brick";
export function ColorSwatchMix() {
  return (
    <HStack gap="4">
      <ColorSwatch.Mix
        size="2xl"
        values={["#9333ea", "#22c55e"]}
        label="Purple and green"
      />
      <ColorSwatch.Mix
        size="2xl"
        values={["#9333ea", "#22c55e", "#f59e0b"]}
        label="Purple, green and amber"
      />
    </HStack>
  );
}
