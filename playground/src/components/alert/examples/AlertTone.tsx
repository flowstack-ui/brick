import { Alert } from "@flowstack-ui/brick";
export function AlertTone() {
  return (
    <Alert.Root status="success" tone="accent" variant="surface">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Subscription activated</Alert.Title>
        <Alert.Description>Your new features are available.</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
