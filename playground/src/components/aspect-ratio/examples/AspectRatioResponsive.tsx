import { AspectRatio, Center, Frame, Text } from "@flowstack-ui/brick";

export function AspectRatioResponsive() {
  return (
    <Frame asChild maxInlineSize={300}>
      <AspectRatio.Root ratio={{ initial: 1, md: 16 / 9 }} variant="subtle">
        <Center>
          <Text>1:1 → 16:9</Text>
        </Center>
      </AspectRatio.Root>
    </Frame>
  );
}
