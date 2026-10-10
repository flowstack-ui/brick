import { Alert, VStack, For } from "@flowstack-ui/brick";
export function AlertStatuses() {
  return (
    <VStack gap="4">
      <For
        each={
          [
            { status: "info", text: "Your trial ends in seven days." },
            {
              status: "warning",
              text: "You are approaching your storage limit.",
            },
            { status: "success", text: "Your changes were saved." },
            { status: "error", text: "The upload failed. Please try again." },
            { status: "neutral", text: "No scheduled updates." },
          ] as const
        }
      >
        {({ status, text }) => (
          <Alert.Root key={status} status={status}>
            <Alert.Indicator />
            <Alert.Title>{text}</Alert.Title>
          </Alert.Root>
        )}
      </For>
    </VStack>
  );
}
