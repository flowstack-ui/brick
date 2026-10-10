import { Badge, Float, Surface, Text } from "@flowstack-ui/brick";
export function FloatResponsive() {
  return (
    <Float.Anchor>
      <Surface level="subtle" inset="lg">
        <Text>One content tree at every width</Text>
      </Surface>
      <Float.Root
        placement={{ md: "bottom-end", lg: "top-start" }}
        offset={{ md: 2, xl: 4 }}
        offsetInline={{ lg: 0 }}
      >
        <Badge tone="accent" variant="solid">
          New
        </Badge>
      </Float.Root>
    </Float.Anchor>
  );
}
