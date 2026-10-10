import { ColorSwatch, HStack, Frame } from "@flowstack-ui/brick";
export function ColorSwatchSizing() {
  return (
    <HStack gap="6">
      <Frame inlineSize="4rem" blockSize="4rem">
        <ColorSwatch.Root
          value="#9333ea"
          size="full"
          label="Full parent size"
        />
      </Frame>
      <Frame inlineSize="3rem" blockSize="3rem">
        <ColorSwatch.Root
          value="#22c55e"
          size="inherit"
          label="Inherited parent size"
        />
      </Frame>
    </HStack>
  );
}
