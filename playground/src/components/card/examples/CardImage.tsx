import {
  AspectRatio,
  Button,
  Card,
  FormatNumber,
  Frame,
  Image,
  Text,
} from "@flowstack-ui/brick";
export function CardImage() {
  return (
    <Frame maxInlineSize={400}>
      <Card.Root>
        <AspectRatio.Root ratio={4 / 3}>
          <Image.Root fill src="/assets/image/studio.webp">
            <Image.Content alt="Bright studio interior" />
          </Image.Root>
        </AspectRatio.Root>
        <Card.Content gap={3}>
          <Card.Title>Studio day pass</Card.Title>
          <Card.Description>
            A bright space for your next creative project.
          </Card.Description>
          <Text variant="body-xl">
            <FormatNumber
              value={45}
              formatOptions={{ style: "currency", currency: "USD" }}
            />
          </Text>
        </Card.Content>
        <Card.Footer>
          <Button>Reserve a day</Button>
          <Button variant="ghost">Learn more</Button>
        </Card.Footer>
      </Card.Root>
    </Frame>
  );
}
