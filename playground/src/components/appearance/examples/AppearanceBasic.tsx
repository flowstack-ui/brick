import { Appearance, Button, HStack } from "@flowstack-ui/brick";
export function AppearanceBasic() {
  return (
    <HStack gap="4" wrap>
      <Button>Inherited</Button>
      <Appearance value="dark">
        <Button>Dark</Button>
      </Appearance>
      <Appearance value="light">
        <Button>Light</Button>
      </Appearance>
    </HStack>
  );
}
