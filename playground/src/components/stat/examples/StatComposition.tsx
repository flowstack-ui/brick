import { Stat } from "@flowstack-ui/brick";

export function StatComposition() {
  return (
    <Stat.Root asChild>
      <dl aria-label="Monthly usage">
        <Stat.Label>Requests</Stat.Label>
        <Stat.ValueText>12,450</Stat.ValueText>
        <Stat.HelpText asChild>
          <dd>Across all workspaces</dd>
        </Stat.HelpText>
      </dl>
    </Stat.Root>
  );
}
