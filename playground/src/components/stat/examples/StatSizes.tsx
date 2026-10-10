import { Stat, For } from "@flowstack-ui/brick";

export function StatSizes() {
  return (
    <Stat.Group>
      <For each={["sm", "md", "lg"] as const}>
        {(size) => (
          <Stat.Root key={size} size={size}>
            <Stat.Label>{size} revenue</Stat.Label>
            <Stat.ValueText>$935.40</Stat.ValueText>
            <Stat.HelpText>Monthly total</Stat.HelpText>
          </Stat.Root>
        )}
      </For>
    </Stat.Group>
  );
}
