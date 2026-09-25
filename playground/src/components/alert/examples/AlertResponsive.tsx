import { Alert } from "@flowstack-ui/brick";
export function AlertResponsive() {
  return (
    <Alert.Root
      size={{ initial: "sm", md: "lg" }}
      variant={{ initial: "soft", md: "outline" }}
      inline={{ initial: false, md: true }}
      align={{ initial: "start", md: "center" }}
    >
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>New report available.</Alert.Title>
        <Alert.Description>
          Review your latest workspace activity.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
