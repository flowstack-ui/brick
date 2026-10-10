import { Surface, VStack, Paragraph, Button } from "@flowstack-ui/brick";

export function SurfaceSurfaceEffects() {
  // Diagnostic artwork makes the difference between blur and plain alpha visible.
  return (
    <div
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #587cbd 0 24px, #d9b78b 24px 48px)",
        padding: "1.5rem",
      }}
    >
      <Surface
        treatment="translucent"
        backgroundOpacity={0.82}
        backdropBlur="18px"
        bordered
        borderOpacity={0.5}
        inset="lg"
      >
        <VStack gap={3}>
          <Paragraph>Project overview</Paragraph>
          <Surface inset="md" bordered>
            Nested surfaces retain their own opaque defaults.
          </Surface>
          <Button>Open project</Button>
        </VStack>
      </Surface>
    </div>
  );
}
