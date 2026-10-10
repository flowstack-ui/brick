import {
  Button,
  Card,
  Frame,
  HStack,
  Link,
  Marquee,
  Text,
  VStack,
  useMarquee,
} from "@flowstack-ui/brick";
export function MarqueeNews() {
  const value = useMarquee({
    autoFill: true,
    translations: { regionLabel: "Latest news" },
  });
  const names = [
    "Product updates",
    "Community stories",
    "Release notes",
    "Upcoming events",
  ];
  const artwork = () =>
    names.map((name) => (
      <Marquee.Item key={name}>
        <Text>{name}</Text>
      </Marquee.Item>
    ));
  return (
    <VStack gap={4}>
      <HStack justify="end" gap={2}>
        <Button
          size="xs"
          variant="outline"
          tone="neutral"
          aria-pressed={value.requestedPaused}
          onClick={value.togglePause}
        >
          {value.requestedPaused ? "Resume" : "Pause"} latest news
        </Button>
      </HStack>
      <Frame>
        <Marquee.RootProvider value={value}>
          <Marquee.Viewport>
            <Marquee.Content renderReplica={artwork}>
              {names.map((name) => (
                <Marquee.Item key={name}>
                  <Link href="#news">{name}</Link>
                </Marquee.Item>
              ))}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.RootProvider>
      </Frame>
    </VStack>
  );
}
