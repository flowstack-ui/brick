import { For, HStack, Status } from "@flowstack-ui/brick";
const states = [
  { tone: "danger", label: "Error" },
  { tone: "info", label: "Info" },
  { tone: "warning", label: "Warning" },
  { tone: "success", label: "Success" },
] as const;
export function StatusLabels() {
  return (
    <HStack gap={6} wrap="wrap">
      <For each={states}>
        {({ tone, label }) => (
          <Status.Root key={tone} tone={tone}>
            <Status.Indicator />
            {label}
          </Status.Root>
        )}
      </For>
    </HStack>
  );
}
