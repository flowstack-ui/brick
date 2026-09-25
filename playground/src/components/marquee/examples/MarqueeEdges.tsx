import { PartnerLogos } from "../PartnerLogos.js";
import {
  Button,
  Frame,
  HStack,
  Marquee,
  VStack,
  useMarquee,
} from "@flowstack-ui/brick";
export function MarqueeEdges() {
  const value = useMarquee({
    autoFill: true,
    translations: { regionLabel: "Partner fades" },
  });
  const artwork = () => <PartnerLogos />;
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
          {value.requestedPaused ? "Resume" : "Pause"} partner fades
        </Button>
      </HStack>
      <Frame>
        <Marquee.RootProvider value={value}>
          <Marquee.Viewport>
            <Marquee.Content renderReplica={artwork}>
              {artwork()}
            </Marquee.Content>
          </Marquee.Viewport>
          <Marquee.Edge side="start" />
          <Marquee.Edge side="end" />
        </Marquee.RootProvider>
      </Frame>
    </VStack>
  );
}
