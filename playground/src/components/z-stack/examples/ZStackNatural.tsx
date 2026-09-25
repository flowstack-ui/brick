import { Frame, Surface, Text, ZStack } from "@flowstack-ui/brick";
export function ZStackNatural() {
  return (
    <ZStack.Root align="start" justify="start">
      <Frame inlineSize="70%" blockSize="6rem" asChild>
        <Surface level="subtle" inset="md">
          <Text>6rem layer</Text>
        </Surface>
      </Frame>
      <ZStack.Item justify="end" asChild>
        <Frame inlineSize="45%" minBlockSize="10rem" asChild>
          <Surface tone="accent" level="subtle" inset="md">
            <Text>10rem layer: this determines the stack’s height.</Text>
          </Surface>
        </Frame>
      </ZStack.Item>
    </ZStack.Root>
  );
}
