import { Badge, Float, Frame, Surface, Text } from "@flowstack-ui/brick";
export function FloatBasic() {
  return (
    <Frame maxInlineSize="18rem">
      <Float.Anchor>
        <Surface level="subtle" inset="lg">
          <Text>Workspace</Text>
        </Surface>
        <Float.Root>
          <Badge tone="accent" variant="solid">
            New
          </Badge>
        </Float.Root>
      </Float.Anchor>
    </Frame>
  );
}
