import {
  Button,
  Avatar,
  Card,
  Frame,
  HStack,
  Marquee,
  Text,
  VStack,
  useMarquee,
} from "@flowstack-ui/brick";
export function MarqueeTestimonials() {
  const value = useMarquee({
    autoFill: true,
    pauseOnInteraction: true,
    translations: { regionLabel: "Customer stories" },
  });
  const stories = [
    {
      name: "Alex Morgan",
      role: "Product designer",
      photo: "photo-1472099645785-5658abf4ff4e",
      quote:
        "Thoughtful defaults give us more time to focus on the details that make our product unique.",
    },
    {
      name: "Jamie Chen",
      role: "Frontend engineer",
      photo: "photo-1438761681033-6461ffad8d80",
      quote:
        "One consistent foundation makes it easier for design and engineering to build great experiences together.",
    },
    {
      name: "Sam Rivera",
      role: "Design lead",
      photo: "photo-1500648767791-00dcc994a43e",
      quote:
        "Clear composition and accessible interactions help our small team deliver with confidence.",
    },
  ];
  const artwork = (replica = false) =>
    stories.map(({ name, role, photo, quote }) => (
      <Marquee.Item key={name}>
        <Frame inlineSize="20rem">
          <Card.Root>
            <Card.Content>
              <VStack gap={4} align="start">
                <span
                  role="img"
                  aria-label="5 out of 5 stars"
                  style={{ color: "#F59E0B", letterSpacing: "0.15em" }}
                >
                  ★★★★★
                </span>
                <Text tone="secondary">{quote}</Text>
                <HStack gap={3}>
                  {replica ? (
                    // Passive copy of the circular avatar; no duplicate loading effects.
                    <img
                      src={`https://images.unsplash.com/${photo}?w=80&h=80&fit=crop&crop=faces`}
                      alt=""
                      width={36}
                      height={36}
                      style={{
                        display: "block",
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  ) : (
                    <Avatar
                      src={`https://images.unsplash.com/${photo}?w=80&h=80&fit=crop&crop=faces`}
                      alt=""
                      size="sm"
                      fallback={name[0]}
                    />
                  )}
                  <VStack gap={1} align="start">
                    <Text weight="medium">{name}</Text>
                    <Text tone="secondary" variant="body-sm">
                      {role}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </Card.Content>
          </Card.Root>
        </Frame>
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
          {value.requestedPaused ? "Resume" : "Pause"} customer stories
        </Button>
      </HStack>
      <Frame>
        <Marquee.RootProvider value={value}>
          <Marquee.Edge side="start" />
          <Marquee.Edge side="end" />
          <Marquee.Viewport>
            <Marquee.Content renderReplica={() => artwork(true)}>
              {artwork()}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.RootProvider>
      </Frame>
    </VStack>
  );
}
