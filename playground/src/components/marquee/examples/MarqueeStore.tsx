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
export function MarqueeStore() {
  const [paused, setPaused] = useState(false);
  const value = useMarquee({
    autoFill: true,
    paused,
    onPauseChange: setPaused,
  });
  const artwork = () => <PartnerLogos />;
  return (
    <VStack gap={4}>
      <HStack gap={2}>
        <Button size="sm" variant="outline" onClick={value.togglePause}>
          {paused ? "Resume" : "Pause"} workflow
        </Button>
        <Button size="sm" variant="ghost" onClick={value.restart}>
          Restart
        </Button>
      </HStack>
      <Marquee.RootProvider value={value} aria-label="Workflow">
        <Marquee.Viewport>
          <Marquee.Content renderReplica={artwork}>{artwork()}</Marquee.Content>
        </Marquee.Viewport>
        <Marquee.Context>
          {(state) => (
            <Text variant="body-sm" tone="secondary">
              {state.static
                ? "Stationary"
                : state.paused
                  ? "Paused"
                  : "Playing"}
            </Text>
          )}
        </Marquee.Context>
      </Marquee.RootProvider>
    </VStack>
  );
}
