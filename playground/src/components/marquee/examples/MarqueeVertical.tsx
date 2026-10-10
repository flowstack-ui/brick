import { PartnerLogos } from "../PartnerLogos.js";
import {
  Button,
  Frame,
  HStack,
  Marquee,
  VStack,
  useMarquee,
} from "@flowstack-ui/brick";
export function MarqueeVertical() {
  const value = useMarquee({
    autoFill: true,
    side: "bottom",
    translations: { regionLabel: "Vertical updates" },
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
          {value.requestedPaused ? "Resume" : "Pause"} vertical updates
        </Button>
      </HStack>
      <Frame blockSize="12rem">
        <Marquee.RootProvider value={value}>
          <Marquee.Viewport>
            <Marquee.Content renderReplica={artwork}>
              {artwork()}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.RootProvider>
      </Frame>
    </VStack>
  );
}
