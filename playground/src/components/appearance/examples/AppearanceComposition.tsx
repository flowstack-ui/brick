import {
  Appearance,
  Button,
  Paragraph,
  Surface,
  VStack,
} from "@flowstack-ui/brick";
export function AppearanceComposition() {
  return (
    <VStack gap="4">
      <Appearance value="dark">
        <Button>Existing button paint is preserved</Button>
      </Appearance>
      <Appearance value="dark">
        <Surface level="canvas" inset="md">
          <Paragraph>Surface supplies this background and spacing.</Paragraph>
        </Surface>
      </Appearance>
    </VStack>
  );
}
