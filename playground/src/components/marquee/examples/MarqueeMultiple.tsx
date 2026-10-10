import { Button, Marquee, VStack, useMarquee } from "@flowstack-ui/brick";
import { PartnerLogos } from "../PartnerLogos.js";
function Lane({ reverse = false }: { reverse?: boolean }) {
  const value = useMarquee({ autoFill: true, reverse });
  const artwork = () => <PartnerLogos />;
  return (
    <VStack gap={3} align="start">
      <Button size="xs" variant="outline" onClick={value.togglePause}>
        {value.requestedPaused ? "Resume" : "Pause"}{" "}
        {reverse ? "second" : "first"} lane
      </Button>
      <Marquee.RootProvider
        value={value}
        aria-label={reverse ? "Second lane" : "First lane"}
      >
        <Marquee.Viewport>
          <Marquee.Content renderReplica={artwork}>{artwork()}</Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>
    </VStack>
  );
}
export function MarqueeMultiple() {
  return (
    <VStack gap={6}>
      <Lane />
      <Lane reverse />
    </VStack>
  );
}
