import { Button, Frame, HStack } from "@flowstack-ui/brick";
export function FrameComposition() {
  return (
    <HStack wrap="wrap" gap="4">
      <Button size="lg">Normal control</Button>
      <Frame maxInlineSize={{ lg: "20rem" }} asChild>
        <Button size="lg">Composed control</Button>
      </Frame>
    </HStack>
  );
}
