import { Appearance, Button, Surface, VStack } from "@flowstack-ui/brick";
export function AppearanceNested() {
  return (
    <Appearance value="light">
      <Surface level="canvas" inset="lg">
        <VStack gap="4">
          <span>Light outer region</span>
          <Appearance value="dark">
            <Surface level="canvas" inset="lg">
              <VStack gap="4">
                <span>Dark middle region</span>
                <Appearance value="light">
                  <Surface level="canvas" inset="md">
                    <Button>Light again</Button>
                  </Surface>
                </Appearance>
              </VStack>
            </Surface>
          </Appearance>
        </VStack>
      </Surface>
    </Appearance>
  );
}
