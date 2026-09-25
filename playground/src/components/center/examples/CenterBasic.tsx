import { Center, Frame, Surface, Text } from "@flowstack-ui/brick";
export function CenterBasic() {
  return (
    <Frame blockSize="6.25rem" asChild>
      <Surface level="subtle" tone="accent" radius="none" asChild>
        <Center>
          <Text>This will be centered</Text>
        </Center>
      </Surface>
    </Frame>
  );
}
