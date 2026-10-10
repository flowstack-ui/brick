import { Stat, Icon } from "@flowstack-ui/brick";
import { CreditCard } from "lucide-react";

export function StatIcon() {
  return (
    <Stat.Root>
      <Stat.Label>
        <Icon size="sm">
          <CreditCard />
        </Icon>
        Sales
      </Stat.Label>
      <Stat.ValueText>$4.24k</Stat.ValueText>
    </Stat.Root>
  );
}
