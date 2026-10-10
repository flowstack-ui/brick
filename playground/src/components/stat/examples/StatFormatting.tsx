import { Stat, FormatNumber } from "@flowstack-ui/brick";

export function StatFormatting() {
  return (
    <Stat.Root>
      <Stat.Label>Revenue</Stat.Label>
      <Stat.ValueText>
        <FormatNumber
          value={935.4}
          formatOptions={{ style: "currency", currency: "USD" }}
        />
      </Stat.ValueText>
    </Stat.Root>
  );
}
