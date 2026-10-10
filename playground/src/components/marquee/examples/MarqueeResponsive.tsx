import { PartnerLogos } from "../PartnerLogos.js";
import {
  Button,
  Frame,
  HStack,
  Marquee,
  VStack,
  useMarquee,
} from "@flowstack-ui/brick";
export function MarqueeResponsive() {
  const value = useMarquee({
    autoFill: true,
    spacing: { initial: 2, md: 6 },
    translations: { regionLabel: "Responsive spacing" },
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
          {value.requestedPaused ? "Resume" : "Pause"} responsive spacing
        </Button>
      </HStack>
      <Frame>
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
