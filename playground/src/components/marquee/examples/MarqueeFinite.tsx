import { useState } from "react";
import { PartnerLogos } from "../PartnerLogos.js";
import {
  Button,
  HStack,
  Marquee,
  Text,
  VStack,
  useMarquee,
} from "@flowstack-ui/brick";
export function MarqueeFinite() {
  const [loops, setLoops] = useState(0);
  const [complete, setComplete] = useState(false);
  const value = useMarquee({
    autoFill: true,
    loopCount: 3,
    speed: 100,
    onLoopComplete: ({ iteration }) => setLoops(iteration),
    onComplete: () => setComplete(true),
  });
  const artwork = () => <PartnerLogos />;
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setLoops(0);
            setComplete(false);
            value.restart();
          }}
        >
          Restart three loops
        </Button>
        <Button size="sm" variant="ghost" onClick={value.togglePause}>
          {value.requestedPaused ? "Resume" : "Pause"}
        </Button>
      </HStack>
      <Marquee.RootProvider value={value} aria-label="Three loops">
        <Marquee.Viewport>
          <Marquee.Content renderReplica={artwork}>{artwork()}</Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>
      <Text variant="body-sm">
        {loops} loops completed{complete ? " — finished" : ""}
      </Text>
    </VStack>
  );
}
