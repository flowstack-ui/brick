import { Button, Card, Frame, Grid, Image, VStack } from "@flowstack-ui/brick";
export function CardMedia() {
  return (
    <Frame maxInlineSize={640}>
      <Card.Root>
        <Grid.Root
          templateColumns={{
            initial: "minmax(0, 1fr)",
            md: "minmax(0, 2fr) minmax(0, 3fr)",
          }}
          gap={0}
        >
          <Image.Root fill src="/assets/image/studio.webp">
            <Image.Content alt="Bright studio interior" />
          </Image.Root>
          <VStack gap={0}>
            <Card.Header>
              <Card.Title>Your next workspace</Card.Title>
              <Card.Description>
                Compose horizontal layout with Grid.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              Media and content remain independent regions.
            </Card.Content>
            <Card.Footer>
              <Button tone="contrast">Explore</Button>
            </Card.Footer>
          </VStack>
        </Grid.Root>
      </Card.Root>
    </Frame>
  );
}
