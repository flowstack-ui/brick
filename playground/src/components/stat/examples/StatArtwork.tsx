import { Stat } from "@flowstack-ui/brick";
import { TrendingDown } from "lucide-react";

export function StatArtwork() {
  return (
    <Stat.Root>
      <Stat.Label>Response time</Stat.Label>
      <Stat.ValueText>
        123<Stat.ValueUnit>ms</Stat.ValueUnit>
      </Stat.ValueText>
      <Stat.HelpText>
        <Stat.DownIndicator tone="success">
          <TrendingDown aria-hidden="true" />
        </Stat.DownIndicator>
        8% faster than last week
      </Stat.HelpText>
    </Stat.Root>
  );
}
