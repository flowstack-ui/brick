import { Bleed, Paragraph, Surface } from "@flowstack-ui/brick";

export function BleedComposition() {
  return (
    <Surface level="canvas" bordered inset="lg" radius="none">
      <Bleed inline="6" asChild>
        <Surface tone="accent" level="subtle" inset="md" radius="none">
          <Paragraph>
            The same Surface owns its paint and receives Bleed’s margins,
            without another wrapper.
          </Paragraph>
        </Surface>
      </Bleed>
    </Surface>
  );
}
