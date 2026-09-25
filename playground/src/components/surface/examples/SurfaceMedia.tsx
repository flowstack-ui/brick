import { Frame, Image, Paragraph, Surface } from "@flowstack-ui/brick";

export function SurfaceMedia() {
  return (
    <Frame minBlockSize="18rem" asChild>
      <Surface inset="lg" level="subtle">
        <Surface.Media>
          <Image.Root fill src="/assets/image/studio.webp">
            <Image.Content alt="" />
          </Image.Root>
        </Surface.Media>
        <Surface.Scrim strength="strong" />
        <Surface.Content>
          <Surface inset="sm">
            <Paragraph>
              A foreground surface keeps text contrast predictable.
            </Paragraph>
          </Surface>
        </Surface.Content>
      </Surface>
    </Frame>
  );
}
