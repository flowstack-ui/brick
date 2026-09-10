import { AspectRatio, Center, Text } from "@flowstack-ui/brick";

export function AspectRatioBasic() {
  return (
    <AspectRatio.Root ratio={16 / 9} variant="subtle">
      <Center>
        <Text variant="body-xl">16 / 9</Text>
      </Center>
    </AspectRatio.Root>
  );
}
