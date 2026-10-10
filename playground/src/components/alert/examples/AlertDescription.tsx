import { Alert } from "@flowstack-ui/brick";
export function AlertDescription() {
  return (
    <Alert.Root status="success">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Changes saved</Alert.Title>
        <Alert.Description>
          Your team can now view the updated project.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
